import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Register() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, paddingHorizontal: 24, paddingVertical: 8 }}>
        <Text>Register Page</Text>
        <Link href="/(auth)/login">Go to Login</Link>
      </View>
    </SafeAreaView>
  );
}