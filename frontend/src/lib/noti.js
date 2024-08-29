import axios from 'axios';
import { create } from 'zustand'
import { apiUrl } from './loaders';

export const useNotifStore = create((set) => ({
    number: 0,
    fetch: async () => {
        const res = await axios.get(`${apiUrl}/api/v1/user/notification`,  { withCredentials: true })
        console.log("from notif",res)
        set({ number: res.data })
    },
    decrease: () => {
        set((prev) => ({ number: prev.number - 1 }));
    },
    reset: () => {
        set({ number: 0 });
    }
}))