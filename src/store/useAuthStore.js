import create from 'zustand'
import { persist } from "zustand/middleware"
import api from '../api/api'
import mockUser from '../mock/mockUser'

const useAuthStore = create(persist(
  (set, get) => ({
    user: mockUser,
    login: async ({ username, password }) => {

    },
    logout: async () => {

    },
    fetchCurrentUser: async () => {
      set({ user: mockUser })
    },
    clearUser: () => {

    }
  }),
  {
    name: "auth", // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
))

useAuthStore.subscribe((state, prevState) => console.log(state))

export default useAuthStore