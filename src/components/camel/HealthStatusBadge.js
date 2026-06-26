import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../theme';
import { Badge } from '../ui';

export const STATUS_CONFIG = {
  healthy:    { label: 'Healthy',     color: Colors.health.healthy },
  sick:       { label: 'Sick',        color: Colors.health.sick },
  pregnant:   { label: 'Pregnant',    color: Colors.health.pregnant },
  lost:       { label: 'Lost',        color: Colors.health.lost },
  heat_stress:{ label: 'Heat Stress', color: Colors.health.heatStress },
  unknown:    { label: 'Unknown',     color: Colors.health.unknown },
};

export function HealthStatusBadge({ status, size = 'md', showDot = true }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {showDot && <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: cfg.color }} />}
      <Badge label={cfg.label} color={cfg.color} size={size} />
    </View>
  );
}
