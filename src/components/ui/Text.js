import React from 'react';
import { Text as RNText } from 'react-native';
import { Colors, Typography } from '../../theme';

export function Text({ variant = 'bodyMedium', color, align, style, children, ...props }) {
  return (
    <RNText
      style={[
        Typography[variant],
        { color: color ?? Colors.text.primary },
        align && { textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}
