import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../../theme';
import { Text } from './Text';

export function ProgressRing({ value = 0, size = 80, strokeWidth = 6, color = Colors.accent, label, sublabel }) {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle cx={cx} cy={cy} r={r} stroke={Colors.border.default} strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={cx} cy={cy} r={r}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" rotation="-90" origin={`${cx},${cy}`}
        />
      </Svg>
      {label && (
        <View style={{ alignItems: 'center' }}>
          <Text variant="titleMedium" color={color}>{label}</Text>
          {sublabel && <Text variant="caption" color={Colors.text.tertiary}>{sublabel}</Text>}
        </View>
      )}
    </View>
  );
}
