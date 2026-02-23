import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { selectCartItems, selectCartTotalAmount, clearCart } from '@/store/cartSlice'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
import SEO from '@/components/Common/SEO'
import { formatCurrency } from '@/utils/helpers'
import orderService from '@/services/order.service'
import paymentService from '@/services/payment.service'
import toast from 'react-hot-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      
      const orderData = {
        shippingAddress: data,
        items: cartItems,
        totalAmount,
        paymentMethod: data.paymentMethod,
      }

      if (data.paymentMethod === 'razorpay') {
        await handleRazorpayPayment(orderData)
      } else {
        await handleCODPayment(orderData)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRazorpayPayment = async (orderData) => {
    const scriptLoaded = await paymentService.loadRazorpayScript()
    if (!scriptLoaded) {
      toast.error('Failed to load payment gateway')
      return
    }

    const razorpayOrder = await paymentService.createRazorpayOrder(orderData)

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'Vashudha Ghee',
      description: 'Order Payment',
      order_id: razorpayOrder.id,
      handler: async (response) => {
        try {
          await paymentService.verifyRazorpayPayment(response)
          dispatch(clearCart())
          toast.success('Order placed successfully!')
          navigate('/orders')
        } catch (error) {
          toast.error('Payment verification failed')
        }
      },
      prefill: {
        name: orderData.shippingAddress.fullName,
        email: orderData.shippingAddress.email,
        contact: orderData.shippingAddress.phone,
      },
    }

    const razorpay = new window.Razorpay(options)
    razorpay.open()
  }

  const handleCODPayment = async (orderData) => {
    await orderService.createOrder(orderData)
    dispatch(clearCart())
    toast.success('Order placed successfully!')
    navigate('/orders')
  }

  return (
    <>
      <SEO 
        title="Checkout - Complete Your Order"
        description="Complete your ghee order securely. Choose payment method: online payment via Razorpay or Cash on Delivery (COD). Free shipping available."
        noindex={true}
      />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2 card p-6">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  {...register('fullName', { required: 'Full name is required' })}
                  error={errors.fullName?.message}
                />
                <Input
                  label="Email"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  error={errors.email?.message}
                />
                <Input
                  label="Phone"
                  {...register('phone', { required: 'Phone is required' })}
                  error={errors.phone?.message}
                />
                <Input
                  label="Pincode"
                  {...register('pincode', { required: 'Pincode is required' })}
                  error={errors.pincode?.message}
                />
              </div>

              <Input
                label="Address"
                {...register('address', { required: 'Address is required' })}
                error={errors.address?.message}
                containerClassName="mt-4"
              />

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <Input
                  label="City"
                  {...register('city', { required: 'City is required' })}
                  error={errors.city?.message}
                />
                <Input
                  label="State"
                  {...register('state', { required: 'State is required' })}
                  error={errors.state?.message}
                />
                <Input
                  label="Country"
                  defaultValue="India"
                  {...register('country')}
                />
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="razorpay"
                      {...register('paymentMethod', { required: true })}
                      className="mr-3"
                    />
                    <span>Pay Online (Razorpay)</span>
                  </label>
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="cod"
                      {...register('paymentMethod', { required: true })}
                      className="mr-3"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  className="mt-6"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Checkout
