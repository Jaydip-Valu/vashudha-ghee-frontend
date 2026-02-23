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
    const response = await api.put(`/orders/${orderId}/cancel`)
    return response.data
  },

  // Get all orders (Admin)
  getAllOrders: async (filters = {}) => {
    const queryParams = new URLSearchParams()
    
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.page) queryParams.append('page', filters.page)
    if (filters.limit) queryParams.append('limit', filters.limit)
    if (filters.startDate) queryParams.append('startDate', filters.startDate)
    if (filters.endDate) queryParams.append('endDate', filters.endDate)
    
    const response = await api.get(`/orders/admin/all?${queryParams.toString()}`)
    return response.data
  },

  // Update order status (Admin)
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status })
    return response.data
  },

  // Get order statistics (Admin)
  getOrderStats: async () => {
    const response = await api.get('/orders/admin/stats')
    return response.data
  },

  // Track order
  trackOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}/track`)
    return response.data
  },
}

export default orderService
