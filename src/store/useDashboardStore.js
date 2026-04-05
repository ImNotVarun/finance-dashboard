// src/store/useDashboardStore.js
import { create } from 'zustand';

// Accent palettes per role
export const ACCENTS = {
    viewer: {
        rgb: '139,92,246',
        hex: '#a78bfa',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        glow: 'rgba(139,92,246,',
    },
    admin: {
        rgb: '239,68,68',
        hex: '#f87171',
        gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        glow: 'rgba(239,68,68,',
    },
};

export const useDashboardStore = create((set) => ({
    role: 'viewer',
    theme: 'dark', // 'dark' | 'light'
    transactions: [],

    page: 'home',
    setPage: (page) => set({ page }),

    setRole: (newRole) => set({ role: newRole }),
    setTheme: (t) => set({ theme: t }),
    toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

    setTransactions: (data) => set({ transactions: data }),
    addTransaction: (newTransaction) =>
        set((state) => ({ transactions: [newTransaction, ...state.transactions] })),

    filters: { type: 'all', search: '' },
    setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));