import api from './api'

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData)
    return response.data
  },

  // Get all orders for current user
  getUserOrders: async (page = 1, limit = 10) => {
    const response = await api.get(`/orders?page=${page}&limit=${limit}`)
    return response.data
  },

  // Get single order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    const response = await api.patch(`/orders/${orderId}/cancel`)
    return response.data
  },
}

export default orderService
