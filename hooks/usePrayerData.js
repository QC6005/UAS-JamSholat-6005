import { useIsFocused } from '@react-navigation/native';
import { CalculationMethod, CalculationParameters, Coordinates, Madhab, PrayerTimes } from 'adhan';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getHijriDate } from '../lib/hijri-calculator';
import { loadSettings } from '../lib/storage';
import { useLocation } from './useLocation';

export function usePrayerData() {   
    const { location, error: locationError, isLoading: isLocationLoading } = useLocation();
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [settings, setSettings] = useState(null);
    const [gregorianDate, setGregorianDate] = useState('');
    const [hijriDate, setHijriDate] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const getSettings = async () => {
                const loadedSettings = await loadSettings();
                setSettings(loadedSettings);
            };
            getSettings();
        }
    }, [isFocused]);

    useEffect(() => {
        if (location && settings && settings.calculationMethod) {
            const date = new Date();
            const coordinates = new Coordinates(location.latitude, location.longitude);
            
            let params;
            if (settings.calculationMethod === 'Kemenag') {
                params = new CalculationParameters('Kemenag');
                params.fajrAngle = 20;
                params.ishaAngle = 18;
            } else {
                switch (settings.calculationMethod) {
                    case 'MuslimWorldLeague':
                        params = CalculationMethod.MuslimWorldLeague();
                        break;
                    case 'Egyptian':
                        params = CalculationMethod.Egyptian();
                        break;
                    case 'MoonsightingCommittee':
                        params = CalculationMethod.MoonsightingCommittee();
                        break;
                    case 'NorthAmerica':
                        params = CalculationMethod.NorthAmerica();
                        break;
                    case 'UmmAlQura':
                        params = CalculationMethod.UmmAlQura();
                        break;
                    case 'Dubai':
                        params = CalculationMethod.Dubai();
                        break;
                    case 'Kuwait':
                        params = CalculationMethod.Kuwait();
                        break;
                    case 'Qatar':
                        params = CalculationMethod.Qatar();
                        break;
                    case 'Singapore':
                        params = CalculationMethod.Singapore();
                        break;
                    default:
                        params = CalculationMethod.MuslimWorldLeague();
                        break;
                }
            }
            
            params.madhab = settings.asr === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;
            
            const pt = new PrayerTimes(coordinates, date, params);

            // // --- FOR TESTING ALARM ---
            // // This will set the Dhuhr prayer time to 5 seconds from now.
            // const testDate = new Date();
            // testDate.setSeconds(testDate.getSeconds() + 5);
            // pt.dhuhr = testDate; 
            // // -------------------------

            setPrayerTimes(pt);

            // Set Formatted Dates using reliable methods
            setGregorianDate(moment(date).format('dddd, DD MMMM YYYY'));
            // Pass the adjustment value to the calculator
            setHijriDate(getHijriDate(date, settings.hijriAdjustment));
        }
    }, [location, settings]);

    return {
        prayerTimes,
        location,
        error: locationError,
        isLoading: isLocationLoading || !settings,
        gregorianDate,
        hijriDate,
    };
}