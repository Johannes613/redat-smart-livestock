import React, { useState } from 'react';
import { View, Pressable, FlatList, Modal, StyleSheet, Platform, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Badge, Button } from '../../components/ui';
import MapView, { Marker, Callout } from 'react-native-maps';
import { PIN_CONFIG } from '../../components/community/PinCard';
import { mockCamels } from '../../data/mockData';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useAuthStore } from '../../store/useAuthStore';

// MapView requires native modules; show a rich placeholder for web/Expo Go
export function MapScreen({ navigation }) {
  const pins = useCommunityStore(state => state.pins);
  const currentUser = useAuthStore(state => state.currentUser);
  const [selectedPin, setSelectedPin] = useState(null);
  const [layer, setLayer]             = useState('all'); // 'all' | 'camels' | 'pins'

  const LAYER_BUTTONS = [
    { key: 'all',    label: 'All',    icon: 'layers-outline' },
    { key: 'camels', label: 'Camels', icon: 'ellipse-outline' },
    { key: 'pins',   label: 'Pins',   icon: 'pin-outline' },
  ];

  const handleNavigate = (pin) => {
    if (!pin) return;
    setSelectedPin(null);
    const url = Platform.select({
      ios: `maps:0,0?q=${pin.location.latitude},${pin.location.longitude}`,
      android: `geo:0,0?q=${pin.location.latitude},${pin.location.longitude}(${pin.title})`
    });
    Linking.openURL(url).catch(() => Alert.alert('Navigate', 'No mapping app found.'));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg.base }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: currentUser ? currentUser.location.latitude : 23.505,
          longitude: currentUser ? currentUser.location.longitude : 55.808,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        mapType="satellite"
      >
        {/* Home Address */}
        {currentUser && (
          <Marker coordinate={currentUser.location} title="Home (Farm)" description="Your Farm Address">
            <View style={{ backgroundColor: Colors.info, borderRadius: Radius.full, width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.white }}>
              <Ionicons name="home" size={20} color={Colors.white} />
            </View>
          </Marker>
        )}

        {/* Camel Markers */}
        {(layer === 'all' || layer === 'camels') && currentUser && mockCamels.filter(c => c.collarId).map((c, i) => (
          <Marker
            key={c.id}
            coordinate={{ latitude: currentUser.location.latitude + (i * 0.002), longitude: currentUser.location.longitude + (i * 0.002) }}
            onPress={() => navigation.navigate('CamelDetail', { camelId: c.id })}
          >
            <View style={{ alignItems: 'center' }}>
              <View style={{ backgroundColor: Colors.accent, borderRadius: Radius.full, width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.white }}>
                <Text style={{ fontSize: 16 }}>🐪</Text>
              </View>
              <View style={{ backgroundColor: Colors.accent, borderRadius: Radius.sm, paddingHorizontal: 6, paddingVertical: 2, marginTop: 2 }}>
                <Text variant="caption" color={Colors.white}>{c.name}</Text>
              </View>
            </View>
          </Marker>
        ))}

        {/* Community Pins */}
        {(layer === 'all' || layer === 'pins') && pins.map((pin) => {
          const cfg = PIN_CONFIG[pin.category];
          return (
            <Marker
              key={pin.id}
              coordinate={pin.location}
              onPress={() => setSelectedPin(pin)}
            >
              <View style={{ backgroundColor: cfg.color, borderRadius: Radius.full, width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.white }}>
                <Ionicons name={cfg.icon} size={16} color={Colors.white} />
              </View>
            </Marker>
          );
        })}
      </MapView>

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
        style={{ position: 'absolute', bottom: 90, right: Spacing[4], width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center' }}
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
                        <Text variant="caption" color={Colors.text.tertiary}>by {currentUser ? currentUser.name : selectedPin.authorName}</Text>
                      </View>
                      {selectedPin.isVerified && <Ionicons name="checkmark-circle" size={18} color={Colors.success} />}
                    </View>
                    <Text variant="bodySmall" color={Colors.text.secondary}>{selectedPin.description}</Text>
                    <View style={{ flexDirection: 'row', gap: Spacing[3], marginTop: Spacing[4] }}>
                      <Button label="View Details" variant="outline" size="sm" style={{ flex: 1 }} onPress={() => { setSelectedPin(null); navigation.navigate('PinDetail', { pinId: selectedPin.id }); }} />
                      <Button label="Navigate"     variant="primary" size="sm" style={{ flex: 1 }} onPress={() => handleNavigate(selectedPin)} />
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
