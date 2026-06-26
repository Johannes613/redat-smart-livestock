import React from 'react';
import { View, Pressable } from 'react-native';
import { Colors, Spacing, Radius } from '../../theme';
import { Text } from '../ui';
import { Ionicons } from '@expo/vector-icons';

const SEVERITY = {
  low:      { color: Colors.info,    icon: 'information-circle-outline' },
  medium:   { color: Colors.warning, icon: 'warning-outline' },
  high:     { color: Colors.error,   icon: 'alert-circle-outline' },
  critical: { color: Colors.error,   icon: 'flash-outline' },
};

export function AlertBanner({ alert, onPress, onDismiss }) {
  const cfg = SEVERITY[alert.severity];
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: Spacing[3], padding: Spacing[3], backgroundColor: Colors.bg.card, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border.default }}>
        <Ionicons name={cfg.icon} size={20} color={cfg.color} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="titleSmall" color={cfg.color}>{alert.type.replace(/_/g, ' ').toUpperCase()}</Text>
          <Text variant="bodySmall" color={Colors.text.secondary} numberOfLines={2}>{alert.message}</Text>
          {alert.recommendation && <Text variant="caption" color={Colors.text.tertiary} numberOfLines={1}>Rec: {alert.recommendation}</Text>}
        </View>
        {onDismiss && (
          <Pressable onPress={onDismiss} hitSlop={8} accessibilityRole="button" accessibilityLabel="Dismiss">
            <Ionicons name="close" size={16} color={Colors.text.tertiary} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
