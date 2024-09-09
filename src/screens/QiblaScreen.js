import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const QiblaScreen = ({ route }) => {
  // route veya params null olabilir, güvenli kontrol yapıyoruz
  const { qiblaAngle = 0, distanceToKaaba = 0 } = route.params || {}; // Varsayılan değerler verdik
  const [heading, setHeading] = useState(0);

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

  return (
    <View style={styles.container}>
      <View style={styles.directionContainer}>
        <Text style={styles.directionText}>Kıble Bu Yönde</Text>
        {qiblaAngle !== null && (
          <Image
            source={require('../../assets/red_arrow.png')}
            style={[styles.smallArrow, { transform: [{ rotate: `${qiblaAngle - heading}deg` }] }]}
          />
        )}
      </View>
      <View style={styles.compassContainer}>
        {qiblaAngle !== null && (
          <Image
            source={require('../../assets/compass.png')}
            style={[styles.arrow, { transform: [{ rotate: `${qiblaAngle - heading}deg` }] }]}
          />
        )}
      </View>
      {distanceToKaaba !== null && (
        <Text style={styles.distanceText}>
          Kabe'ye olan kuşbakışı uzaklığınız: <Text style={styles.boldText}>{distanceToKaaba.toFixed(2)} km</Text>
        </Text>
      )}
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
  directionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  directionText: {
    fontSize: 35,
    fontWeight: 'bold',
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
    marginVertical: 100,
  },
  arrow: {
    width: 350,
    height: 350,
  },
  smallArrow: {
    width: 22,
    height: 22,
    tintColor: '#086d3d',
    marginLeft: 10,
  },
  distanceText: {
    fontSize: 25,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default QiblaScreen;
