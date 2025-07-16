import { Prayer } from 'adhan';
import moment from 'moment'; // <-- IMPORT THE FIX
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Countdown({ prayerTimes }) {
    const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0, name: '' });

    const prayerNameMap = {
        [Prayer.Fajr]: 'Subuh',
        [Prayer.Sunrise]: 'Terbit',
        [Prayer.Dhuhr]: 'Dzuhur',
        [Prayer.Asr]: 'Ashar',
        [Prayer.Maghrib]: 'Maghrib',
        [Prayer.Isha]: 'Isya',
        [Prayer.None]: 'Selesai'
    };

    useEffect(() => {
        if (!prayerTimes) return;

        const update = () => {
            const nextPrayer = prayerTimes.nextPrayer();
            if (nextPrayer === Prayer.None) {
                setCountdown({ name: prayerNameMap[nextPrayer] });
                return;
            }

            const diff = moment(prayerTimes.timeForPrayer(nextPrayer)).diff(moment());
            if (diff > 0) {
                const d = moment.duration(diff);
                setCountdown({
                    h: d.hours(), m: d.minutes(), s: d.seconds(),
                    name: prayerNameMap[nextPrayer]
                });
            }
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [prayerTimes]);

    if (countdown.name === 'Selesai') {
        return <Text style={styles.countdownText}>Waktu Sholat Hari Ini Selesai</Text>;
    }

    return (
        <Text style={styles.countdownText}>
            Menuju {countdown.name}: {String(countdown.h).padStart(2, '0')}:{String(countdown.m).padStart(2, '0')}:{String(countdown.s).padStart(2, '0')}
        </Text>
    );
};

const styles = StyleSheet.create({
    countdownText: {
        fontFamily: 'RobotoMono-Regular',
        fontSize: 22,
        color: '#FBBF24',
        marginTop: -10,
    },
});