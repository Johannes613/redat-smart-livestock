import React, { useState } from 'react';
import { View, ScrollView, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Badge } from '../../components/ui';
import { StatCard }    from '../../components/dashboard/StatCard';
import { AlertBanner } from '../../components/dashboard/AlertBanner';
import { CamelCard }   from '../../components/camel/CamelCard';
import {
  mockUser, mockFarm, mockCamels,
  mockAlerts, mockWeather, mockAnalytics,
} from '../../data/mockData';

export function DashboardScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts]         = useState(mockAlerts);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const dismissAlert = (id) => setAlerts(a => a.filter(x => x.id !== id));

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      <ScrollView
        contentContainerStyle={{ padding: Spacing[4], gap: Spacing[4], paddingBottom: Spacing[10] }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text variant="bodySmall" color={Colors.text.tertiary}>{greeting}</Text>
            <Text variant="headlineSmall">{mockUser.name.split(' ')[0]} 👋</Text>
            <Text variant="caption" color={Colors.text.secondary}>{mockFarm.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
            <Pressable
              onPress={() => navigation.navigate('Notifications')}
              style={{ width: 42, height: 42, borderRadius: Radius.full, backgroundColor: Colors.bg.card, borderWidth: 1, borderColor: Colors.border.default, alignItems: 'center', justifyContent: 'center' }}
              accessibilityRole="button" accessibilityLabel="Notifications"
            >
              <Ionicons name="notifications-outline" size={20} color={Colors.text.primary} />
              <View style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error }} />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Profile')}
              style={{ width: 42, height: 42, borderRadius: Radius.full, backgroundColor: Colors.accentMuted, borderWidth: 1, borderColor: Colors.accentBorder, alignItems: 'center', justifyContent: 'center' }}
              accessibilityRole="button" accessibilityLabel="Profile"
            >
              <Ionicons name="person-outline" size={20} color={Colors.accent} />
            </Pressable>
          </View>
        </View>

        {/* Weather banner */}
        <LinearGradient
          colors={[Colors.accentMuted, 'rgba(129,0,209,0.04)']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={{ borderRadius: Radius.xl, padding: Spacing[4], borderWidth: 1, borderColor: Colors.accentBorder, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <View>
            <Text variant="overline" color={Colors.text.tertiary}>AL QUA'A, UAE · NOW</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: Spacing[2], marginTop: 2 }}>
              <Text variant="headlineLarge" color={Colors.warning}>{mockWeather.temperature}°C</Text>
              <Text variant="bodySmall" color={Colors.text.secondary} style={{ marginBottom: 4 }}>feels {mockWeather.feelsLike}°C</Text>
            </View>
            <Text variant="bodySmall" color={Colors.text.secondary}>{mockWeather.condition} · UV {mockWeather.uvIndex} · {mockWeather.humidity}% humidity</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <Ionicons name="sunny" size={40} color={Colors.warning} />
            <Badge label="HEAT RISK" color={Colors.warning} size="sm" />
          </View>
        </LinearGradient>

        {/* Stats grid */}
        <View>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>TODAY'S STATUS</Text>
          <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
            <StatCard label="Healthy"     value={mockAnalytics.healthyCount}    icon="checkmark-circle-outline" color={Colors.success} trend={{ value: 0, direction: 'neutral' }} />
            <StatCard label="Sick"        value={mockAnalytics.sickCount}       icon="medical-outline"          color={Colors.error}   trend={{ value: 1, direction: 'up' }} />
          </View>
          <View style={{ flexDirection: 'row', gap: Spacing[3], marginTop: Spacing[3] }}>
            <StatCard label="Pregnant"    value={mockAnalytics.pregnantCount}   icon="heart-outline"            color={Colors.health.pregnant} />
            <StatCard label="Heat Stress" value={mockAnalytics.heatStressCount} icon="thermometer-outline"      color={Colors.health.heatStress} trend={{ value: 1, direction: 'up' }} />
          </View>
        </View>

        {/* Active alerts */}
        {alerts.filter(a => !a.isRead).length > 0 && (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing[3] }}>
              <Text variant="overline" color={Colors.text.tertiary}>ACTIVE ALERTS</Text>
              <Badge label={`${alerts.filter(a => !a.isRead).length} new`} color={Colors.error} size="sm" />
            </View>
            <View style={{ gap: Spacing[2] }}>
              {alerts.filter(a => !a.isRead).map(alert => (
                <AlertBanner
                  key={alert.id}
                  alert={alert}
                  onPress={() => navigation.navigate('Alerts')}
                  onDismiss={() => dismissAlert(alert.id)}
                />
              ))}
            </View>
          </View>
        )}

        {/* Quick actions */}
        <View>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>QUICK ACTIONS</Text>
          <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
            {[
              { icon: 'add-circle-outline',    label: 'Add Camel',   color: Colors.accent,   screen: 'AddCamel' },
              { icon: 'chatbubble-ellipses-outline', label: 'Ask AI', color: Colors.info,   screen: 'Chat' },
              { icon: 'map-outline',            label: 'View Map',    color: Colors.success,  screen: 'Map' },
              { icon: 'analytics-outline',      label: 'Analytics',   color: Colors.warning,  screen: 'Analytics' },
            ].map(action => (
              <Pressable
                key={action.label}
                onPress={() => navigation.navigate(action.screen)}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                style={{ flex: 1, alignItems: 'center', gap: Spacing[2] }}
              >
                <View style={{ width: 52, height: 52, borderRadius: Radius.xl, backgroundColor: action.color + '20', borderWidth: 1, borderColor: action.color + '40', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text variant="caption" color={Colors.text.secondary} align="center">{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recent camels */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing[3] }}>
            <Text variant="overline" color={Colors.text.tertiary}>YOUR HERD</Text>
            <Text variant="labelSmall" color={Colors.accent} onPress={() => navigation.navigate('Camels')}>View all →</Text>
          </View>
          <View style={{ gap: Spacing[2] }}>
            {mockCamels.slice(0, 3).map(c => (
              <CamelCard key={c.id} camel={c} onPress={() => navigation.navigate('CamelDetail', { camelId: c.id })} />
            ))}
          </View>
        </View>

        {/* AI summary */}
        <Card variant="accent" padding={Spacing[4]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], marginBottom: Spacing[3] }}>
            <View style={{ width: 36, height: 36, borderRadius: Radius.lg, backgroundColor: Colors.accentMuted, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="sparkles-outline" size={18} color={Colors.accent} />
            </View>
            <View>
              <Text variant="titleSmall" color={Colors.accent}>AI Daily Summary</Text>
              <Text variant="caption" color={Colors.text.tertiary}>Generated just now</Text>
            </View>
          </View>
          <Text variant="bodySmall" color={Colors.text.secondary} style={{ lineHeight: 20 }}>
            Your herd health score is <Text variant="bodySmall" color={Colors.warning}>70.8/100</Text> today.
            Safa needs urgent veterinary attention. Noor is showing heat stress — consider moving her to shade and increasing water access.
            Layla's pregnancy is progressing normally. {'\n\n'}
            Community alert: Camel pox reported 3.2km away. Monitor your herd closely.
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Chat')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: Spacing[3] }}
            accessibilityRole="button"
          >
            <Text variant="labelSmall" color={Colors.accent}>Ask REDAT AI for advice</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.accent} />
          </Pressable>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
