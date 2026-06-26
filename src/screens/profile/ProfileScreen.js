import React from 'react';
import { View, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, isAppDark, toggleTheme, subscribeTheme } from '../../theme';
import { Text, Card, Badge, Button } from '../../components/ui';
import { useAuthStore } from '../../store/useAuthStore';

const BADGES = [
  { icon: '🌊', label: 'Water Guardian',  desc: 'Posted 5 water sources' },
  { icon: '🏆', label: 'Top Contributor', desc: 'Top 10% in community' },
  { icon: '🩺', label: 'Health Watcher',  desc: 'Reported 3 diseases early' },
  { icon: '⭐', label: 'Verified Farmer',  desc: 'Identity verified' },
  { icon: '🔥', label: '7-Day Streak',    desc: 'Logged in 7 days' },
];

export function ProfileScreen({ navigation }) {
  const currentUser = useAuthStore(state => state.currentUser);
  const logout = useAuthStore(state => state.logout);
  const [darkTheme, setDarkTheme] = React.useState(isAppDark);

  React.useEffect(() => {
    return subscribeTheme(setDarkTheme);
  }, []);

  if (!currentUser) return null;
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
        <View style={{ alignItems: 'center', marginVertical: Spacing[6] }}>
          <View style={{ width: 100, height: 100, borderRadius: Radius.full, backgroundColor: Colors.bg.elevated, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing[4], borderWidth: 2, borderColor: Colors.accent }}>
            <Ionicons name="person" size={40} color={Colors.accent} />
          </View>
          <Text variant="headlineSmall">{currentUser.name}</Text>
          <Text variant="bodyMedium" color={Colors.text.secondary}>{currentUser.farmName}</Text>
        </View>

        <View style={{ paddingHorizontal: Spacing[4] }}>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>ACCOUNT DETAILS</Text>
          <Card variant="default">
            {[
              { label: 'Email', value: currentUser.email },
              { label: 'Phone', value: currentUser.phone },
            ].map((row, i) => (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing[3], borderTopWidth: i === 0 ? 0 : 1, borderTopColor: Colors.border.muted }}>
                <Text variant="bodySmall" color={Colors.text.secondary}>{row.label}</Text>
                <Text variant="bodyMedium">{row.value}</Text>
              </View>
            ))}
          </Card>
        </View>

        <View style={{ paddingHorizontal: Spacing[4] }}>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>PREFERENCES</Text>
          <Card variant="default">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing[2] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
                <Ionicons name="moon-outline" size={20} color={Colors.text.primary} />
                <Text variant="bodyMedium">Dark Mode</Text>
              </View>
              <Switch 
                value={darkTheme} 
                onValueChange={toggleTheme} 
                trackColor={{ false: Colors.border.default, true: Colors.accent }}
              />
            </View>
          </Card>
        </View>

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

        <View style={{ padding: Spacing[4] }}>
          <Button 
            label="Sign Out" 
            variant="outline" 
            onPress={logout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
