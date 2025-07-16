import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { PRAYER_METHODS } from '../../constants/PrayerMethods';
import { loadSettings, saveSettings } from '../../lib/storage';

export default function SettingsScreen() {
    const [method, setMethod] = useState('Kemenag');
    const [asr, setAsr] = useState('standard');
    const [hijriAdjustment, setHijriAdjustment] = useState(0);
    const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);

    useEffect(() => {
        const getSettings = async () => {
            const settings = await loadSettings();
            setMethod(settings.calculationMethod);
            setAsr(settings.asr);
            setHijriAdjustment(settings.hijriAdjustment);
            setIsAlarmEnabled(settings.alarmEnabled);
        };
        getSettings();
    }, []);

    const handleMethodChange = async (newMethod) => {
        setMethod(newMethod);
        const currentSettings = await loadSettings();
        await saveSettings({ ...currentSettings, calculationMethod: newMethod });
    };

    const handleAsrChange = async (newAsr) => {
        setAsr(newAsr);
        const currentSettings = await loadSettings();
        await saveSettings({ ...currentSettings, asr: newAsr });
    };

    const handleAdjustmentChange = async (adjustment) => {
        const newAdjustment = Math.max(-2, Math.min(2, adjustment)); // Clamp between -2 and 2
        setHijriAdjustment(newAdjustment);
        const currentSettings = await loadSettings();
        await saveSettings({ ...currentSettings, hijriAdjustment: newAdjustment });
    };

    const handleAlarmToggle = async (value) => {
        setIsAlarmEnabled(value);
        const currentSettings = await loadSettings();
        await saveSettings({ ...currentSettings, alarmEnabled: value });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>Pengaturan</Text>

                <View style={styles.alarmRow}>
                    <Text style={styles.label}>Alarm Adzan</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isAlarmEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={handleAlarmToggle}
                        value={isAlarmEnabled}
                    />
                </View>

                <View style={styles.settingRow}>
                    <Text style={styles.label}>Metode Perhitungan</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={method}
                            onValueChange={handleMethodChange}
                            style={styles.picker}
                            dropdownIconColor="#FFF"
                        >
                            {PRAYER_METHODS.map(m => (
                                <Picker.Item key={m.id} label={m.name} value={m.id} color="#000" />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.settingRow}>
                    <Text style={styles.label}>Mazhab Asar</Text>
                     <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={asr}
                            onValueChange={handleAsrChange}
                            style={styles.picker}
                            dropdownIconColor="#FFF"
                        >
                            <Picker.Item label="Standar (Shafi'i, Maliki, Hanbali)" value="standard" color="#000" />
                            <Picker.Item label="Hanafi" value="hanafi" color="#000" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.settingRow}>
                    <Text style={styles.label}>Penyesuaian Tanggal Hijriah</Text>
                    <View style={styles.adjustmentContainer}>
                        <Pressable onPress={() => handleAdjustmentChange(hijriAdjustment - 1)} style={styles.adjButton}>
                            <Text style={styles.adjButtonText}>-</Text>
                        </Pressable>
                        <Text style={styles.adjValueText}>
                            {hijriAdjustment > 0 ? `+${hijriAdjustment}` : hijriAdjustment}
                        </Text>
                        <Pressable onPress={() => handleAdjustmentChange(hijriAdjustment + 1)} style={styles.adjButton}>
                            <Text style={styles.adjButtonText}>+</Text>
                        </Pressable>
                    </View>
                </View>

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
        padding: 20,
    },
    header: {
        fontFamily: 'RobotoMono-Bold',
        fontSize: 32,
        color: '#FFF',
        marginBottom: 30,
    },
    settingRow: {
        marginBottom: 25,
    },
    alarmRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingBottom: 10, // Add some padding for visual separation
    },
    label: {
        fontFamily: 'RobotoMono-Regular',
        fontSize: 18,
        color: '#D1D5DB',
    },
    pickerContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginTop: 10,
    },
    picker: {
        color: '#000',
    },
    adjustmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#374151',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    adjButton: {
        backgroundColor: '#4B5563',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    adjButtonText: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'RobotoMono-Bold',
    },
    adjValueText: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'RobotoMono-Bold',
        marginHorizontal: 40,
    }
});