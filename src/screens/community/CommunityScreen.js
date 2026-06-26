import React, { useState, useMemo } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Button, Badge } from '../../components/ui';
import { PinCard, PIN_CONFIG } from '../../components/community/PinCard';
import { mockPins } from '../../data/mockData';
import { useCommunityStore } from '../../store/useCommunityStore';

const CATEGORIES = [
  { key: 'all',                 label: 'All' },
  { key: 'water_source',        label: 'Water' },
  { key: 'disease_report',      label: 'Disease' },
  { key: 'good_grazing',        label: 'Grazing' },
  { key: 'danger_zone',         label: 'Danger' },
  { key: 'vet_recommendation',  label: 'Vet' },
  { key: 'feed_available',      label: 'Feed' },
];

export function CommunityScreen({ navigation }) {
  const [category, setCategory] = useState('all');
  const pins = useCommunityStore(state => state.pins);
  const toggleLike = useCommunityStore(state => state.toggleLike);

  const filtered = useMemo(() =>
    category === 'all' ? pins : pins.filter(p => p.category === category),
    [pins, category]
  );

  const handleLike = (pinId) => {
    toggleLike(pinId, 'u1'); // 'u1' is mock user ID
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      {/* Header */}
      <View style={{ padding: Spacing[4], gap: Spacing[4] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text variant="headlineSmall">Community</Text>
            <Text variant="caption" color={Colors.text.tertiary}>Knowledge shared by nearby farmers</Text>
          </View>
          <Button
            label="+ Post"
            size="sm"
            variant="primary"
            onPress={() => navigation.navigate('AddPin')}
            icon={<Ionicons name="add" size={16} color={Colors.white} />}
          />
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
          {[
            { label: 'Pins today',  value: '12',  color: Colors.accent },
            { label: 'Active farmers', value: '34', color: Colors.success },
            { label: 'Alerts nearby', value: '2',  color: Colors.error },
          ].map(s => (
            <View key={s.label} style={{ flex: 1, backgroundColor: Colors.bg.card, borderRadius: Radius.lg, padding: Spacing[3], alignItems: 'center', borderWidth: 1, borderColor: Colors.border.default }}>
              <Text variant="headlineSmall" color={s.color}>{s.value}</Text>
              <Text variant="caption" color={Colors.text.tertiary} align="center">{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Category filter */}
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={i => i.key}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: Spacing[2] }} />}
          renderItem={({ item }) => {
            const active = category === item.key;
            const cfg = item.key !== 'all' ? PIN_CONFIG[item.key] : null;
            return (
              <Pressable
                onPress={() => setCategory(item.key)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 7, paddingHorizontal: 13, borderRadius: Radius.full, backgroundColor: active ? Colors.accent : Colors.bg.card, borderWidth: 1, borderColor: active ? Colors.accent : Colors.border.default }}
                accessibilityRole="button"
              >
                {cfg && <Ionicons name={cfg.icon} size={13} color={active ? Colors.white : cfg.color} />}
                <Text variant="labelSmall" color={active ? Colors.white : Colors.text.secondary}>{item.label}</Text>
              </Pressable>
            );
          }}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={p => p.id}
        contentContainerStyle={{ padding: Spacing[4], paddingTop: 0, gap: Spacing[3], paddingBottom: Spacing[10] }}
        renderItem={({ item }) => (
          <PinCard
            pin={item}
            onPress={() => navigation.navigate('PinDetail', { pinId: item.id })}
            onLike={() => handleLike(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', paddingTop: Spacing[12], gap: Spacing[3] }}>
            <Ionicons name="pin-outline" size={48} color={Colors.text.tertiary} />
            <Text variant="titleMedium" color={Colors.text.secondary}>No pins in this category</Text>
            <Button label="Be the first to post" variant="outline" size="sm" onPress={() => navigation.navigate('AddPin')} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
