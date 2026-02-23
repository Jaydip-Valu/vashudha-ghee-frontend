import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ShoppingCart, Star, Truck, Shield, Heart } from 'lucide-react'
import { addToCart } from '@/store/cartSlice'
import SEO from '@/components/Common/SEO'
import Button from '@/components/Common/Button'
import Loading from '@/components/Common/Loading'
import { formatCurrency, getImageUrl } from '@/utils/helpers'
import productService from '@/services/product.service'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const data = await productService.getProductById(id)
      setProduct(data.product || data)
    } catch (error) {
      toast.error('Failed to load product details')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }))
    toast.success('Added to cart!')
  }

  if (loading) return <Loading fullScreen />

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    )
  }

  // Product Schema for SEO
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: getImageUrl(product.images?.[0]),
    brand: {
      '@type': 'Brand',
      name: 'Vashudha Ghee'
    },
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Vashudha Ghee'
      }
    },
    aggregateRating: product.averageRating ? {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating,
      reviewCount: product.reviewCount || 0
    } : undefined
  }

  return (
    <>
      <SEO 
        title={product.name}
        description={product.description || `Buy ${product.name} - Premium quality pure desi ghee. ${product.weight || ''} ${product.category || ''}. Order now with free shipping!`}
        keywords={`${product.name}, ${product.category}, buy ${product.name} online, ${product.sku}`}
        image={getImageUrl(product.images?.[0])}
        type="product"
        structuredData={productSchema}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${id}` }
        ]}
      />

      <div className="container-custom py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="mb-4">
              <img
                src={getImageUrl(product.images?.[selectedImage])}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={getImageUrl(image)}
                    alt={`${product.name} ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer border-2 ${
                      selectedImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold font-heading mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < (product.averageRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="ml-3 text-xl text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              size="lg"
              fullWidth
              className="mb-6"
            >
              <ShoppingCart size={20} className="mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="mx-auto text-primary-500 mb-2" size={24} />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto text-primary-500 mb-2" size={24} />
                <p className="text-sm text-gray-600">Quality Assured</p>
              </div>
              <div className="text-center">
                <Heart className="mx-auto text-primary-500 mb-2" size={24} />
                <p className="text-sm text-gray-600">100% Natural</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
