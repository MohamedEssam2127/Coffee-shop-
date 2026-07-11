import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Orders() {
  return (
    <SafeAreaView className="flex-1 bg-[#F9F2ED]">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 8 }}>
        <Text>Orders Page</Text>
      </View>
    </SafeAreaView>
  );
}