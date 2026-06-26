import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../theme';
import { Text, Button, Input, Card } from '../../components/ui';

export function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigation.replace('MainTabs'); }, 1200);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }}>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: Spacing[6] }} keyboardShouldPersistTaps="handled">

          {/* Back */}
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} onPress={() => navigation.goBack()} style={{ marginBottom: Spacing[6] }} />

          <View style={{ marginBottom: Spacing[8] }}>
            <Text variant="headlineMedium">Create Account</Text>
            <Text variant="bodyMedium" color={Colors.text.secondary} style={{ marginTop: 4 }}>
              Join the REDAT farming community
            </Text>
          </View>

          <Card variant="glass" padding={Spacing[6]} style={{ gap: Spacing[4] }}>
            <Input label="Full Name"    value={form.name}     onChangeText={set('name')}     placeholder="Mohammed Al Mansoori" leftIcon={<Ionicons name="person-outline"       size={18} color={Colors.text.tertiary} />} required />
            <Input label="Phone"        value={form.phone}    onChangeText={set('phone')}    placeholder="+971 50 000 0000"     leftIcon={<Ionicons name="call-outline"         size={18} color={Colors.text.tertiary} />} keyboardType="phone-pad" required />
            <Input label="Email"        value={form.email}    onChangeText={set('email')}    placeholder="you@farm.ae"          leftIcon={<Ionicons name="mail-outline"         size={18} color={Colors.text.tertiary} />} keyboardType="email-address" autoCapitalize="none" />
            <Input label="Password"     value={form.password} onChangeText={set('password')} placeholder="Min. 8 characters"    leftIcon={<Ionicons name="lock-closed-outline" size={18} color={Colors.text.tertiary} />} secureTextEntry required />

            <Button label="Create Account" onPress={handleRegister} loading={loading} fullWidth size="lg" style={{ marginTop: Spacing[2] }} />

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: Spacing[2] }}>
              <Text variant="bodySmall" color={Colors.text.secondary}>Already have an account?</Text>
              <Text variant="bodySmall" color={Colors.accent} onPress={() => navigation.goBack()}>Sign In</Text>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
