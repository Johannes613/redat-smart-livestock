import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Button, Input, Card, Badge } from '../../components/ui';
import * as Location from 'expo-location';
import { useAuthStore } from '../../store/useAuthStore';
import { Alert } from 'react-native';

export function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [locLoading, setLocLoading] = useState(false);

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));
  const register = useAuthStore(state => state.register);

  const handleGetLocation = async () => {
    setLocLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required to set your home farm location.');
      setLocLoading(false);
      return;
    }
    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    } catch (e) {
      Alert.alert('Error', 'Could not fetch location.');
    } finally {
      setLocLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !location) {
      Alert.alert('Missing Info', 'Please fill all fields and set your home location.');
      return;
    }
    setLoading(true);
    try {
      register({ ...form, location });
    } catch (e) {
      Alert.alert('Registration Failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }}>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: Spacing[6] }} keyboardShouldPersistTaps="handled">

          {/* Back */}
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} onPress={() => navigation.goBack()} style={{ marginBottom: Spacing[6] }} />

          <View style={{ alignItems: 'center', marginBottom: Spacing[8] }}>
            <View style={{ width: 100, height: 100, borderRadius: Radius.xl, backgroundColor: Colors.accentMuted, borderWidth: 1, borderColor: Colors.accentBorder, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing[3], overflow: 'hidden', padding: Spacing[2] }}>
              <Image source={require('../../../assets/redat_ai.png')} style={{ width: '100%', height: '100%', tintColor: Colors.accent }} resizeMode="contain" />
            </View>
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

            <View style={{ marginTop: Spacing[2] }}>
              <Text variant="labelMedium" style={{ marginBottom: Spacing[2] }}>Home Farm Location *</Text>
              {location ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[3], backgroundColor: Colors.success + '20', borderRadius: 8, borderWidth: 1, borderColor: Colors.success }}>
                  <Ionicons name="location" size={20} color={Colors.success} />
                  <View style={{ flex: 1 }}>
                    <Text variant="bodySmall" color={Colors.success}>Location Acquired</Text>
                    <Text variant="caption" color={Colors.text.secondary}>{location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E</Text>
                  </View>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                </View>
              ) : (
                <Button label="Get Current Location" variant="outline" onPress={handleGetLocation} loading={locLoading} icon={<Ionicons name="locate" size={18} color={Colors.accent} />} />
              )}
            </View>

            <Button label="Create Account" onPress={handleRegister} loading={loading} fullWidth size="lg" style={{ marginTop: Spacing[4] }} />

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
