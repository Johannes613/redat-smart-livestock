import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Colors, Spacing } from '../../theme';
import { Card, Text, Badge } from '../ui';
import { Ionicons } from '@expo/vector-icons';

function Metric({ icon, label, value, color, alert }) {
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!alert) return;
    const anim = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1.2, duration: 600, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1,   duration: 600, useNativeDriver: true }),
    ]));
    anim.start();
    return () => anim.stop();
  }, [alert]);

  return (
    <View style={{ alignItems: 'center', gap: 4, flex: 1 }}>
      <Animated.View style={alert ? { transform: [{ scale: pulse }] } : undefined}>
        <Ionicons name={icon} size={20} color={color ?? Colors.text.primary} />
      </Animated.View>
      <Text variant="titleSmall" color={color ?? Colors.text.primary}>{value}</Text>
      <Text variant="caption" color={Colors.text.tertiary}>{label}</Text>
    </View>
  );
}

export function CollarWidget({ reading }) {
  const tempAlert = reading.bodyTemp > 39.5;
  const battAlert = reading.batteryLevel < 20;

  return (
    <Card variant="glass" padding={Spacing[4]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing[3] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success }} />
          <Text variant="overline" color={Colors.text.secondary}>LIVE COLLAR</Text>
        </View>
        <Badge label="REAL-TIME" color={Colors.accent} size="sm" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Metric icon="thermometer-outline" label="Body Temp" value={`${reading.bodyTemp.toFixed(1)}°C`} color={tempAlert ? Colors.error : Colors.text.primary} alert={tempAlert} />
        <Metric icon="walk-outline"        label="Activity"  value={`${reading.activityLevel}%`} color={reading.activityLevel < 20 ? Colors.warning : Colors.text.primary} />
        <Metric icon="battery-half-outline" label="Battery"  value={`${reading.batteryLevel}%`} color={battAlert ? Colors.error : Colors.success} alert={battAlert} />
        <Metric icon="wifi-outline"        label="Signal"    value={`${reading.signalStrength}dBm`} color={Colors.info} />
      </View>
    </Card>
  );
}
