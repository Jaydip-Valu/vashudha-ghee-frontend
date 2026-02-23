import { useState } from 'react'
import { Search, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react'
import SEO from '@/components/Common/SEO'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!orderNumber || !email) {
      setError('Please enter both order number and email')
      return
    }

    try {
      setLoading(true)
      // Here you would typically call your API
      // For now, showing a sample order
      setTimeout(() => {
        setOrderData({
          orderNumber: orderNumber,
          status: 'shipped',
          items: [
            { name: 'Pure A2 Cow Ghee 500g', quantity: 2 }
          ],
          total: 1198,
          estimatedDelivery: '2024-02-25',
          timeline: [
            { status: 'Order Placed', date: '2024-02-20', completed: true },
            { status: 'Processing', date: '2024-02-21', completed: true },
            { status: 'Shipped', date: '2024-02-22', completed: true },
            { status: 'Out for Delivery', date: '2024-02-25', completed: false },
            { status: 'Delivered', date: '', completed: false }
          ]
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError('Order not found. Please check your order number and email.')
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={24} />
      case 'shipped':
        return <Truck className="text-blue-500" size={24} />
      case 'processing':
        return <Clock className="text-yellow-500" size={24} />
      case 'cancelled':
        return <XCircle className="text-red-500" size={24} />
      default:
        return <Package className="text-gray-500" size={24} />
    }
  }

  return (
    <>
      <SEO 
        title="Track Your Order - Order Tracking"
        description="Track your Vashudha Ghee order in real-time. Enter your order number and email to see the current status and estimated delivery date."
        keywords="track order, order status, delivery tracking, vashudha ghee order"
        noindex={true}
      />

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading mb-4">Track Your Order</h1>
            <p className="text-gray-600">
              Enter your order details to track your shipment
            </p>
          </div>

          {/* Tracking Form */}
          <div className="card p-8 mb-8">
            <form onSubmit={handleTrack} className="space-y-4">
              <Input
                label="Order Number"
                placeholder="Enter your order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                fullWidth 
                size="lg"
                loading={loading}
              >
                <Search size={20} className="mr-2" />
                Track Order
              </Button>
            </form>
          </div>

          {/* Order Details */}
          {orderData && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Order #{orderData.orderNumber}</h2>
                    <p className="text-gray-600">
                      Estimated Delivery: {new Date(orderData.estimatedDelivery).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  {getStatusIcon(orderData.status)}
                </div>

                {/* Order Items */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <span>{item.name} x {item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{orderData.total}</span>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-6">Order Timeline</h3>
                <div className="space-y-4">
                  {orderData.timeline.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-400'
                        }`}>
                          {step.completed ? '✓' : index + 1}
                        </div>
                        {index < orderData.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          step.completed ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {step.status}
                        </h4>
                        {step.date && (
                          <p className="text-sm text-gray-600">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className="card p-6 bg-blue-50">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-700 mb-4">
                  If you have any questions about your order, please contact our customer support.
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TrackOrder
