import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding1 from '../screens/onboarding/Onboarding1';
import Onboarding2 from '../screens/onboarding/Onboarding2';
import Onboarding3 from '../screens/onboarding/Onboarding3';
import LoginScreen from '../screens/onboarding/Login';
import { Provider as PaperProvider } from 'react-native-paper';
import SignUp from '../screens/onboarding/Signup';


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen  name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}/>
      <Stack.Screen  name="SignUp" 
          component={SignUp} 
          options={{ headerShown: false }}/>
      {/* <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} /> */}
    </Stack.Navigator>
  );
}
