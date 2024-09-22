import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  isLoggedIn: boolean;
  socialId: string | null;
  login: (socialId: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist<UserState>(
    set => ({
      isLoggedIn: false,
      socialId: null,
      login: (socialId: string) => set({ isLoggedIn: true, socialId }),
      logout: () => set({ isLoggedIn: false, socialId: null }),
    }),
    {
      name: 'wink-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
