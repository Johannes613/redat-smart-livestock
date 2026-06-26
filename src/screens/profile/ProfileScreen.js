import React from 'react';
import { View, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, isAppDark, toggleTheme } from '../../theme';
import { Text, Card, Badge, Button } from '../../components/ui';
import { mockUser, mockFarm, mockAnalytics } from '../../data/mockData';

const BADGES = [
  { icon: '🌊', label: 'Water Guardian',  desc: 'Posted 5 water sources' },
  { icon: '🏆', label: 'Top Contributor', desc: 'Top 10% in community' },
  { icon: '🩺', label: 'Health Watcher',  desc: 'Reported 3 diseases early' },
  { icon: '⭐', label: 'Verified Farmer',  desc: 'Identity verified' },
  { icon: '🔥', label: '7-Day Streak',    desc: 'Logged in 7 days' },
];

const MENU_ITEMS = [
  { icon: 'business-outline',  label: 'My Farms',         badge: '1' },
  { icon: 'analytics-outline', label: 'Analytics',        badge: null },
  { icon: 'document-text-outline', label: 'Reports',      badge: null },
  { icon: 'people-outline',    label: 'Veterinarians',    badge: null },
  { icon: 'language-outline',  label: 'Language',         badge: 'EN' },
  { icon: 'moon-outline',      label: 'Dark Mode',        isToggle: true },
  { icon: 'notifications-outline', label: 'Notifications', badge: '3' },
  { icon: 'shield-checkmark-outline', label: 'Privacy',   badge: null },
  { icon: 'help-circle-outline', label: 'Help & Support', badge: null },
  { icon: 'log-out-outline',   label: 'Sign Out',         badge: null, danger: true },
];

export function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4] }}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>
        <Text variant="headlineSmall" style={{ flex: 1 }}>Profile</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Edit profile">
          <Ionicons name="create-outline" size={22} color={Colors.accent} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: Spacing[4], paddingBottom: Spacing[10] }} showsVerticalScrollIndicator={false}>
        {/* Profile hero */}
        <View
          style={{ margin: Spacing[4], borderRadius: Radius.xxl, padding: Spacing[5], borderWidth: 1, borderColor: Colors.accentBorder, backgroundColor: Colors.bg.card }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[4] }}>
            <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.bg.elevated, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.accent }}>
              <Text style={{ fontSize: 32 }}>👨‍🌾</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="headlineSmall">{mockUser.name}</Text>
              <Text variant="bodySmall" color={Colors.text.secondary}>{mockUser.nameAr}</Text>
              <View style={{ flexDirection: 'row', gap: Spacing[2], marginTop: Spacing[2] }}>
                <Badge label="Farmer" color={Colors.accent} size="sm" />
                {mockUser.isVerified && <Badge label="✓ Verified" color={Colors.success} size="sm" />}
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: Spacing[4], paddingTop: Spacing[4], borderTopWidth: 1, borderTopColor: Colors.border.muted }}>
            {[
              { label: 'Camels', value: mockAnalytics.totalCamels },
              { label: 'Pins',   value: mockAnalytics.communityPins },
              { label: 'Score',  value: mockUser.contributionScore },
              { label: 'Badges', value: mockUser.badgeCount },
            ].map(s => (
              <View key={s.label} style={{ alignItems: 'center' }}>
                <Text variant="headlineSmall" color={Colors.accent}>{s.value}</Text>
                <Text variant="caption" color={Colors.text.tertiary}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Farm info */}
        <View style={{ paddingHorizontal: Spacing[4] }}>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>FARM</Text>
          <Card variant="default">
            <View style={{ flexDirection: 'row', gap: Spacing[3], alignItems: 'center' }}>
              <View style={{ width: 48, height: 48, borderRadius: Radius.lg, backgroundColor: Colors.successMuted, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="business-outline" size={22} color={Colors.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="titleSmall">{mockFarm.name}</Text>
                <Text variant="bodySmall" color={Colors.text.secondary}>{mockFarm.address}</Text>
                <Text variant="caption" color={Colors.text.tertiary}>{mockFarm.area} km² · {mockFarm.camelIds.length} camels</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.text.tertiary} />
            </View>
          </Card>
        </View>

        {/* Badges */}
        <View style={{ paddingHorizontal: Spacing[4] }}>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>EARNED BADGES</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing[3] }}>
            {BADGES.map(b => (
              <Card key={b.label} variant="glass" padding={Spacing[3]} style={{ width: 100, alignItems: 'center', gap: Spacing[1] }}>
                <Text style={{ fontSize: 28 }}>{b.icon}</Text>
                <Text variant="labelSmall" align="center" color={Colors.accent}>{b.label}</Text>
                <Text variant="caption" color={Colors.text.tertiary} align="center">{b.desc}</Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Menu */}
        <View style={{ paddingHorizontal: Spacing[4] }}>
          <Card variant="default" padding={0}>
            {MENU_ITEMS.map((item, i) => (
              <Pressable
                key={item.label}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4], borderTopWidth: i === 0 ? 0 : 1, borderTopColor: Colors.border.muted }}
              >
                <Ionicons name={item.icon} size={20} color={item.danger ? Colors.error : Colors.text.secondary} />
                <Text variant="bodyMedium" color={item.danger ? Colors.error : Colors.text.primary} style={{ flex: 1 }}>{item.label}</Text>
                {item.badge && <Badge label={item.badge} color={item.danger ? Colors.error : Colors.accent} size="sm" />}
                {item.isToggle ? (
                  <Switch value={isAppDark} onValueChange={toggleTheme} trackColor={{ true: Colors.accent }} />
                ) : !item.danger ? (
                  <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />
                ) : null}
              </Pressable>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
