import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface SizeSelectorProps {
  sizes?: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export default function SizeSelector({
  sizes = ['S', 'M', 'L'],
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  return (
    <View className="flex-row justify-between mt-3 gap-3">
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <Pressable
            key={size}
            onPress={() => onSelectSize(size)}
            className={`flex-1 py-3 items-center justify-center border rounded-xl active:scale-[0.98] ${
              isSelected
                ? 'border-coffee-primary bg-[#FFF5EE]'
                : 'border-[#EAEAEA] bg-white'
            }`}
          >
            <Text
              className={`text-[14px] font-sans ${
                isSelected ? 'text-coffee-primary font-semibold' : 'text-[#2F2D2C]'
              }`}
            >
              {size}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
