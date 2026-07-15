import { Redirect, Tabs, useRouter } from 'expo-router';
import { CustomHomeIcon, CustomBagIcon, CustomProfileIcon, CustomHistoryIcon } from '../../components/icons';
import { View } from 'react-native';
import { useAuthStore } from '@/store/auth.store';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export default function TabLayout() {

  const isAuthenticated = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated);
  const router = useRouter();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data?.orderId
    ) {
      router.push('/(tabs)/history');
    }
  }, [lastNotificationResponse, router]);

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, 
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#C67C4E',
        tabBarInactiveTintColor: '#A3A3A3',
        tabBarShowLabel: false,
      }} 
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <CustomHomeIcon color={color as string} focused={focused} />
              {focused && (
                <View style={{ width: 10, height: 4, backgroundColor: '#C67C4E', borderRadius: 2, marginTop: 4 }} />
              )}
            </View>
          )
        }}  
      />
      <Tabs.Screen 
        name="orders" 
        options={{ 
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <CustomBagIcon color={color as string} focused={focused} />
              {focused && (
                <View style={{ width: 10, height: 4, backgroundColor: '#C67C4E', borderRadius: 2, marginTop: 4 }} />
              )}
            </View>
          )
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{ 
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <CustomHistoryIcon color={color as string} focused={focused} />
              {focused && (
                <View style={{ width: 10, height: 4, backgroundColor: '#C67C4E', borderRadius: 2, marginTop: 4 }} />
              )}
            </View>
          )
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <CustomProfileIcon color={color as string} focused={focused} />
              {focused && (
                <View style={{ width: 10, height: 4, backgroundColor: '#C67C4E', borderRadius: 2, marginTop: 4 }} />
              )}
            </View>
          )
        }} 
      />
    </Tabs>
  );
}
