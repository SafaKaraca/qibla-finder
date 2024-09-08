import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import useLocation from '../hooks/useLocation';
import { calculateQiblaAngle } from '../utils/calculateQiblaAngle';
import { getMagneticDeclination } from '../utils/getMagneticDeclination'; 

const QiblaScreen = () => {
  const [heading, setHeading] = useState(0);
  const { location, errorMsg } = useLocation();
  const [qiblaAngle, setQiblaAngle] = useState(null);
  const [declination, setDeclination] = useState(0);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      // Manyetik sapmayı al
      getMagneticDeclination(latitude, longitude).then((declination) => {
        setDeclination(declination);
        const angle = calculateQiblaAngle(latitude, longitude, declination);
        setQiblaAngle(angle);
      });
    }
  }, [location]);

  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      const { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      if (angle < 0) {
        angle += 360; // Açıyı 0-360 arasında tut
      }
      setHeading(Math.round(angle));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.directionText}>Kıble bu yönde</Text>
      <View style={styles.compassContainer}>
        {qiblaAngle !== null && (
          <Image
            source={require('../../assets/compass.png')}
            style={[styles.arrow, { transform: [{ rotate: `${qiblaAngle - heading}deg` }] }]}
          />
        )}
      </View>
      <Text style={styles.headingText}>Cihaz Yönü: {heading}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  directionText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  compassContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 125,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  arrow: {
    width: 120,
    height: 120,
  },
  headingText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default QiblaScreen;
