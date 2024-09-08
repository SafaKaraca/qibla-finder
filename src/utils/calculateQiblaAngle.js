export const calculateQiblaAngle = (latitude, longitude, declination) => {
    const MECCA_LAT = 21.4225; // Kâbe'nin enlemi
    const MECCA_LNG = 39.8262; // Kâbe'nin boylamı
  
    // Enlem ve boylamı radiana çevir
    const latRad = (latitude * Math.PI) / 180;
    const lngRad = (longitude * Math.PI) / 180;
    const meccaLatRad = (MECCA_LAT * Math.PI) / 180;
    const meccaLngRad = (MECCA_LNG * Math.PI) / 180;
  
    // Kıble açısını hesaplama
    const y = Math.sin(meccaLngRad - lngRad);
    const x =
      Math.cos(latRad) * Math.tan(meccaLatRad) -
      Math.sin(latRad) * Math.cos(meccaLngRad - lngRad);
  
    let qiblaAngle = Math.atan2(y, x) * (180 / Math.PI); // Açıya derece cinsinden
    qiblaAngle = (qiblaAngle + 360) % 360; // Açıyı 0-360 derece arasında tut
  
    // Manyetik sapmayı ekle
    return (qiblaAngle + declination) % 360;
  };
  