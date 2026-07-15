import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrderHistoryStore, OrderRecord } from '@/store/orderHistory.store';
import { Clock, CheckCircle2, Coffee, Trash2 } from 'lucide-react-native';
import { Colors } from '@/lib/colors';
import { router } from 'expo-router';

export default function HistoryScreen() {
  const { orders, clearHistory } = useOrderHistoryStore();

  const getStatusBadge = (status: OrderRecord['status']) => {
    if (status === 'preparing') {
      return (
        <View className="flex-row items-center bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200">
          <Clock size={14} color="#C2410C" />
          <Text className="text-orange-700 font-semibold text-xs ml-1.5 uppercase">Preparing</Text>
        </View>
      );
    }
    return (
      <View className="flex-row items-center bg-green-100 px-3 py-1.5 rounded-full border border-green-200">
        <CheckCircle2 size={14} color="#15803D" />
        <Text className="text-green-700 font-semibold text-xs ml-1.5 uppercase">Done</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-coffee-cream">
      <View className="px-5 pt-6 pb-4 flex-row items-center justify-between">
        <Text className="text-[24px] font-bold text-coffee-dark">Order History</Text>
        {orders.length > 0 && (
          <Pressable onPress={clearHistory} className="p-2 rounded-full bg-red-50">
            <Trash2 size={20} color="#DC2626" />
          </Pressable>
        )}
      </View>

      {orders.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6 shadow-sm border border-[#EAEAEA]">
            <Coffee size={40} color={Colors.primary} />
          </View>
          <Text className="text-xl font-bold text-coffee-dark mb-2">No past orders</Text>
          <Text className="text-center text-coffee-dark/60">
            Your recent coffee orders will appear here. Start a new order to fill this up!
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)')}
            className="mt-8 bg-coffee-primary px-8 py-3.5 rounded-2xl shadow-sm"
          >
            <Text className="text-white font-bold text-base">Browse Menu</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
          {orders.map((order) => (
            <View
              key={order.id}
              className="bg-white p-4 rounded-[20px] mb-4 border border-[#EAEAEA]"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center justify-between mb-3 border-b border-[#F5F5F5] pb-3">
                <View>
                  <Text className="font-semibold text-coffee-dark text-sm">
                    Order #{order.id.slice(-5)}
                  </Text>
                  <Text className="text-coffee-dark/50 text-xs mt-1">
                    {new Date(order.createdAt).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                {getStatusBadge(order.status)}
              </View>

              <View className="mb-3">
                {order.items.map((item, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <View className="w-6 h-6 bg-[#FAEDE5] rounded-md items-center justify-center mr-3">
                      <Text className="text-coffee-primary font-bold text-xs">{item.quantity}x</Text>
                    </View>
                    <Text className="text-coffee-dark text-sm flex-1">{item.product.name}</Text>
                    <Text className="font-medium text-coffee-dark text-sm">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="flex-row items-center justify-between pt-3 border-t border-[#F5F5F5]">
                <Text className="text-coffee-dark/70 font-medium text-sm">Total</Text>
                <Text className="text-coffee-primary font-bold text-lg">
                  ${order.totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
