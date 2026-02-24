import api from './api'

export const paymentService = {
  // Create Razorpay order — POST /payments/create_order
  createRazorpayOrder: async (orderData) => {
    const response = await api.post('/payments/create_order', orderData)
    return response.data
  },

  // Verify Razorpay payment — POST /payments/verify_payment
  verifyRazorpayPayment: async (paymentData) => {
    const response = await api.post('/payments/verify_payment', paymentData)
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
