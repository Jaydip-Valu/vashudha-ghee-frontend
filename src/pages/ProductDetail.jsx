import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ShoppingCart, Star, Truck, Shield, Heart, ChevronRight, Package, RefreshCw, Tag } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState('description')

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

  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'details', label: 'Product Details' },
    { key: 'reviews', label: `Reviews (${product.reviewCount || 0})` },
  ]

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
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary-500 transition">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-primary-500 transition">Products</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

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
              {product.categoryLabel || product.category}
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
              {product.originalPrice > 0 && product.price < product.originalPrice && (
                <span className="ml-3 text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* SKU / Stock */}
            <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
              {product.sku && (
                <span className="flex items-center space-x-1">
                  <Tag size={14} />
                  <span>SKU: {product.sku}</span>
                </span>
              )}
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

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
                <p className="text-xs text-gray-400">On orders ₹500+</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto text-primary-500 mb-2" size={24} />
                <p className="text-sm text-gray-600">Quality Assured</p>
                <p className="text-xs text-gray-400">Lab tested</p>
              </div>
              <div className="text-center">
                <Heart className="mx-auto text-primary-500 mb-2" size={24} />
                <p className="text-sm text-gray-600">100% Natural</p>
                <p className="text-xs text-gray-400">No preservatives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 text-sm font-medium border-b-2 transition ${
                    activeTab === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl space-y-4 text-gray-700">
                <p>{product.description}</p>
                <div className="bg-primary-50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-lg mb-3">Why Choose Vashudha Ghee?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Made using traditional bilona method for authentic taste</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Sourced from grass-fed indigenous A2 cows</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>No preservatives, additives, or artificial ingredients</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Lab-tested for purity and quality standards</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span>Packed in food-grade, airtight glass jars</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="max-w-3xl">
                <div className="card overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.weight && (
                        <tr className="border-b">
                          <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Weight</td>
                          <td className="px-6 py-3 text-gray-900">{product.weight}</td>
                        </tr>
                      )}
                      {product.category && (
                        <tr className="border-b">
                          <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Category</td>
                          <td className="px-6 py-3 text-gray-900">{product.categoryLabel || product.category}</td>
                        </tr>
                      )}
                      {product.sku && (
                        <tr className="border-b">
                          <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">SKU</td>
                          <td className="px-6 py-3 text-gray-900">{product.sku}</td>
                        </tr>
                      )}
                      <tr className="border-b">
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Availability</td>
                        <td className={`px-6 py-3 font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Shelf Life</td>
                        <td className="px-6 py-3 text-gray-900">12 months from manufacturing date</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Storage</td>
                        <td className="px-6 py-3 text-gray-900">Store in a cool, dry place away from direct sunlight</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Ingredients</td>
                        <td className="px-6 py-3 text-gray-900">100% Pure Cow Ghee (A2 Desi Cow Milk)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="card p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Package className="text-primary-500" size={24} />
                      <h3 className="font-semibold">Packaging</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Food-grade glass jar with tamper-proof seal. 
                      Securely packed in bubble wrap for safe transit.
                    </p>
                  </div>
                  <div className="card p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <RefreshCw className="text-primary-500" size={24} />
                      <h3 className="font-semibold">Returns</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Easy 7-day returns for unused, sealed products. 
                      See our <Link to="/returns" className="text-primary-500 hover:underline">Return Policy</Link> for details.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                {product.reviewCount > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900">
                          {product.averageRating?.toFixed(1) || '0.0'}
                        </div>
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < Math.round(product.averageRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Customer reviews are loading...
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No reviews yet</h3>
                    <p className="text-gray-500">
                      Be the first to review this product after purchasing.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Policy Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">Helpful Links</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/shipping" className="text-primary-500 hover:underline">Shipping Policy</Link>
            <Link to="/returns" className="text-primary-500 hover:underline">Return Policy</Link>
            <Link to="/faq" className="text-primary-500 hover:underline">FAQ</Link>
            <Link to="/contact" className="text-primary-500 hover:underline">Contact Us</Link>
            <Link to="/track-order" className="text-primary-500 hover:underline">Track Order</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
