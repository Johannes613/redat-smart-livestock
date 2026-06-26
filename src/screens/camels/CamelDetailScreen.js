import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Badge, Button, ProgressRing } from '../../components/ui';
import { HealthStatusBadge } from '../../components/camel/HealthStatusBadge';
import { CollarWidget } from '../../components/camel/CollarWidget';
import { mockCamels, mockCollarReading, mockAlerts } from '../../data/mockData';

const TABS = ['Overview', 'Health', 'Location', 'History'];

export function CamelDetailScreen({ route, navigation }) {
  const { camelId } = route.params;
  const camel = mockCamels.find(c => c.id === camelId) ?? mockCamels[0];
  const [tab, setTab] = useState('Overview');

  const camelAlerts = mockAlerts.filter(a => a.camelId === camel.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      {/* Top bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing[4] }}>
        <Pressable onPress={() => navigation.goBack()} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>
        <Text variant="titleMedium">{camel.name}</Text>
        <Pressable style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} accessibilityRole="button" accessibilityLabel="Options">
          <Ionicons name="ellipsis-horizontal" size={24} color={Colors.text.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: Spacing[10] }} showsVerticalScrollIndicator={false}>
        {/* Hero card */}
        <View
          style={{ margin: Spacing[4], borderRadius: Radius.xxl, padding: Spacing[5], borderWidth: 1, borderColor: Colors.accentBorder, backgroundColor: Colors.bg.card }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[4] }}>
            <View style={{ width: 80, height: 80, borderRadius: Radius.xxl, backgroundColor: Colors.bg.elevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.accentBorder }}>
              <Text style={{ fontSize: 44 }}>🐪</Text>
            </View>
            <View style={{ flex: 1, gap: Spacing[1] }}>
              <Text variant="headlineSmall">{camel.name}</Text>
              <Text variant="bodySmall" color={Colors.text.secondary}>{camel.nameAr}</Text>
              <HealthStatusBadge status={camel.healthStatus} />
              {camel.collarId && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success }} />
                  <Text variant="caption" color={Colors.success}>Collar LIVE</Text>
                </View>
              )}
            </View>
            <ProgressRing value={camel.healthScore} size={72} label={`${camel.healthScore}`} sublabel="score" color={camel.healthScore >= 75 ? Colors.success : camel.healthScore >= 50 ? Colors.warning : Colors.error} />
          </View>

          {/* Info row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing[4], paddingTop: Spacing[4], borderTopWidth: 1, borderTopColor: Colors.border.muted }}>
            {[
              { label: 'ID',     value: `#${camel.uniqueId}` },
              { label: 'Age',    value: `${camel.age}y` },
              { label: 'Weight', value: `${camel.weight}kg` },
              { label: 'Gender', value: camel.gender },
            ].map(info => (
              <View key={info.label} style={{ alignItems: 'center' }}>
                <Text variant="titleSmall">{info.value}</Text>
                <Text variant="caption" color={Colors.text.tertiary}>{info.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Live collar widget */}
        {camel.collarId && (
          <View style={{ paddingHorizontal: Spacing[4], marginBottom: Spacing[4] }}>
            <CollarWidget reading={mockCollarReading} />
          </View>
        )}

        {/* Tabs */}
        <View style={{ flexDirection: 'row', paddingHorizontal: Spacing[4], gap: Spacing[2], marginBottom: Spacing[4] }}>
          {TABS.map(t => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={{ flex: 1, paddingVertical: Spacing[2], borderRadius: Radius.md, backgroundColor: tab === t ? Colors.accent : Colors.bg.card, borderWidth: 1, borderColor: tab === t ? Colors.accent : Colors.border.default, alignItems: 'center' }}
              accessibilityRole="tab"
            >
              <Text variant="labelSmall" color={tab === t ? Colors.white : Colors.text.secondary}>{t}</Text>
            </Pressable>
          ))}
        </View>

        {/* Tab content */}
        <View style={{ paddingHorizontal: Spacing[4], gap: Spacing[3] }}>
          {tab === 'Overview' && (
            <>
              {/* Details */}
              <Card variant="default">
                <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>DETAILS</Text>
                {[
                  { label: 'Breed',  value: camel.breed },
                  { label: 'Breed',  value: camel.breed },
                  { label: 'Farm',   value: 'Al Mansoori Camel Farm' },
                  { label: 'Tags',   value: camel.tags.join(', ') || '—' },
                  { label: 'Born',   value: camel.birthDate },
                  { label: 'Last seen', value: new Date(camel.lastSeen).toLocaleString() },
                ].map((row, i) => (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Spacing[2], borderTopWidth: i === 0 ? 0 : 1, borderTopColor: Colors.border.muted }}>
                    <Text variant="bodySmall" color={Colors.text.tertiary}>{row.label}</Text>
                    <Text variant="bodySmall" color={Colors.text.primary}>{row.value}</Text>
                  </View>
                ))}
              </Card>

              {/* Pregnancy */}
              {camel.isPregnant && (
                <Card variant="glass">
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
                    <Ionicons name="heart" size={24} color={Colors.health.pregnant} />
                    <View>
                      <Text variant="titleSmall" color={Colors.health.pregnant}>Pregnant — Week {camel.pregnancyWeek}</Text>
                      <Text variant="bodySmall" color={Colors.text.secondary}>Estimated delivery in ~{45 - camel.pregnancyWeek} weeks</Text>
                    </View>
                  </View>
                </Card>
              )}

              {/* Actions */}
              <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
                <Button label="Record Visit" variant="outline" size="sm" style={{ flex: 1 }} icon={<Ionicons name="medkit-outline" size={15} color={Colors.accent} />} onPress={() => {}} />
                <Button label="Call Vet"     variant="secondary" size="sm" style={{ flex: 1 }} icon={<Ionicons name="call-outline" size={15} color={Colors.text.primary} />} onPress={() => {}} />
              </View>
            </>
          )}

          {tab === 'Health' && (
            <>
              {camelAlerts.map(a => (
                <Card key={a.id} variant={a.severity === 'high' || a.severity === 'critical' ? 'accent' : 'default'}>
                  <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
                    <Ionicons name="alert-circle-outline" size={20} color={a.severity === 'high' ? Colors.error : Colors.warning} />
                    <View style={{ flex: 1 }}>
                      <Text variant="titleSmall" color={a.severity === 'high' ? Colors.error : Colors.warning}>
                        {a.type.replace(/_/g, ' ').toUpperCase()}
                      </Text>
                      <Text variant="bodySmall" color={Colors.text.secondary} style={{ marginTop: 2 }}>{a.message}</Text>
                      {a.recommendation && (
                        <Text variant="caption" color={Colors.text.tertiary} style={{ marginTop: 4 }}>💡 {a.recommendation}</Text>
                      )}
                      <Text variant="caption" color={Colors.text.tertiary} style={{ marginTop: 4 }}>
                        Confidence: {Math.round(a.confidence * 100)}%
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
              {camelAlerts.length === 0 && (
                <View style={{ alignItems: 'center', padding: Spacing[8], gap: Spacing[3] }}>
                  <Ionicons name="checkmark-circle-outline" size={48} color={Colors.success} />
                  <Text variant="titleMedium" color={Colors.success}>No health alerts</Text>
                  <Text variant="bodySmall" color={Colors.text.tertiary} align="center">This camel is in good health.</Text>
                </View>
              )}
            </>
          )}

          {tab === 'Location' && (
            <Card variant="default" style={{ alignItems: 'center', padding: Spacing[8], gap: Spacing[3] }}>
              <Ionicons name="map-outline" size={48} color={Colors.accent} />
              <Text variant="titleMedium">GPS Tracking</Text>
              <Text variant="bodySmall" color={Colors.text.secondary} align="center">
                {camel.collarId
                  ? `Last GPS: 23.502°N, 55.803°E\nUpdated: just now`
                  : 'No collar attached. Attach a smart collar to enable GPS tracking.'}
              </Text>
              {camel.lastLocation && (
                <Badge label={`${camel.lastLocation.latitude.toFixed(4)}, ${camel.lastLocation.longitude.toFixed(4)}`} color={Colors.info} />
              )}
            </Card>
          )}

          {tab === 'History' && (
            <Card variant="default" style={{ alignItems: 'center', padding: Spacing[8], gap: Spacing[3] }}>
              <Ionicons name="time-outline" size={48} color={Colors.text.tertiary} />
              <Text variant="titleMedium" color={Colors.text.secondary}>Medical History</Text>
              <Text variant="bodySmall" color={Colors.text.tertiary} align="center">No records yet. Add a health record after the next vet visit.</Text>
              <Button label="Add Record" variant="outline" size="sm" onPress={() => {}} />
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
