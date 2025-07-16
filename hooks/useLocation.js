import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useLocation() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Izin lokasi ditolak. Menggunakan lokasi default.');
                setLocation({ latitude: -6.986376, longitude: 110.396473, isDefault: true }); // Default: Semarang
                setIsLoading(false);
                return;
            }

            try {
                let locationData = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: locationData.coords.latitude,
                    longitude: locationData.coords.longitude,
                    isDefault: false,
                });
            } catch (e) {
                setError('Gagal mendapatkan lokasi. Menggunakan lokasi default.');
                setLocation({ latitude: -6.986376, longitude: 110.396473, isDefault: true });
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { location, error, isLoading };
}