import { useForm } from 'react-hook-form'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'

const AddressForm = ({ onSubmit, onCancel, initialData, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  })

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6">{initialData ? 'Edit Address' : 'Add New Address'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          {...register('full_name', { required: 'Full name is required' })}
          error={errors.full_name?.message}
        />
        <Input
          label="Phone Number"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Invalid phone number'
            }
          })}
          error={errors.phone?.message}
        />
        <Input
          label="Address Line 1"
          {...register('address_line1', { required: 'Address is required' })}
          error={errors.address_line1?.message}
        />
        <Input
          label="Address Line 2"
          {...register('address_line2')}
        />
        <div className="grid md:grid-cols-3 gap-4">
          <Input
            label="City"
            {...register('city', { required: 'City is required' })}
            error={errors.city?.message}
          />
          <Input
            label="State"
            {...register('state', { required: 'State is required' })}
            error={errors.state?.message}
          />
          <Input
            label="Postal Code"
            {...register('postal_code', { required: 'Postal code is required' })}
            error={errors.postal_code?.message}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_default"
            {...register('is_default')}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="is_default" className="ml-2 block text-sm text-gray-900">
            Set as default address
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {initialData ? 'Update Address' : 'Save Address'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddressForm
