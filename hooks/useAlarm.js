/*
================================================================================
|                                                                              |
|   File: hooks/useAlarm.js                                                    |
|   -------------------------------------------------------------------------- |
|   Purpose: A dedicated hook to manage all alarm logic.                       |
|                                                                              |
|   FIX: Renamed `isClockVisible` to `isContentVisible` for clarity. This      |
|   state now controls the visibility of the entire home screen content,       |
|   not just the clock, during adhan playback.                                 |
|                                                                              |
================================================================================
*/
import { useIsFocused } from '@react-navigation/native';
import { isSameSecond } from 'date-fns';
import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { loadSettings } from '../lib/storage';

export function useAlarm(prayerTimes) {
    const [isContentVisible, setIsContentVisible] = useState(true);
    const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
    
    const beepSound = useRef(null);
    const fajrAdhanSound = useRef(null);
    const otherAdhanSound = useRef(null);
    const activeSound = useRef(null);
    const showContentTimeout = useRef(null);
    const triggeredPrayers = useRef(new Set());
    const isFocused = useIsFocused();

    useEffect(() => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: false,
        });

        const loadSounds = async () => {
            try {
                const beep = new Audio.Sound();
                await beep.loadAsync(require('../assets/sounds/beep.mp3'));
                beepSound.current = beep;

                const fajrAdhan = new Audio.Sound();
                await fajrAdhan.loadAsync(require('../assets/sounds/fajr_adhan.mp3'));
                fajrAdhanSound.current = fajrAdhan;

                const otherAdhan = new Audio.Sound();
                await otherAdhan.loadAsync(require('../assets/sounds/other_adhan.mp3'));
                otherAdhanSound.current = otherAdhan;

            } catch (error) {
                console.error("Failed to load sounds. Make sure the files exist in assets/sounds/", error);
            }
        };

        loadSounds();

        return () => {
            beepSound.current?.unloadAsync();
            fajrAdhanSound.current?.unloadAsync();
            otherAdhanSound.current?.unloadAsync();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isAlarmPlaying) return;

            const settings = await loadSettings();
            if (!settings.alarmEnabled || !prayerTimes) return;

            const now = new Date();
            const prayerToCheck = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

            for (const prayer of prayerToCheck) {
                const prayerTime = prayerTimes[prayer];
                if (isSameSecond(now, prayerTime) && !triggeredPrayers.current.has(prayer)) {
                    triggeredPrayers.current.add(prayer);
                    playAlarmSequence(prayer);
                    
                    if (now.getHours() === 23 && now.getMinutes() === 59) {
                        triggeredPrayers.current.clear();
                    }
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [prayerTimes, isAlarmPlaying]);

    const handleAlarmFinish = () => {
        setIsContentVisible(true);
        setIsAlarmPlaying(false);
        activeSound.current = null;
        if (showContentTimeout.current) {
            clearTimeout(showContentTimeout.current);
        }
    };

    const stopAlarm = async () => {
        if (activeSound.current) {
            await activeSound.current.stopAsync();
        }
        handleAlarmFinish();
    };

    const playAlarmSequence = async (prayerName) => {
        try {
            if (!beepSound.current || !fajrAdhanSound.current || !otherAdhanSound.current) {
                return;
            }

            setIsAlarmPlaying(true);
            setIsContentVisible(false);
            
            activeSound.current = beepSound.current;
            
            beepSound.current.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    beepSound.current.setOnPlaybackStatusUpdate(null);
                    
                    const adhanToPlay = prayerName === 'fajr' ? fajrAdhanSound.current : otherAdhanSound.current;
                    activeSound.current = adhanToPlay;

                    adhanToPlay.setOnPlaybackStatusUpdate((status) => {
                        if (status.didJustFinish) {
                            adhanToPlay.setOnPlaybackStatusUpdate(null);
                            handleAlarmFinish();
                        }
                    });
                    
                    adhanToPlay.replayAsync();
                }
            });

            await beepSound.current.replayAsync();

            showContentTimeout.current = setTimeout(() => {
                handleAlarmFinish();
            }, 300000);

        } catch (error) {
            console.error("Error playing alarm sequence", error);
            handleAlarmFinish();
        }
    };

    return { isContentVisible, isAlarmPlaying, stopAlarm };
}