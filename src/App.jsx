import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './store/authSlice'
import ProtectedRoute from './routes/ProtectedRoute'

// Layout
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'

// Public Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import TrackOrder from './pages/TrackOrder'
import ShippingPolicy from './pages/ShippingPolicy'
import ReturnPolicy from './pages/ReturnPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'

// Protected Pages
import Profile from './pages/Profile'
import Orders from './pages/Orders'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ProductsManagement from './pages/admin/ProductsManagement'
import OrdersManagement from './pages/admin/OrdersManagement'
import InventoryManagement from './pages/admin/InventoryManagement'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (user && token) {
      dispatch(setCredentials({ user: JSON.parse(user), token }))
    }
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Informational Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/returns" element={<ReturnPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductsManagement />} />
            <Route path="/admin/orders" element={<OrdersManagement />} />
            <Route path="/admin/inventory" element={<InventoryManagement />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
