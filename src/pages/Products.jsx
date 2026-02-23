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
        title="Products - Browse Our Premium Ghee Collection" 
        description="Browse our wide range of premium quality pure desi ghee products. A2 Ghee, Cow Ghee, Buffalo Ghee, Organic Ghee and more. Free shipping on orders above ₹500."
        keywords="buy ghee online, desi ghee online, A2 ghee, cow ghee, buffalo ghee, organic ghee, pure ghee products"
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
      
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our premium collection of pure desi ghee
          </p>
        </div>

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
