import api from './api'

export const productService = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    const queryParams = new URLSearchParams()
    
    if (filters.category) queryParams.append('category', filters.category)
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice)
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice)
    if (filters.sort) queryParams.append('sort', filters.sort)
    if (filters.page) queryParams.append('page', filters.page)
    if (filters.limit) queryParams.append('limit', filters.limit)
    if (filters.search) queryParams.append('search', filters.search)
    
    const response = await api.get(`/products?${queryParams.toString()}`)
    return response.data
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Create new product (Admin)
  createProduct: async (productData) => {
    const response = await api.post('/products', productData)
    return response.data
  },

  // Update product (Admin)
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },

  // Delete product (Admin)
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },

  // Toggle product active / inactive status (Admin)
  toggleProductStatus: async (id, isActive) => {
    const response = await api.patch(`/products/${id}/status`, { isActive })
    return response.data
  },

  // Update product stock quantity (Admin)
  updateStock: async (id, stock) => {
    const response = await api.patch(`/products/${id}/stock`, { stock })
    return response.data
  },

  // Get product categories
  getCategories: async () => {
    const response = await api.get('/products/categories')
    return response.data
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured')
    return response.data
  },

  // Add product review
  addReview: async (productId, reviewData) => {
    const response = await api.post(`/products/${productId}/reviews`, reviewData)
    return response.data
  },

  // Get product reviews
  getReviews: async (productId) => {
    const response = await api.get(`/products/${productId}/reviews`)
    return response.data
  },

  // Upload product images (Admin)
  uploadImages: async (productId, formData) => {
    const response = await api.post(`/products/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}

export default productService
