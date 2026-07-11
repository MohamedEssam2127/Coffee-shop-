import { Tabs } from 'expo-router';
import { CustomHomeIcon, CustomBagIcon, CustomProfileIcon } from '../../components/icons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: true, 
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
