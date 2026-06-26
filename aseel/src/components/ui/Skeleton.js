import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { Colors, Radius } from '../../theme';

export function Skeleton({ width = '100%', height = 16, borderRadius = Radius.sm, style }) {
  const opacity = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return <Animated.View style={[{ width, height, borderRadius, backgroundColor: Colors.bg.elevated, opacity }, style]} />;
}

export function SkeletonCard({ style }) {
  return (
    <View style={[{ backgroundColor: Colors.bg.card, borderRadius: Radius.xl, padding: 16, gap: 12, borderWidth: 1, borderColor: Colors.border.muted }, style]}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Skeleton width={48} height={48} borderRadius={Radius.full} />
        <View style={{ flex: 1, gap: 6 }}>
          <Skeleton height={14} width="60%" />
          <Skeleton height={11} width="40%" />
        </View>
      </View>
      <Skeleton height={11} />
      <Skeleton height={11} width="75%" />
    </View>
  );
}
