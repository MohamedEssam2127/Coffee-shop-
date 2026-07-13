import { View, Text, ScrollView, StyleSheet, Pressable, PressableProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/button';
import Input from '../../components/ui/Input';
import {
  CustomWalletIcon,
  CustomDiscountIcon,
  CustomDisconnectIcon,
  CustomCupIcon,
} from '../../components/icons';
import { User, Phone, Mail, Lock } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors } from '../../lib/colors';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { IFormData } from '@/types/loginFormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '@/schemas/userSchema';

export default function Login() {
  const onSubmitHandler = (data: IFormData) => {
    console.log(`email: ${data.email}, password: ${data.password}`);
    router.replace('/(tabs)');
  };

  const onPressRegister = () => {
    router.push('/(auth)/register');
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    resolver: zodResolver(UserSchema),
  });

  return (
    <SafeAreaView className="flex-1 bg-coffee-cream">
      <ScrollView contentContainerStyle={styles.container}>
        <View className="gap-4 bg-[#f3e7e1] px-5 py-8">
          <View>
            <View className="w-16 items-center justify-center rounded-[12] bg-coffee-dark-primary px-6 py-3">
              <CustomCupIcon size={24} color={Colors.white} />
            </View>
          </View>
          <View className="gap-4">
            <Text className="text-header">Welcome Back!</Text>
            <Text className="text-title">Sign in to continue your artisanal journey</Text>
          </View>
        </View>
        <View className="flex-1 justify-between bg-coffee-cream px-8">
          <View>
            <View className="w-full max-w-[342px] gap-4">
              <Text className="text-regular">Email Address</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    error={errors.email?.message}
                    leftIcon={<Mail size={20} color={Colors.muted} />}
                  />
                )}
              />

              <Text className="text-regular">password</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Password"
                    isPassword
                    autoCapitalize="none"
                    onChangeText={onChange}
                    error={errors.password?.message}
                    value={value}
                    leftIcon={<Lock size={20} color={Colors.muted} />}
                  />
                )}
              />
            </View>

            <View className="my-5 flex-row justify-end">
              <Pressable>
                <Text className="text-end text-base font-bold text-amber-800">
                  Forgot Password?
                </Text>
              </Pressable>
            </View>

            <View>
              <Button dark onPress={handleSubmit(onSubmitHandler)} className="w-full">
                Login
              </Button>
            </View>
          </View>

          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-title">Don't have an account?</Text>
            <Pressable onPress={onPressRegister}>
              <Text className="text-title text-coffee-dark-primary">Register</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 20,
  },
});
