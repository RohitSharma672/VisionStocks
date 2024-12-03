import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext, { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { colors } from './src/utility/colors';
// import AuthContext from './src/components/screens/onboarding/context/AuthContext';
// import AppNavigator from './src/components/screens/onboarding/navigation/AppNavigator';
// import AppNavigator from './src/navigation/AppNavigator';
// import AuthContext from './src/context/AuthContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.maincolor}/>
        <PaperProvider>
        <AppNavigator />
        </PaperProvider>
      </NavigationContainer>
      </AuthProvider>
  //   <NavigationContainer>
  //     <AppNavigator />
  //   </NavigationContainer>
  // <AuthProvider> */}

  );
}
