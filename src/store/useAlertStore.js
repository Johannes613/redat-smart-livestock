import { create } from 'zustand';
import { mockAlerts } from '../data/mockData';

export const useAlertStore = create((set) => ({
  alerts: mockAlerts,
  dismissAlert: (id) => set((state) => ({
    alerts: state.alerts.filter(a => a.id !== id)
  })),
  markAsRead: (id) => set((state) => ({
    alerts: state.alerts.map(a => a.id === id ? { ...a, isRead: true } : a)
  })),
  markAllAsRead: () => set((state) => ({
    alerts: state.alerts.map(a => ({ ...a, isRead: true }))
  }))
}));
