
import { View, TextInput, type TextInputProps } from 'react-native';
import { CustomSearchIcon } from '../icons';

export interface SearchProps extends TextInputProps {
  containerClassName?: string;
  inputClassName?: string;
}

export default function Search({
  containerClassName = '',
  inputClassName = '',
  placeholder = 'Search coffee',
  placeholderTextColor = '#989898',
  ...props
}: SearchProps) {
  return (
    <View
      className={`flex-row items-center h-[52px] bg-coffee-dark rounded-[16px] px-4 ${containerClassName}`}
    >
      <View className="mr-3 justify-center items-center">
        <CustomSearchIcon size={20} />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        underlineColorAndroid="transparent"
        className={`flex-1 h-full text-regular text-white ${inputClassName}`}
        style={{ paddingVertical: 0, textAlignVertical: 'center' }}
        {...props}
      />
    </View>
  );
}
