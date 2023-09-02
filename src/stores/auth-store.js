import { defineStore } from 'pinia'
import { useAuthUser } from 'src/composables/useAuthUser'

const authUser = useAuthUser()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login (credentials) {
      try {
        const data = await authUser.login(credentials)
        if (data.message) {
          return data.message
        }
        this.token = data.access_token
        return null
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    logout () {
      this.token = null
      this.router.push('/')
    }
  }
})
