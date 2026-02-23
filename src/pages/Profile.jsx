import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { User, Lock } from 'lucide-react'
import { selectCurrentUser, updateUser } from '@/store/authSlice'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
import SEO from '@/components/Common/SEO'
import authService from '@/services/auth.service'
import toast from 'react-hot-toast'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: user
  })

  useEffect(() => {
    reset(user)
  }, [user, reset])

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await authService.updateProfile(data)
      dispatch(updateUser(response.user))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (data) => {
    try {
      setLoading(true)
      await authService.changePassword(data)
      toast.success('Password changed successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="My Profile - Account Settings"
        description="Manage your account information, update profile details, and change password. View your personal information securely."
        noindex={true}
      />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center space-x-3 ${
                  activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'
                }`}
              >
                <User size={20} />
                <span>Profile Info</span>
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                  activeTab === 'password' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'
                }`}
              >
                <Lock size={20} />
                <span>Change Password</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' ? (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Full Name"
                    {...register('name', { required: 'Name is required' })}
                    error={errors.name?.message}
                  />

                  <Input
                    label="Email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    error={errors.email?.message}
                    disabled
                  />

                  <Input
                    label="Phone"
                    {...register('phone', { required: 'Phone is required' })}
                    error={errors.phone?.message}
                  />

                  <Input
                    label="Address"
                    {...register('address')}
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      {...register('city')}
                    />
                    <Input
                      label="State"
                      {...register('state')}
                    />
                    <Input
                      label="Pincode"
                      {...register('pincode')}
                    />
                  </div>

                  <Button type="submit" loading={loading}>
                    Update Profile
                  </Button>
                </form>
              </div>
            ) : (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4 max-w-md">
                  <Input
                    label="Current Password"
                    type="password"
                    {...register('currentPassword', { required: 'Current password is required' })}
                    error={errors.currentPassword?.message}
                  />

                  <Input
                    label="New Password"
                    type="password"
                    {...register('newPassword', { 
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    error={errors.newPassword?.message}
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    {...register('confirmPassword', { 
                      required: 'Please confirm password',
                      validate: value => value === user.newPassword || 'Passwords do not match'
                    })}
                    error={errors.confirmPassword?.message}
                  />

                  <Button type="submit" loading={loading}>
                    Change Password
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
