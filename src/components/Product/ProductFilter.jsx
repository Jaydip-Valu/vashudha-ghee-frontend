import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '@/utils/constants'
import Button from '../Common/Button'

const ProductFilter = ({ filters, onFilterChange, onReset }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryChange = (category) => {
    onFilterChange({ category: category === filters.category ? '' : category })
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    onFilterChange({
      priceRange: name === 'min' 
        ? [Number(value), filters.priceRange[1]]
        : [filters.priceRange[0], Number(value)]
    })
  }

  const handleSortChange = (e) => {
    onFilterChange({ sort: e.target.value })
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`
        lg:block bg-white p-6 rounded-lg shadow-soft
        ${isOpen ? 'block' : 'hidden'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Filter size={20} className="mr-2" />
            Filters
          </h3>
          <button
            onClick={onReset}
            className="text-sm text-primary-500 hover:text-primary-600 flex items-center"
          >
            <X size={16} className="mr-1" />
            Reset
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Categories</h4>
          <div className="space-y-2">
            {PRODUCT_CATEGORIES.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Min Price</label>
              <input
                type="number"
                name="min"
                value={filters.priceRange[0]}
                onChange={handlePriceChange}
                className="input mt-1"
                placeholder="Min"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Max Price</label>
              <input
                type="number"
                name="max"
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                className="input mt-1"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Sort */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Sort By</h4>
          <select
            value={filters.sort}
            onChange={handleSortChange}
            className="input w-full"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default ProductFilter
