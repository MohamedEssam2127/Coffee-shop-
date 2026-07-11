import React from 'react';
import { Text, Pressable } from 'react-native';

interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  iconOnly?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onPress,
  iconOnly = false,
  fullWidth = false,
  className = '',
  textClassName = '',
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`
        bg-coffee-primary items-center justify-center
        hover:opacity-90 active:opacity-80 active:scale-[0.98]
        ${disabled ? 'opacity-50' : ''}
        ${fullWidth ? 'w-full' : 'self-auto'}
        ${iconOnly ? 'w-10 h-10 radius-8' : 'px-14 py-4 radius-16'}
        ${className}
      `}
    >
      {typeof children === 'string' ? (
        <Text className={`text-white text-16-semibold ${textClassName}`}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}