import { useState, useEffect } from 'react'
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import Sidebar from '@/components/Layout/Sidebar'
import SEO from '@/components/Common/SEO'
import { formatCurrency } from '@/utils/helpers'
import orderService from '@/services/order.service'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const data = await orderService.getDashboardStats()
      setStats({
        totalOrders: data.total_orders ?? data.totalOrders ?? 0,
        totalRevenue: data.total_revenue ?? data.totalRevenue ?? 0,
        totalProducts: data.total_products ?? data.totalProducts ?? 0,
        totalCustomers: data.total_customers ?? data.totalCustomers ?? 0,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'bg-orange-500',
    },
  ]

  return (
    <>
      <SEO title="Admin Dashboard" noindex={true} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} text-white p-3 rounded-lg`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-600">Recent orders and activity will appear here</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
