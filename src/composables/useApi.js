import { api } from 'boot/axios'

export function useApi () {
  const getCompanies = async () => {
    try {
      const response = await api.get('companies')
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getCompanyById = async (id) => {
    try {
      const response = await api.get(`companies/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const postCompany = async (companyData) => {
    try {
      const response = await api.post('companies', companyData)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getCategories = async () => {
    try {
      const response = await api.get('categories')
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getStates = async () => {
    try {
      const response = await api.get('state-cities/states')
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getCitiesByStateId = async (stateId) => {
    try {
      const response = await api.get(`state-cities/cities?state_id=${stateId}`)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getCityByCoordinates = async (latitude, longitude) => {
    try {
      const response = await api.get(`state-cities/city?latitude=${latitude}&longitude=${longitude}`)
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    getCompanies,
    getCompanyById,
    postCompany,
    getCategories,
    getStates,
    getCitiesByStateId,
    getCityByCoordinates
  }
}
