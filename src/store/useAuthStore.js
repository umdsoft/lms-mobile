import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

const secureStorage = {
  getItem: async (name) => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch (error) {
      console.warn('SecureStore getItem error', error);
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.warn('SecureStore setItem error', error);
    }
  },
  removeItem: async (name) => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.warn('SecureStore removeItem error', error);
    }
  }
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isHydrated: false,
      login: ({ user, token }) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      setHydrated: () => set({ isHydrated: true })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      }
    }
  )
);
