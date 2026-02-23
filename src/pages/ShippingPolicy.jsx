import { Package, Truck, MapPin, Clock } from 'lucide-react'
import SEO from '@/components/Common/SEO'

const ShippingPolicy = () => {
  return (
    <>
      <SEO 
        title="Shipping Policy - Delivery Information"
        description="Learn about Vashudha Ghee's shipping policy, delivery times, charges, and tracking information. Fast and reliable delivery across India."
        keywords="shipping policy, delivery information, shipping charges, delivery time"
      />

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading mb-4">Shipping Policy</h1>
            <p className="text-gray-600">
              Fast, reliable, and secure delivery of your favorite ghee products
            </p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders above ₹500</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold mb-1">3-5 Days</h3>
              <p className="text-sm text-gray-600">Standard delivery time</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold mb-1">Pan India</h3>
              <p className="text-sm text-gray-600">Delivery across India</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold mb-1">Safe Packaging</h3>
              <p className="text-sm text-gray-600">Secure & hygienic</p>
            </div>
          </div>

          {/* Policy Content */}
          <div className="card p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Delivery Timeline</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We strive to deliver your orders as quickly as possible while maintaining 
                  the highest standards of safety and quality.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Metro Cities:</strong> 3-5 business days</li>
                  <li><strong>Tier 2 Cities:</strong> 4-6 business days</li>
                  <li><strong>Remote Areas:</strong> 5-7 business days</li>
                </ul>
                <p>
                  Delivery times are estimated and may vary based on location, weather conditions, 
                  and other unforeseen circumstances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Shipping Charges</h2>
              <div className="space-y-3 text-gray-700">
                <p>We offer competitive shipping rates to ensure you get the best value:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Orders above ₹500:</strong> FREE shipping across India</li>
                  <li><strong>Orders below ₹500:</strong> Flat ₹50 shipping charge</li>
                  <li><strong>Express Delivery:</strong> Additional ₹100 for 1-2 day delivery (available in select cities)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Shipping Process</h2>
              <div className="space-y-3 text-gray-700">
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong>Order Confirmation:</strong> You'll receive an order confirmation email immediately after placing your order.</li>
                  <li><strong>Processing:</strong> Orders are processed within 1-2 business days.</li>
                  <li><strong>Shipment:</strong> Once shipped, you'll receive tracking information via email and SMS.</li>
                  <li><strong>Delivery:</strong> Our delivery partner will deliver your order to the provided address.</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  You can track your order anytime using the tracking number sent to you via 
                  email and SMS. Visit our <a href="/track-order" className="text-primary-500 hover:underline">Track Order</a> page 
                  and enter your order number and email address to see real-time updates.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Packaging</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  All our products are carefully packaged to ensure they reach you in perfect condition:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Food-grade, airtight glass jars</li>
                  <li>Bubble wrap protection for safe transit</li>
                  <li>Tamper-proof seals for hygiene</li>
                  <li>Sturdy corrugated boxes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Delivery Issues</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  If you face any issues with delivery, please contact us immediately:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Delayed Delivery:</strong> Contact us if your order hasn't arrived within the estimated time.</li>
                  <li><strong>Damaged Package:</strong> Refuse the delivery and contact us immediately for a replacement.</li>
                  <li><strong>Wrong Address:</strong> Ensure your address is correct before placing an order. Address changes after shipment may incur additional charges.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Currently, we only ship within India. We are working on expanding our 
                  services internationally. Please check back later or contact us for updates.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  For any shipping-related queries, please reach out to us:
                </p>
                <ul className="list-none space-y-2">
                  <li><strong>Email:</strong> info@vashudhaghee.com</li>
                  <li><strong>Phone:</strong> +91 98765 43210</li>
                  <li><strong>Hours:</strong> Monday-Saturday, 9:00 AM - 6:00 PM</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Last Updated */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Last updated: February 2024
          </p>
        </div>
      </div>
    </>
  )
}

export default ShippingPolicy
