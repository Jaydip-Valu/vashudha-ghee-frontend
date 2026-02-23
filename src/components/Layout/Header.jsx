import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, User, LogOut, Menu, Search, ChevronDown } from 'lucide-react'
import { logout, selectIsAuthenticated, selectCurrentUser } from '@/store/authSlice'
import { selectCartTotalQuantity } from '@/store/cartSlice'
import { useState, useRef, useEffect } from 'react'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectCurrentUser)
  console.log('User data in Header component:', user)
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
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo.svg"
              alt="Vashudha Ghee - Pure Desi Ghee"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-500 transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-500 transition">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-500 transition">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-500 transition">
              Contact
            </Link>
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition"
              >
                <span>More</span>
                <ChevronDown size={16} />
              </button>
              {moreMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/track-order"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMoreMenuOpen(false)}
                  >
                    Track Order
                  </Link>
                  <Link
                    to="/faq"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMoreMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/shipping"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMoreMenuOpen(false)}
                  >
                    Shipping Policy
                  </Link>
                  <Link
                    to="/returns"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMoreMenuOpen(false)}
                  >
                    Return Policy
                  </Link>
                  <Link
                    to="/privacy"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMoreMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/terms"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMoreMenuOpen(false)}
                  >
                    Terms &amp; Conditions
                  </Link>
                </div>
              )}
            </div>
            {user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary-500 transition">
                Admin
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-gray-600 hover:text-primary-500 transition">
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-500 transition">
              <ShoppingCart size={20} />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-500 transition">
                  <User size={20} />
                  <span className="hidden lg:inline">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex btn-primary"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/track-order"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                to="/faq"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/shipping"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shipping Policy
              </Link>
              <Link
                to="/returns"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Return Policy
              </Link>
              <Link
                to="/privacy"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Terms &amp; Conditions
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="mx-4 btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
