import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  CustomHomeIcon,
  CustomBagIcon,
  CustomProfileIcon,
  CustomSearchIcon, 
  CustomMilkIcon, 
  CustomDeliveryIcon, 
  CustomCoffeeIcon 
} from '../../components/icons';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-[#F9F2ED]">
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 8, gap: 24 }}>
      <Text className="text-16-semibold text-coffee-dark">Custom Coffee Shop Icons</Text>
      {/* Static Icons Section */}
      <View className="w-full max-w-md bg-white p-4 rounded-16px shadow-sm gap-3">
        <Text className="text-14-semibold text-coffee-dark border-b border-coffee-light pb-2">Static Icons</Text>
        <View className="flex-row gap-4 flex-wrap justify-center items-center">
          <View className="items-center p-3 bg-coffee-primary rounded-16px shadow-sm min-w-[100px]">
            <Text className="text-12-semibold text-white mb-2">Search</Text>
            <CustomSearchIcon />
          </View>

          <View className="items-center p-3 bg-coffee-cream rounded-16px shadow-sm min-w-[100px]">
            <Text className="text-12-semibold text-coffee-dark mb-2">Milk</Text>
            <CustomMilkIcon color="#C67C4E" />
          </View>

          <View className="items-center p-3 bg-coffee-cream rounded-16px shadow-sm min-w-[100px]">
            <Text className="text-12-semibold text-coffee-dark mb-2">Delivery</Text>
            <CustomDeliveryIcon color="#C67C4E" />
          </View>

          <View className="items-center p-3 bg-coffee-cream rounded-16px shadow-sm min-w-[100px]">
            <Text className="text-12-semibold text-coffee-dark mb-2">Coffee</Text>
            <CustomCoffeeIcon color="#C67C4E" />
          </View>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
