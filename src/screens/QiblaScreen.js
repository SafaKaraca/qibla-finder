import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Magnetometer, Accelerometer } from 'expo-sensors';

const QiblaScreen = ({ route }) => {
  const { qiblaAngle = 0, distanceToKaaba = 0 } = route.params || {};
  const [heading, setHeading] = useState(0);
  const [isFlat, setIsFlat] = useState(true); // Cihazın yatay pozisyonda olup olmadığını kontrol etmek için

  useEffect(() => {
    let magnetometerSubscription = null;
    let accelerometerSubscription = null;

    const startSensors = () => {
      // Manyetometre verilerini alıyoruz
      magnetometerSubscription = Magnetometer.addListener((data) => {
        const { x, y } = data;
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        if (angle < 0) {
          angle += 360; 
        }
        if (isFlat) { // Sadece cihaz yatay konumdaysa açıyı güncelle
          setHeading(Math.round(angle));
        }
      });

      // Accelerometer ile cihazın eğimini kontrol ediyoruz
      accelerometerSubscription = Accelerometer.addListener((data) => {
        const { x, y, z } = data;
        const pitch = Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);
        const roll = Math.atan2(y, Math.sqrt(x * x + z * z)) * (180 / Math.PI);

        // Cihazın yatay olup olmadığını kontrol et (pitch ve roll 30 derece sınırında)
        if (Math.abs(pitch) < 30 && Math.abs(roll) < 30) {
          setIsFlat(true); // Cihaz yatay pozisyonda
        } else {
          setIsFlat(false); // Cihaz yatay değil
        }
      });
    };

    startSensors();

    return () => {
      if (magnetometerSubscription) {
        magnetometerSubscription.remove();
      }
      if (accelerometerSubscription) {
        accelerometerSubscription.remove();
      }
    };
  }, [isFlat]);

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
       <View style={styles.infoContainer}>
        <Text style={styles.infoText}>En doğru sonuç için cihazınızı düz bir zemine, yatay bir şekilde bırakın.</Text>
       </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  directionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50,
  },
  directionText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  compassContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 125,
    marginTop: 50,
    marginBottom: 100,
    },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  infoText: {
    fontSize: 15,
    color: '#086d3d',
    textAlign: 'center',
  },
});

export default QiblaScreen;
