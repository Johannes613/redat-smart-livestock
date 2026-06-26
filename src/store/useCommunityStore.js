import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockPins } from '../data/mockData';

export const useCommunityStore = create(
  persist(
    (set) => ({
      pins: mockPins, // Initialize with mock pins
      addPin: (newPin) => set((state) => ({ pins: [newPin, ...state.pins] })),
      addComment: (pinId, comment) => set((state) => ({
        pins: state.pins.map(p => 
          p.id === pinId 
            ? { ...p, comments: [comment, ...p.comments] } 
            : p
        )
      })),
      toggleLike: (pinId, userId) => set((state) => ({
        pins: state.pins.map(p => {
          if (p.id !== pinId) return p;
          const isLiked = p.likedBy?.includes(userId);
          return {
            ...p,
            likes: isLiked ? p.likes - 1 : p.likes + 1,
            likedBy: isLiked ? p.likedBy.filter(id => id !== userId) : [...(p.likedBy || []), userId],
          };
        })
      })),
    }),
    {
      name: 'redat-community-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
