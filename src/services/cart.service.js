import api from './api'

export const cartService = {
  // Get user's cart
  getCart: async () => {
    const response = await api.get('/cart')
    return response.data
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post('/cart', { product_id: productId, quantity })
    return response.data
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity })
    return response.data
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`)
    return response.data
  },

  // Clear entire cart
  clearCart: async () => {
    const response = await api.delete('/cart')
    return response.data
  },

  // Apply coupon code
  applyCoupon: async (couponCode) => {
    const response = await api.post('/cart/coupon', { code: couponCode })
    return response.data
  },

  // Remove coupon
  removeCoupon: async () => {
    const response = await api.delete('/cart/coupon')
    return response.data
  },
}

export default cartService
