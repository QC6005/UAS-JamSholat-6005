import { Prayer } from 'adhan';
import moment from 'moment'; // <-- IMPORT THE FIX
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PrayerTimesList({ prayerTimes }) {
    const prayerNameMap = [
        { key: Prayer.Fajr, name: 'Subuh' },
        { key: Prayer.Sunrise, name: 'Terbit' },
        { key: Prayer.Dhuhr, name: 'Dzuhur' },
        { key: Prayer.Asr, name: 'Ashar' },
        { key: Prayer.Maghrib, name: 'Maghrib' },
        { key: Prayer.Isha, name: 'Isya' },
    ];

    const nextPrayer = prayerTimes.nextPrayer();

    return (
        <View style={styles.listContainer}>
            {prayerNameMap.map((prayer) => {
                const time = prayerTimes.timeForPrayer(prayer.key);
                const isNext = prayer.key === nextPrayer && prayer.key !== Prayer.Sunrise;

                return (
                    <View style={[styles.prayerRow, isNext && styles.highlightRow]} key={prayer.key}>
                        <Text style={[styles.prayerName, isNext && styles.highlightText]}>
                            {prayer.name}
                        </Text>
                        <Text style={[styles.prayerTime, isNext && styles.highlightText]}>
                            {moment(time).format('HH:mm')}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 15,
        padding: 10,
    },
    prayerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    prayerName: {
        fontFamily: 'RobotoMono-Regular',
        fontSize: 20,
        color: '#FFF',
    },
    prayerTime: {
        fontFamily: 'RobotoMono-Bold',
        fontSize: 20,
        color: '#FFF',
    },
    highlightRow: {
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        borderRadius: 8,
    },
    highlightText: {
        color: '#FBBF24',
    },
});