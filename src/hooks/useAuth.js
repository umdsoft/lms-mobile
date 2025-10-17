import { useEffect } from 'react';

import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!isHydrated) {
      useAuthStore.persist.rehydrate();
    }
  }, [isHydrated]);

  return {
    token,
    user,
    login,
    logout,
    isHydrated
  };
}
