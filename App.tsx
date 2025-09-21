import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as ExpoSplashScreen from 'expo-splash-screen';

import AuthProvider from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';

// Prevent splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

const App = (): JSX.Element => {
  const [showSplash, setShowSplash] = useState(true);

  React.useEffect(() => {
    // Hide expo splash screen immediately
    ExpoSplashScreen.hideAsync();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onAnimationFinish={handleSplashFinish} />;
  }

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