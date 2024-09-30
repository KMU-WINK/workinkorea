import { create } from 'zustand';

interface UserInfoState {
  interests: string[];
  setInterests: (interests: string[]) => void;
}
const useUserInfoStore = create<UserInfoState>(set => ({
  interests: [],
  setInterests: (interests: string[]) => set({ interests }),
}));

export default useUserInfoStore;
