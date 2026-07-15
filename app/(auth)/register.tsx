import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/button';
import Input from '../../components/ui/Input';
import { User, Phone, Mail, Lock, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors } from '../../lib/colors';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, IRegisterFormData } from '../../schemas/registerSchema';
import { register } from '../../services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuthStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitHandler = async (data: IRegisterFormData) => {
    setIsSubmitting(true);
    try {
      await register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });

      await login(data.email, data.password);

      router.replace('/(tabs)');
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Registration failed. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPressLogin = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF0EA]">
      <ScrollView contentContainerStyle={styles.container}>
        <View className="gap-4 px-5 py-8">
          <View>
            <Pressable
              onPress={() => router.back()}
              className="h-12 w-12 items-center justify-center rounded-full bg-white"
              style={{
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
              }}>
              <ArrowLeft size={24} color={Colors.primary} />
            </Pressable>
          </View>
          <View className="gap-4">
            <Text className="text-header">Create Account</Text>
            <Text className="text-title">
              Join our premium coffee community and enjoy exclusive artisanal brews.
            </Text>
          </View>
        </View>

        <View className="flex-1 justify-between px-8 py-6">
          <View className="w-full max-w-[342px] gap-4 self-center">
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Full Name"
                  autoCapitalize="words"
                  onChangeText={onChange}
                  value={value}
                  error={errors.fullName?.message}
                  leftIcon={<User size={20} color={Colors.muted} />}
                />
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                  error={errors.phoneNumber?.message}
                  leftIcon={<Phone size={20} color={Colors.muted} />}
                />
              )}
            />

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

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Password"
                  isPassword
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                  leftIcon={<Lock size={20} color={Colors.muted} />}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirm Password"
                  isPassword
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  error={errors.confirmPassword?.message}
                  leftIcon={<Lock size={20} color={Colors.muted} />}
                />
              )}
            />

            <View className="mt-2">
              <Text className="text-regular leading-5 text-gray-500">
                By clicking Register, you agree to our{' '}
                <Text className="font-bold text-amber-800">Terms of Service</Text> and{' '}
                <Text className="font-bold text-amber-800">Privacy Policy</Text>.
              </Text>
            </View>
          </View>

          <View className="mt-8 w-full max-w-[342px] gap-4 self-center">
            <Button
              dark
              onPress={handleSubmit(onSubmitHandler)}
              className="w-full"
              disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Register'}
            </Button>

            {errors.root && (
              <Text className="mt-2 text-center text-sm text-red-500">{errors.root.message}</Text>
            )}

            <View className="mt-4 flex-row items-center justify-center gap-2">
              <Text className="text-title">Already have an account?</Text>
              <Pressable onPress={onPressLogin}>
                <Text className="text-title text-coffee-dark-primary">Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 8,
  },
});
