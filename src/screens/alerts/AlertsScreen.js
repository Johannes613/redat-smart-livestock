import React, { useState } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Badge } from '../../components/ui';
import { mockAlerts, mockNotifications } from '../../data/mockData';

const SEVERITY_CFG = {
  low:      { color: Colors.info,    icon: 'information-circle-outline', label: 'Low' },
  medium:   { color: Colors.warning, icon: 'warning-outline',            label: 'Medium' },
  high:     { color: Colors.error,   icon: 'alert-circle-outline',       label: 'High' },
  critical: { color: Colors.error,   icon: 'flash-outline',              label: 'Critical' },
};

function AlertItem({ alert, onDismiss }) {
  const cfg = SEVERITY_CFG[alert.severity];
  return (
    <Card variant="default">
      <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
        <View style={{ width: 40, height: 40, borderRadius: Radius.full, backgroundColor: cfg.color + '20', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={cfg.icon} size={20} color={cfg.color} />
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Badge label={cfg.label} color={cfg.color} size="sm" />
            <Text variant="caption" color={Colors.text.tertiary}>{Math.floor((Date.now() - new Date(alert.createdAt).getTime()) / 60000)}m ago</Text>
          </View>
          <Text variant="titleSmall">{alert.type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</Text>
          <Text variant="bodySmall" color={Colors.text.secondary}>{alert.message}</Text>
          {alert.recommendation && (
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 4, padding: 8, backgroundColor: Colors.accentMuted, borderRadius: Radius.sm }}>
              <Ionicons name="bulb-outline" size={14} color={Colors.accent} />
              <Text variant="caption" color={Colors.accent} style={{ flex: 1 }}>{alert.recommendation}</Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <Ionicons name="pricetag-outline" size={12} color={Colors.text.tertiary} />
            <Text variant="caption" color={Colors.text.tertiary}>{alert.camelName}</Text>
            <Text variant="caption" color={Colors.text.tertiary}>· AI confidence: {Math.round(alert.confidence * 100)}%</Text>
          </View>
        </View>
        <Pressable onPress={() => onDismiss(alert.id)} hitSlop={8} accessibilityRole="button" accessibilityLabel="Dismiss">
          <Ionicons name="close" size={16} color={Colors.text.tertiary} />
        </Pressable>
      </View>
    </Card>
  );
}

export function AlertsScreen({ navigation }) {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [tab, setTab]       = useState('alerts'); // 'alerts' | 'notifications'

  const dismiss = (id) => setAlerts(a => a.filter(x => x.id !== id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      {/* Header */}
      <View style={{ padding: Spacing[4], gap: Spacing[4] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text variant="headlineSmall">Alerts</Text>
            <Text variant="caption" color={Colors.text.tertiary}>AI-powered health & safety alerts</Text>
          </View>
          {alerts.filter(a => !a.isRead).length > 0 && (
            <Badge label={`${alerts.filter(a => !a.isRead).length} new`} color={Colors.error} />
          )}
        </View>

        {/* Tab toggle */}
        <View style={{ flexDirection: 'row', backgroundColor: Colors.bg.card, borderRadius: Radius.lg, padding: 4, borderWidth: 1, borderColor: Colors.border.default }}>
          {[['alerts', 'Health Alerts'], ['notifications', 'Notifications']].map(([key, label]) => (
            <Pressable
              key={key}
              onPress={() => setTab(key)}
              style={{ flex: 1, paddingVertical: 8, borderRadius: Radius.md, backgroundColor: tab === key ? Colors.accent : 'transparent', alignItems: 'center' }}
              accessibilityRole="tab"
            >
              <Text variant="labelSmall" color={tab === key ? Colors.white : Colors.text.secondary}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {tab === 'alerts' ? (
        <FlatList
          data={alerts}
          keyExtractor={a => a.id}
          contentContainerStyle={{ padding: Spacing[4], paddingTop: 0, gap: Spacing[3], paddingBottom: Spacing[10] }}
          renderItem={({ item }) => <AlertItem alert={item} onDismiss={dismiss} />}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', paddingTop: Spacing[16], gap: Spacing[3] }}>
              <Ionicons name="checkmark-shield-outline" size={56} color={Colors.success} />
              <Text variant="titleMedium" color={Colors.success}>All Clear!</Text>
              <Text variant="bodySmall" color={Colors.text.tertiary} align="center">No active health alerts for your herd.</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={mockNotifications}
          keyExtractor={n => n.id}
          contentContainerStyle={{ padding: Spacing[4], paddingTop: 0, gap: Spacing[2], paddingBottom: Spacing[10] }}
          renderItem={({ item }) => (
            <Pressable accessibilityRole="button">
              <View style={{ flexDirection: 'row', gap: Spacing[3], padding: Spacing[3], backgroundColor: item.isRead ? Colors.bg.card : Colors.accentMuted, borderRadius: Radius.lg, borderWidth: 1, borderColor: item.isRead ? Colors.border.default : Colors.accentBorder }}>
                <View style={{ width: 36, height: 36, borderRadius: Radius.full, backgroundColor: Colors.bg.elevated, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons
                    name={item.type === 'badge_earned' ? 'ribbon-outline' : item.type.includes('disease') ? 'medical-outline' : 'notifications-outline'}
                    size={18}
                    color={item.isRead ? Colors.text.tertiary : Colors.accent}
                  />
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text variant="titleSmall" color={item.isRead ? Colors.text.secondary : Colors.text.primary}>{item.title}</Text>
                    {!item.isRead && <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.accent }} />}
                  </View>
                  <Text variant="bodySmall" color={Colors.text.tertiary} numberOfLines={2}>{item.body}</Text>
                </View>
              </View>
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
