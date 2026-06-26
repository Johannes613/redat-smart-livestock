import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const sharedColors = {
  // Brand
  accent:       '#8100D1',
  accentHover:  '#6a00ad',
  accentLight:  '#9B1FE8',
  accentMuted:  'rgba(129,0,209,0.1)',
  accentBorder: 'rgba(129,0,209,0.2)',
  accentGlow:   'transparent',

  // Semantic
  success:      '#22C55E',
  successMuted: 'rgba(34,197,94,0.15)',
  warning:      '#F59E0B',
  warningMuted: 'rgba(245,158,11,0.15)',
  error:        '#EF4444',
  errorMuted:   'rgba(239,68,68,0.15)',
  info:         '#3B82F6',
  infoMuted:    'rgba(59,130,246,0.15)',

  // Health status
  health: {
    healthy:    '#22C55E',
    sick:       '#EF4444',
    pregnant:   '#EC4899',
    lost:       '#F59E0B',
    heatStress: '#F97316',
    unknown:    '#6B7280',
  },

  // Community pin categories
  pin: {
    water:     '#3B82F6',
    grazing:   '#22C55E',
    danger:    '#EF4444',
    disease:   '#F97316',
    vet:       '#8B5CF6',
    breeding:  '#EC4899',
    feed:      '#EAB308',
    shelter:   '#14B8A6',
    emergency: '#DC2626',
    general:   '#6B7280',
  },

  white:       '#FFFFFF',
  black:       '#000000',
  transparent: 'transparent',
};

export const DarkColors = {
  ...sharedColors,
  isDark: true,
  bg: {
    base:     '#000000',
    surface:  '#121212',
    card:     '#1C1C1E',
    elevated: '#2C2C2E',
    overlay:  'rgba(0,0,0,0.8)',
  },
  text: {
    primary:   '#FFFFFF',
    secondary: '#EBEBF5',
    tertiary:  'rgba(235,235,245,0.6)',
    inverse:   '#000000',
    accent:    '#D180FF',
  },
  border: {
    default: '#38383A',
    muted:   '#2C2C2E',
    accent:  'rgba(129,0,209,0.3)',
    focus:   '#8100D1',
  },
  glass:       'rgba(129,0,209,0.07)',
  glassBorder: 'rgba(129,0,209,0.18)',
};

export const LightColors = {
  ...sharedColors,
  isDark: false,
  bg: {
    base:     '#F2F2F7',
    surface:  '#E5E5EA',
    card:     '#FFFFFF',
    elevated: '#FFFFFF',
    overlay:  'rgba(0,0,0,0.4)',
  },
  text: {
    primary:   '#000000',
    secondary: '#3C3C43',
    tertiary:  'rgba(60,60,67,0.6)',
    inverse:   '#FFFFFF',
    accent:    '#8100D1',
  },
  border: {
    default: '#D1D1D6',
    muted:   '#E5E5EA',
    accent:  'rgba(129,0,209,0.2)',
    focus:   '#8100D1',
  },
  glass:       'rgba(129,0,209,0.04)',
  glassBorder: 'rgba(129,0,209,0.1)',
};

export let isAppDark = true;

export const Colors = { ...DarkColors };

const listeners = new Set();
export function subscribeTheme(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleTheme() {
  isAppDark = !isAppDark;
  Object.assign(Colors, isAppDark ? DarkColors : LightColors);
  listeners.forEach(l => l(isAppDark));
}
