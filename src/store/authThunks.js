import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from '@/services/auth.service'

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getProfile()
      return data.profile
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile')
    }
  }
)
