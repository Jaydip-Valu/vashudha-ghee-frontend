import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react'
import SEO from '@/components/Common/SEO'
import Loading from '@/components/Common/Loading'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { ORDER_STATUS_COLORS } from '@/utils/constants'
import orderService from '@/services/order.service'
import toast from 'react-hot-toast'

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await orderService.getUserOrders()
      setOrders(data.orders || data)
    } catch (error) {
      toast.error('Failed to load orders')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    try {
      await orderService.cancelOrder(orderId)
      toast.success('Order cancelled successfully')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to cancel order')
      console.error(error)
    }
  }

  if (loading) return <Loading fullScreen />

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />
      case 'processing':
      case 'shipped':
        return <Clock className="text-blue-500" size={20} />
      default:
        return <Package className="text-gray-500" size={20} />
    }
  }

  return (
    <>
      <SEO 
        title="My Orders - Order History & Tracking"
        description="View your order history, track shipments, and manage your ghee orders. Check order status and delivery details."
        noindex={true}
      />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 card">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-gray-600">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Order #{order.orderNumber || String(order._id).slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'}`}>
                      {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-primary-600">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="btn-outline"
                      onClick={() => navigate(`/orders/${order._id}`)}
                    >
                      View Details
                    </button>
                    {order.status === 'pending' && (
                      <button
                        className="btn text-red-500 border-red-500 hover:bg-red-50"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Orders
