import api from './api'

export const paymentService = {
  // Create Razorpay order
  createRazorpayOrder: async (orderData) => {
    const response = await api.post('/payments/razorpay/create_order', orderData)
    return response.data
  },

  // Verify Razorpay payment
  verifyRazorpayPayment: async (paymentData) => {
    const response = await api.post('/payments/razorpay/verify', paymentData)
    return response.data
  },

  // Process COD payment
  processCODPayment: async (orderData) => {
    const response = await api.post('/payments/cod', orderData)
    return response.data
  },

  // Get payment history
  getPaymentHistory: async (page = 1, limit = 10) => {
    const response = await api.get(`/payments/history?page=${page}&limit=${limit}`)
    return response.data
  },

  // Get payment details
  getPaymentDetails: async (paymentId) => {
    const response = await api.get(`/payments/${paymentId}`)
    return response.data
  },

  // Initiate refund (Admin)
  initiateRefund: async (paymentId, amount) => {
    const response = await api.post(`/payments/${paymentId}/refund`, { amount })
    return response.data
  },

  // Get refund status
  getRefundStatus: async (refundId) => {
    const response = await api.get(`/payments/refunds/${refundId}`)
    return response.data
  },

  // Load Razorpay script
  loadRazorpayScript: () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  },
}

export default paymentService
