import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/authSlice'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
import SEO from '@/components/Common/SEO'
import authService from '@/services/auth.service'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await authService.login(data)
      dispatch(setCredentials({ user: response.user, token: response.token }))
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
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
            <p className="text-gray-600">Login to your account</p>
          </div>

          <div className="card p-8">
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
