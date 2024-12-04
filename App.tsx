import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext, { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { colors } from './src/utility/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.maincolor}/>
        <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>

        <AppNavigator />
        </GestureHandlerRootView>

        </PaperProvider>
      </NavigationContainer>
      </AuthProvider>
  );
}
