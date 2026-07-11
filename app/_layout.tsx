import '@/global.css';

import { ThemeProvider } from 'expo-router/react-navigation';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const oldTextRender = (Text as any).render;
if (oldTextRender) {
  (Text as any).render = function (...args: any[]) {
    const origin = oldTextRender.apply(this, args);
    return {
      ...origin,
      props: {
        ...origin.props,
        style: [{ fontFamily: 'Sora' }, origin.props.style],
      },
    };
  };
}

const oldTextInputRender = (TextInput as any).render;
if (oldTextInputRender) {
  (TextInput as any).render = function (...args: any[]) {
    const origin = oldTextInputRender.apply(this, args);
    return {
      ...origin,
      props: {
        ...origin.props,
        style: [{ fontFamily: 'Sora' }, origin.props.style],
      },
    };
  };
}

SplashScreen.preventAutoHideAsync();

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Sora': require('../assets/fonts/Sora-VariableFont_wght.ttf'),
  });

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
      </Stack>

      <PortalHost />
    </SafeAreaProvider>
  );
}

