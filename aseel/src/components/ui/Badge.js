import React from 'react';
import { View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { Text } from './Text';

export function Badge({ label, color = Colors.accent, size = 'md', style }) {
  return (
    <View style={[{
      backgroundColor: color + '20',
      borderRadius: Radius.full,
      paddingVertical:   size === 'sm' ? 2  : 4,
      paddingHorizontal: size === 'sm' ? 6  : 10,
      borderWidth: 1,
      borderColor: color + '40',
      alignSelf: 'flex-start',
    }, style]}>
      <Text variant={size === 'sm' ? 'caption' : 'labelSmall'} color={color}>{label}</Text>
    </View>
  );
}
