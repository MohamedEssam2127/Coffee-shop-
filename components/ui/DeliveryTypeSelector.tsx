import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface DeliveryTypeSelectorProps {
  deliveryType: 'deliver' | 'pickup';
  onChange: (type: 'deliver' | 'pickup') => void;
}

export const DeliveryTypeSelector: React.FC<DeliveryTypeSelectorProps> = ({
  deliveryType,
  onChange,
}) => {
  return (
    <View className="mb-6 mt-4 flex-row rounded-full bg-[#F2F2F2] p-1">
      <Pressable
        onPress={() => onChange('deliver')}
        className={`flex-1 items-center rounded-full py-3 ${
          deliveryType === 'deliver' ? 'bg-coffee-primary' : 'bg-transparent'
        }`}>
        <Text
          className={`text-[16px] font-semibold ${
            deliveryType === 'deliver' ? 'text-white' : 'text-coffee-dark'
          }`}>
          Deliver
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('pickup')}
        className={`flex-1 items-center rounded-full py-3 ${
          deliveryType === 'pickup' ? 'bg-coffee-primary' : 'bg-transparent'
        }`}>
        <Text
          className={`text-[16px] font-semibold ${
            deliveryType === 'pickup' ? 'text-white' : 'text-coffee-dark'
          }`}>
          Pick Up
        </Text>
      </Pressable>
    </View>
  );
};
