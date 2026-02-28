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
    { key: 'description', label: 'Description & Benefits' },
    { key: 'process', label: 'Bilona Process' },
    { key: 'nutrition', label: 'Nutrition Facts' },
    { key: 'details', label: 'Product Details' },
    { key: 'reviews', label: `Reviews (${product.reviewCount || 0})` },
  ]

  const isCowGhee = product.category === 'a2_cow_ghee' || product.category === 'pure_ghee'

  const productBenefits = isCowGhee
    ? [
        'Rich in A2 beta-casein protein — easier to digest than A1 milk',
        'Loaded with fat-soluble vitamins A, D, E & K for immunity',
        'Strengthens bones, joints, and muscles with essential fatty acids',
        'Promotes healthy digestion and stimulates digestive enzymes',
        'Supports brain development and cognitive function',
        'Anti-inflammatory properties help reduce gut inflammation',
        'Boosts metabolism and provides sustained energy throughout the day',
        'Ayurvedic rasayana — rejuvenates and nourishes all body tissues',
      ]
    : [
        'Higher fat content provides rich creaminess and deep flavour',
        'Excellent source of calcium for strong bones and teeth',
        'Rich in conjugated linoleic acid (CLA) — supports healthy weight',
        'Slow-cooked Bilona process preserves all natural nutrients',
        'Ideal for cooking, frying, and making traditional Indian sweets',
        'Higher smoke point than vegetable oils — safe for high-heat cooking',
        'Contains butyric acid which supports gut lining health',
        'Natural source of antioxidants for cellular protection',
      ]

  const bilonaSteps = [
    {
      step: '01',
      title: 'Fresh Milk Collection',
      detail: 'We collect fresh, pure milk every morning from our network of small, family-run farms where indigenous desi cows and buffaloes graze freely on natural pastures. The cows are never injected with growth hormones or antibiotics.'
    },
    {
      step: '02',
      title: 'Natural Curd Preparation',
      detail: 'The fresh milk is gently boiled and cooled to the perfect temperature. A small amount of natural curd starter (jaman) is added and the milk is left undisturbed overnight to naturally ferment into thick, creamy curd (dahi).'
    },
    {
      step: '03',
      title: 'Bilona Hand Churning (Valona Paddhati)',
      detail: 'The freshly set curd is churned using a traditional wooden bilona (hand churner) in a bi-directional motion. This ancient Valona Paddhati method gently separates the fresh butter (makhan) from the buttermilk, preserving all the medicinal properties described in Ayurveda.'
    },
    {
      step: '04',
      title: 'Slow Simmer to Golden Ghee',
      detail: 'The extracted butter is slow-cooked on a low flame in a traditional copper or brass vessel. As it simmers, moisture evaporates and milk solids settle at the bottom. When the ghee turns golden and releases a characteristic nutty aroma, it is carefully filtered and poured into food-grade glass jars.'
    },
  ]

  const nutritionData = isCowGhee
    ? [
        { nutrient: 'Energy', per100g: '900 kcal', per5g: '45 kcal' },
        { nutrient: 'Total Fat', per100g: '99.7 g', per5g: '4.98 g' },
        { nutrient: 'Saturated Fat', per100g: '62 g', per5g: '3.1 g' },
        { nutrient: 'Monounsaturated Fat', per100g: '29 g', per5g: '1.45 g' },
        { nutrient: 'Polyunsaturated Fat', per100g: '3.7 g', per5g: '0.18 g' },
        { nutrient: 'Trans Fat', per100g: '0 g', per5g: '0 g' },
        { nutrient: 'Cholesterol', per100g: '256 mg', per5g: '12.8 mg' },
        { nutrient: 'Carbohydrate', per100g: '0 g', per5g: '0 g' },
        { nutrient: 'Protein', per100g: '0 g', per5g: '0 g' },
        { nutrient: 'Vitamin A', per100g: '3069 IU', per5g: '153 IU' },
        { nutrient: 'Vitamin D', per100g: '13.2 mcg', per5g: '0.66 mcg' },
        { nutrient: 'Vitamin E', per100g: '2.8 mg', per5g: '0.14 mg' },
        { nutrient: 'Vitamin K2', per100g: '15 mcg', per5g: '0.75 mcg' },
      ]
    : [
        { nutrient: 'Energy', per100g: '897 kcal', per5g: '44.9 kcal' },
        { nutrient: 'Total Fat', per100g: '99.5 g', per5g: '4.97 g' },
        { nutrient: 'Saturated Fat', per100g: '68 g', per5g: '3.4 g' },
        { nutrient: 'Monounsaturated Fat', per100g: '25 g', per5g: '1.25 g' },
        { nutrient: 'Polyunsaturated Fat', per100g: '2 g', per5g: '0.1 g' },
        { nutrient: 'Trans Fat', per100g: '0 g', per5g: '0 g' },
        { nutrient: 'Cholesterol', per100g: '281 mg', per5g: '14 mg' },
        { nutrient: 'Carbohydrate', per100g: '0 g', per5g: '0 g' },
        { nutrient: 'Protein', per100g: '0 g', per5g: '0 g' },
        { nutrient: 'Calcium', per100g: '0.2 mg', per5g: '0.01 mg' },
        { nutrient: 'Vitamin A', per100g: '2800 IU', per5g: '140 IU' },
        { nutrient: 'Vitamin D', per100g: '10.9 mcg', per5g: '0.55 mcg' },
        { nutrient: 'Vitamin E', per100g: '2.4 mg', per5g: '0.12 mg' },
      ]

  return (
    <>
      <SEO 
        title={product.name}
        description={product.description
          ? (product.description.length > 155 ? product.description.slice(0, 155).replace(/\s\w+$/, '') + '...' : product.description)
          : `Buy ${product.name} — 100% pure A2 Desi Cow Ghee made with traditional Bilona (Valona Paddhati) method. ${product.weight || ''} jar. Farm fresh, no preservatives. Free shipping!`}
        keywords={`${product.name}, A2 Desi Cow Ghee, Bilona Ghee, Valona Paddhati Ghee, Pure Buffalo Ghee, Organic Ghee Online India, ${product.category}, buy ${product.name} online`}
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
              className="mb-4"
            >
              <ShoppingCart size={20} className="mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: '🧪', text: 'Lab Tested & Certified' },
                { icon: '🌿', text: 'No Preservatives' },
                { icon: '🐄', text: 'A2 / Pure Milk' },
                { icon: '📦', text: 'FSSAI Approved' },
              ].map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
                  {badge.icon} {badge.text}
                </span>
              ))}
            </div>

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
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
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
              <div className="max-w-3xl space-y-6 text-gray-700">
                {product.description && <p className="text-base leading-relaxed">{product.description}</p>}

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Health Benefits of {product.name}</h2>
                  <ul className="space-y-2">
                    {productBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Use</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Add 1 tsp to warm dal, khichdi, or roti for enhanced flavour and nutrition</li>
                    <li>• Use for sautéing vegetables — safe up to 250°C smoke point</li>
                    <li>• Mix 1 tsp in warm milk at bedtime for better sleep and joint health</li>
                    <li>• Apply a small amount on chapati or paratha for a traditional finish</li>
                    <li>• Ideal for making halwa, laddoo, and festive sweets</li>
                    <li>• Ayurvedic use: apply a drop inside nostrils (Nasya therapy) for sinus relief</li>
                  </ul>
                </div>

                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Storage Instructions</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">📦</span>
                      <span>Store in a cool, dry place away from direct sunlight</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">🌡️</span>
                      <span>Ideal storage temperature: below 30°C — refrigeration not required</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">🥄</span>
                      <span>Always use a clean, dry spoon to scoop ghee — avoid moisture contact</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">📅</span>
                      <span>Shelf life: 12 months from manufacturing date when sealed; 6 months after opening</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">✅</span>
                      <span>Ghee may solidify in winter — this is completely natural and does not affect quality</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Why Choose Vashudha Ghee?</h3>
                  <ul className="space-y-2">
                    {[
                      'Made using traditional Bilona (Valona Paddhati) method for authentic taste',
                      'Sourced from grass-fed indigenous A2 desi cows — no exotic breeds',
                      'No preservatives, additives, artificial color, or synthetic flavors',
                      'Lab-tested for purity, safety, and quality standards — FSSAI approved',
                      'Packed in food-grade, airtight glass jars with tamper-proof seal',
                      'Small-batch production ensures consistent quality in every jar',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-primary-500 mt-1">✓</span>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  The Bilona Process — Valona Paddhati
                </h2>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  Bilona ghee (also known as Valona Paddhati ghee) is the gold standard of ghee making as described in
                  ancient Ayurvedic texts. Unlike commercial ghee made by separating cream from milk and boiling it,
                  Bilona ghee starts from whole milk curd, ensuring maximum retention of nutrients, aroma, and medicinal properties.
                </p>
                <div className="space-y-6">
                  {bilonaSteps.map((step) => (
                    <div key={step.step} className="flex gap-5 p-5 rounded-2xl border border-primary-100 bg-amber-50">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-5 text-sm text-gray-700">
                  <p className="font-semibold text-green-800 mb-2">🌿 Why Bilona method produces superior ghee:</p>
                  <p>
                    Starting from curd (rather than cream) means the churning process releases the fat globules bound to the
                    casein protein matrix. This results in ghee that retains naturally occurring CLA (conjugated linoleic acid),
                    butyric acid, fat-soluble vitamins, and digestive enzymes — all of which are largely absent in cream-based commercial ghee.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Nutrition Facts</h2>
                <p className="text-gray-500 text-sm mb-6">Per 100g serving and per 5g serving (approx. 1 tsp)</p>
                <div className="card overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary-500 text-white">
                        <th className="px-6 py-3 text-left font-semibold">Nutrient</th>
                        <th className="px-6 py-3 text-right font-semibold">Per 100g</th>
                        <th className="px-6 py-3 text-right font-semibold">Per 5g (1 tsp)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nutritionData.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-3 font-medium text-gray-700">{row.nutrient}</td>
                          <td className="px-6 py-3 text-right text-gray-900">{row.per100g}</td>
                          <td className="px-6 py-3 text-right text-gray-900">{row.per5g}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  * Values are approximate and may vary slightly by batch. Based on USDA and Indian food composition data.
                </p>
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
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Method</td>
                        <td className="px-6 py-3 text-gray-900">Traditional Bilona (Valona Paddhati)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Source</td>
                        <td className="px-6 py-3 text-gray-900">
                          {isCowGhee ? 'Indigenous A2 Desi Cow (Gir, Sahiwal)' : 'Pure Desi Buffalo (Murrah, Mehsani)'}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Shelf Life</td>
                        <td className="px-6 py-3 text-gray-900">12 months from manufacturing date (sealed)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Storage</td>
                        <td className="px-6 py-3 text-gray-900">Cool, dry place away from direct sunlight. No refrigeration needed.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Ingredients</td>
                        <td className="px-6 py-3 text-gray-900">
                          {isCowGhee ? '100% Pure A2 Desi Cow Ghee' : '100% Pure Buffalo Bilona Ghee'}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">Certifications</td>
                        <td className="px-6 py-3 text-gray-900">FSSAI Licensed | Lab Tested for Purity</td>
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
