import React, { useState } from 'react';
import { View, Pressable, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Badge, Button } from '../../components/ui';
import { PIN_CONFIG } from '../../components/community/PinCard';
import { mockCamels, mockPins } from '../../data/mockData';

// MapView requires native modules; show a rich placeholder for web/Expo Go
export function MapScreen({ navigation }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const [layer, setLayer]             = useState('all'); // 'all' | 'camels' | 'pins'

  const LAYER_BUTTONS = [
    { key: 'all',    label: 'All',    icon: 'layers-outline' },
    { key: 'camels', label: 'Camels', icon: 'ellipse-outline' },
    { key: 'pins',   label: 'Pins',   icon: 'pin-outline' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg.base }}>
      {/* Map placeholder */}
      <View style={{ flex: 1, backgroundColor: '#0D0D1F', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Grid lines to simulate map */}
        {[...Array(8)].map((_, i) => (
          <View key={`h${i}`} style={{ position: 'absolute', top: `${i * 14}%`, left: 0, right: 0, height: 1, backgroundColor: Colors.border.muted, opacity: 0.5 }} />
        ))}
        {[...Array(6)].map((_, i) => (
          <View key={`v${i}`} style={{ position: 'absolute', left: `${i * 20}%`, top: 0, bottom: 0, width: 1, backgroundColor: Colors.border.muted, opacity: 0.5 }} />
        ))}

        <View style={{ alignItems: 'center', gap: Spacing[3] }}>
          <Ionicons name="map" size={64} color={Colors.accentMuted} />
          <Text variant="titleMedium" color={Colors.text.tertiary} align="center">Satellite Map</Text>
          <Text variant="bodySmall" color={Colors.text.tertiary} align="center" style={{ maxWidth: 240 }}>
            Google Maps integration requires a native build.{'\n'}Run with EAS Build to see live map.
          </Text>
        </View>

        {/* Camel marker pins (decorative) */}
        {mockCamels.filter(c => c.collarId).map((c, i) => (
          <Pressable
            key={c.id}
            style={{ position: 'absolute', top: `${20 + i * 10}%`, left: `${25 + i * 12}%` }}
            onPress={() => navigation.navigate('CamelDetail', { camelId: c.id })}
            accessibilityRole="button"
            accessibilityLabel={`Camel ${c.name}`}
          >
            <View style={{ backgroundColor: Colors.accent, borderRadius: Radius.full, width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.white }}>
              <Text style={{ fontSize: 16 }}>🐪</Text>
            </View>
            <View style={{ backgroundColor: Colors.accent, alignSelf: 'center', borderRadius: Radius.sm, paddingHorizontal: 6, paddingVertical: 2, marginTop: 2 }}>
              <Text variant="caption" color={Colors.white}>{c.name}</Text>
            </View>
          </Pressable>
        ))}

        {/* Community pin markers */}
        {mockPins.map((pin, i) => {
          const cfg = PIN_CONFIG[pin.category];
          return (
            <Pressable
              key={pin.id}
              style={{ position: 'absolute', top: `${35 + i * 12}%`, left: `${55 + i * 8}%` }}
              onPress={() => setSelectedPin(pin)}
              accessibilityRole="button"
              accessibilityLabel={pin.title}
            >
              <View style={{ backgroundColor: cfg.color, borderRadius: Radius.full, width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.white }}>
                <Ionicons name={cfg.icon} size={16} color={Colors.white} />
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Top overlay */}
      <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0 }} edges={['top']}>
        <View style={{ padding: Spacing[4], gap: Spacing[3] }}>
          {/* Layer toggle */}
          <View style={{ flexDirection: 'row', gap: Spacing[2], alignSelf: 'center', backgroundColor: Colors.bg.overlay, borderRadius: Radius.full, padding: 4, borderWidth: 1, borderColor: Colors.border.default }}>
            {LAYER_BUTTONS.map(b => (
              <Pressable
                key={b.key}
                onPress={() => setLayer(b.key)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingHorizontal: 12, borderRadius: Radius.full, backgroundColor: layer === b.key ? Colors.accent : 'transparent' }}
                accessibilityRole="radio"
              >
                <Ionicons name={b.icon} size={14} color={layer === b.key ? Colors.white : Colors.text.secondary} />
                <Text variant="labelSmall" color={layer === b.key ? Colors.white : Colors.text.secondary}>{b.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </SafeAreaView>

      {/* Add pin FAB */}
      <Pressable
        onPress={() => navigation.navigate('AddPin')}
        style={{ position: 'absolute', bottom: 90, right: Spacing[4], width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.accent, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.55, shadowRadius: 14, elevation: 10 }}
        accessibilityRole="button" accessibilityLabel="Add community pin"
      >
        <Ionicons name="add" size={28} color={Colors.white} />
      </Pressable>

      {/* Pin detail modal */}
      <Modal visible={!!selectedPin} transparent animationType="slide" onRequestClose={() => setSelectedPin(null)}>
        <Pressable style={{ flex: 1 }} onPress={() => setSelectedPin(null)}>
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <Pressable>
              <Card variant="elevated" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, margin: 0, borderRadius: Radius.xxl }}>
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: Colors.border.default, alignSelf: 'center', marginBottom: Spacing[4] }} />
                {selectedPin && (
                  <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], marginBottom: Spacing[3] }}>
                      <View style={{ width: 44, height: 44, borderRadius: Radius.lg, backgroundColor: PIN_CONFIG[selectedPin.category].color + '20', alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name={PIN_CONFIG[selectedPin.category].icon} size={22} color={PIN_CONFIG[selectedPin.category].color} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text variant="titleMedium">{selectedPin.title}</Text>
                        <Text variant="caption" color={Colors.text.tertiary}>by {selectedPin.authorName}</Text>
                      </View>
                      {selectedPin.isVerified && <Ionicons name="checkmark-circle" size={18} color={Colors.success} />}
                    </View>
                    <Text variant="bodySmall" color={Colors.text.secondary}>{selectedPin.description}</Text>
                    <View style={{ flexDirection: 'row', gap: Spacing[3], marginTop: Spacing[4] }}>
                      <Button label="View Details" variant="outline" size="sm" style={{ flex: 1 }} onPress={() => { setSelectedPin(null); navigation.navigate('PinDetail', { pinId: selectedPin.id }); }} />
                      <Button label="Navigate"     variant="primary" size="sm" style={{ flex: 1 }} onPress={() => setSelectedPin(null)} />
                    </View>
                  </>
                )}
              </Card>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
