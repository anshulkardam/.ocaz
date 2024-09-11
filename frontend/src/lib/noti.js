import axios from 'axios';
import { create } from 'zustand'

export const useNotifStore = create((set) => ({
    number: 0,
    fetch: async () => {
        const res = await axios.get("https://ocaz.onrender.com/api/v1/user/notification",  { withCredentials: true })
        set({ number: res.data })
    },
    decrease: () => {
        set((prev) => ({ number: prev.number - 1 }));
    },
    reset: () => {
        set({ number: 0 });
    }
}))