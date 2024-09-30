import { create } from 'zustand';

interface UserInterestState {
  interests: string[];
  setInterests: (interests: string[]) => void;
}
const useUserInterestStore = create<UserInterestState>(set => ({
  interests: [],
  setInterests: (interests: string[]) => set({ interests }),
}));

export default useUserInterestStore;
