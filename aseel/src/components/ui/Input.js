import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Colors, Radius, FontFamily, FontSize } from '../../theme';
import { Text } from './Text';

export function Input({
  label, error, helperText,
  leftIcon, rightIcon, onRightIconPress,
  containerStyle, required, style, ...props
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? Colors.error : focused ? Colors.border.focus : Colors.border.default;

  return (
    <View style={[{ gap: 4 }, containerStyle]}>
      {label && (
        <View style={{ flexDirection: 'row', gap: 2 }}>
          <Text variant="labelMedium" color={Colors.text.secondary}>{label}</Text>
          {required && <Text variant="labelMedium" color={Colors.error}>*</Text>}
        </View>
      )}
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.bg.surface, borderRadius: Radius.md,
        borderWidth: 1, borderColor, paddingHorizontal: 12,
        minHeight: 48, gap: 8,
      }}>
        {leftIcon && <View>{leftIcon}</View>}
        <TextInput
          style={[{ flex: 1, fontFamily: FontFamily.mono, fontSize: FontSize.base, color: Colors.text.primary, paddingVertical: 12 }, style]}
          placeholderTextColor={Colors.text.tertiary}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {rightIcon && (
          <Pressable onPress={onRightIconPress} hitSlop={8} accessibilityRole="button">
            {rightIcon}
          </Pressable>
        )}
      </View>
      {(error || helperText) && (
        <Text variant="caption" color={error ? Colors.error : Colors.text.tertiary}>
          {error ?? helperText}
        </Text>
      )}
    </View>
  );
}
