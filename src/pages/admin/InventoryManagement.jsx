import { useState, useEffect } from 'react'
import { AlertCircle, TrendingUp, TrendingDown, Check, X } from 'lucide-react'
import Sidebar from '@/components/Layout/Sidebar'
import SEO from '@/components/Common/SEO'
import Loading from '@/components/Common/Loading'
import productService from '@/services/product.service'
import toast from 'react-hot-toast'

const InventoryManagement = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingStockId, setEditingStockId] = useState(null)
  const [stockInput, setStockInput] = useState('')
  const [savingStockId, setSavingStockId] = useState(null)

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

  const startEditStock = (product) => {
    setEditingStockId(product._id)
    setStockInput(String(product.stock))
  }

  const cancelEditStock = () => {
    setEditingStockId(null)
    setStockInput('')
  }

  const saveStock = async (productId) => {
    const newStock = parseInt(stockInput, 10)
    if (isNaN(newStock) || newStock < 0) {
      toast.error('Please enter a valid whole number for stock quantity')
      return
    }
    try {
      setSavingStockId(productId)
      await productService.updateStock(productId, newStock)
      toast.success('Stock updated successfully')
      setEditingStockId(null)
      fetchProducts()
    } catch (error) {
      console.error(error)
    } finally {
      setSavingStockId(null)
    }
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
                    const isEditing = editingStockId === product._id
                    const isSaving = savingStockId === product._id

                    return (
                      <tr key={product._id}>
                        <td className="px-6 py-4 font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {product.sku || product._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              value={stockInput}
                              onChange={(e) => setStockInput(e.target.value)}
                              className="w-24 px-2 py-1 border border-primary-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveStock(product._id)
                                if (e.key === 'Escape') cancelEditStock()
                              }}
                            />
                          ) : (
                            <span className={`text-lg font-semibold ${status.color}`}>
                              {product.stock}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center space-x-2 ${status.color}`}>
                            <StatusIcon size={18} />
                            <span className="font-medium">{status.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isEditing ? (
                            <div className="flex justify-end items-center gap-2">
                              <button
                                onClick={() => saveStock(product._id)}
                                disabled={isSaving}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded disabled:opacity-50"
                                title="Save stock"
                              >
                                {isSaving ? (
                                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                ) : (
                                  <Check size={16} />
                                )}
                              </button>
                              <button
                                onClick={cancelEditStock}
                                className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
                                title="Cancel"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEditStock(product)}
                              className="btn-primary text-sm"
                            >
                              Update Stock
                            </button>
                          )}
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

