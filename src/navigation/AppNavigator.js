import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/Afterlogin/SplashScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{ 
        headerShown: false,
        animation: 'fade' 
      }}
    >
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ 
          gestureEnabled: false 
        }}
      />
      <Stack.Screen 
        name="Main" 
        component={MainNavigator} 
      />
    </Stack.Navigator>
  );
}