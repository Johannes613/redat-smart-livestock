import React, { useState } from 'react';
import { View, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card } from '../../components/ui';

function SettingRow({ icon, label, description, value, onToggle, type = 'toggle', color }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], paddingVertical: Spacing[3] }}>
      <View style={{ width: 36, height: 36, borderRadius: Radius.md, backgroundColor: (color ?? Colors.accent) + '20', alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={18} color={color ?? Colors.accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="bodyMedium">{label}</Text>
        {description && <Text variant="caption" color={Colors.text.tertiary}>{description}</Text>}
      </View>
      {type === 'toggle' && (
        <Switch value={value} onValueChange={onToggle} trackColor={{ false: Colors.border.default, true: Colors.accent }} thumbColor={value ? Colors.white : Colors.text.tertiary} />
      )}
      {type === 'nav' && <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />}
    </View>
  );
}

export function SettingsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    healthAlerts:      true,
    communityAlerts:   true,
    weatherAlerts:     true,
    collarUpdates:     true,
    arabic:            false,
    darkMode:          true,
    locationSharing:   true,
    autoSync:          true,
  });

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4] }}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>
        <Text variant="headlineSmall">Settings</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing[4], gap: Spacing[4], paddingBottom: Spacing[10] }} showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <View>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>NOTIFICATIONS</Text>
          <Card variant="default" padding={Spacing[3]}>
            {[
              { key: 'pushNotifications', icon: 'notifications-outline', label: 'Push Notifications',  description: 'Receive alerts on your device' },
              { key: 'healthAlerts',      icon: 'medical-outline',       label: 'Health Alerts',        description: 'AI-detected health warnings', color: Colors.error },
              { key: 'communityAlerts',   icon: 'people-outline',        label: 'Community Alerts',     description: 'Nearby farmer reports', color: Colors.info },
              { key: 'weatherAlerts',     icon: 'partly-sunny-outline',  label: 'Weather Alerts',       description: 'Extreme heat & weather warnings', color: Colors.warning },
              { key: 'collarUpdates',     icon: 'radio-outline',         label: 'Collar Updates',       description: 'Battery low & signal loss', color: Colors.success },
            ].map((item, i) => (
              <View key={item.key} style={{ borderTopWidth: i === 0 ? 0 : 1, borderTopColor: Colors.border.muted }}>
                <SettingRow {...item} value={settings[item.key]} onToggle={() => toggle(item.key)} />
              </View>
            ))}
          </Card>
        </View>

        {/* App preferences */}
        <View>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>PREFERENCES</Text>
          <Card variant="default" padding={Spacing[3]}>
            {[
              { key: 'arabic',         icon: 'language-outline',      label: 'Arabic Interface',    description: 'Switch to Arabic (RTL)' },
              { key: 'darkMode',       icon: 'moon-outline',          label: 'Dark Mode',           description: 'OLED-optimized dark theme', color: Colors.info },
              { key: 'locationSharing',icon: 'location-outline',      label: 'Location Sharing',    description: 'Share farm location with community', color: Colors.success },
              { key: 'autoSync',       icon: 'sync-outline',          label: 'Auto Sync',           description: 'Sync data when connected', color: Colors.accent },
            ].map((item, i) => (
              <View key={item.key} style={{ borderTopWidth: i === 0 ? 0 : 1, borderTopColor: Colors.border.muted }}>
                <SettingRow {...item} value={settings[item.key]} onToggle={() => toggle(item.key)} />
              </View>
            ))}
          </Card>
        </View>

        {/* Account */}
        <View>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>ACCOUNT</Text>
          <Card variant="default" padding={Spacing[3]}>
            {[
              { icon: 'person-outline',          label: 'Edit Profile',        type: 'nav' },
              { icon: 'lock-closed-outline',     label: 'Change Password',     type: 'nav' },
              { icon: 'document-text-outline',   label: 'Privacy Policy',      type: 'nav' },
              { icon: 'information-circle-outline', label: 'About REDAT v1.0', type: 'nav' },
            ].map((item, i) => (
              <View key={item.label} style={{ borderTopWidth: i === 0 ? 0 : 1, borderTopColor: Colors.border.muted }}>
                <SettingRow {...item} />
              </View>
            ))}
          </Card>
        </View>

        {/* Danger zone */}
        <Card variant="default" padding={Spacing[3]} style={{ borderColor: Colors.errorMuted }}>
          <Text variant="overline" color={Colors.error} style={{ marginBottom: Spacing[2] }}>DANGER ZONE</Text>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], paddingVertical: Spacing[2] }} accessibilityRole="button">
            <Ionicons name="log-out-outline" size={20} color={Colors.error} />
            <Text variant="bodyMedium" color={Colors.error}>Sign Out</Text>
          </Pressable>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], paddingVertical: Spacing[2] }} accessibilityRole="button">
            <Ionicons name="trash-outline" size={20} color={Colors.error} />
            <Text variant="bodyMedium" color={Colors.error}>Delete Account</Text>
          </Pressable>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
