import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { MapPin, Plus, Shield, Lock, CreditCard, Smartphone, Truck } from 'lucide-react'
import { selectCartItems, selectCartTotalAmount, clearCart } from '@/store/cartSlice'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
import SEO from '@/components/Common/SEO'
import { formatCurrency } from '@/utils/helpers'
import orderService from '@/services/order.service'
import paymentService from '@/services/payment.service'
import addressService from '@/services/address.service'
import toast from 'react-hot-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  const [loading, setLoading] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const data = await addressService.getAddresses()
      const list = data.addresses || data || []
      setAddresses(list)
      if (list.length > 0) {
        const defaultAddr = list.find((a) => a.is_default) || list[0]
        setSelectedAddressId(defaultAddr.id)
        setShowNewAddressForm(false)
      } else {
        setShowNewAddressForm(true)
      }
    } catch {
      setShowNewAddressForm(true)
    }
  }

  const buildShippingPayload = (addr) => ({
    shipping_full_name: addr.full_name,
    shipping_phone: addr.phone,
    shipping_address_line1: addr.address_line1,
    shipping_address_line2: addr.address_line2 || '',
    shipping_city: addr.city,
    shipping_state: addr.state,
    shipping_postal_code: addr.postal_code,
    shipping_country: addr.country || 'India',
  })

  const onSubmit = async (formData) => {
    try {
      setLoading(true)

      let shippingPayload

      if (showNewAddressForm || !selectedAddressId) {
        // Save address if "save for later" checked or just use form data
        shippingPayload = {
          shipping_full_name: formData.full_name,
          shipping_phone: formData.phone,
          shipping_address_line1: formData.address_line1,
          shipping_address_line2: formData.address_line2 || '',
          shipping_city: formData.city,
          shipping_state: formData.state,
          shipping_postal_code: formData.postal_code,
          shipping_country: formData.country || 'India',
        }
        if (formData.save_address) {
          await addressService.createAddress({
            full_name: formData.full_name,
            phone: formData.phone,
            address_line1: formData.address_line1,
            address_line2: formData.address_line2 || '',
            city: formData.city,
            state: formData.state,
            postal_code: formData.postal_code,
            country: formData.country || 'India',
          })
        }
      } else {
        const addr = addresses.find((a) => a.id === selectedAddressId)
        shippingPayload = buildShippingPayload(addr)
      }

      const orderData = {
        ...shippingPayload,
        payment_method: formData.paymentMethod,
      }

      if (formData.paymentMethod === 'razorpay') {
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
      currency: razorpayOrder.currency || 'INR',
      name: 'Vashudha Ghee',
      description: 'Order Payment',
      order_id: razorpayOrder.razorpay_order_id,
      handler: async (response) => {
        try {
          await paymentService.verifyRazorpayPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })
          dispatch(clearCart())
          toast.success('Order placed successfully!')
          navigate('/orders')
        } catch (err) {
          console.error('Payment verification failed:', err)
          toast.error('Payment verification failed')
        }
      },
      prefill: {
        name: orderData.shipping_full_name,
        contact: orderData.shipping_phone,
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
            {/* Address + Payment */}
            <div className="lg:col-span-2 space-y-6">

              {/* Saved Addresses */}
              {addresses.length > 0 && (
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MapPin size={20} /> Shipping Address
                  </h2>
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                          selectedAddressId === addr.id && !showNewAddressForm
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address_selection"
                          className="mt-1 mr-3"
                          checked={selectedAddressId === addr.id && !showNewAddressForm}
                          onChange={() => {
                            setSelectedAddressId(addr.id)
                            setShowNewAddressForm(false)
                          }}
                        />
                        <div>
                          <p className="font-medium">{addr.full_name}</p>
                          <p className="text-sm text-gray-600">{addr.phone}</p>
                          <p className="text-sm text-gray-600">
                            {addr.address_line1}
                            {addr.address_line2 ? `, ${addr.address_line2}` : ''}
                          </p>
                          <p className="text-sm text-gray-600">
                            {addr.city}, {addr.state} – {addr.postal_code}
                          </p>
                          <p className="text-sm text-gray-600">{addr.country}</p>
                        </div>
                      </label>
                    ))}

                    <label
                      className={`flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                        showNewAddressForm ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address_selection"
                        className="mr-3"
                        checked={showNewAddressForm}
                        onChange={() => {
                          setShowNewAddressForm(true)
                          setSelectedAddressId(null)
                          reset()
                        }}
                      />
                      <Plus size={16} className="mr-1" />
                      <span className="font-medium">Add a new address</span>
                    </label>
                  </div>
                </div>
              )}

              {/* New Address Form */}
              {showNewAddressForm && (
                <div className="card p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    {addresses.length === 0 ? 'Shipping Address' : 'New Address'}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      {...register('full_name', { required: 'Full name is required' })}
                      error={errors.full_name?.message}
                    />
                    <Input
                      label="Phone"
                      {...register('phone', { required: 'Phone is required' })}
                      error={errors.phone?.message}
                    />
                  </div>

                  <Input
                    label="Address Line 1"
                    {...register('address_line1', { required: 'Address is required' })}
                    error={errors.address_line1?.message}
                    containerClassName="mt-4"
                  />
                  <Input
                    label="Address Line 2 (optional)"
                    {...register('address_line2')}
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
                      label="Postal Code"
                      {...register('postal_code', { required: 'Postal code is required' })}
                      error={errors.postal_code?.message}
                    />
                  </div>

                  <Input
                    label="Country"
                    defaultValue="India"
                    {...register('country')}
                    containerClassName="mt-4"
                  />

                  <label className="flex items-center mt-4 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="mr-2" {...register('save_address')} />
                    Save this address for future orders
                  </label>
                </div>
              )}

              {/* Payment Method */}
              <div className="card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-primary-500" />
                  Payment Method
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="razorpay"
                      {...register('paymentMethod', { required: 'Please select a payment method' })}
                      className="mr-3"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-blue-500" />
                      <div>
                        <span className="font-medium">Pay Online</span>
                        <p className="text-xs text-gray-500">UPI, Cards, Net Banking via Razorpay</p>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="cod"
                      {...register('paymentMethod', { required: 'Please select a payment method' })}
                      className="mr-3"
                    />
                    <div className="flex items-center gap-2">
                      <Truck size={18} className="text-green-500" />
                      <div>
                        <span className="font-medium">Cash on Delivery</span>
                        <p className="text-xs text-gray-500">Pay when your order arrives</p>
                      </div>
                    </div>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
                )}

                {/* Security Badges */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      { icon: Lock, text: '256-bit SSL Secure', color: 'text-green-600' },
                      { icon: Shield, text: 'PCI DSS Compliant', color: 'text-blue-600' },
                      { icon: Smartphone, text: 'UPI Supported', color: 'text-purple-600' },
                    ].map((badge, i) => {
                      const Icon = badge.icon
                      return (
                        <span key={i} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                          <Icon size={12} className={badge.color} />
                          {badge.text}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id || item._id} className="flex justify-between text-sm">
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
                  <Lock size={16} className="mr-2" />
                  Place Order Securely
                </Button>

                {/* Checkout Trust Badges */}
                <div className="mt-4 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Lock size={12} className="text-green-600" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                  <div className="flex justify-center gap-3 text-xs text-gray-400">
                    <span>✓ 7-Day Returns</span>
                    <span>✓ Free Delivery</span>
                    <span>✓ 100% Pure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Checkout
