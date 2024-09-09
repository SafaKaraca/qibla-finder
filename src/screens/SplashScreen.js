import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { calculateQiblaAngle } from '../utils/calculateQiblaAngle';
import { getMagneticDeclination } from '../utils/getMagneticDeclination';
import { calculateDistance } from '../utils/calculateDistance';
import useLocation from '../hooks/useLocation';
import { KAABA_COORDINATES } from '../utils/constants';

const SplashScreen = ({ navigation }) => {
  const { location } = useLocation();
  const [qiblaAngle, setQiblaAngle] = useState(null);
  const [distanceToKaaba, setDistanceToKaaba] = useState(null);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;

      getMagneticDeclination(latitude, longitude).then((declination) => {
        const angle = calculateQiblaAngle(latitude, longitude, declination);
        setQiblaAngle(angle);
        const distance = calculateDistance(latitude, longitude, KAABA_COORDINATES.latitude, KAABA_COORDINATES.longitude);
        setDistanceToKaaba(distance);

        // Parametreleri doğruca gönderiyoruz
        navigation.replace('QiblaScreen', { qiblaAngle: angle, distanceToKaaba: distance });
      });
    }
  }, [location, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#086d3d" />
        <Text style={styles.loadingText}>Kıble yönü hesaplanıyor...</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.infoText}>En doğru sonuç için cihazınızı düz bir zemine, yatay bir şekilde bırakın.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#086d3d',
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    width: '100%', 
    alignItems: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#086d3d',
    marginHorizontal: 20,
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default SplashScreen;
