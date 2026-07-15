import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { Colors } from '../../lib/colors';
import { CartItem } from '../../store/cart.store';

interface OrderItemRowProps {
  item: CartItem;
  imageError: boolean;
  onImageError: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const OrderItemRow: React.FC<OrderItemRowProps> = ({
  item,
  imageError,
  onImageError,
  onDecrease,
  onIncrease,
}) => {
  const imageSource =
    item.product.image && !imageError
      ? { uri: item.product.image }
      : require('../../assets/images/notFoundImg.png');

  return (
    <View className="mb-6 flex-row items-center">
      <Image
        source={imageSource}
        className="mr-4 h-14 w-14 rounded-2xl bg-coffee-100"
        onError={onImageError}
      />
      <View className="flex-1">
        <Text className="text-[16px] font-bold text-coffee-dark" numberOfLines={1}>
          {item.product.name}
        </Text>
        <Text className="text-[12px] text-coffee-dark/70">Size: {item.size}</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={onDecrease}
          className="h-7 w-7 items-center justify-center rounded-full border border-border">
          <Minus size={16} color={Colors.primary900} />
        </Pressable>
        <Text className="text-[14px] font-bold text-coffee-dark">{item.quantity}</Text>
        <Pressable
          onPress={onIncrease}
          className="h-7 w-7 items-center justify-center rounded-full border border-border bg-white shadow-sm">
          <Plus size={16} color={Colors.primary900} />
        </Pressable>
      </View>
    </View>
  );
};
