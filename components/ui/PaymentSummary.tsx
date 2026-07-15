import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { CustomDiscountIcon } from '../icons';
import { Colors } from '../../lib/colors';

interface PaymentSummaryProps {
  cartSubtotal: number;
  deliveryType: 'deliver' | 'pickup';
  deliveryFee: number;
  discountedFee: number;
  onPressDiscount?: () => void;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  cartSubtotal,
  deliveryType,
  deliveryFee,
  discountedFee,
  onPressDiscount,
}) => {
  return (
    <View>
      <Pressable
        onPress={onPressDiscount}
        className="mb-6 flex-row items-center rounded-2xl border border-border bg-white p-4 shadow-sm">
        <CustomDiscountIcon size={24} color={Colors.primary} />
        <Text className="ml-3 flex-1 text-[14px] font-semibold text-coffee-dark">
          1 Discount is Applied
        </Text>
        <ChevronRight size={20} color={Colors.primary900} />
      </Pressable>

      <Text className="mb-4 text-[16px] font-bold text-coffee-dark">Payment Summary</Text>
      <View className="mb-2 flex-row justify-between">
        <Text className="text-[14px] text-coffee-dark">Price</Text>
        <Text className="text-[14px] font-bold text-coffee-dark">
          ${cartSubtotal.toFixed(2)}
        </Text>
      </View>
      <View className="mb-8 flex-row justify-between">
        <Text className="text-[14px] text-coffee-dark">Delivery Fee</Text>
        {deliveryType === 'deliver' ? (
          <View className="flex-row items-center gap-2">
            <Text className="text-[14px] text-coffee-dark line-through">
              ${deliveryFee.toFixed(2)}
            </Text>
            <Text className="text-[14px] font-bold text-coffee-dark">
              ${discountedFee.toFixed(2)}
            </Text>
          </View>
        ) : (
          <Text className="text-[14px] font-bold text-coffee-dark">Free</Text>
        )}
      </View>
    </View>
  );
};
