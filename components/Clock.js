import moment from 'moment'; // <-- IMPORT THE FIX
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Clock() {
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(moment()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <View style={styles.clockContainer}>
            <Text style={styles.clockText}>{currentTime.format('HH:mm')}</Text>
            <Text style={styles.secondsText}>{currentTime.format('ss')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    clockContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    clockText: {
        fontFamily: 'RobotoMono-Light',
        fontSize: 80,
        color: '#FFF',
        letterSpacing: 2,
    },
    secondsText: {
        fontFamily: 'RobotoMono-Light',
        fontSize: 30,
        color: '#FFF',
        marginLeft: 8,
    },
});