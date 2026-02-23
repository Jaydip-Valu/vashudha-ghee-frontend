import { RotateCcw, Package, CheckCircle, XCircle } from 'lucide-react'
import SEO from '@/components/Common/SEO'

const ReturnPolicy = () => {
  return (
    <>
      <SEO 
        title="Return & Refund Policy"
        description="Learn about Vashudha Ghee's return and refund policy. Easy returns within 7 days, hassle-free refunds, and customer satisfaction guaranteed."
        keywords="return policy, refund policy, product return, money back guarantee"
      />

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading mb-4">Return & Refund Policy</h1>
            <p className="text-gray-600">
              Your satisfaction is our priority. Easy returns and hassle-free refunds.
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RotateCcw className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold mb-1">7-Day Returns</h3>
              <p className="text-sm text-gray-600">Easy returns within 7 days</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold mb-1">Full Refund</h3>
              <p className="text-sm text-gray-600">100% money back guarantee</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold mb-1">Quality Check</h3>
              <p className="text-sm text-gray-600">Products inspected before refund</p>
            </div>
          </div>

          {/* Policy Content */}
          <div className="card p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Return Eligibility</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We offer a 7-day return policy from the date of delivery for products that 
                  meet the following criteria:
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={20} />
                    Eligible for Return
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                    <li>Product is unused and in original condition</li>
                    <li>Original packaging is intact with all seals</li>
                    <li>Tamper-proof seal is unbroken</li>
                    <li>Product is returned within 7 days of delivery</li>
                    <li>Invoice/bill is included with the return</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg mt-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <XCircle className="text-red-600 mr-2" size={20} />
                    Not Eligible for Return
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                    <li>Product has been used or opened</li>
                    <li>Tamper-proof seal is broken</li>
                    <li>Original packaging is damaged or missing</li>
                    <li>Return request made after 7 days of delivery</li>
                    <li>Product purchased during clearance sales</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Return</h2>
              <div className="space-y-3 text-gray-700">
                <p>Follow these simple steps to initiate a return:</p>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li>
                    <strong>Contact Us:</strong> Email us at info@vashudhaghee.com or call 
                    +91 98765 43210 within 7 days of receiving your order.
                  </li>
                  <li>
                    <strong>Provide Details:</strong> Share your order number, reason for return, 
                    and photos of the product (if damaged/defective).
                  </li>
                  <li>
                    <strong>Get Approval:</strong> Our team will review your request and provide 
                    a return authorization within 24 hours.
                  </li>
                  <li>
                    <strong>Ship the Product:</strong> Pack the product securely in its original 
                    packaging and ship it to the address provided.
                  </li>
                  <li>
                    <strong>Refund Processing:</strong> Once we receive and inspect the product, 
                    your refund will be processed within 5-7 business days.
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Refund Process</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  After your return is received and inspected, we will process your refund:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Inspection:</strong> Products are inspected within 2 business days 
                    of receipt to ensure they meet return criteria.
                  </li>
                  <li>
                    <strong>Approval:</strong> Once approved, refund is initiated to your 
                    original payment method.
                  </li>
                  <li>
                    <strong>Credit Time:</strong> Refunds typically appear in your account 
                    within 5-7 business days, depending on your bank/payment provider.
                  </li>
                  <li>
                    <strong>Notification:</strong> You'll receive an email confirmation once 
                    the refund is processed.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Damaged or Defective Products</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  If you receive a damaged or defective product:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Immediate Action:</strong> Do not accept the delivery if the 
                    package appears damaged. Contact us immediately.
                  </li>
                  <li>
                    <strong>Report Within 24 Hours:</strong> If damage is discovered after 
                    delivery, report it within 24 hours with photos.
                  </li>
                  <li>
                    <strong>Free Replacement:</strong> We will arrange a free replacement or 
                    full refund, including return shipping costs.
                  </li>
                  <li>
                    <strong>Quality Guarantee:</strong> All our products undergo quality checks. 
                    Defective products are rare, but we stand behind our quality.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Exchange Policy</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We currently do not offer direct product exchanges. If you wish to exchange 
                  a product:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Return the original product following our return process</li>
                  <li>Receive your refund</li>
                  <li>Place a new order for the desired product</li>
                </ol>
                <p>
                  This ensures faster processing and allows you to choose from our current stock.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Return Shipping</h2>
              <div className="space-y-3 text-gray-700">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Customer-Initiated Returns:</strong> Shipping costs are borne by 
                    the customer for returns due to change of mind or incorrect orders.
                  </li>
                  <li>
                    <strong>Damaged/Defective Products:</strong> We cover the return shipping 
                    costs for damaged or defective products.
                  </li>
                  <li>
                    <strong>Wrong Product Shipped:</strong> If we shipped the wrong product, 
                    we'll arrange free pickup and bear all return costs.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  You can cancel your order before it's shipped:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Before Processing:</strong> Contact us immediately if you wish to 
                    cancel. Orders can be cancelled free of charge if not yet processed.
                  </li>
                  <li>
                    <strong>After Shipment:</strong> Once shipped, you'll need to follow the 
                    return process after receiving the product.
                  </li>
                  <li>
                    <strong>Refund:</strong> Cancelled orders are refunded within 3-5 business days.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Customer Satisfaction</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  At Vashudha Ghee, your satisfaction is our top priority. If you're not 
                  completely satisfied with your purchase, we're here to help. Contact our 
                  customer support team for any assistance.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Need Help?</p>
                  <p className="text-sm">
                    Email: info@vashudhaghee.com<br />
                    Phone: +91 98765 43210<br />
                    Hours: Monday-Saturday, 9:00 AM - 6:00 PM
                  </p>
                </div>
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

export default ReturnPolicy
