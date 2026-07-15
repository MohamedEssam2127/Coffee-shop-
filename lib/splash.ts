import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';

export const SPLASH_BG = '#C67C4E';

SystemUI.setBackgroundColorAsync(SPLASH_BG);
SplashScreen.preventAutoHideAsync();
