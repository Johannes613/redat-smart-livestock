import React from 'react';
import { View } from 'react-native';
import { Colors, Radius, Spacing } from '../../theme';

const variantStyles = {
  default:  { backgroundColor: Colors.bg.card,     borderWidth: 1, borderColor: Colors.border.default },
  elevated: { backgroundColor: Colors.bg.elevated,  borderWidth: 1, borderColor: Colors.border.default, shadowColor: '#8100D1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 14, elevation: 5 },
  glass:    { backgroundColor: Colors.glass,        borderWidth: 1, borderColor: Colors.glassBorder },
  accent:   { backgroundColor: Colors.bg.card,      borderWidth: 1, borderColor: Colors.border.accent, shadowColor: '#8100D1', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.45, shadowRadius: 18, elevation: 10 },
};

export function Card({ variant = 'default', padding = Spacing[4], style, children, ...props }) {
  return (
    <View style={[{ borderRadius: Radius.xl, padding }, variantStyles[variant], style]} {...props}>
      {children}
    </View>
  );
}
