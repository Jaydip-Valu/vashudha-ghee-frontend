import api from './api'

export const addressService = {
  // Get all addresses for the current user
  getAddresses: async () => {
    const response = await api.get('/users/addresses')
    return response.data.addresses
  },

  // Get a single address by ID
  getAddress: async (id) => {
    const response = await api.get(`/users/addresses/${id}`)
    return response.data
  },

  // Create a new address
  createAddress: async (addressData) => {
    const response = await api.post('/users/addresses', { address: addressData })
    return response.data
  },

  // Update an existing address
  updateAddress: async (id, addressData) => {
    const response = await api.patch(`/users/addresses/${id}`, { address: addressData })
    return response.data
  },

  // Delete an address
  deleteAddress: async (id) => {
    const response = await api.delete(`/users/addresses/${id}`)
    return response.data
  },

  // Set an address as the default
  setDefaultAddress: async (id) => {
    const response = await api.patch(`/users/addresses/${id}/set_default`)
    return response.data
  },
}

export default addressService
