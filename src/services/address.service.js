import api from './api'

export const addressService = {
  // Get all addresses for current user
  getAddresses: async () => {
    const response = await api.get('/users/addresses')
    return response.data
  },

  // Create a new address
  createAddress: async (addressData) => {
    const response = await api.post('/users/addresses', { address: addressData })
    return response.data
  },

  // Update an address
  updateAddress: async (id, addressData) => {
    const response = await api.patch(`/users/addresses/${id}`, { address: addressData })
    return response.data
  },

  // Delete an address
  deleteAddress: async (id) => {
    const response = await api.delete(`/users/addresses/${id}`)
    return response.data
  },

  // Set an address as default
  setDefault: async (id) => {
    const response = await api.patch(`/users/addresses/${id}/set_default`)
    return response.data
  },
}

export default addressService
