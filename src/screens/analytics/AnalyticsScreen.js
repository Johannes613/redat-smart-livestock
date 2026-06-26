import React, { useState } from 'react';
import { View, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Badge, ProgressRing } from '../../components/ui';
import { mockAnalytics, mockCamels } from '../../data/mockData';

const { width } = Dimensions.get('window');

function BarChart({ data, color }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 80 }}>
      {data.map((d, i) => (
        <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
          <Text variant="caption" color={Colors.text.tertiary} style={{ fontSize: 9 }}>{d.value}</Text>
          <View style={{ width: '100%', height: (d.value / max) * 60, backgroundColor: color, borderRadius: 4, opacity: 0.8 + (i / data.length) * 0.2 }} />
          <Text variant="caption" color={Colors.text.tertiary} style={{ fontSize: 9 }}>{d.label}</Text>
        </View>
      ))}
    </View>
  );
}

function DonutSegment({ value, total, color }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <ProgressRing value={pct} size={60} strokeWidth={5} color={color} label={`${value}`} />
    </View>
  );
}

const PERIODS = ['Week', 'Month', 'Year'];

export function AnalyticsScreen({ navigation }) {
  const [period, setPeriod] = useState('Month');

  const healthData = [
    { label: 'Mon', value: 72 },
    { label: 'Tue', value: 68 },
    { label: 'Wed', value: 65 },
    { label: 'Thu', value: 71 },
    { label: 'Fri', value: 70 },
    { label: 'Sat', value: 73 },
    { label: 'Sun', value: 70 },
  ];
  const alertData = [
    { label: 'Mon', value: 2 },
    { label: 'Tue', value: 3 },
    { label: 'Wed', value: 4 },
    { label: 'Thu', value: 1 },
    { label: 'Fri', value: 2 },
    { label: 'Sat', value: 0 },
    { label: 'Sun', value: 3 },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4] }}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>
        <Text variant="headlineSmall" style={{ flex: 1 }}>Farm Analytics</Text>
        <Ionicons name="download-outline" size={22} color={Colors.text.tertiary} />
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing[4], gap: Spacing[4], paddingBottom: Spacing[10] }} showsVerticalScrollIndicator={false}>

        {/* Period toggle */}
        <View style={{ flexDirection: 'row', backgroundColor: Colors.bg.card, borderRadius: Radius.lg, padding: 4, borderWidth: 1, borderColor: Colors.border.default }}>
          {PERIODS.map(p => (
            <Pressable key={p} onPress={() => setPeriod(p)} style={{ flex: 1, paddingVertical: 8, borderRadius: Radius.md, backgroundColor: period === p ? Colors.accent : 'transparent', alignItems: 'center' }} accessibilityRole="radio">
              <Text variant="labelSmall" color={period === p ? Colors.white : Colors.text.secondary}>{p}</Text>
            </Pressable>
          ))}
        </View>

        {/* Overall health score */}
        <Card variant="accent" padding={Spacing[5]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[5] }}>
            <ProgressRing
              value={mockAnalytics.avgHealthScore}
              size={100}
              strokeWidth={8}
              color={Colors.accent}
              label={`${mockAnalytics.avgHealthScore.toFixed(0)}`}
              sublabel="avg score"
            />
            <View style={{ flex: 1, gap: Spacing[2] }}>
              <Text variant="overline" color={Colors.text.tertiary}>HERD HEALTH SCORE</Text>
              <Text variant="headlineSmall" color={Colors.accent}>{mockAnalytics.avgHealthScore.toFixed(1)} / 100</Text>
              <Text variant="bodySmall" color={Colors.text.secondary}>{mockCamels.length} camels monitored</Text>
              <Badge label="-2.3 vs last month" color={Colors.warning} size="sm" />
            </View>
          </View>
        </Card>

        {/* Status breakdown */}
        <Card variant="default">
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[4] }}>STATUS BREAKDOWN</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {[
              { label: 'Healthy',    value: mockAnalytics.healthyCount,    color: Colors.success },
              { label: 'Sick',       value: mockAnalytics.sickCount,       color: Colors.error },
              { label: 'Pregnant',   value: mockAnalytics.pregnantCount,   color: Colors.health.pregnant },
              { label: 'Heat Stress',value: mockAnalytics.heatStressCount, color: Colors.health.heatStress },
            ].map(s => (
              <View key={s.label} style={{ alignItems: 'center', gap: Spacing[2] }}>
                <DonutSegment value={s.value} total={mockAnalytics.totalCamels} color={s.color} />
                <Text variant="caption" color={Colors.text.tertiary} align="center">{s.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Health score chart */}
        <Card variant="default">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing[4] }}>
            <Text variant="titleSmall">Health Score Trend</Text>
            <Badge label={period} color={Colors.accent} size="sm" />
          </View>
          <BarChart data={healthData} color={Colors.accent} />
        </Card>

        {/* Alert frequency */}
        <Card variant="default">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing[4] }}>
            <Text variant="titleSmall">Daily Alerts</Text>
            <Badge label="This week" color={Colors.warning} size="sm" />
          </View>
          <BarChart data={alertData} color={Colors.error} />
        </Card>

        {/* Key metrics */}
        <Card variant="default">
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>KEY METRICS</Text>
          {[
            { label: 'Disease Rate',        value: `${(mockAnalytics.diseaseRate * 100).toFixed(1)}%`, icon: 'medical-outline',  color: Colors.error },
            { label: 'Active Alerts',       value: `${mockAnalytics.alertCount}`,                      icon: 'warning-outline',  color: Colors.warning },
            { label: 'Community Posts',     value: `${mockAnalytics.communityPins}`,                   icon: 'pin-outline',      color: Colors.accent },
            { label: 'Collars Active',      value: `${mockCamels.filter(c => c.collarId).length}/${mockCamels.length}`, icon: 'radio-outline',    color: Colors.success },
          ].map((m, i) => (
            <View key={m.label} style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], paddingVertical: Spacing[3], borderTopWidth: i === 0 ? 0 : 1, borderTopColor: Colors.border.muted }}>
              <View style={{ width: 36, height: 36, borderRadius: Radius.md, backgroundColor: m.color + '20', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={m.icon} size={18} color={m.color} />
              </View>
              <Text variant="bodyMedium" color={Colors.text.secondary} style={{ flex: 1 }}>{m.label}</Text>
              <Text variant="titleMedium" color={m.color}>{m.value}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
