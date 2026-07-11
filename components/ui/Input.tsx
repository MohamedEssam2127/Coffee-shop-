import React, { useState } from 'react';
import { View, Text, TextInput, type TextInputProps, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Colors } from '../../lib/colors';

export interface InputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  error?: string | boolean;
  containerClassName?: string;
  inputClassName?: string;
}

export default function Input({
  label,
  leftIcon,
  rightIcon,
  isPassword = false,
  error,
  containerClassName = '',
  inputClassName = '',
  secureTextEntry,
  placeholderTextColor = Colors.muted,
  ...props
}: InputProps) {
  const [isSecure, setIsSecure] = useState(isPassword || secureTextEntry);
  const showPasswordToggle = isPassword || secureTextEntry;
  const hasError = !!error;

  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text className="text-14-semibold text-coffee-dark mb-2">
          {label}
        </Text>
      )}

      <View
        className={`w-full h-[56px] bg-white rounded-[12px] border flex-row items-center px-4 ${
          hasError ? 'border-destructive' : 'border-[#D8C2B7]'
        }`}
      >
        {leftIcon && (
          <View className="mr-3 justify-center items-center">
            {leftIcon}
          </View>
        )}

        <TextInput
          secureTextEntry={isSecure}
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid="transparent"
          className={`flex-1 h-full text-regular text-coffee-dark ${inputClassName}`}
          style={{ paddingVertical: 0 }}
          {...props}
        />

        {showPasswordToggle ? (
          <Pressable
            onPress={() => setIsSecure(!isSecure)}
            className="ml-3 p-1 active:opacity-70 justify-center items-center"
          >
            {isSecure ? (
              <Eye size={20} color={Colors.muted} />
            ) : (
              <EyeOff size={20} color={Colors.muted} />
            )}
          </Pressable>
        ) : (
          rightIcon && (
            <View className="ml-3 justify-center items-center">
              {rightIcon}
            </View>
          )
        )}
      </View>

      {typeof error === 'string' && error.length > 0 && (
        <Text className="text-12-semibold text-destructive mt-1.5 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}
