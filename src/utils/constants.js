// API Endpoints
export const API_URL = import.meta.env.VITE_API_URL || 'https://vashudha-ghee-backend.onrender.com/api/v1'

// App Config
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Vashudha Ghee'
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || ''

// Pagination
export const PRODUCTS_PER_PAGE = 12
export const ORDERS_PER_PAGE = 10

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
}

export const ORDER_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
}

// Payment Methods
export const PAYMENT_METHODS = {
  RAZORPAY: 'razorpay',
  COD: 'cod',
}

// Product Categories — values match the Rails backend enum keys
export const PRODUCT_CATEGORIES = [
  { value: 'pure_ghee', label: 'Pure Cow Ghee' },
  { value: 'a2_cow_ghee', label: 'A2 Cow Ghee' },
  { value: 'buffalo_ghee', label: 'Buffalo Ghee' },
  { value: 'organic_ghee', label: 'Organic Ghee' },
  { value: 'flavored_ghee', label: 'Flavored Ghee' },
  { value: 'combo_pack', label: 'Combo Pack' },
  { value: 'gift_pack', label: 'Gift Pack' },
]

// Quick lookup: enum key → display label
export const CATEGORY_LABEL_MAP = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.value, c.label])
)

// Sort Options
export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A to Z', value: 'name_asc' },
  { label: 'Name: Z to A', value: 'name_desc' },
]

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
}

// Regex Patterns
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[6-9]\d{9}$/,
  PINCODE: /^[1-9][0-9]{5}$/,
}

// Image Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
