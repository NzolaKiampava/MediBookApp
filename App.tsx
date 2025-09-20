import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as SplashScreen from 'expo-splash-screen';

import AuthProvider from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const App = (): JSX.Element => {
  React.useEffect(() => {
    // Hide splash screen after app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;