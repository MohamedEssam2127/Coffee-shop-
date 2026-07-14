import { useAuthStore } from '@/store/auth.store';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {


    const isAuthenticated = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}