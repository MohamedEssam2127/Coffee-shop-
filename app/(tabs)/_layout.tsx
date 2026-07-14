import { Redirect, Tabs } from 'expo-router';
import { CustomHomeIcon, CustomBagIcon, CustomProfileIcon } from '../../components/icons';
import { View } from 'react-native';
import { useAuthStore } from '@/store/auth.store';

export default function TabLayout() {

    const isAuthenticated = useAuthStore((state: { isAuthenticated: any; }) => state.isAuthenticated);

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
