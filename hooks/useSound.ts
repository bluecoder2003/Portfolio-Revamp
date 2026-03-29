'use client';

import { useCallback } from 'react';

type SoundType = 'click' | 'toggle' | 'success';

interface SoundConfig {
  frequency: number;
  duration: number;
  volume: number;
  type: 'sine' | 'square' | 'triangle';
}

const soundConfigs: Record<SoundType, SoundConfig> = {
  click: {
    frequency: 800,
    duration: 0.1,
    volume: 0.3,
    type: 'sine',
  },
  toggle: {
    frequency: 600,
    duration: 0.15,
    volume: 0.25,
    type: 'sine',
  },
  success: {
    frequency: 1000,
    duration: 0.2,
    volume: 0.3,
    type: 'sine',
  },
};

export const useSound = () => {
  const playSound = useCallback((soundType: SoundType = 'click') => {
    // Check if user has sound enabled (you can add a preference check here)
    if (typeof window === 'undefined') return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const config = soundConfigs[soundType];

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = config.type;
      oscillator.frequency.value = config.frequency;

      gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + config.duration
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + config.duration);
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }, []);

  return { playSound };
};
