import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  labelClassName?: string;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  className,
  labelClassName,
  ...props
}: ButtonProps) {
  // Size styles utilizing our new custom padding and radius classes:
  // - sm: padding-8, radius-8
  // - md/lg: padding-16, radius-16
  const sizeStyles = {
    lg: 'padding-16 radius-16',
    md: 'padding-16 radius-16',
    sm: 'padding-8 radius-8',
  };

  // Text combination styles:
  // - lg: text-16-semibold
  // - md: text-14-semibold
  // - sm: text-12-semibold
  const textStyles = {
    lg: 'text-16-semibold',
    md: 'text-14-semibold',
    sm: 'text-12-semibold',
  };

  // Color variants using the coffee theme colors:
  const variantStyles = {
    primary: 'bg-coffee-primary active:opacity-90',
    secondary: 'bg-coffee-secondary active:opacity-90',
    outline: 'bg-transparent border border-coffee-primary active:opacity-90',
  };

  const labelColorStyles = {
    primary: 'text-coffee-cream',
    secondary: 'text-coffee-dark',
    outline: 'text-coffee-primary',
  };

  return (
    <Pressable
      className={cn(
        'flex-row items-center justify-center',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <Text className={cn(textStyles[size], labelColorStyles[variant], labelClassName)}>
        {label}
      </Text>
    </Pressable>
  );
}
