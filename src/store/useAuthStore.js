import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUser, mockFarm } from '../data/mockData';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      users: [
        {
          id: mockUser.id,
          name: mockUser.name,
          email: 'demo@farm.ae',
          password: 'password', // Extremely simple for demo purposes
          phone: mockUser.phone,
          location: mockFarm.location,
          farmName: mockFarm.name,
        }
      ],
      currentUser: null,
      isAuthenticated: false,

      register: (userData) => {
        const newUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email.toLowerCase(),
          password: userData.password,
          phone: userData.phone,
          location: userData.location, // From GPS
          farmName: `${userData.name.split(' ')[0]}'s Farm`,
        };

        set((state) => {
          // Prevent duplicate emails
          if (state.users.find(u => u.email === newUser.email)) {
            throw new Error('Email already registered');
          }
          return {
            users: [...state.users, newUser],
            currentUser: newUser,
            isAuthenticated: true,
          };
        });
      },

      login: (email, password) => {
        const { users } = get();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
        } else {
          throw new Error('Invalid email or password');
        }
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },
    }),
    {
      name: 'redat-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
