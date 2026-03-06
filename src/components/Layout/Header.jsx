import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, User, LogOut, Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react'
import { logout, selectIsAuthenticated, selectCurrentUser } from '@/store/authSlice'
import { selectCartTotalQuantity } from '@/store/cartSlice'
import { useState, useRef, useEffect } from 'react'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectCurrentUser)
  const cartQuantity = useSelector(selectCartTotalQuantity)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const moreMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setMoreMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary-500 text-white text-xs md:text-sm py-2 px-4">
        <div className="container-custom flex items-center justify-between">
          <span className="hidden sm:flex items-center gap-1">
            <span>🌿</span>
            <span>100% Pure A2 Bilona Ghee — No Preservatives, No Additives</span>
          </span>
          <span className="flex items-center gap-3 mx-auto sm:mx-0">
            <span className="flex items-center gap-1">
              <Phone size={12} />
              <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              🚚 Free delivery on orders above ₹500
            </span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-amber-100 sticky top-0 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <img
                src="/images/logo.svg"
                alt="Vashudha Ghee - Pure Desi Ghee"
                className="h-12 md:h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7">
              <Link to="/" className="text-gray-700 hover:text-primary-500 transition font-medium text-sm">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary-500 transition font-medium text-sm">
                Shop
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-500 transition font-medium text-sm">
                About Us
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary-500 transition font-medium text-sm">
                Blog
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-500 transition font-medium text-sm">
                Contact
              </Link>
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition font-medium text-sm"
                >
                  <span>More</span>
                  <ChevronDown size={15} />
                </button>
                {moreMenuOpen && (
                  <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-premium py-2 z-50 border border-amber-50">
                    <Link
                      to="/track-order"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-primary-600 text-sm"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      Track Order
                    </Link>
                    <Link
                      to="/faq"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-primary-600 text-sm"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                    <Link
                      to="/shipping"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-primary-600 text-sm"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      Shipping Policy
                    </Link>
                    <Link
                      to="/returns"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-primary-600 text-sm"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      Return Policy
                    </Link>
                    <Link
                      to="/privacy"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-primary-600 text-sm"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      to="/terms"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-primary-600 text-sm"
                      onClick={() => setMoreMenuOpen(false)}
                    >
                      Terms &amp; Conditions
                    </Link>
                  </div>
                )}
              </div>
              {user?.role === 'admin' && (
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary-500 transition font-medium text-sm">
                  Admin
                </Link>
              )}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 text-green-600 hover:text-green-700 transition text-sm font-medium"
                aria-label="Order on WhatsApp"
              >
                <MessageCircle size={18} />
                <span className="hidden lg:inline">Order on WhatsApp</span>
              </a>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-500 transition" aria-label="Cart">
                <ShoppingCart size={22} />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartQuantity}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1.5 p-2 text-gray-600 hover:text-primary-500 transition">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || <User size={16} />}
                    </div>
                    <span className="hidden lg:inline text-sm font-medium">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-premium py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-amber-50 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-primary-600 text-sm"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-primary-600 text-sm"
                    >
                      My Orders
                    </Link>
                    <hr className="my-1 border-amber-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 flex items-center space-x-2 text-sm"
                    >
                      <LogOut size={15} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:inline-flex btn-primary text-sm"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-500 transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-100 shadow-lg">
            <nav className="flex flex-col py-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Shop' },
                { to: '/about', label: 'About Us' },
                { to: '/blog', label: 'Blog' },
                { to: '/contact', label: 'Contact' },
                { to: '/track-order', label: 'Track Order' },
                { to: '/faq', label: 'FAQ' },
                { to: '/shipping', label: 'Shipping Policy' },
                { to: '/returns', label: 'Return Policy' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms & Conditions' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="px-5 py-3 text-gray-700 hover:bg-amber-50 hover:text-primary-600 font-medium text-sm border-b border-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="px-5 py-3 text-gray-700 hover:bg-amber-50 hover:text-primary-600 font-medium text-sm border-b border-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <div className="px-5 pt-3 pb-2 flex flex-col gap-3">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 font-medium text-sm"
                >
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </a>
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="btn-primary text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
