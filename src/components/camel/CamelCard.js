import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Colors, Spacing, Radius } from '../../theme';
import { Card, Text } from '../ui';
import { HealthStatusBadge } from './HealthStatusBadge';
import { Ionicons } from '@expo/vector-icons';

export function CamelCard({ camel, onPress }) {
  const scoreColor =
    camel.healthScore >= 75 ? Colors.success :
    camel.healthScore >= 50 ? Colors.warning :
    Colors.error;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`View ${camel.name}`}>
      <Card variant="default" padding={Spacing[3]}>
        <View style={{ flexDirection: 'row', gap: Spacing[3], alignItems: 'center' }}>
          {/* Avatar */}
          <View style={{ width: 56, height: 56, borderRadius: Radius.lg, backgroundColor: Colors.bg.elevated, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border.accent, alignItems: 'center', justifyContent: 'center' }}>
            {camel.photo
              ? <Image source={{ uri: camel.photo }} style={{ width: 56, height: 56 }} />
              : <Text variant="headlineMedium">🐪</Text>}
          </View>

          {/* Info */}
          <View style={{ flex: 1, gap: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text variant="titleMedium">{camel.name}</Text>
              <Text variant="caption" color={Colors.text.tertiary}>#{camel.uniqueId}</Text>
            </View>
            <Text variant="bodySmall" color={Colors.text.secondary}>
              {camel.breed} · {camel.gender} · {camel.age}y · {camel.weight}kg
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[2], marginTop: 2 }}>
              <HealthStatusBadge status={camel.healthStatus} size="sm" />
              {camel.collarId && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <Ionicons name="radio-outline" size={11} color={Colors.success} />
                  <Text variant="caption" color={Colors.success}>LIVE</Text>
                </View>
              )}
            </View>
          </View>

          {/* Score */}
          <View style={{ alignItems: 'center', gap: 2 }}>
            <Text variant="headlineSmall" color={scoreColor}>{camel.healthScore}</Text>
            <Text variant="caption" color={Colors.text.tertiary}>score</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
