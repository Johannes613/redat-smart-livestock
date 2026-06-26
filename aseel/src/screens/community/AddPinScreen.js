import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Button, Input, Badge } from '../../components/ui';
import { PIN_CONFIG } from '../../components/community/PinCard';

const CATEGORIES = Object.entries(PIN_CONFIG).map(([key, cfg]) => ({ key, ...cfg }));

export function AddPinScreen({ navigation }) {
  const [form, setForm] = useState({ title: '', description: '', category: 'water_source' });
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const handlePost = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigation.goBack(); }, 1000);
  };

  const selectedCfg = PIN_CONFIG[form.category];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing[4] }}>
          <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Close">
            <Ionicons name="close" size={24} color={Colors.text.primary} />
          </Pressable>
          <Text variant="titleMedium">Post to Community</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: Spacing[4], gap: Spacing[4], paddingBottom: Spacing[10] }} keyboardShouldPersistTaps="handled">

          {/* Category picker */}
          <View>
            <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>SELECT CATEGORY</Text>
            <FlatList
              horizontal
              data={CATEGORIES}
              keyExtractor={i => i.key}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: Spacing[2] }} />}
              renderItem={({ item }) => {
                const active = form.category === item.key;
                return (
                  <Pressable
                    onPress={() => set('category')(item.key)}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 12, borderRadius: Radius.full, backgroundColor: active ? item.color + '20' : Colors.bg.card, borderWidth: 1, borderColor: active ? item.color : Colors.border.default }}
                    accessibilityRole="radio"
                  >
                    <Ionicons name={item.icon} size={15} color={active ? item.color : Colors.text.tertiary} />
                    <Text variant="labelSmall" color={active ? item.color : Colors.text.secondary}>{item.label}</Text>
                  </Pressable>
                );
              }}
            />
          </View>

          {/* Selected category preview */}
          <Card variant="glass" padding={Spacing[3]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
              <View style={{ width: 40, height: 40, borderRadius: Radius.lg, backgroundColor: selectedCfg.color + '20', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={selectedCfg.icon} size={20} color={selectedCfg.color} />
              </View>
              <View>
                <Badge label={selectedCfg.label} color={selectedCfg.color} size="sm" />
                <Text variant="caption" color={Colors.text.tertiary} style={{ marginTop: 2 }}>Category selected</Text>
              </View>
            </View>
          </Card>

          {/* Form */}
          <Card variant="glass" padding={Spacing[4]} style={{ gap: Spacing[4] }}>
            <Input label="Title" value={form.title} onChangeText={set('title')} placeholder="Brief title for your post" required />
            <Input label="Description" value={form.description} onChangeText={set('description')} placeholder="Describe what you found or observed..." multiline numberOfLines={4} style={{ height: 100, textAlignVertical: 'top' }} required />
          </Card>

          {/* Media */}
          <Card variant="glass" padding={Spacing[4]} style={{ gap: Spacing[3] }}>
            <Text variant="titleSmall" color={Colors.text.secondary}>Attach Media</Text>
            <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
              <Pressable style={{ flex: 1, height: 80, borderRadius: Radius.lg, backgroundColor: Colors.bg.elevated, borderWidth: 1, borderColor: Colors.border.accent, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4 }} accessibilityRole="button" accessibilityLabel="Add photo">
                <Ionicons name="camera-outline" size={22} color={Colors.accent} />
                <Text variant="caption" color={Colors.accent}>Photo</Text>
              </Pressable>
              <Pressable style={{ flex: 1, height: 80, borderRadius: Radius.lg, backgroundColor: Colors.bg.elevated, borderWidth: 1, borderColor: Colors.border.accent, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4 }} accessibilityRole="button" accessibilityLabel="Add video">
                <Ionicons name="videocam-outline" size={22} color={Colors.accent} />
                <Text variant="caption" color={Colors.accent}>Video</Text>
              </Pressable>
              <Pressable
                onPress={() => setRecording(r => !r)}
                style={{ flex: 1, height: 80, borderRadius: Radius.lg, backgroundColor: recording ? Colors.error + '20' : Colors.bg.elevated, borderWidth: 1, borderColor: recording ? Colors.error : Colors.border.accent, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                accessibilityRole="button"
                accessibilityLabel={recording ? 'Stop recording' : 'Record voice note'}
              >
                <Ionicons name={recording ? 'stop-circle' : 'mic-outline'} size={22} color={recording ? Colors.error : Colors.accent} />
                <Text variant="caption" color={recording ? Colors.error : Colors.accent}>{recording ? 'Stop' : 'Voice'}</Text>
              </Pressable>
            </View>
            {recording && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: Colors.errorMuted, borderRadius: Radius.md }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error }} />
                <Text variant="caption" color={Colors.error}>Recording Arabic voice note...</Text>
              </View>
            )}
          </Card>

          {/* Location */}
          <Card variant="glass" padding={Spacing[3]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
              <Ionicons name="location-outline" size={20} color={Colors.success} />
              <View style={{ flex: 1 }}>
                <Text variant="labelMedium">Current Location</Text>
                <Text variant="caption" color={Colors.text.tertiary}>23.5021°N, 55.8034°E — Al Qua'a</Text>
              </View>
              <Badge label="GPS" color={Colors.success} size="sm" />
            </View>
          </Card>

          <Button label="Post to Community" onPress={handlePost} loading={loading} fullWidth size="lg" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
