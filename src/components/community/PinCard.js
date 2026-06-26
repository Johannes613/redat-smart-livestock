import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Colors, Spacing, Radius } from '../../theme';
import { Card, Text, Badge } from '../ui';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';

export const PIN_CONFIG = {
  water_source:         { label: 'Water Source',    icon: 'water-outline',         color: Colors.pin.water },
  grazing_route:        { label: 'Grazing Route',   icon: 'map-outline',           color: Colors.pin.grazing },
  good_grazing:         { label: 'Good Grazing',    icon: 'leaf-outline',          color: Colors.pin.grazing },
  danger_zone:          { label: 'Danger Zone',     icon: 'warning-outline',       color: Colors.pin.danger },
  snake_area:           { label: 'Snake Area',      icon: 'alert-circle-outline',  color: Colors.pin.danger },
  disease_report:       { label: 'Disease Report',  icon: 'medical-outline',       color: Colors.pin.disease },
  vet_recommendation:   { label: 'Vet Rec.',        icon: 'medkit-outline',        color: Colors.pin.vet },
  breeding_observation: { label: 'Breeding',        icon: 'heart-outline',         color: Colors.pin.breeding },
  feed_available:       { label: 'Feed Available',  icon: 'basket-outline',        color: Colors.pin.feed },
  feed_shortage:        { label: 'Feed Shortage',   icon: 'alert-outline',         color: Colors.pin.danger },
  shelter:              { label: 'Shelter',         icon: 'home-outline',          color: Colors.pin.shelter },
  emergency:            { label: 'Emergency',       icon: 'flash-outline',         color: Colors.pin.emergency },
  voice_note:           { label: 'Voice Note',      icon: 'mic-outline',           color: Colors.pin.general },
};

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function PinCard({ pin, onPress, onLike }) {
  const currentUser = useAuthStore(state => state.currentUser);
  const cfg = PIN_CONFIG[pin.category] ?? PIN_CONFIG.voice_note;
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card variant="default" padding={Spacing[4]}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: Spacing[3], marginBottom: Spacing[3] }}>
          <View style={{ width: 40, height: 40, borderRadius: Radius.lg, backgroundColor: cfg.color + '20', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: cfg.color + '40' }}>
            <Ionicons name={cfg.icon} size={20} color={cfg.color} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge label={cfg.label} color={cfg.color} size="sm" />
              {pin.isVerified && <Ionicons name="checkmark-circle" size={16} color={Colors.success} />}
            </View>
            <Text variant="titleSmall" style={{ marginTop: 4 }}>{pin.title}</Text>
          </View>
        </View>

        <Text variant="bodySmall" color={Colors.text.secondary} numberOfLines={2}>{pin.description}</Text>

        {/* Images */}
        {pin.images?.length > 0 && (
          <View style={{ flexDirection: 'row', gap: Spacing[2], marginTop: Spacing[3] }}>
            {pin.images.slice(0, 3).map((img, i) => (
              <Image key={i} source={{ uri: img }} style={{ width: 64, height: 64, borderRadius: Radius.md, backgroundColor: Colors.bg.elevated }} />
            ))}
            {pin.images.length > 3 && (
              <View style={{ width: 64, height: 64, borderRadius: Radius.md, backgroundColor: Colors.bg.elevated, alignItems: 'center', justifyContent: 'center' }}>
                <Text variant="titleSmall" color={Colors.text.secondary}>+{pin.images.length - 3}</Text>
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing[3] }}>
          <Text variant="caption" color={Colors.text.tertiary}>{currentUser ? currentUser.name : pin.authorName} · {timeAgo(pin.createdAt)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[4] }}>
            <Pressable onPress={onLike} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} hitSlop={8} accessibilityRole="button" accessibilityLabel={`Like, ${pin.likes} likes`}>
              <Ionicons name="heart-outline" size={15} color={Colors.text.tertiary} />
              <Text variant="caption" color={Colors.text.tertiary}>{pin.likes}</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="chatbubble-outline" size={13} color={Colors.text.tertiary} />
              <Text variant="caption" color={Colors.text.tertiary}>{pin.comments?.length ?? 0}</Text>
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
