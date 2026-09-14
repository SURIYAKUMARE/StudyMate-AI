// Web Audio API Synthesizer for Timer Chimes and Ambient Focus Sounds
class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientNoiseNode: AudioNode | null = null;
  private isAmbientPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play pleasant chime for timer start/pause/complete
  playChime(type: 'start' | 'pause' | 'complete' | 'click') {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.3); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'pause') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'complete') {
        // Celebratory chord
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + idx * 0.12);
          g.gain.setValueAtTime(0.15, now + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);
          o.connect(g);
          g.connect(this.ctx.destination);
          o.start(now + idx * 0.12);
          o.stop(now + idx * 0.12 + 0.8);
        });
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio not permitted yet
    }
  }

  // Generate synthetic ambient sounds (White Noise / Rain simulation)
  startAmbient(type: 'rain' | 'whitenoise' | 'lofi') {
    try {
      this.stopAmbient();
      this.initContext();
      if (!this.ctx) return;

      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Pink / brown filtered noise for pleasant focus
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === 'rain') {
          // Soft brown noise
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 2.5;
        } else if (type === 'lofi') {
          // Gentle resonant hum
          output[i] = (lastOut + 0.05 * white) / 1.05;
          lastOut = output[i];
          output[i] *= 1.8;
        } else {
          // White noise filtered
          output[i] = white * 0.15;
        }
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : type === 'lofi' ? 'bandpass' : 'lowpass';
      filter.frequency.value = type === 'rain' ? 800 : type === 'lofi' ? 400 : 2500;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      this.ambientNoiseNode = whiteNoise;
      this.isAmbientPlaying = true;
    } catch {
      // Audio autoplay blocked
    }
  }

  stopAmbient() {
    if (this.ambientNoiseNode) {
      try {
        (this.ambientNoiseNode as AudioBufferSourceNode).stop();
        this.ambientNoiseNode.disconnect();
      } catch {
        // already stopped
      }
      this.ambientNoiseNode = null;
    }
    this.isAmbientPlaying = false;
  }

  getAmbientPlaying() {
    return this.isAmbientPlaying;
  }
}

export const soundManager = new SoundManager();
