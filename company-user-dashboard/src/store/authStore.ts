import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem('token') || null,
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem('token');
    set({ token: null });
  },
}));

export default useAuthStore;