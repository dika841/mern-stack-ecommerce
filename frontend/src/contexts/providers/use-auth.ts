import cookiesStorage from '@/utils/cookie-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IAuthStore {
  token: string | null
  signIn: (token: string) => void
  signOut: () => void
}
export const useAuth = create(
  persist<IAuthStore>(
    (set) => ({
      token: null,
      signIn: (token) => set({ token }),
      signOut: () => set({ token: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => cookiesStorage),
    },
  ),
)
