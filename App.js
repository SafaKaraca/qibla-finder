import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen.js'; // SplashScreen yolunu doğru belirt
import QiblaScreen from './src/screens/QiblaScreen.js';  // QiblaScreen yolunu doğru belirt

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="QiblaScreen" component={QiblaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
