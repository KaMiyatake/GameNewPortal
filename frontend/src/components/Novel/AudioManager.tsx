// src/components/Novel/AudioManager.tsx（修正版）
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

interface AudioManagerProps {
  bgmSrc?: string;
  volume?: number;
  loop?: boolean;
  autoPlay?: boolean;
  fadeIn?: boolean;
  fadeDuration?: number;
}

export interface AudioManagerRef {
  playBGM: () => Promise<void>;
  stopBGM: () => void;
  fadeOutAndStop: () => void;
  immediateStop: () => void; // 即座停止用メソッドを追加
  isPlaying: boolean;
  isLoaded: boolean;
}

const AudioManager = forwardRef<AudioManagerRef, AudioManagerProps>(({
  bgmSrc,
  volume = 0.4,
  loop = true,
  autoPlay = false,
  fadeIn = true,
  fadeDuration = 3000
}, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !bgmSrc) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (autoPlay) {
        playBGM();
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error('BGM読み込みエラー:', e);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [bgmSrc]);

  const clearFadeInterval = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const playBGM = async (): Promise<void> => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    try {
      clearFadeInterval(); // 既存のフェード処理をクリア
      
      if (fadeIn) {
        setCurrentVolume(0);
        audio.volume = 0;
        await audio.play();
        fadeInAudio();
      } else {
        audio.volume = volume;
        setCurrentVolume(volume);
        await audio.play();
      }
      setIsPlaying(true);
    } catch (error) {
      console.error('BGM再生エラー:', error);
    }
  };

  const stopBGM = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeInterval(); // フェード処理をクリア
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentVolume(0);
  };

  // 即座に停止するメソッド（BGM OFFボタン用）
  const immediateStop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeInterval(); // フェード処理をクリア
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    setIsPlaying(false);
    setCurrentVolume(0);
  };

  const fadeInAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFadeInterval(); // 既存のフェード処理をクリア
    
    const targetVolume = volume;
    const steps = fadeDuration / 50;
    const volumeIncrement = targetVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (currentStep >= steps) {
        clearFadeInterval();
        audio.volume = targetVolume;
        setCurrentVolume(targetVolume);
        return;
      }

      const newVolume = Math.min(volumeIncrement * currentStep, targetVolume);
      audio.volume = newVolume;
      setCurrentVolume(newVolume);
      currentStep++;
    }, 50);
  };

  const fadeOutAndStop = () => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;

    clearFadeInterval(); // 既存のフェード処理をクリア
    
    const steps = fadeDuration / 50;
    const volumeDecrement = currentVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (currentStep >= steps) {
        clearFadeInterval();
        stopBGM();
        return;
      }

      const newVolume = Math.max(currentVolume - (volumeDecrement * currentStep), 0);
      audio.volume = newVolume;
      setCurrentVolume(newVolume);
      currentStep++;
    }, 50);
  };

  // 外部からアクセス可能なメソッドを公開
  useImperativeHandle(ref, () => ({
    playBGM,
    stopBGM,
    fadeOutAndStop,
    immediateStop,
    isPlaying,
    isLoaded
  }));

  // autoPlayの変更を監視
  useEffect(() => {
    if (autoPlay && isLoaded && !isPlaying) {
      playBGM();
    } else if (!autoPlay && isPlaying) {
      immediateStop(); // BGM OFFの時は即座に停止
    }
  }, [autoPlay, isLoaded]);

  // コンポーネントのクリーンアップ
  useEffect(() => {
    return () => {
      clearFadeInterval();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={bgmSrc}
      loop={loop}
      preload="auto"
      style={{ display: 'none' }}
    />
  );
});

AudioManager.displayName = 'AudioManager';

export default AudioManager;
