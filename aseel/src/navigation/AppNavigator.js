import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../theme';

import { TabNavigator }       from './TabNavigator';
import { LoginScreen }        from '../screens/auth/LoginScreen';
import { RegisterScreen }     from '../screens/auth/RegisterScreen';
import { CamelDetailScreen }  from '../screens/camels/CamelDetailScreen';
import { AddCamelScreen }     from '../screens/camels/AddCamelScreen';
import { PinDetailScreen }    from '../screens/community/PinDetailScreen';
import { AddPinScreen }       from '../screens/community/AddPinScreen';
import { ChatScreen }         from '../screens/chat/ChatScreen';
import { NotificationsScreen }from '../screens/notifications/NotificationsScreen';
import { AnalyticsScreen }    from '../screens/analytics/AnalyticsScreen';
import { ProfileScreen }      from '../screens/profile/ProfileScreen';
import { SettingsScreen }     from '../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: Colors.bg.base },
  animation: 'slide_from_right',
};

export function AppNavigator() {
  // In a real app this would check auth state from context/store
  const isAuthenticated = true;

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary:    Colors.accent,
          background: Colors.bg.base,
          card:       Colors.bg.surface,
          text:       Colors.text.primary,
          border:     Colors.border.default,
          notification: Colors.error,
        },
      }}
    >
      <Stack.Navigator screenOptions={screenOptions}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login"    component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs"      component={TabNavigator} />
            <Stack.Screen name="CamelDetail"   component={CamelDetailScreen} />
            <Stack.Screen name="AddCamel"      component={AddCamelScreen}    options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="PinDetail"     component={PinDetailScreen} />
            <Stack.Screen name="AddPin"        component={AddPinScreen}      options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
            <Stack.Screen name="Chat"          component={ChatScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Analytics"     component={AnalyticsScreen} />
            <Stack.Screen name="Profile"       component={ProfileScreen} />
            <Stack.Screen name="Settings"      component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
