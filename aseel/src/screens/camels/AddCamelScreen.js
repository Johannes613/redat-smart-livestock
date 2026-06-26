import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Button, Input } from '../../components/ui';

const BREEDS  = ['Dromedary', 'Bactrian', 'Hybrid'];
const GENDERS = ['Male', 'Female'];

export function AddCamelScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', nameAr: '', breed: 'Dromedary', gender: 'Male', age: '', weight: '', uniqueId: '', collarId: '' });
  const [loading, setLoading] = useState(false);
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigation.goBack(); }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing[4] }}>
          <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Close">
            <Ionicons name="close" size={24} color={Colors.text.primary} />
          </Pressable>
          <Text variant="titleMedium">Add Camel</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: Spacing[4], gap: Spacing[4], paddingBottom: Spacing[10] }} keyboardShouldPersistTaps="handled">
          {/* Photo upload placeholder */}
          <Pressable style={{ alignSelf: 'center', width: 100, height: 100, borderRadius: Radius.xxl, backgroundColor: Colors.bg.elevated, borderWidth: 2, borderColor: Colors.border.accent, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 6 }} accessibilityRole="button" accessibilityLabel="Upload photo">
            <Ionicons name="camera-outline" size={28} color={Colors.accent} />
            <Text variant="caption" color={Colors.accent}>Add Photo</Text>
          </Pressable>

          <Card variant="glass" padding={Spacing[4]} style={{ gap: Spacing[4] }}>
            <Text variant="titleSmall" color={Colors.text.secondary}>Basic Information</Text>
            <Input label="Name (English)" value={form.name}     onChangeText={set('name')}     placeholder="e.g. Zain" required />
            <Input label="Name (Arabic)"  value={form.nameAr}   onChangeText={set('nameAr')}   placeholder="e.g. زين" />
            <Input label="Unique Tag ID"  value={form.uniqueId} onChangeText={set('uniqueId')} placeholder="e.g. AE-006" leftIcon={<Ionicons name="pricetag-outline" size={16} color={Colors.text.tertiary} />} required />
          </Card>

          <Card variant="glass" padding={Spacing[4]} style={{ gap: Spacing[4] }}>
            <Text variant="titleSmall" color={Colors.text.secondary}>Physical Details</Text>

            {/* Breed selector */}
            <View style={{ gap: 6 }}>
              <Text variant="labelMedium" color={Colors.text.secondary}>Breed</Text>
              <View style={{ flexDirection: 'row', gap: Spacing[2] }}>
                {BREEDS.map(b => (
                  <Pressable key={b} onPress={() => set('breed')(b)} style={{ flex: 1, paddingVertical: 10, borderRadius: Radius.md, backgroundColor: form.breed === b ? Colors.accent : Colors.bg.surface, borderWidth: 1, borderColor: form.breed === b ? Colors.accent : Colors.border.default, alignItems: 'center' }} accessibilityRole="radio">
                    <Text variant="labelSmall" color={form.breed === b ? Colors.white : Colors.text.secondary}>{b}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Gender selector */}
            <View style={{ gap: 6 }}>
              <Text variant="labelMedium" color={Colors.text.secondary}>Gender</Text>
              <View style={{ flexDirection: 'row', gap: Spacing[2] }}>
                {GENDERS.map(g => (
                  <Pressable key={g} onPress={() => set('gender')(g)} style={{ flex: 1, paddingVertical: 10, borderRadius: Radius.md, backgroundColor: form.gender === g ? Colors.accent : Colors.bg.surface, borderWidth: 1, borderColor: form.gender === g ? Colors.accent : Colors.border.default, alignItems: 'center' }} accessibilityRole="radio">
                    <Text variant="labelSmall" color={form.gender === g ? Colors.white : Colors.text.secondary}>{g}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
              <Input label="Age (years)"   value={form.age}    onChangeText={set('age')}    placeholder="5"   keyboardType="numeric" containerStyle={{ flex: 1 }} />
              <Input label="Weight (kg)"   value={form.weight} onChangeText={set('weight')} placeholder="500" keyboardType="numeric" containerStyle={{ flex: 1 }} />
            </View>
          </Card>

          <Card variant="glass" padding={Spacing[4]} style={{ gap: Spacing[4] }}>
            <Text variant="titleSmall" color={Colors.text.secondary}>Smart Collar</Text>
            <Input label="Collar ID (optional)" value={form.collarId} onChangeText={set('collarId')} placeholder="e.g. col-06" leftIcon={<Ionicons name="radio-outline" size={16} color={Colors.text.tertiary} />} helperText="Leave blank if no collar is attached." />
          </Card>

          <Button label="Save Camel" onPress={handleSave} loading={loading} fullWidth size="lg" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
