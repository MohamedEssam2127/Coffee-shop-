import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/button';
import Input from '../../components/ui/Input';
import { CustomWalletIcon, CustomDiscountIcon, CustomDisconnectIcon, CustomCupIcon } from '../../components/icons';
import { User, Phone, Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors } from '../../lib/colors';


const onPressLogin =() => {
  router.push('/(auth)/register');
}

export default function Login() {
  


  return (
    <SafeAreaView className="flex-1 bg-coffee-cream">
      <ScrollView contentContainerStyle={styles.container}>
       
       <View className=' bg-[#f3e7e1] px-5 py-8 gap-4'>
        <View className=''>
          <View className="bg-coffee-dark-primary  py-3 px-6 rounded-[12] justify-center items-center w-16">
            <CustomCupIcon size={24} color={Colors.white} />
          </View>
        </View>
        <View className=' gap-4'>
          <Text className="text-header">Welcome Back!</Text>
          <Text className="text-title">Sign in to continue your artisanal journey</Text>
        </View>
       </View>
        <View className=' gap-4 bg-coffee-cream flex-1 px-8'>

        <View>
          <View className="w-full gap-4 max-w-[342px]">
            <Text className='text-regular'>
              Email Address
            </Text>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={Colors.muted} />}
              />

            <Text className='text-regular'>
              password
            </Text>
            <Input
              placeholder="Password"
              isPassword
              autoCapitalize="none"
              leftIcon={<Lock size={20} color={Colors.muted} />}
              />
          </View>
        </View>
          <View className='flex-row justify-end  mb-5'>
        <Pressable>
          <Text className=' text-amber-800 text-end font-bold text-base'>
            Forgot Password?
          </Text>
        </Pressable>
        </View>
        <View>
          <Button dark onPress={onPressLogin} className='w-full '>
            Login
          </Button>
        </View>

        <View className='flex-row items-center gap-3'>
            <View className='flex-1 h-0.5 bg-coffee-300 '>
            </View>
              <Text className='text-regular text-gray-500'>
                OR LOGIN WITH
              </Text>
            <View className='flex-1 h-0.5 bg-coffee-300 '>
            </View>
        </View>

        <View className=' justify-center items-center flex-row gap-2'>
          <Text className='text-title'>
            Don't have an account?
          </Text>
          <Text className='text-title text-coffee-dark-primary'>
            Register
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
     flexGrow: 1, 
     justifyContent: 'center', 
     paddingVertical: 8,
      gap: 20
    }
})