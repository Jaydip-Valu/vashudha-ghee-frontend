import { useState, useEffect } from 'react'
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'
import Sidebar from '@/components/Layout/Sidebar'
import SEO from '@/components/Common/SEO'
import Loading from '@/components/Common/Loading'
import productService from '@/services/product.service'
import toast from 'react-hot-toast'

const InventoryManagement = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getProducts()
      setProducts(data.products || data)
    } catch (error) {
      toast.error('Failed to load inventory')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'text-red-600', icon: AlertCircle }
    if (stock < 10) return { label: 'Low Stock', color: 'text-orange-600', icon: TrendingDown }
    return { label: 'In Stock', color: 'text-green-600', icon: TrendingUp }
  }

  const lowStockProducts = products.filter(p => p.stock < 10 && p.stock > 0)
  const outOfStockProducts = products.filter(p => p.stock === 0)

  return (
    <>
      <SEO title="Inventory Management" noindex={true} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50">
          <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Total Products</h3>
              <p className="text-3xl font-bold">{products.length}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Low Stock Alert</h3>
              <p className="text-3xl font-bold text-orange-600">{lowStockProducts.length}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Out of Stock</h3>
              <p className="text-3xl font-bold text-red-600">{outOfStockProducts.length}</p>
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => {
                    const status = getStockStatus(product.stock)
                    const StatusIcon = status.icon
                    
                    return (
                      <tr key={product._id}>
                        <td className="px-6 py-4 font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {product.sku || product._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-lg font-semibold ${status.color}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center space-x-2 ${status.color}`}>
                            <StatusIcon size={18} />
                            <span className="font-medium">{status.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="btn-primary text-sm">
                            Update Stock
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default InventoryManagement
