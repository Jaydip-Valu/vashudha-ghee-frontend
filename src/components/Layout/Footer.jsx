import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-heading font-semibold mb-4">
              Vashudha Ghee
            </h3>
            <p className="text-sm mb-4">
              Premium quality pure desi ghee made with traditional methods. 
              Pure, natural, and healthy for your family.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-500 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/track-order" className="hover:text-primary-500 transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary-500 transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary-500 transition">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Main Street, City, State 123456</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <a href="tel:+919876543210" className="hover:text-primary-500">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:info@vashudhghee.com" className="hover:text-primary-500">
                  info@vashudhaghee.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {currentYear} Vashudha Ghee. All rights reserved. | 
            <Link to="/privacy" className="hover:text-primary-500 ml-2">
              Privacy Policy
            </Link> | 
            <Link to="/terms" className="hover:text-primary-500 ml-2">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
