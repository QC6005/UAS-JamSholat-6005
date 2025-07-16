/*
================================================================================
|                                                                              |
|   File: app/(tabs)/index.js (Home Screen)                                    |
|   -------------------------------------------------------------------------- |
|   Purpose: The main screen of the app.                                       |
|                                                                              |
|   FIX: Now uses a new state `isContentVisible` from the alarm hook to hide   |
|   all main content (not just the clock) when the adhan alarm is playing.     |
|   An icon is displayed as a placeholder when the content is hidden.          |
|                                                                              |
================================================================================
*/
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Clock from '../../components/Clock';
import Countdown from '../../components/Countdown';
import PrayerTimesList from '../../components/PrayerTimesList';
import { useAlarm } from '../../hooks/useAlarm';
import { usePrayerData } from '../../hooks/usePrayerData';

export default function HomeScreen() {
  const { 
    prayerTimes, 
    location, 
    error, 
    isLoading, 
    gregorianDate, 
    hijriDate 
  } = usePrayerData();

  const { isContentVisible, isAlarmPlaying, stopAlarm } = useAlarm(prayerTimes);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000ff" />
        <Text style={styles.loadingText}>Mencari lokasi dan menghitung...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        {isContentVisible ? (
            <>
                <Clock />
                {prayerTimes && <Countdown prayerTimes={prayerTimes} />}
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{gregorianDate}</Text>
                    <Text style={styles.hijriDateText}>{hijriDate}</Text>
                </View>
                {location && (
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>
                            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                            {location.isDefault && " (Default)"}
                        </Text>
                    </View>
                )}
                {prayerTimes ? (
                    <PrayerTimesList prayerTimes={prayerTimes} />
                ) : (
                    <Text style={styles.errorText}>Waktu sholat tidak dapat dihitung.</Text>
                )}
            </>
        ) : (
            <View style={styles.hiddenContentContainer}>
                <Ionicons name="volume-high-outline" size={80} color="#374151" />
            </View>
        )}

        {isAlarmPlaying && (
            <Pressable style={styles.silentButton} onPress={stopAlarm}>
                <Ionicons name="volume-mute-outline" size={24} color="white" />
                <Text style={styles.silentButtonText}>Hentikan</Text>
            </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#111827',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    hiddenContentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateContainer: {
        marginVertical: 15,
        alignItems: 'center',
    },
    dateText: {
        fontFamily: 'RobotoMono-Regular',
        fontSize: 20,
        color: '#FFF',
    },
    hijriDateText: {
        fontFamily: 'RobotoMono-Light',
        fontSize: 18,
        color: '#BDBDBD',
    },
    locationContainer: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        marginBottom: 20,
    },
    locationText: {
        fontFamily: 'RobotoMono-Regular',
        color: '#CCC',
    },
    errorText: {
        color: '#FF6B6B',
        textAlign: 'center',
        padding: 10,
    },
    loadingText: {
        marginTop: 10,
        color: '#000000ff',
        fontFamily: 'RobotoMono-Regular',
    },
    silentButton: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DC2626', // Red-600
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        elevation: 5,
    },
    silentButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'RobotoMono-Bold',
        marginLeft: 10,
    }
});