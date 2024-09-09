import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen.js';
import QiblaScreen from './src/screens/QiblaScreen.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            title: 'Qibla Finder', // Buraya uygulamanızın adını yazın
            headerStyle: { backgroundColor: '#086d3d' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 35, // Başlık yazı tipi boyutunu ayarlayın
              fontWeight: 'bold', // İsteğe bağlı: Başlığı kalın yapar
            },
          }}
        />
        <Stack.Screen
          name="QiblaScreen"
          component={QiblaScreen}
          options={{
            title: 'Qibla Finder', // Buraya uygulamanızın adını yazın
            headerStyle: { backgroundColor: '#086d3d' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 40, // Başlık yazı tipi boyutunu ayarlayın
              fontWeight: 'bold', // İsteğe bağlı: Başlığı kalın yapar
            },
          
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
