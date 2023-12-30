import { create } from "zustand";

interface UserType {
  currentUserType: string | undefined;
  setCurrentUserType: (type: string) => void;
}

const useTokenStore = create<UserType>((set) => ({
  currentUserType: undefined,
  setCurrentUserType: (type) => set(() => ({ currentUserType: type })),
}));

export default useTokenStore;
