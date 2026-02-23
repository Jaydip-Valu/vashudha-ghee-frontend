import { Plus, MapPin } from 'lucide-react'
import Button from '@/components/Common/Button'

const AddressList = ({ addresses, onAddNew, onEdit, onDelete, onSetDefault, loading }) => {
  if (loading) {
    return <p>Loading addresses...</p>
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Addresses</h2>
        <Button variant="outline" size="sm" icon={<Plus size={16} />} onClick={onAddNew}>
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new address.</p>
          <div className="mt-6">
            <Button icon={<Plus size={16} />} onClick={onAddNew}>
              Add Address
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map(address => (
            <div key={address.id} className="border p-4 rounded-lg flex justify-between items-start">
              <div>
                <p className="font-semibold flex items-center">
                  {address.full_name}
                  {address.is_default && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
                </p>
                <p className="text-gray-600">{address.address_line1}, {address.address_line2}</p>
                <p className="text-gray-600">{address.city}, {address.state} - {address.postal_code}</p>
                <p className="text-gray-600">Phone: {address.phone}</p>
              </div>
              <div className="flex items-center space-x-2">
                {!address.is_default && (
                  <Button variant="ghost" size="sm" onClick={() => onSetDefault(address.id)}>Set as Default</Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => onEdit(address)}>Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => onDelete(address)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddressList
