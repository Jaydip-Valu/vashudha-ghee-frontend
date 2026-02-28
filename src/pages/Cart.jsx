import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingBag, Tag, Truck, Shield, RefreshCw, Lock } from 'lucide-react'
import { selectCartItems, selectCartTotalAmount, clearCart } from '@/store/cartSlice'
import CartItem from '@/components/Cart/CartItem'
import Button from '@/components/Common/Button'
import SEO from '@/components/Common/SEO'
import { formatCurrency } from '@/utils/helpers'

const VALID_COUPONS = {
  WELCOME50: { discount: 50, type: 'flat', label: '₹50 off' },
  GHEE10: { discount: 10, type: 'percent', label: '10% off' },
  BILONA15: { discount: 15, type: 'percent', label: '15% off' },
}

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart())
      setAppliedCoupon(null)
    }
  }

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    if (!code) {
      setCouponError('Please enter a coupon code')
      return
    }
    if (VALID_COUPONS[code]) {
      setAppliedCoupon({ code, ...VALID_COUPONS[code] })
      setCouponError('')
    } else {
      setAppliedCoupon(null)
      setCouponError('Invalid coupon code. Try WELCOME50 or GHEE10.')
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const discountAmount = appliedCoupon
    ? appliedCoupon.type === 'flat'
      ? appliedCoupon.discount
      : Math.round((totalAmount * appliedCoupon.discount) / 100)
    : 0

  const shippingFee = totalAmount >= 500 ? 0 : 50
  const finalTotal = totalAmount - discountAmount + shippingFee

  if (cartItems.length === 0) {
    return (
      <>
        <SEO 
          title="Shopping Cart - Your Cart is Empty"
          description="Your shopping cart is empty. Browse our premium collection of pure desi ghee products and add items to cart."
          noindex={true}
        />
        <div className="container-custom py-16 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO 
        title="Shopping Cart - Review Your Items"
        description="Review your selected ghee products and proceed to checkout. Free shipping on all orders above ₹500."
        noindex={true}
      />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
            <Button variant="danger" onClick={handleClearCart}>
              Clear Cart
            </Button>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { icon: Truck, text: 'Free Delivery ₹500+', color: 'text-green-600' },
                { icon: Shield, text: 'Secure Payment', color: 'text-blue-600' },
                { icon: RefreshCw, text: '7-Day Returns', color: 'text-purple-600' },
                { icon: Lock, text: 'Safe & Encrypted', color: 'text-orange-600' },
              ].map((signal, i) => {
                const Icon = signal.icon
                return (
                  <div key={i} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <Icon size={20} className={`mb-1 ${signal.color}`} />
                    <span className="text-xs text-gray-600">{signal.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20 space-y-5">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              
              {/* Coupon Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Tag size={14} /> Coupon Code
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <span className="text-sm font-medium text-green-700">
                      🎉 {appliedCoupon.code} — {appliedCoupon.label} applied!
                    </span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-red-500 hover:text-red-600 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value); setCouponError('') }}
                      placeholder="Enter coupon code"
                      className="input flex-1 text-sm"
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="btn-primary text-sm px-3 whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-xs text-red-500 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span className="font-semibold">−{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shippingFee === 0 ? 'font-semibold text-green-600' : 'font-semibold'}>
                    {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
                  </span>
                </div>
                {totalAmount < 500 && (
                  <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                    🚚 Add {formatCurrency(500 - totalAmount)} more for FREE delivery!
                  </p>
                )}
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs text-blue-700 flex items-center gap-2">
                <Truck size={14} />
                Estimated delivery: <strong>3–5 business days</strong>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>

              <Link
                to="/products"
                className="block text-center text-primary-500 hover:text-primary-600 text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
