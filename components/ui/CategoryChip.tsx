
import { Text, Pressable } from 'react-native';

interface CategoryChipProps {
  category: string;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryChip({
  category,
  isActive,
  onPress,
}: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-2.5 rounded-[12px] active:opacity-90 ${
        isActive ? 'bg-coffee-primary' : 'bg-white'
      }`}
    >
      <Text
        className={`text-14-semibold ${
          isActive ? 'text-white' : 'text-[#313131]'
        }`}
      >
        {category}
      </Text>
    </Pressable>
  );
}
