import React from 'react';
import { Pressable, Text } from 'react-native';

const SIZE_VARIANTS = {
  sm: { padding: 'px-3 py-2', text: 'text-sm' },
  md: { padding: 'px-4 py-3', text: 'text-base' },
  lg: { padding: 'px-6 py-4', text: 'text-lg' }
};

export default function Button({ label, onPress, size = 'md', disabled = false, className = '' }) {
  const { padding, text } = SIZE_VARIANTS[size] ?? SIZE_VARIANTS.md;
  const buttonClasses = `flex-row items-center justify-center rounded-full bg-primary ${padding} ${
    disabled ? 'opacity-60' : ''
  } ${className}`.trim();

  return (
    <Pressable onPress={onPress} disabled={disabled} className={buttonClasses}>
      <Text className={`font-semibold text-white ${text}`.trim()}>{label}</Text>
    </Pressable>
  );
}
