import { Trash2, Plus, Minus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'
import { formatCurrency, getImageUrl } from '@/utils/helpers'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) return
    dispatch(updateQuantity({ id: item._id, quantity: newQuantity }))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item._id))
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Image */}
      <img
        src={getImageUrl(item.images?.[0])}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />

      {/* Details */}
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-primary-600 font-semibold mt-1">
          {formatCurrency(item.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleUpdateQuantity(item.quantity - 1)}
          className="p-1 rounded border border-gray-300 hover:bg-gray-50"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
          className="p-1 rounded border border-gray-300 hover:bg-gray-50"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Total & Remove */}
      <div className="text-right">
        <p className="font-bold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <button
          onClick={handleRemove}
          className="mt-2 text-red-500 hover:text-red-600 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

export default CartItem
