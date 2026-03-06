import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle, Award, Shield, Truck, Leaf } from 'lucide-react'
import { useState } from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust Badges Strip */}
      <div className="bg-gray-800 py-5 border-b border-gray-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Leaf, text: '100% Natural & Pure' },
              { icon: Award, text: 'FSSAI Certified' },
              { icon: Shield, text: 'Secure Payments' },
              { icon: Truck, text: 'Fast Pan-India Delivery' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-amber-400 text-sm font-medium">
                <Icon size={18} className="flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-900 to-yellow-900 py-10">
        <div className="container-custom text-center">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-heading">
            🌿 Join the Vashudha Family
          </h3>
          <p className="text-amber-200 mb-6 text-sm md:text-base">
            Subscribe for exclusive offers, health tips, and Ayurvedic ghee recipes.
          </p>
          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full text-sm font-medium">
              ✅ Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-amber-500/40 text-white placeholder-amber-200/60 focus:outline-none focus:border-amber-400 text-sm"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-full transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="Vashudha Ghee" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              Premium quality pure desi ghee made with the traditional Bilona method.
              Farm fresh, 100% natural, and delivered to your doorstep.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-pink-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-green-600 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Shop Ghee' },
                { to: '/about', label: 'About Us' },
                { to: '/blog', label: 'Blog & Recipes' },
                { to: '/contact', label: 'Contact Us' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-amber-400 transition text-gray-400 flex items-center gap-1.5">
                    <span className="text-amber-600 text-xs">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/track-order', label: 'Track Order' },
                { to: '/faq', label: 'FAQ' },
                { to: '/shipping', label: 'Shipping Policy' },
                { to: '/returns', label: 'Return Policy' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms & Conditions' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-amber-400 transition text-gray-400 flex items-center gap-1.5">
                    <span className="text-amber-600 text-xs">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-gray-400">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-amber-500" />
                <span>123 Main Street, City, State 123456, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="flex-shrink-0 text-amber-500" />
                <a href="tel:+919876543210" className="hover:text-amber-400 transition text-gray-400">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="flex-shrink-0 text-amber-500" />
                <a href="mailto:info@vashudhaghee.com" className="hover:text-amber-400 transition text-gray-400">
                  info@vashudhaghee.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={15} className="flex-shrink-0 text-green-500" />
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition text-gray-400"
                >
                  WhatsApp Order
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {currentYear} Vashudha Ghee. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-amber-400 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-400 transition">Terms & Conditions</Link>
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
