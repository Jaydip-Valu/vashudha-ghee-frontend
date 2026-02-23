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

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...registerData } = data
      const response = await authService.register(registerData)
      dispatch(setCredentials({ user: response.user, token: response.token }))
      toast.success('Registration successful!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Register - Create New Account"
        description="Create your Vashudha Ghee account to start shopping premium pure desi ghee. Quick registration with exclusive benefits and offers."
        noindex={true}
      />
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">Create Account</h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
              />

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
                label="Phone"
                placeholder="Enter your phone number"
                {...register('phone', { 
                  required: 'Phone is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Invalid phone number'
                  }
                })}
                error={errors.phone?.message}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={errors.password?.message}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                {...register('confirmPassword', { 
                  required: 'Please confirm password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                error={errors.confirmPassword?.message}
              />

              <label className="flex items-start text-sm">
                <input 
                  type="checkbox" 
                  className="mr-2 mt-1"
                  {...register('terms', { required: 'You must accept the terms' })}
                />
                <span className="text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-500 hover:text-primary-600">
                    Terms & Conditions
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-sm text-red-600">{errors.terms.message}</p>
              )}

              <Button type="submit" fullWidth loading={loading}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
