import React, { useState, useMemo } from 'react';
import { View, FlatList, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontFamily, FontSize } from '../../theme';
import { Text, Badge, Button } from '../../components/ui';
import { CamelCard } from '../../components/camel/CamelCard';
import { mockCamels } from '../../data/mockData';

const FILTERS = ['All', 'Healthy', 'Sick', 'Pregnant', 'Heat Stress', 'Lost'];

export function CamelsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    return mockCamels.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.uniqueId.includes(search);
      const matchFilter =
        filter === 'All'         ? true :
        filter === 'Healthy'     ? c.healthStatus === 'healthy' :
        filter === 'Sick'        ? c.healthStatus === 'sick' :
        filter === 'Pregnant'    ? c.healthStatus === 'pregnant' :
        filter === 'Heat Stress' ? c.healthStatus === 'heat_stress' :
        filter === 'Lost'        ? c.healthStatus === 'lost' : true;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      {/* Header */}
      <View style={{ padding: Spacing[4], gap: Spacing[4] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text variant="headlineSmall">My Herd</Text>
            <Text variant="caption" color={Colors.text.tertiary}>{mockCamels.length} camels registered</Text>
          </View>
          <Button
            label="+ Add"
            variant="primary"
            size="sm"
            onPress={() => navigation.navigate('AddCamel')}
            icon={<Ionicons name="add" size={16} color={Colors.white} />}
          />
        </View>

        {/* Search */}
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.bg.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border.default, paddingHorizontal: Spacing[3], height: 44, gap: Spacing[2] }}>
          <Ionicons name="search-outline" size={18} color={Colors.text.tertiary} />
          <TextInput
            style={{ flex: 1, fontFamily: FontFamily.mono, fontSize: FontSize.base, color: Colors.text.primary }}
            placeholder="Search by name or ID..."
            placeholderTextColor={Colors.text.tertiary}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={Colors.text.tertiary} />
            </Pressable>
          )}
        </View>

        {/* Filter chips */}
        <FlatList
          horizontal
          data={FILTERS}
          keyExtractor={i => i}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: Spacing[2] }} />}
          renderItem={({ item }) => {
            const active = filter === item;
            return (
              <Pressable
                onPress={() => setFilter(item)}
                style={{ paddingVertical: 6, paddingHorizontal: 14, borderRadius: Radius.full, backgroundColor: active ? Colors.accent : Colors.bg.card, borderWidth: 1, borderColor: active ? Colors.accent : Colors.border.default }}
                accessibilityRole="button"
              >
                <Text variant="labelSmall" color={active ? Colors.white : Colors.text.secondary}>{item}</Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={c => c.id}
        contentContainerStyle={{ padding: Spacing[4], paddingTop: 0, gap: Spacing[2], paddingBottom: Spacing[10] }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing[2] }} />}
        renderItem={({ item }) => (
          <CamelCard camel={item} onPress={() => navigation.navigate('CamelDetail', { camelId: item.id })} />
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', paddingTop: Spacing[16], gap: Spacing[3] }}>
            <Ionicons name="search-outline" size={48} color={Colors.text.tertiary} />
            <Text variant="titleMedium" color={Colors.text.secondary}>No camels found</Text>
            <Text variant="bodySmall" color={Colors.text.tertiary} align="center">Try adjusting your search or filter.</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
