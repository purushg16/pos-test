import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface AuthStore {
  currentUser: string | undefined;
  setCurrentUser: (username: string | undefined) => void;

  success: boolean;
  setSucces: (status: boolean) => void;

  err: string | undefined;
  setErr: (err: string | undefined) => void;
}

const authStore = create<AuthStore>((set) => ({
  currentUser: undefined,
  success: false,
  err: undefined,

  setCurrentUser: (username) => set(() => ({ currentUser: username })),
  setSucces: (boolean) => set(() => ({ success: boolean })),

  setErr: (err) => set(() => ({ err: err })),
}));

// const authStore = create<AuthStore>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         currentUser: undefined,
//         token: undefined,
//         setCurrentUser: (username) => set(() => ({ currentUser: username })),
//         setToken: (token) => set(() => ({ token: token })),
//       }),
//       {
//         name: "token",
//         partialize: (state) => ({ token: state.token }),
//         storage: createJSONStorage(() => sessionStorage),
//       }
//     )
//   )
// );

export default authStore;
