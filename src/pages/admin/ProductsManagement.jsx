import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Upload, ToggleLeft, ToggleRight } from 'lucide-react'
import Sidebar from '@/components/Layout/Sidebar'
import SEO from '@/components/Common/SEO'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
import Loading from '@/components/Common/Loading'
import { formatCurrency, getImageUrl } from '@/utils/helpers'
import { PRODUCT_CATEGORIES } from '@/utils/constants'
import productService from '@/services/product.service'
import toast from 'react-hot-toast'

const EMPTY_FORM = {
  name: '',
  description: '',
  category: '',
  price: '',
  mrp: '',
  stock: '',
  weight: '',
  unit: 'gm',
  isFeatured: false,
  isActive: true,
}

const ProductModal = ({ product, onClose, onSaved }) => {
  const isEdit = Boolean(product)
  const [form, setForm] = useState(isEdit ? {
    name: product.name || '',
    description: product.description || '',
    category: product.category || '',
    price: product.price ?? '',
    mrp: product.mrp ?? '',
    stock: product.stock ?? '',
    weight: product.weight ?? '',
    unit: product.unit || 'gm',
    isFeatured: product.isFeatured || false,
    isActive: product.isActive !== false, // default true if field absent
  } : { ...EMPTY_FORM })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.category) e.category = 'Category is required'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = 'Enter a valid price'
    if (form.mrp && (isNaN(Number(form.mrp)) || Number(form.mrp) <= 0))
      e.mrp = 'Enter a valid MRP'
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      e.stock = 'Enter a valid stock quantity'
    return e
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length) { setErrors(validationErrors); return }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      price: Number(form.price),
      mrp: form.mrp ? Number(form.mrp) : undefined,
      stock: Number(form.stock),
      weight: form.weight ? Number(form.weight) : undefined,
      unit: form.unit,
      isFeatured: form.isFeatured,
      isActive: form.isActive,
    }

    try {
      setSaving(true)
      if (isEdit) {
        await productService.updateProduct(product._id, payload)
        toast.success('Product updated successfully')
      } else {
        await productService.createProduct(payload)
        toast.success('Product created successfully')
      }
      onSaved()
    } catch (err) {
      // Error toast already shown by the api interceptor
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <Input
            label="Product Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="e.g. Pure Desi Cow Ghee 500g"
          />

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the product..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select category</option>
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Selling Price (₹) *"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              error={errors.price}
              placeholder="e.g. 499"
            />
            <Input
              label="MRP (₹)"
              name="mrp"
              type="number"
              min="0"
              step="0.01"
              value={form.mrp}
              onChange={handleChange}
              error={errors.mrp}
              placeholder="e.g. 599"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Stock Quantity *"
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              error={errors.stock}
              placeholder="e.g. 50"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Weight"
                name="weight"
                type="number"
                min="0"
                step="0.01"
                value={form.weight}
                onChange={handleChange}
                placeholder="e.g. 500"
              />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="gm">gm</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="L">L</option>
                </select>
              </div>
            </div>
          </div>

          {/* Flags row */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Mark as Featured
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Active (visible to customers)
              </span>
            </label>
          </div>

          {isEdit && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 flex items-start gap-2">
              <Upload size={16} className="flex-shrink-0 mt-0.5" />
              <span>
                To update product images, use the <strong>Upload Images</strong> option after saving.
              </span>
            </div>
          )}

          {/* Footer actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {isEdit ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ProductsManagement = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getProducts()
      setProducts(data.products || data)
    } catch (error) {
      toast.error('Failed to load products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleToggleStatus = async (product) => {
    const newStatus = product.isActive === false
    try {
      setTogglingId(product._id)
      await productService.toggleProductStatus(product._id, newStatus)
      toast.success(`Product ${newStatus ? 'activated' : 'deactivated'} successfully`)
      fetchProducts()
    } catch (error) {
      console.error(error)
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      setDeletingId(id)
      await productService.deleteProduct(id)
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      // Error toast already shown by the api interceptor
      console.error(error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleModalSaved = () => {
    closeModal()
    fetchProducts()
  }

  return (
    <>
      <SEO title="Products Management" noindex={true} />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={closeModal}
          onSaved={handleModalSaved}
        />
      )}

      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Products Management</h1>
            <Button onClick={openAddModal}>
              <Plus size={20} className="mr-2" />
              Add Product
            </Button>
          </div>

          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="card p-12 text-center text-gray-500">
              <p className="text-lg mb-4">No products found.</p>
              <Button onClick={openAddModal}>
                <Plus size={18} className="mr-2" />
                Add your first product
              </Button>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Stock
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
                    const isActive = product.isActive !== false
                    return (
                      <tr key={product._id} className={!isActive ? 'bg-gray-50 opacity-75' : ''}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={getImageUrl(product.images?.[0])}
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover mr-3"
                            />
                            <div>
                              <span className="font-medium block">{product.name}</span>
                              {product.isFeatured && (
                                <span className="text-xs text-primary-600 font-medium">⭐ Featured</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{product.category}</td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="font-semibold">{formatCurrency(product.price)}</span>
                            {product.mrp && product.mrp > product.price && (
                              <span className="text-xs text-gray-400 line-through ml-1">
                                {formatCurrency(product.mrp)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={product.stock > 10 ? 'text-green-600' : 'text-red-600'}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isActive ? '● Active' : '○ Inactive'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              product.stock > 0
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center space-x-1">
                            {/* Active / Inactive toggle */}
                            <button
                              onClick={() => handleToggleStatus(product)}
                              disabled={togglingId === product._id}
                              className={`p-2 rounded transition-colors ${
                                isActive
                                  ? 'text-green-600 hover:bg-green-50'
                                  : 'text-gray-400 hover:bg-gray-100'
                              } disabled:opacity-50`}
                              title={isActive ? 'Deactivate product' : 'Activate product'}
                            >
                              {togglingId === product._id ? (
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : isActive ? (
                                <ToggleRight size={20} />
                              ) : (
                                <ToggleLeft size={20} />
                              )}
                            </button>
                            {/* Edit */}
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit product"
                            >
                              <Edit size={18} />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(product._id)}
                              disabled={deletingId === product._id}
                              className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                              title="Delete product"
                            >
                              {deletingId === product._id ? (
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </button>
                          </div>
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

export default ProductsManagement
