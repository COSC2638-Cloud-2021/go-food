import create from 'zustand'
import { persist } from "zustand/middleware"
import api from '../api/api'

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    login: async ({ username, password }) => {

    },
    logout: async () => {

    },
    fetchCurrentUser: async () => {

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