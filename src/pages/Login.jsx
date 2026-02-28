import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '@/store/authSlice'
import { selectCartItems } from '@/store/cartSlice'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
import SEO from '@/components/Common/SEO'
import authService from '@/services/auth.service'
import cartService from '@/services/cart.service'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const localCartItems = useSelector(selectCartItems)
  const [loading, setLoading] = useState(false)
  const [loginMode, setLoginMode] = useState('email') // 'email' | 'otp'
  const [otpSent, setOtpSent] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()

  const syncCartToBackend = async (items) => {
    if (!items || items.length === 0) return
    try {
      for (const item of items) {
        const productId = item.id || item._id
        if (productId) {
          await cartService.addToCart(productId, item.quantity)
        }
      }
    } catch (error) {
      console.error('Failed to sync cart:', error)
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await authService.login(data)
      dispatch(setCredentials({ user: response.user, token: response.token }))
      await syncCartToBackend(localCartItems)
      toast.success('Login successful!')
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSendOtp = async () => {
    const phone = getValues('phone')
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      toast.error('Please enter a valid 10-digit mobile number')
      return
    }
    setOtpLoading(true)
    try {
      // OTP sending — placeholder for backend integration
      toast.success(`OTP sent to +91 ${phone}`)
      setOtpSent(true)
    } catch {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setOtpLoading(false)
    }
  }

  const onOtpSubmit = async () => {
    try {
      setLoading(true)
      // OTP login — placeholder for backend integration
      toast.success('OTP verified! Login successful.')
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Login - Sign in to Your Account"
        description="Login to your Vashudha Ghee account to manage orders, track shipments, and enjoy exclusive benefits. Secure authentication."
        noindex={true}
      />
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to your Vashudha Ghee account</p>
          </div>

          <div className="card p-8">
            {/* Login Mode Tabs */}
            <div className="flex rounded-lg border border-gray-200 mb-6 overflow-hidden">
              <button
                onClick={() => setLoginMode('email')}
                className={`flex-1 py-2.5 text-sm font-medium transition ${
                  loginMode === 'email'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📧 Email / Password
              </button>
              <button
                onClick={() => { setLoginMode('otp'); setOtpSent(false) }}
                className={`flex-1 py-2.5 text-sm font-medium transition ${
                  loginMode === 'otp'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📱 Mobile OTP
              </button>
            </div>

            {loginMode === 'email' ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address'
                    }
                  })}
                  error={errors.email?.message}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  error={errors.password?.message}
                />

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-primary-500 hover:text-primary-600">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" fullWidth loading={loading}>
                  Login
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  {...register('phone', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Invalid mobile number'
                    }
                  })}
                  error={errors.phone?.message}
                />

                {!otpSent ? (
                  <Button fullWidth loading={otpLoading} onClick={handleSendOtp} type="button">
                    Send OTP
                  </Button>
                ) : (
                  <form onSubmit={handleSubmit(onOtpSubmit)} className="space-y-4">
                    <Input
                      label="Enter OTP"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      {...register('otp', {
                        required: 'OTP is required',
                        minLength: { value: 6, message: 'OTP must be 6 digits' },
                        maxLength: { value: 6, message: 'OTP must be 6 digits' },
                      })}
                      error={errors.otp?.message}
                    />
                    <Button type="submit" fullWidth loading={loading}>
                      Verify & Login
                    </Button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full text-center text-sm text-primary-500 hover:text-primary-600"
                    >
                      Resend OTP
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-sm text-gray-400">or continue with</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toast('Google login coming soon!')}
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => toast('Facebook login coming soon!')}
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don&apos;t have an account? </span>
              <Link to="/register" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
