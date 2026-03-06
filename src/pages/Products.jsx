import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from '@/components/Product/ProductList'
import ProductFilter from '@/components/Product/ProductFilter'
import SEO from '@/components/Common/SEO'
import { setProducts, setLoading, setFilters, resetFilters, selectAllProducts, selectProductsLoading, selectProductFilters } from '@/store/productSlice'
import productService from '@/services/product.service'
import toast from 'react-hot-toast'

const Products = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const loading = useSelector(selectProductsLoading)
  const filters = useSelector(selectProductFilters)

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true))
      const data = await productService.getProducts({
        category: filters.category,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        sort: filters.sort,
      })
      dispatch(setProducts(data.products || data))
    } catch (error) {
      toast.error('Failed to load products')
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters))
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  return (
    <>
      <SEO 
        title="Buy Pure A2 Desi Cow Ghee & Buffalo Bilona Ghee Online | Vashudha Ghee" 
        description="Buy 100% pure A2 Desi Cow Ghee, Buffalo Bilona Ghee online at best prices. Made using traditional Valona Paddhati method. Free shipping on orders above ₹500 across India."
        keywords="A2 Desi Cow Ghee, Bilona Ghee, Valona Paddhati Ghee, Pure Buffalo Ghee, Organic Ghee Online India, buy ghee online, desi ghee online, A2 ghee price"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' }
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Ghee Products',
          description: 'Browse our premium collection of pure desi ghee products',
          url: window.location.href
        }}
      />
      
      <section className="bg-gradient-to-br from-amber-50 via-cream-50 to-yellow-50 py-12 border-b border-amber-100">
        <div className="container-custom">
          <span className="section-badge">🛒 Our Collection</span>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-2">
            Shop Pure Desi Ghee
          </h1>
          <div className="w-14 h-1 bg-primary-500 rounded-full mb-4"></div>
          <p className="text-gray-600 mb-5 max-w-2xl">
            Discover our premium collection of 100% pure A2 Cow Ghee and Buffalo Bilona Ghee —
            made using traditional Valona Paddhati. Free delivery on orders above ₹500.
          </p>
          {/* SEO Content Paragraph */}
          <div className="bg-white border border-amber-100 rounded-xl p-5 text-sm text-gray-600 leading-relaxed max-w-4xl shadow-soft">
            <p>
              Welcome to Vashudha Ghee — your trusted source for <strong>100% pure A2 Desi Cow Ghee</strong> and{' '}
              <strong>Buffalo Bilona Ghee</strong> made using the ancient <strong>Valona Paddhati (Bilona Method)</strong>.
              Every jar is handcrafted from the milk of free-roaming, grass-fed indigenous cows and buffaloes.
              We never add preservatives, chemicals, or artificial colors. Each batch is lab-tested for purity before it reaches your table.
              Whether you are looking for <em>Organic Ghee Online India</em>, <em>A2 Desi Cow Ghee</em>, or
              traditional <em>Pure Buffalo Ghee</em> — you have come to the right place.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductList products={products} loading={loading} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
