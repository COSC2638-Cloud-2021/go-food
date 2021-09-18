import create from 'zustand'
import { persist } from "zustand/middleware"
import api from '../api/api'

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    restaurants: [],
    login: async ({ email, password }) => {
      try {
        const loginRes = await api.post('/auth/login', { email, password })
        const accessToken = loginRes.data
        localStorage.setItem('token', accessToken)
        return accessToken
      }
      catch (e) {
        console.log(e.response)
        return null
      }
    },
    logout: async () => {
      try {
        await api.post('/auth/logout')
        get().clearUser()
      } catch (e) {
        console.log(e.response)
      }
    },
    isOwner: (id) => {
      const { restaurants: stores } = get()
      return stores.findIndex(store => String(store.id) === String(id)) !== -1
    },
    isAdmin: () => {
      const { user } = get() || {}
      return user?.role === 'admin'
    },
    fetchCurrentUser: async () => {
      try {
        const token = localStorage.getItem('token')
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const res = await api.get('accounts/me')
        const user = res.data
        const restaurantRes = await api.get('accounts/me/restaurants')
        const restaurants = restaurantRes.data
        set({ user, restaurants })
        return get().user
      } catch (e) {
        console.log(e.response)
        get().clearUser()
        return null
      }
    },
    clearUser: async () => {
      console.log('Clear user!')
      api.defaults.headers.common['Authorization'] = ``
      localStorage.setItem('token', '')
      set({ user: null, restaurants: [] })
    },
  }),
  {
    name: "auth", // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
))

useAuthStore.subscribe((state, prevState) => console.log(state))

export default useAuthStore