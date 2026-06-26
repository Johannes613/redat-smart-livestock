import React, { useState } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Button } from '../../components/ui';
import { mockNotifications } from '../../data/mockData';

const ICON_MAP = {
  escape:            { icon: 'alert-circle-outline',  color: Colors.error },
  heat_stress:       { icon: 'thermometer-outline',   color: Colors.health.heatStress },
  disease_risk:      { icon: 'medical-outline',       color: Colors.error },
  pregnancy:         { icon: 'heart-outline',         color: Colors.health.pregnant },
  nearby_disease:    { icon: 'warning-outline',       color: Colors.warning },
  vet_recommendation:{ icon: 'medkit-outline',        color: Colors.pin.vet },
  battery_low:       { icon: 'battery-dead-outline',  color: Colors.warning },
  weather_alert:     { icon: 'partly-sunny-outline',  color: Colors.warning },
  community_reply:   { icon: 'chatbubble-outline',    color: Colors.info },
  badge_earned:      { icon: 'ribbon-outline',        color: Colors.accent },
};

export function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, isRead: true })));
  const unread = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4] }}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>
        <Text variant="headlineSmall" style={{ flex: 1 }}>Notifications</Text>
        {unread > 0 && (
          <Button label="Mark all read" variant="ghost" size="sm" onPress={markAllRead} />
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={n => n.id}
        contentContainerStyle={{ padding: Spacing[4], paddingTop: 0, gap: Spacing[2], paddingBottom: Spacing[10] }}
        renderItem={({ item }) => {
          const cfg = ICON_MAP[item.type] ?? { icon: 'notifications-outline', color: Colors.text.tertiary };
          const elapsed = Math.floor((Date.now() - new Date(item.createdAt).getTime()) / 60000);
          const timeLabel = elapsed < 60 ? `${elapsed}m ago` : elapsed < 1440 ? `${Math.floor(elapsed / 60)}h ago` : `${Math.floor(elapsed / 1440)}d ago`;

          return (
            <Pressable
              accessibilityRole="button"
              style={{ flexDirection: 'row', gap: Spacing[3], padding: Spacing[3], backgroundColor: item.isRead ? Colors.bg.card : Colors.accentMuted, borderRadius: Radius.xl, borderWidth: 1, borderColor: item.isRead ? Colors.border.default : Colors.accentBorder }}
              onPress={() => setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, isRead: true } : n))}
            >
              <View style={{ width: 44, height: 44, borderRadius: Radius.full, backgroundColor: cfg.color + '20', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: cfg.color + '40' }}>
                <Ionicons name={cfg.icon} size={20} color={cfg.color} />
              </View>
              <View style={{ flex: 1, gap: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text variant="titleSmall" color={item.isRead ? Colors.text.secondary : Colors.text.primary}>{item.title}</Text>
                  {!item.isRead && <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.accent }} />}
                </View>
                <Text variant="bodySmall" color={Colors.text.tertiary} numberOfLines={2}>{item.body}</Text>
                <Text variant="caption" color={Colors.text.tertiary}>{timeLabel}</Text>
              </View>
            </Pressable>
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', paddingTop: Spacing[16], gap: Spacing[3] }}>
            <Ionicons name="notifications-off-outline" size={56} color={Colors.text.tertiary} />
            <Text variant="titleMedium" color={Colors.text.secondary}>No notifications</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
