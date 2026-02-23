import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingBag } from 'lucide-react'
import { selectCartItems, selectCartTotalAmount, clearCart } from '@/store/cartSlice'
import CartItem from '@/components/Cart/CartItem'
import Button from '@/components/Common/Button'
import SEO from '@/components/Common/SEO'
import { formatCurrency } from '@/utils/helpers'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart())
    }
  }

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
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
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
                className="block text-center mt-4 text-primary-500 hover:text-primary-600"
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
