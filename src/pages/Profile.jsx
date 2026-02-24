import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { User, Lock, MapPin } from 'lucide-react'
import { selectCurrentUser, updateUser } from '@/store/authSlice'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
import SEO from '@/components/Common/SEO'
import authService from '@/services/auth.service'
import addressService from '@/services/address.service'
import toast from 'react-hot-toast'
import AddressList from '@/components/Profile/AddressList'
import AddressForm from '@/components/Profile/AddressForm'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [addresses, setAddresses] = useState([])
  const [editingAddress, setEditingAddress] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm({
    defaultValues: user,
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch: watchPassword,
  } = useForm()

  const newPassword = watchPassword('newPassword')

  useEffect(() => {
    if (user) {
      resetProfile({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      })
    }
  }, [user, resetProfile])

  useEffect(() => {
    if (activeTab === 'addresses') {
      fetchAddresses()
    }
  }, [activeTab])

  const fetchAddresses = async () => {
    try {
      setLoading(true)
      const response = await addressService.getAddresses()
      setAddresses(response)
    } catch (error) {
      toast.error('Failed to fetch addresses')
    } finally {
      setLoading(false)
    }
  }

  const onProfileSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await authService.updateProfile(data)
      dispatch(updateUser(response.profile))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  const onPasswordChange = async (data) => {
    try {
      setLoading(true)
      await authService.changePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
        new_password_confirmation: data.confirmPassword,
      })
      toast.success('Password changed successfully!')
      resetPassword()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNewAddress = () => {
    setEditingAddress(null)
    setIsFormOpen(true)
  }

  const handleEditAddress = (address) => {
    setEditingAddress(address)
    setIsFormOpen(true)
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingAddress(null)
  }

  const handleAddressSubmit = async (data) => {
    try {
      setLoading(true)
      if (editingAddress) {
        await addressService.updateAddress(editingAddress.id, data)
        toast.success('Address updated successfully!')
      } else {
        await addressService.createAddress(data)
        toast.success('Address added successfully!')
      }
      fetchAddresses()
      setIsFormOpen(false)
      setEditingAddress(null)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save address')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAddress = async (address) => {
    if (window.confirm(`Are you sure you want to delete the address for "${address.full_name}"?`)) {
      try {
        setLoading(true)
        await addressService.deleteAddress(address.id)
        toast.success('Address deleted successfully!')
        fetchAddresses()
      } catch (error) {
        toast.error('Failed to delete address')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSetDefaultAddress = async (id) => {
    try {
      setLoading(true)
      await addressService.setDefaultAddress(id)
      toast.success('Default address updated!')
      fetchAddresses()
    } catch (error) {
      toast.error('Failed to set default address')
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
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center space-x-3 ${
                  activeTab === 'addresses' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'
                }`}
              >
                <MapPin size={20} />
                <span>My Addresses</span>
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
            {activeTab === 'profile' && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      {...registerProfile('first_name', { required: 'First name is required' })}
                      error={profileErrors.first_name?.message}
                    />
                    <Input
                      label="Last Name"
                      {...registerProfile('last_name', { required: 'Last name is required' })}
                      error={profileErrors.last_name?.message}
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    {...registerProfile('email', { required: 'Email is required' })}
                    error={profileErrors.email?.message}
                    disabled
                  />

                  <Input
                    label="Phone"
                    {...registerProfile('phone', { required: 'Phone is required' })}
                    error={profileErrors.phone?.message}
                  />

                  <Button type="submit" loading={loading}>
                    Update Profile
                  </Button>
                </form>
              </div>
            )}

            {activeTab === 'addresses' &&
              (isFormOpen ? (
                <AddressForm
                  onSubmit={handleAddressSubmit}
                  onCancel={handleCancelForm}
                  initialData={editingAddress}
                  loading={loading}
                />
              ) : (
                <AddressList
                  addresses={addresses}
                  onAddNew={handleAddNewAddress}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  onSetDefault={handleSetDefaultAddress}
                  loading={loading}
                />
              ))}

            {activeTab === 'password' && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                <form onSubmit={handlePasswordSubmit(onPasswordChange)} className="space-y-4 max-w-md">
                  <Input
                    label="Current Password"
                    type="password"
                    {...registerPassword('currentPassword', { required: 'Current password is required' })}
                    error={passwordErrors.currentPassword?.message}
                  />

                  <Input
                    label="New Password"
                    type="password"
                    {...registerPassword('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    error={passwordErrors.newPassword?.message}
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    {...registerPassword('confirmPassword', {
                      required: 'Please confirm password',
                      validate: (value) => value === newPassword || 'Passwords do not match',
                    })}
                    error={passwordErrors.confirmPassword?.message}
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
