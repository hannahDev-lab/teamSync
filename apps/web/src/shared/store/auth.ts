import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  isLogin: boolean
}

interface AuthActions {
  setToken: (token: string) => void
  clearToken: () => void
}
export const useAuthStore = create<AuthState & AuthActions>(set => ({
  accessToken: null,
  isLogin: false,
  setToken: (token: string) =>
    set(() => ({ accessToken: token, isLogin: true })),
  clearToken: () => set(() => ({ accessToken: null, isLogin: false })),
}))
