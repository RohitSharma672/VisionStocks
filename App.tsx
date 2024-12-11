import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {

  return (

      <NavigationContainer>
        <StatusBar backgroundColor={"black"}/>
        <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
        </GestureHandlerRootView>
        </PaperProvider>
      </NavigationContainer>
  );
}
