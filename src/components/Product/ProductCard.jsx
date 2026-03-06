import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import { formatCurrency, getImageUrl } from '@/utils/helpers'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
    toast.success('Added to cart!')
  }

  const rating = product.averageRating || 0
  const reviewCount = product.reviewCount || 0
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-1 border border-amber-50 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-amber-50">
        <img
          src={getImageUrl(product.images?.[0])}
          alt={product.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow">
            {discount}% OFF
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <p className="text-xs text-amber-600 uppercase tracking-wider font-semibold mb-1">
          {product.categoryLabel || product.category}
        </p>

        {/* Name */}
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition line-clamp-2 text-sm leading-snug flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        {reviewCount > 0 && (
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3 mt-1">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full btn-primary text-sm py-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <ShoppingCart size={16} className="mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  )
}

export default ProductCard
