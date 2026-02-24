import api from './api'
import { CATEGORY_LABEL_MAP } from '@/utils/constants'

/**
 * Normalise a raw product object returned by the Rails API into the shape
 * expected by the frontend (camelCase aliases, computed fields, etc.).
 *
 * Backend field → frontend field:
 *   id                → _id  (alias for backward-compat)
 *   stock_quantity    → stock
 *   is_active         → isActive
 *   featured          → isFeatured
 *   discount_percentage → discountPercentage + computed originalPrice
 *   image_url / image → images[] array
 *   category          → categoryLabel (human-readable label)
 */
const normalizeProduct = (raw) => {
  if (!raw) return raw

  // Stock — backend uses stock_quantity
  const stock = raw.stock_quantity ?? raw.stock ?? 0

  // Active / featured flags
  const isActive = raw.is_active ?? raw.isActive ?? true
  const isFeatured = raw.featured ?? raw.isFeatured ?? false

  // Discount / original price
  const discountPercentage = parseFloat(raw.discount_percentage ?? raw.discountPercentage ?? 0)
  const originalPrice =
    discountPercentage > 0 && discountPercentage < 100
      ? parseFloat((raw.price / (1 - discountPercentage / 100)).toFixed(2))
      : raw.mrp || undefined

  // Images — support both Active Storage URL, image_url column, and pre-built array
  let images = raw.images || []
  if (!images.length && raw.image_url) images = [raw.image_url]

  // Category label
  const categoryLabel = CATEGORY_LABEL_MAP[raw.category] || raw.category || ''

  return {
    ...raw,
    // Integer id aliased to _id for backward compat across the app
    _id: raw.id ?? raw._id,
    id: raw.id ?? raw._id,
    stock,
    stock_quantity: stock,
    isActive,
    is_active: isActive,
    isFeatured,
    featured: isFeatured,
    discountPercentage,
    discount_percentage: discountPercentage,
    originalPrice,
    images,
    image_url: images[0] || null,
    categoryLabel,
  }
}

const normalizeList = (data) => {
  if (Array.isArray(data)) return data.map(normalizeProduct)
  if (data && Array.isArray(data.products)) {
    return { ...data, products: data.products.map(normalizeProduct) }
  }
  return data
}

export const productService = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    const queryParams = new URLSearchParams()

    if (filters.category) queryParams.append('category', filters.category)
    if (filters.minPrice) queryParams.append('min_price', filters.minPrice)
    if (filters.maxPrice) queryParams.append('max_price', filters.maxPrice)
    if (filters.sort) queryParams.append('sort', filters.sort)
    if (filters.page) queryParams.append('page', filters.page)
    if (filters.limit) queryParams.append('limit', filters.limit)
    if (filters.search) queryParams.append('search', filters.search)

    const response = await api.get(`/products?${queryParams.toString()}`)
    return normalizeList(response.data)
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`)
    const raw = response.data
    if (raw && raw.product) return { ...raw, product: normalizeProduct(raw.product) }
    return normalizeProduct(raw)
  },

  // Create new product (Admin)
  // Expects form-shaped object; maps to Rails-expected snake_case params.
  createProduct: async (formData) => {
    const payload = { product: buildProductPayload(formData) }
    const response = await api.post('/products', payload)
    const raw = response.data
    if (raw && raw.product) return { ...raw, product: normalizeProduct(raw.product) }
    return normalizeProduct(raw)
  },

  // Update product (Admin)
  updateProduct: async (id, formData) => {
    const payload = { product: buildProductPayload(formData) }
    const response = await api.put(`/products/${id}`, payload)
    const raw = response.data
    if (raw && raw.product) return { ...raw, product: normalizeProduct(raw.product) }
    return normalizeProduct(raw)
  },

  // Delete product (Admin)
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },

  // Toggle product active / inactive status (Admin)
  toggleProductStatus: async (id, isActive) => {
    const response = await api.patch(`/products/${id}`, {
      product: { is_active: isActive },
    })
    const raw = response.data
    if (raw && raw.product) return { ...raw, product: normalizeProduct(raw.product) }
    return normalizeProduct(raw)
  },

  // Update product stock quantity (Admin)
  updateStock: async (id, stockQuantity) => {
    const response = await api.patch(`/products/${id}`, {
      product: { stock_quantity: stockQuantity },
    })
    const raw = response.data
    if (raw && raw.product) return { ...raw, product: normalizeProduct(raw.product) }
    return normalizeProduct(raw)
  },

  // Get product categories
  getCategories: async () => {
    const response = await api.get('/products/categories')
    return response.data
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured')
    return normalizeList(response.data)
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

  /**
   * Upload a product image via PATCH /products/:id with multipart form data.
   * The backend uses has_one_attached :image (singular) so we send the first
   * selected file under the key "product[image]".
   */
  uploadImages: async (productId, filesOrFormData) => {
    let formData
    if (filesOrFormData instanceof FormData) {
      // Rebuild FormData with the correct key expected by Rails
      const files = filesOrFormData.getAll('images')
      formData = new FormData()
      if (files.length > 0) {
        formData.append('product[image]', files[0])
      }
    } else {
      formData = filesOrFormData
    }

    const response = await api.patch(`/products/${productId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    const raw = response.data
    if (raw && raw.product) return { ...raw, product: normalizeProduct(raw.product) }
    return normalizeProduct(raw)
  },
}

/**
 * Map a frontend form object to the snake_case payload expected by the
 * Rails Product model.
 */
function buildProductPayload(form) {
  const payload = {
    name: form.name?.trim(),
    description: form.description?.trim() || '',
    category: form.category,
    price: form.price !== '' ? Number(form.price) : undefined,
    sku: form.sku?.trim() || undefined,
    stock_quantity: form.stock !== '' ? Number(form.stock) : undefined,
    featured: Boolean(form.isFeatured),
    is_active: form.isActive !== false,
  }

  if (form.weight !== '' && form.weight !== null && form.weight !== undefined) {
    payload.weight = Number(form.weight)
  }
  if (form.discountPercentage !== '' && form.discountPercentage !== null && form.discountPercentage !== undefined) {
    payload.discount_percentage = Number(form.discountPercentage)
  }
  if (form.metaTitle) payload.meta_title = form.metaTitle
  if (form.metaDescription) payload.meta_description = form.metaDescription
  if (form.metaKeywords) payload.meta_keywords = form.metaKeywords

  return payload
}

export default productService
