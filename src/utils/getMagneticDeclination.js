import * as Location from 'expo-location';

export const getMagneticDeclination = async (latitude, longitude) => {
  try {
    const heading = await Location.getHeadingAsync();
    const { magHeading } = heading;
    return magHeading || 0; // Başarısız olursa 0 döndür
  } catch (error) {
    console.error('Manyetik deklinasyon hatası:', error);
    return 0; // Hata durumunda sapma değeri 0 kabul edilebilir
  }
};
