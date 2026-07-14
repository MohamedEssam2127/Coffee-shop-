import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Star, Plus } from 'lucide-react-native';
import Product from '@/constants/productType';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddPress?: () => void;
}

export default function ProductCard({
  product,
  onPress,
  onAddPress,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageSource = (product.image && !imageError)
    ? { uri: product.image }
    : require('@/assets/images/notFoundImg.png');

  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-[16px] p-2.5 mb-4 w-[47%] shadow-sm shadow-black/5 active:opacity-95"
    >
      {/* Product Image & Rating */}
      <View className="relative w-full h-[120px] rounded-[16px] overflow-hidden mb-3">
        <Image
          source={imageSource}
          className="w-full h-full"
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
        <View className="absolute top-0 right-0 bg-black/40 flex-row items-center px-2.5 py-1 rounded-bl-[16px] justify-center">
          <Star size={10} color="#FBBE21" fill="#FBBE21" className="mr-1" />
          <Text className="text-12-semibold text-white ml-0.5 leading-none">
            {product.rating}
          </Text>
        </View>
      </View>

      {/* Product Info */}
      <Text className="text-16-semibold text-[#313131] mb-1 px-1" numberOfLines={1}>
        {product.name}
      </Text>
      <Text className="text-12-semibold text-gray-400 mb-3 px-1" numberOfLines={1}>
        {product.category?.name || ''}
      </Text>

      {/* Price and Add Button */}
      <View className="flex-row items-center justify-between px-1 mb-1">
        <Text className="text-[18px] font-bold text-[#313131]">
          ${product.price}
        </Text>
        <Pressable
          onPress={onAddPress}
          className="bg-coffee-primary w-8 h-8 items-center justify-center rounded-[10px] active:scale-95"
        >
          <Plus size={16} color="white" />
        </Pressable>
      </View>
    </Pressable>
  );
}
