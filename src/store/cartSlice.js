import { createSlice } from '@reduxjs/toolkit'

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error('Error loading cart from storage:', error)
    return []
  }
}

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to storage:', error)
  }
}

const initialState = {
  items: loadCartFromStorage(),
  totalQuantity: 0,
  totalAmount: 0,
}

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return { totalQuantity, totalAmount }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existingItem = state.items.find((i) => i._id === item._id)

      if (existingItem) {
        existingItem.quantity += item.quantity || 1
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 })
      }

      const totals = calculateTotals(state.items)
      state.totalQuantity = totals.totalQuantity
      state.totalAmount = totals.totalAmount
      saveCartToStorage(state.items)
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => item._id !== id)

      const totals = calculateTotals(state.items)
      state.totalQuantity = totals.totalQuantity
      state.totalAmount = totals.totalAmount
      saveCartToStorage(state.items)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((i) => i._id === id)

      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== id)
        }
      }

      const totals = calculateTotals(state.items)
      state.totalQuantity = totals.totalQuantity
      state.totalAmount = totals.totalAmount
      saveCartToStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
      saveCartToStorage([])
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
export const selectCartTotalAmount = (state) => state.cart.totalAmount

export default cartSlice.reducer
