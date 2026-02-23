import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: [0, 10000],
    sort: 'newest',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
      state.loading = false
      state.error = null
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const {
  setProducts,
  setSelectedProduct,
  setLoading,
  setError,
  setFilters,
  setPagination,
  resetFilters,
} = productSlice.actions

export const selectAllProducts = (state) => state.products.products
export const selectSelectedProduct = (state) => state.products.selectedProduct
export const selectProductsLoading = (state) => state.products.loading
export const selectProductsError = (state) => state.products.error
export const selectProductFilters = (state) => state.products.filters
export const selectProductPagination = (state) => state.products.pagination

export default productSlice.reducer
