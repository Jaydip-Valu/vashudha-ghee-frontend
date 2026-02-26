import api from './api'

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', { user: userData })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Login user
  login: async (credentials) => {
    console.log('Logging in with credentials:', credentials)
    console.log('API URL:', import.meta.env.VITE_API_URL)
    const response = await api.post('/auth/login', credentials)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.patch('/users/profile', { user: userData })
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.patch('/users/profile/update_password', passwordData)
    return response.data
  },

  // Request password reset
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, password: newPassword })
    return response.data
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verify-email/${token}`)
    return response.data
  },
}

export default authService
