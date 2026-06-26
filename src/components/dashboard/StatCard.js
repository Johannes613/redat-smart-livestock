import React from 'react';
import { View } from 'react-native';
import { Colors, Spacing, Radius } from '../../theme';
import { Text } from '../ui';
import { Ionicons } from '@expo/vector-icons';

export function StatCard({ label, value, icon, color, style }) {
  return (
    <View style={[{ flex: 1, backgroundColor: Colors.bg.card, borderRadius: Radius.xl, padding: Spacing[4], borderWidth: 1, borderColor: Colors.border.default, gap: Spacing[3] }, style]}>
      <View style={{ width: 40, height: 40, borderRadius: Radius.md, backgroundColor: color + '20', alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View>
        <Text variant="headlineMedium" color={color}>{value}</Text>
        <Text variant="bodySmall" color={Colors.text.secondary}>{label}</Text>
      </View>
    </View>
  );
}
