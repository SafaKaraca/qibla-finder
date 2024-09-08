import { useState, useEffect } from 'react';
import { Magnetometer } from 'expo-sensors';

const useCompass = () => {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    // Manyetometre verilerini dinle ve yön açısını hesapla
    const subscription = Magnetometer.addListener((data) => {
      const { x, y } = data;

      // Açıyı hesaplama (cihazın yatay düzlemde tutulduğunu varsayar)
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      if (angle < 0) {
        angle += 360; // Açıyı 0-360 derece aralığında tut
      }

      setHeading(Math.round(angle));
    });

    // Dinlemeyi durdurma
    return () => {
      subscription.remove();
    };
  }, []);

  return heading;
};

export default useCompass;
