import React from 'react';
import { Pressable, ActivityIndicator, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { Text } from './Text';

const PAD = {
  sm: { paddingVertical: 8,  paddingHorizontal: 14, minHeight: 36 },
  md: { paddingVertical: 12, paddingHorizontal: 20, minHeight: 48 },
  lg: { paddingVertical: 16, paddingHorizontal: 28, minHeight: 56 },
};
const LABEL = { sm: 'labelSmall', md: 'labelLarge', lg: 'titleMedium' };

export function Button({
  variant = 'primary',
  size    = 'md',
  label,
  loading,
  icon,
  iconPosition = 'left',
  fullWidth,
  disabled,
  style,
  ...props
}) {
  const BG = {
    primary:   Colors.accent,
    secondary: Colors.bg.elevated,
    ghost:     'transparent',
    danger:    Colors.error,
    outline:   'transparent',
  };
  const FG = {
    primary:   Colors.white,
    secondary: Colors.text.primary,
    ghost:     Colors.text.secondary,
    danger:    Colors.white,
    outline:   Colors.accent,
  };
  const BORDER_STYLE = {
    secondary: { borderWidth: 1, borderColor: Colors.border.default },
    outline:   { borderWidth: 1, borderColor: Colors.accent },
  };

  const off = disabled || loading;
  return (
    <Pressable
      disabled={off}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        { borderRadius: Radius.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: BG[variant] },
        PAD[size],
        BORDER_STYLE[variant],
        fullWidth && { width: '100%' },
        { opacity: off ? 0.5 : pressed ? 0.82 : 1 },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={FG[variant]} />
      ) : (
        <>
          {icon && iconPosition === 'left'  && <View>{icon}</View>}
          <Text variant={LABEL[size]} color={FG[variant]}>{label}</Text>
          {icon && iconPosition === 'right' && <View>{icon}</View>}
        </>
      )}
    </Pressable>
  );
}
