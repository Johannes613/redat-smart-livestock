import React from 'react';
import { View, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily } from '../theme';
import { Text } from '../components/ui';

import { DashboardScreen }  from '../screens/dashboard/DashboardScreen';
import { CamelsScreen }     from '../screens/camels/CamelsScreen';
import { MapScreen }        from '../screens/map/MapScreen';
import { CommunityScreen }  from '../screens/community/CommunityScreen';
import { AlertsScreen }     from '../screens/alerts/AlertsScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ name, focused, label, badge }) {
  return (
    <View style={{ alignItems: 'center', gap: 3, paddingTop: 6 }}>
      <View style={{ position: 'relative' }}>
        <Ionicons
          name={focused ? name : `${name}-outline`}
          size={24}
          color={focused ? Colors.accent : Colors.text.tertiary}
        />
        {badge > 0 && (
          <View style={{ position: 'absolute', top: -4, right: -7, backgroundColor: Colors.error, borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 }}>
            <Text variant="caption" color={Colors.white} style={{ fontSize: 9 }}>{badge > 99 ? '99+' : badge}</Text>
          </View>
        )}
      </View>
      <Text variant="caption" color={focused ? Colors.accent : Colors.text.tertiary} style={{ fontSize: 9.5 }}>{label}</Text>
    </View>
  );
}

function MapTabButton({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{ alignItems: 'center', justifyContent: 'center', top: -16 }}
      accessibilityRole="button"
      accessibilityLabel="Map"
    >
      <View style={{
        width: 58, height: 58, borderRadius: 29,
        backgroundColor: Colors.accent,
        alignItems: 'center', justifyContent: 'center',
        shadowColor: Colors.accent, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.55, shadowRadius: 14, elevation: 10,
      }}>
        <Ionicons name="map" size={28} color={Colors.white} />
      </View>
    </Pressable>
  );
}

export function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bg.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border.default,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="home"          focused={focused} label="Dashboard" /> }}
      />
      <Tab.Screen name="Camels"    component={CamelsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="list"          focused={focused} label="Camels" /> }}
      />
      <Tab.Screen name="Map"       component={MapScreen}
        options={{ tabBarButton: (props) => <MapTabButton {...props} /> }}
      />
      <Tab.Screen name="Community" component={CommunityScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="people"        focused={focused} label="Community" /> }}
      />
      <Tab.Screen name="Alerts"    component={AlertsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon name="notifications" focused={focused} label="Alerts" badge={3} /> }}
      />
    </Tab.Navigator>
  );
}
