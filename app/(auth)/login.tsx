import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { CustomWalletIcon, CustomDiscountIcon, CustomDisconnectIcon, CustomCupIcon } from '../../components/icons';
import { User, Phone, Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors } from '../../lib/colors';

export default function Login() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 8, gap: 20 }}>
        <Text className="text-header">Header</Text>
        <Text className="text-title">title</Text>
        <Text className="text-regular text-gray-700">regular text </Text>

        <View className="flex-row gap-4 mb-2 items-center">
          <CustomWalletIcon size={24} />
          <CustomDiscountIcon size={24} />
          <CustomDisconnectIcon size={24} color={Colors.destructive} />
          <View className="bg-coffee-dark-primary  p-4 rounded-full justify-center items-center">
            <CustomCupIcon size={24} color={Colors.white} />
          </View>
        </View>

        <View className="w-full gap-4 max-w-[342px]">
          <Input
            placeholder="Full Name"
            leftIcon={<User size={20} color={Colors.muted} />}
          />
          <Input
            placeholder="Phone Number"
            keyboardType="phone-pad"
            leftIcon={<Phone size={20} color={Colors.muted} />}
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={Colors.muted} />}
          />
          <Input
            placeholder="Password"
            isPassword
            autoCapitalize="none"
            leftIcon={<Lock size={20} color={Colors.muted} />}
          />
        </View>

        <Button onPress={() => router.push('/(auth)/register')} className='bg-coffee-dark-primary'>
          Register
        </Button>

        <Button onPress={() => router.push('/(tabs)')}>
          Home
        </Button>
        <Button fullWidth>
          Order
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
