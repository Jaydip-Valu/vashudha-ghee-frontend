import api from './api'

export const cartService = {
  // Get user's cart
  getCart: async () => {
    const response = await api.get('/cart')
    return response.data
  },

  // Add item to cart — POST /cart/add_item
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post('/cart/add_item', { product_id: productId, quantity })
    return response.data
  },

  // Update cart item quantity — PATCH /cart/update_item/:id
  updateCartItem: async (itemId, quantity) => {
    const response = await api.patch(`/cart/update_item/${itemId}`, { quantity })
    return response.data
  },

  // Remove item from cart — DELETE /cart/remove_item/:id
  removeFromCart: async (itemId) => {
    const response = await api.delete(`/cart/remove_item/${itemId}`)
    return response.data
  },

  // Clear entire cart — DELETE /cart/clear
  clearCart: async () => {
    const response = await api.delete('/cart/clear')
    return response.data
  },
}

export default cartService
