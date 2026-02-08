/**
 * Revolutionary Therapeutic Audio Engine
 * Advanced Web Audio API implementation for healing-focused soundscapes
 * Binaural beats, emotional synthesis, and responsive audio therapy
 */

export class TherapeuticAudioEngine {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.spatialAudio = null;
    this.activeOscillators = new Map();
    this.microphoneStream = null;
    this.breathingAnalyzer = null;
    this.isInitialized = false;
    
    // Therapeutic frequency mappings based on research
    this.healingFrequencies = {
      // Solfeggio frequencies for different healing aspects
      root: 396,          // Liberating guilt and fear
      sacral: 417,        // Facilitating change
      solar: 528,         // DNA repair and love frequency
      heart: 639,         // Harmonizing relationships
      throat: 741,        // Awakening intuition
      third: 852,         // Returning to spiritual order
      crown: 963,         // Divine consciousness
      
      // Binaural beat frequencies for brainwave entrainment
      delta: 2.5,         // Deep sleep, healing
      theta: 6.5,         // Meditation, creativity
      alpha: 10,          // Relaxation, flow states
      beta: 15,           // Focus, alertness
      gamma: 40,          // Higher consciousness
      
      // Nature-based healing frequencies
      earth: 7.83,        // Schumann resonance
      water: 33,          // Ocean waves
      wind: 144,          // Gentle breeze
      fire: 288           // Crackling flames
    };
    
    // Emotional synthesis parameters
    this.emotionalSynthesis = {
      calm: { 
        frequencies: [256, 341.3, 426.7], // C, E, G# - calming triad
        attack: 2.0, 
        decay: 3.0, 
        sustain: 0.7, 
        release: 4.0,
        filter: 'lowpass',
        resonance: 5
      },
      anxious: { 
        frequencies: [466.2, 554.4, 659.3], // Bb, Db, E - tension resolution
        attack: 0.1, 
        decay: 0.5, 
        sustain: 0.4, 
        release: 1.0,
        filter: 'highpass',
        resonance: 8
      },
      hopeful: { 
        frequencies: [523.3, 659.3, 783.9], // C, E, G - major triad
        attack: 1.0, 
        decay: 2.0, 
        sustain: 0.8, 
        release: 3.0,
        filter: 'bandpass',
        resonance: 6
      },
      sad: { 
        frequencies: [293.7, 349.2, 440.0], // D, F, A - minor, contemplative
        attack: 3.0, 
        decay: 4.0, 
        sustain: 0.9, 
        release: 5.0,
        filter: 'lowpass',
        resonance: 3
      },
      joyful: {
        frequencies: [523.3, 698.5, 880.0], // C, F, A - bright major
        attack: 0.5,
        decay: 1.0,
        sustain: 0.6,
        release: 2.0,
        filter: 'bandpass',
        resonance: 7
      }
    };
  }

  async initialize() {
    try {
      // Initialize Web Audio API
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create master gain control
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.3; // Start with gentle volume
      
      // Initialize spatial audio capabilities
      this.spatialAudio = {
        listener: this.audioContext.listener,
        panners: new Map()
      };
      
      // Set up breathing analysis
      await this.initializeMicrophoneAnalysis();
      
      this.isInitialized = true;
      console.log('Therapeutic Audio Engine initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
    }
  }

  async initializeMicrophoneAnalysis() {
    try {
      this.microphoneStream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false
        } 
      });
      
      const source = this.audioContext.createMediaStreamSource(this.microphoneStream);
      this.breathingAnalyzer = this.audioContext.createAnalyser();
      this.breathingAnalyzer.fftSize = 2048;
      this.breathingAnalyzer.smoothingTimeConstant = 0.8;
      
      source.connect(this.breathingAnalyzer);
      
      console.log('Microphone breathing analysis initialized');
    } catch (error) {
      console.warn('Microphone access denied or not available:', error);
    }
  }

  // Detect breathing patterns from microphone input
  analyzeBreathing() {
    if (!this.breathingAnalyzer) return { phase: 0, intensity: 0 };
    
    const bufferLength = this.breathingAnalyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.breathingAnalyzer.getByteFrequencyData(dataArray);
    
    // Focus on low frequencies typical of breathing
    let breathingEnergy = 0;
    const breathingRange = Math.floor(bufferLength * 0.1); // Low frequency range
    
    for (let i = 0; i < breathingRange; i++) {
      breathingEnergy += dataArray[i];
    }
    
    breathingEnergy /= breathingRange;
    
    // Convert to breathing phase (0-1 cycle)
    const intensity = breathingEnergy / 255;
    const time = this.audioContext.currentTime;
    const phase = (Math.sin(time * 0.2) + 1) / 2; // Simulated if no clear pattern
    
    return { phase, intensity };
  }

  // Generate binaural beats for brainwave entrainment
  generateBinauralBeats(frequency, beatFrequency, duration = 5000) {
    if (!this.isInitialized) return;
    
    const leftOscillator = this.audioContext.createOscillator();
    const rightOscillator = this.audioContext.createOscillator();
    
    const leftGain = this.audioContext.createGain();
    const rightGain = this.audioContext.createGain();
    
    // Create stereo separation for binaural effect
    const splitter = this.audioContext.createChannelSplitter(2);
    const merger = this.audioContext.createChannelMerger(2);
    
    // Left ear frequency
    leftOscillator.frequency.value = frequency;
    leftOscillator.type = 'sine';
    
    // Right ear frequency (slightly offset for binaural beat)
    rightOscillator.frequency.value = frequency + beatFrequency;
    rightOscillator.type = 'sine';
    
    // Set up audio routing
    leftOscillator.connect(leftGain);
    rightOscillator.connect(rightGain);
    
    leftGain.connect(merger, 0, 0);
    rightGain.connect(merger, 0, 1);
    
    merger.connect(this.masterGain);
    
    // Configure gain for gentle therapy
    leftGain.gain.value = 0.15;
    rightGain.gain.value = 0.15;
    
    // Start and schedule stop
    const now = this.audioContext.currentTime;
    leftOscillator.start(now);
    rightOscillator.start(now);
    leftOscillator.stop(now + duration / 1000);
    rightOscillator.stop(now + duration / 1000);
    
    // Store for later management
    const id = `binaural_${Date.now()}`;
    this.activeOscillators.set(id, [leftOscillator, rightOscillator]);
    
    // Clean up after completion
    setTimeout(() => {
      this.activeOscillators.delete(id);
    }, duration);
    
    return id;
  }

  // Generate emotional soundscape based on user state
  generateEmotionalSoundscape(emotion, intensity = 0.5, duration = 10000) {
    if (!this.isInitialized || !this.emotionalSynthesis[emotion]) return;
    
    const params = this.emotionalSynthesis[emotion];
    const oscillators = [];
    const gains = [];
    
    params.frequencies.forEach((freq, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      // Configure oscillator
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      // Configure filter for emotional character
      filter.type = params.filter;
      filter.frequency.value = freq * 2;
      filter.Q.value = params.resonance;
      
      // ADSR envelope
      const now = this.audioContext.currentTime;
      const attack = params.attack * intensity;
      const decay = params.decay * intensity;
      const sustain = params.sustain;
      const release = params.release * intensity;
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(intensity * 0.1, now + attack);
      gain.gain.linearRampToValueAtTime(sustain * intensity * 0.1, now + attack + decay);
      gain.gain.setValueAtTime(sustain * intensity * 0.1, now + duration/1000 - release);
      gain.gain.linearRampToValueAtTime(0, now + duration/1000);
      
      // Connect audio graph
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      // Start and schedule stop
      osc.start(now);
      osc.stop(now + duration / 1000);
      
      oscillators.push(osc);
      gains.push(gain);
    });
    
    const id = `emotion_${emotion}_${Date.now()}`;
    this.activeOscillators.set(id, oscillators);
    
    setTimeout(() => {
      this.activeOscillators.delete(id);
    }, duration);
    
    return id;
  }

  // Generate nature sounds with spatial positioning
  generateNatureSounds(type, position = { x: 0, y: 0, z: 0 }, intensity = 0.5) {
    if (!this.isInitialized) return;
    
    const natureGenerators = {
      ocean: () => this.generateOceanWaves(intensity),
      wind: () => this.generateWindSounds(intensity),
      rain: () => this.generateRainSounds(intensity),
      birds: () => this.generateBirdSounds(intensity),
      forest: () => this.generateForestAmbience(intensity)
    };
    
    if (!natureGenerators[type]) {
      console.warn(`Unknown nature sound type: ${type}`);
      return;
    }
    
    const source = natureGenerators[type]();
    
    // Add spatial positioning
    const panner = this.audioContext.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    
    panner.positionX.value = position.x;
    panner.positionY.value = position.y;
    panner.positionZ.value = position.z;
    
    source.connect(panner);
    panner.connect(this.masterGain);
    
    const id = `nature_${type}_${Date.now()}`;
    this.spatialAudio.panners.set(id, panner);
    
    return id;
  }

  // Ocean wave generation using filtered noise
  generateOceanWaves(intensity) {
    const bufferSize = this.audioContext.sampleRate * 4; // 4 seconds
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate pink noise for ocean base
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() - 0.5) * intensity;
    }
    
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    
    // Filter to shape ocean sound
    const lowpass = this.audioContext.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 300 + intensity * 200;
    lowpass.Q.value = 0.5;
    
    const gain = this.audioContext.createGain();
    gain.gain.value = intensity * 0.3;
    
    source.connect(lowpass);
    lowpass.connect(gain);
    
    source.start();
    
    return gain;
  }

  // Breathing-synchronized audio guidance
  generateBreathingGuide(breathingPattern = 'box', duration = 300000) { // 5 minutes default
    if (!this.isInitialized) return;
    
    const patterns = {
      box: { inhale: 4, hold: 4, exhale: 4, pause: 4 },
      relaxing: { inhale: 4, hold: 2, exhale: 6, pause: 2 },
      energizing: { inhale: 6, hold: 2, exhale: 4, pause: 2 },
      therapeutic: { inhale: 4, hold: 7, exhale: 8, pause: 1 }
    };
    
    const pattern = patterns[breathingPattern] || patterns.box;
    const totalCycle = pattern.inhale + pattern.hold + pattern.exhale + pattern.pause;
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.frequency.value = this.healingFrequencies.heart; // Heart chakra frequency
    osc.type = 'sine';
    
    const now = this.audioContext.currentTime;
    const cycleTime = totalCycle; // Each second represents one count
    const cycles = Math.floor(duration / 1000 / cycleTime);
    
    // Create breathing pattern envelope
    for (let cycle = 0; cycle < cycles; cycle++) {
      const cycleStart = now + cycle * cycleTime;
      
      // Inhale phase
      gain.gain.setValueAtTime(0.05, cycleStart);
      gain.gain.linearRampToValueAtTime(0.2, cycleStart + pattern.inhale);
      
      // Hold phase
      gain.gain.setValueAtTime(0.2, cycleStart + pattern.inhale + pattern.hold);
      
      // Exhale phase
      gain.gain.linearRampToValueAtTime(0.05, cycleStart + pattern.inhale + pattern.hold + pattern.exhale);
      
      // Pause phase
      gain.gain.setValueAtTime(0.05, cycleStart + totalCycle);
    }
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + duration / 1000);
    
    const id = `breathing_guide_${Date.now()}`;
    this.activeOscillators.set(id, [osc]);
    
    setTimeout(() => {
      this.activeOscillators.delete(id);
    }, duration);
    
    return id;
  }

  // Update spatial audio based on user movement/camera position
  updateSpatialAudio(position, orientation) {
    if (!this.spatialAudio.listener) return;
    
    // Update listener position
    this.spatialAudio.listener.positionX.value = position.x;
    this.spatialAudio.listener.positionY.value = position.y;
    this.spatialAudio.listener.positionZ.value = position.z;
    
    // Update listener orientation
    this.spatialAudio.listener.forwardX.value = orientation.forward.x;
    this.spatialAudio.listener.forwardY.value = orientation.forward.y;
    this.spatialAudio.listener.forwardZ.value = orientation.forward.z;
    this.spatialAudio.listener.upX.value = orientation.up.x;
    this.spatialAudio.listener.upY.value = orientation.up.y;
    this.spatialAudio.listener.upZ.value = orientation.up.z;
  }

  // Adaptive volume based on stress levels
  adaptVolumeToStress(stressLevel) {
    if (!this.masterGain) return;
    
    // Higher stress = lower volume for calming effect
    const targetVolume = Math.max(0.1, 0.5 - stressLevel * 0.3);
    const now = this.audioContext.currentTime;
    
    this.masterGain.gain.linearRampToValueAtTime(targetVolume, now + 2.0);
  }

  // Stop specific audio by ID
  stopAudio(id) {
    if (this.activeOscillators.has(id)) {
      const oscillators = this.activeOscillators.get(id);
      const now = this.audioContext.currentTime;
      
      oscillators.forEach(osc => {
        try {
          osc.stop(now);
        } catch (e) {
          // Oscillator already stopped
        }
      });
      
      this.activeOscillators.delete(id);
    }
  }

  // Stop all audio
  stopAllAudio() {
    this.activeOscillators.forEach((oscillators, id) => {
      this.stopAudio(id);
    });
  }

  // Master volume control
  setMasterVolume(volume) {
    if (this.masterGain) {
      const now = this.audioContext.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(
        Math.max(0, Math.min(1, volume)), 
        now + 0.5
      );
    }
  }

  // Get audio context time for synchronization
  getCurrentTime() {
    return this.audioContext ? this.audioContext.currentTime : 0;
  }

  // Clean up resources
  dispose() {
    this.stopAllAudio();
    
    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach(track => track.stop());
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    this.isInitialized = false;
  }
}

// Export singleton instance
export const audioEngine = new TherapeuticAudioEngine();