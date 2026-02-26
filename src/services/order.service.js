import api from './api'

/**
 * Normalize a raw order item returned by the Rails API.
 * Rails may return order items as order_items with unit_price / product.name.
 */
const normalizeOrderItem = (raw) => {
  if (!raw) return raw
  return {
    ...raw,
    _id: raw.id ?? raw._id,
    id: raw.id ?? raw._id,
    productId: raw.product_id ?? raw.productId,
    name: raw.product?.name ?? raw.name,
    price: parseFloat(raw.unit_price ?? raw.price ?? 0),
    quantity: raw.quantity,
  }
}

/**
 * Normalize a raw order object returned by the Rails API into the shape
 * expected by the frontend (camelCase aliases, nested item normalization).
 *
 * Backend field → frontend field:
 *   id              → _id  (alias for backward-compat)
 *   created_at      → createdAt
 *   updated_at      → updatedAt
 *   order_number    → orderNumber
 *   total_amount    → totalAmount
 *   payment_method  → paymentMethod
 *   payment_status  → paymentStatus
 *   shipping_address → shippingAddress
 *   order_items     → items
 */
const normalizeOrder = (raw) => {
  if (!raw) return raw
  const items = (raw.order_items ?? raw.items ?? []).map(normalizeOrderItem)
  return {
    ...raw,
    _id: raw.id ?? raw._id,
    id: raw.id ?? raw._id,
    createdAt: raw.created_at ?? raw.createdAt,
    updatedAt: raw.updated_at ?? raw.updatedAt,
    orderNumber: raw.order_number ?? raw.orderNumber,
    totalAmount: parseFloat(raw.total_amount ?? raw.totalAmount ?? 0),
    paymentMethod: raw.payment_method ?? raw.paymentMethod,
    paymentStatus: raw.payment_status ?? raw.paymentStatus,
    shippingAddress: raw.shipping_address ?? raw.shippingAddress,
    items,
  }
}

const normalizeOrderList = (data) => {
  if (Array.isArray(data)) return data.map(normalizeOrder)
  if (data && Array.isArray(data.orders)) {
    return { ...data, orders: data.orders.map(normalizeOrder) }
  }
  return data
}

export const orderService = {
  // Create new order — wraps in { order: ... } as Rails strong parameters expect
  createOrder: async (orderData) => {
    const response = await api.post('/orders', { order: orderData })
    const raw = response.data
    if (raw && raw.order) return { ...raw, order: normalizeOrder(raw.order) }
    return normalizeOrder(raw)
  },

  // Get all orders for current user
  // perPage uses camelCase as a JS parameter; mapped to per_page for Rails
  getUserOrders: async (page = 1, perPage = 10) => {
    const response = await api.get(`/orders?page=${page}&per_page=${perPage}`)
    return normalizeOrderList(response.data)
  },

  // Get single order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`)
    const raw = response.data
    if (raw && raw.order) return { ...raw, order: normalizeOrder(raw.order) }
    return normalizeOrder(raw)
  },

  // Cancel order — PATCH /orders/:id/cancel
  cancelOrder: async (orderId) => {
    const response = await api.patch(`/orders/${orderId}/cancel`)
    return response.data
  },
}

export default orderService
