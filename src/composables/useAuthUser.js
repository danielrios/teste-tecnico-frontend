import { api } from 'boot/axios'

export function useAuthUser () {
  const login = async (credentials) => {
    try {
      const response = await api.post('auth/login', credentials)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getUserProfile = async () => {
    try {
      const response = await api.get('auth/me')
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return {
    login,
    getUserProfile
  }
}
