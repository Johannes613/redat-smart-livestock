import React from 'react';
import { View } from 'react-native';
import { Colors, Radius, Spacing } from '../../theme';

export function Card({ variant = 'default', padding = Spacing[4], style, children, ...props }) {
  const variantStyles = {
    default:  { backgroundColor: Colors.bg.card,     borderWidth: 1, borderColor: Colors.border.default },
    elevated: { backgroundColor: Colors.bg.elevated, borderWidth: 1, borderColor: Colors.border.default },
    glass:    { backgroundColor: Colors.bg.surface,  borderWidth: 1, borderColor: Colors.border.muted },
    accent:   { backgroundColor: Colors.bg.card,     borderWidth: 1, borderColor: Colors.border.accent },
  };

  return (
    <View style={[{ borderRadius: Radius.xl, padding }, variantStyles[variant], style]} {...props}>
      {children}
    </View>
  );
}
