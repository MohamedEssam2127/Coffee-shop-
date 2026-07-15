import '@/lib/splash';
import '@/global.css';

import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useCallback, forwardRef } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/auth.store';
import { SPLASH_BG } from '@/lib/splash';

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

export { ErrorBoundary } from 'expo-router';

function BootSplash({ onReady }: { onReady: () => void }) {
  return (
    <View
      style={{ flex: 1, backgroundColor: SPLASH_BG, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onReady}
    >
      <Image
        source={require('../assets/images/splash-new.png')}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Sora: require('../assets/fonts/Sora-VariableFont_wght.ttf'),
  });

  const restoreSession = useAuthStore((state: any) => state.restoreSession);
  const isLoading = useAuthStore((state: any) => state.isLoading);

  const fontsReady = loaded || !!error;
  const appReady = fontsReady && !isLoading;

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const onBootSplashReady = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return <BootSplash onReady={onBootSplashReady} />;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: SPLASH_BG }}>
        <StatusBar />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FAEDE5' } }}>
          <Stack.Screen name="index" />
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
      </View>
      <PortalHost />
    </SafeAreaProvider>
  );
}
