import '@/global.css';

import { ThemeProvider } from 'expo-router/react-navigation';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, forwardRef } from 'react';
import { Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/auth.store';

const ReactNative = require('react-native');
const OriginalText = ReactNative.Text;
const OriginalTextInput = ReactNative.TextInput;

const CustomText = forwardRef((props: any, ref: any) => {
  return React.createElement(OriginalText, {
    ...props,
    style: [{ fontFamily: 'Sora' }, props.style],
    ref,
  });
});
Object.setPrototypeOf(CustomText, OriginalText);

const CustomTextInput = forwardRef((props: any, ref: any) => {
  return React.createElement(OriginalTextInput, {
    ...props,
    style: [{ fontFamily: 'Sora' }, props.style],
    ref,
  });
});
Object.setPrototypeOf(CustomTextInput, OriginalTextInput);

Object.defineProperty(ReactNative, 'Text', {
  configurable: true,
  get() {
    return CustomText;
  },
});

Object.defineProperty(ReactNative, 'TextInput', {
  configurable: true,
  get() {
    return CustomTextInput;
  },
});

SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Sora: require('../assets/fonts/Sora-VariableFont_wght.ttf'),
  });

  const restoreSession = useAuthStore((state: { restoreSession: any; }) => state.restoreSession);
  const isLoading = useAuthStore((state: { isLoading: any; }) => state.isLoading);


    useEffect(() => {
    restoreSession().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar />
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="details"
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: { fontFamily: 'Sora', fontSize: 20, fontWeight: '700' },
          }}
        />
      </Stack>

      <PortalHost />
    </SafeAreaProvider>
  );
}
