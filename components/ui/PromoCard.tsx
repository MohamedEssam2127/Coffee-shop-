import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

export default function PromoCard() {
  return (
    <View className="w-full h-[140px] rounded-[16px] overflow-hidden">
      <ImageBackground
        source={require('../../assets/images/Banner 1.png')}
        className="w-full h-full p-4 justify-between"
        resizeMode="cover"
      >
        <View className="self-start bg-[#ED5151] px-2.5 py-1 rounded-[8px]">
          <Text className="text-[12px] font-semibold text-white">Promo</Text>
        </View>
        <View className="mt-2 items-start">
          <View className="bg-[#121212]/80 px-2 py-0.5 rounded-[4px] mb-1">
            <Text className="text-[32px] font-bold text-white leading-none">
              Buy one get
            </Text>
          </View>
          <View className="bg-[#121212]/80 px-2 py-0.5 rounded-[4px]">
            <Text className="text-[32px] font-bold text-white leading-none">
              one FREE
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
