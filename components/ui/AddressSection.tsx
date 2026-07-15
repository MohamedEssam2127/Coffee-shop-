import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Edit, FileText } from 'lucide-react-native';
import { Colors } from '../../lib/colors';

interface AddressSectionProps {
  deliveryType: 'deliver' | 'pickup';
  address: string;
  fullAddress: string;
  note: string;
  onEditAddress: () => void;
  onAddNote: () => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  deliveryType,
  address,
  fullAddress,
  note,
  onEditAddress,
  onAddNote,
}) => {
  return (
    <View>
      <Text className="mb-3 text-[16px] font-bold text-coffee-dark">
        {deliveryType === 'deliver' ? 'Delivery Address' : 'Pick Up Location'}
      </Text>
      <Text className="mb-1 text-[14px] font-bold text-coffee-dark">
        {deliveryType === 'deliver' ? address : 'Main Coffee Shop'}
      </Text>
      <Text className="mb-4 text-[12px] text-coffee-dark/70">
        {deliveryType === 'deliver' ? fullAddress : 'Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.'}
      </Text>

      <View className="mb-6 flex-row gap-2">
        {deliveryType === 'deliver' && (
          <Pressable
            onPress={onEditAddress}
            className="flex-row items-center rounded-full border border-gray-600 px-4 py-1.5">
            <Edit size={14} color={Colors.primary900} className="mr-1.5" />
            <Text className="text-[16px] text-coffee-dark">Edit Address</Text>
          </Pressable>
        )}
        <Pressable
          onPress={onAddNote}
          className="flex-row items-center rounded-full border border-gray-600 px-4 py-1.5">
          <FileText size={14} color={Colors.primary900} className="mr-1.5" />
          <Text className="text-[16px] text-coffee-dark">
            {note ? 'Edit Note' : 'Add Note'}
          </Text>
        </Pressable>
      </View>

      {note ? (
        <View className="mb-6 rounded-2xl border border-[#E9D6C8] bg-[#FAF4EF] px-4 py-3">
          <Text className="mb-1 text-[12px] font-semibold uppercase tracking-[1px] text-coffee-primary">
            Note
          </Text>
          <Text className="text-[13px] text-coffee-dark">{note}</Text>
        </View>
      ) : null}
    </View>
  );
};
