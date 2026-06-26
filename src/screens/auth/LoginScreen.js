import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Button, Input, Card } from '../../components/ui';

export function LoginScreen({ navigation }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainTabs');
    }, 1200);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }}>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: Spacing[6] }} keyboardShouldPersistTaps="handled">

          {/* Logo */}
          <View style={{ alignItems: 'center', marginTop: Spacing[10], marginBottom: Spacing[10] }}>
            <View style={{ width: 80, height: 80, borderRadius: Radius.xxl, backgroundColor: Colors.accentMuted, borderWidth: 1, borderColor: Colors.accentBorder, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing[4] }}>
              <Text style={{ fontSize: 40 }}>🐪</Text>
            </View>
            <Text variant="headlineLarge" color={Colors.accent} align="center">REDAT</Text>
            <Text variant="bodySmall" color={Colors.text.secondary} align="center" style={{ marginTop: 4 }}>
              AI Smart Camel Guardian
            </Text>
          </View>

          {/* Form */}
          <Card variant="glass" padding={Spacing[6]} style={{ gap: Spacing[4] }}>
            <Text variant="titleLarge" align="center">Welcome back</Text>
            <Text variant="bodySmall" color={Colors.text.secondary} align="center">
              Sign in to your farm account
            </Text>

            <Input
              label="Email / Phone"
              value={email}
              onChangeText={setEmail}
              placeholder="you@farm.ae"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Ionicons name="person-outline" size={18} color={Colors.text.tertiary} />}
              required
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPass}
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={Colors.text.tertiary} />}
              rightIcon={<Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.text.tertiary} />}
              onRightIconPress={() => setShowPass(v => !v)}
              required
            />

            <Button label="Sign In" onPress={handleLogin} loading={loading} fullWidth size="lg" style={{ marginTop: Spacing[2] }} />

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: Spacing[2] }}>
              <Text variant="bodySmall" color={Colors.text.secondary}>Don't have an account?</Text>
              <Text variant="bodySmall" color={Colors.accent} onPress={() => navigation.navigate('Register')}>Register</Text>
            </View>
          </Card>

          {/* Demo notice */}
          <View style={{ marginTop: Spacing[6], alignItems: 'center' }}>
            <Text variant="caption" color={Colors.text.tertiary} align="center">
              Demo mode — tap Sign In to explore the app
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
