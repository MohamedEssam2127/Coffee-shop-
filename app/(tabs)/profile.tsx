import { View, Text, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/button';
import { useEffect, useState } from 'react';
import { User, Phone, Mail, Lock, Camera, LogOut, CreditCard, MapPin } from 'lucide-react-native';
import { Colors } from '../../lib/colors';
import { userService } from '../../lib/userService';

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
};

const MOCK_USER = {
  fullName: 'Alex Thompson',
  email: 'alex.thompson@espresso.com',
  phone: '+1 234 567 8901',
};

export default function ProfileScreen() {
  const [form, setForm] = useState<ProfileForm>(MOCK_USER);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profile = await userService.getProfile();

        setForm({
          fullName: profile.fullName ?? MOCK_USER.fullName,
          email: profile.email ?? MOCK_USER.email,
          phone: profile.phoneNumber ?? MOCK_USER.phone,
        });
      } catch (requestError) {
        setError('Unable to load your profile right now. Showing your last saved details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const updatedProfile = await userService.updateProfile({
        fullName: form.fullName.trim(),
        phoneNumber: form.phone.trim(),
      });

      setForm((current) => ({
        ...current,
        fullName: updatedProfile.fullName ?? current.fullName,
        email: updatedProfile.email ?? current.email,
        phone: updatedProfile.phoneNumber ?? current.phone,
      }));
    } catch (requestError) {
      setError('Unable to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-coffee-cream px-5">
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text className="mt-4 text-[14px] text-muted">Loading your profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-coffee-cream">
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <View className="mb-8 mt-4 items-center">
          <View className="relative mb-4 h-24 w-24">
            <View className="h-full w-full overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
                className="h-full w-full"
              />
            </View>
            <Pressable
              className="absolute bottom-0 right-0 items-center justify-center rounded-full border-2 border-white bg-coffee-primary p-1.5"
              onPress={() => console.log('Open Image Picker')}>
              <Camera size={14} color="white" />
            </Pressable>
          </View>
          <Text className="font-sans text-xl font-bold text-coffee-dark">{form.fullName}</Text>
          <Text className="mt-1 text-sm text-muted">{form.email}</Text>
        </View>

        {error ? (
          <View className="mb-4 rounded-2xl border border-[#F1D2C4] bg-[#FFF4EE] px-4 py-3">
            <Text className="text-[13px] font-semibold text-coffee-dark">{error}</Text>
          </View>
        ) : null}

        <View className="mb-6">
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
            leftIcon={<User size={20} color={Colors.muted} />}
            containerClassName="mb-4"
          />
          <Input
            label="Phone Number"
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
            keyboardType="phone-pad"
            leftIcon={<Phone size={20} color={Colors.muted} />}
            containerClassName="mb-4"
          />
          <Input
            label="Email Address"
            value={form.email}
            editable={false}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={Colors.muted} />}
            containerClassName="mb-4"
            inputClassName="opacity-70"
          />
          <Input
            label="Password"
            value="password123"
            isPassword={true}
            leftIcon={<Lock size={20} color={Colors.muted} />}
            containerClassName="mb-6"
          />
        </View>

        <View className="mb-8 gap-4">
          <Button dark disabled={isSaving} onPress={handleSaveChanges}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>

          <Pressable
            className="w-full flex-row items-center justify-center rounded-[16px] border border-transparent bg-[#FAEDE5] py-4 active:opacity-80"
            onPress={() => console.log('Logout triggered')}>
            <LogOut size={20} color={Colors.primary900} />
            <Text className="ml-2 text-[16px] font-semibold text-coffee-dark-primary">Log Out</Text>
          </Pressable>
        </View>

        <View className="mb-8">
          <Text className="mb-4 text-[16px] font-bold text-coffee-dark">Quick Preferences</Text>
          <View className="flex-row gap-4">
            <Pressable className="flex-1 items-center rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <CreditCard size={24} color={Colors.muted} className="mb-2" />
              <Text className="text-center text-[12px] font-semibold text-coffee-dark">
                Payment Methods
              </Text>
            </Pressable>

            <Pressable className="flex-1 items-center rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <MapPin size={24} color={Colors.muted} className="mb-2" />
              <Text className="text-center text-[12px] font-semibold text-coffee-dark">
                Saved Addresses
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
