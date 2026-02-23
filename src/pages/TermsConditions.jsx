import { FileText, AlertCircle, CheckCircle, Scale } from 'lucide-react'
import SEO from '@/components/Common/SEO'

const TermsConditions = () => {
  return (
    <>
      <SEO 
        title="Terms & Conditions - Legal Agreement"
        description="Read Vashudha Ghee's terms and conditions. Understand the rules, guidelines, and legal agreements for using our website and services."
        keywords="terms and conditions, terms of service, legal agreement, user terms"
      />

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading mb-4">Terms & Conditions</h1>
            <p className="text-gray-600">
              Please read these terms carefully before using our services
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <div className="flex">
              <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
                <p className="text-sm text-yellow-800">
                  By accessing and using this website, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to these terms, 
                  please do not use this website.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="card p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  These Terms and Conditions ("Terms") govern your access to and use of the 
                  Vashudha Ghee website (the "Site") and services. By accessing or using our 
                  services, you agree to be bound by these Terms.
                </p>
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be 
                  effective immediately upon posting. Your continued use of the Site after 
                  changes constitutes acceptance of the modified Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use of Website</h2>
              <div className="space-y-3 text-gray-700">
                <h3 className="font-semibold">Permitted Use</h3>
                <p>You may use our website for lawful purposes only. You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or malicious code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated systems to access the site without permission</li>
                  <li>Interfere with or disrupt the website's functionality</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
              <div className="space-y-3 text-gray-700">
                <p>To place orders, you must create an account. You agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these Terms 
                  or for any fraudulent activity.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Orders and Payments</h2>
              <div className="space-y-3 text-gray-700">
                <h3 className="font-semibold">Order Acceptance</h3>
                <p>
                  All orders are subject to acceptance and availability. We reserve the right to 
                  refuse or cancel any order for any reason, including:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Product unavailability</li>
                  <li>Errors in product or pricing information</li>
                  <li>Suspected fraudulent transactions</li>
                  <li>Inability to verify customer information</li>
                </ul>

                <h3 className="font-semibold mt-4">Pricing</h3>
                <p>
                  Prices are displayed in Indian Rupees (INR) and are subject to change without 
                  notice. We strive to provide accurate pricing, but errors may occur. In case of 
                  pricing errors, we will notify you and offer the option to cancel or proceed at 
                  the correct price.
                </p>

                <h3 className="font-semibold mt-4">Payment</h3>
                <p>
                  Payment must be made at the time of order placement. We accept various payment 
                  methods as displayed on the checkout page. All transactions are processed securely 
                  through trusted payment gateways.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Product Information</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We strive to provide accurate product descriptions, images, and information. 
                  However:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Colors may vary slightly due to screen settings</li>
                  <li>Product specifications are approximate</li>
                  <li>Actual packaging may differ from images shown</li>
                  <li>We do not guarantee products will meet your expectations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Shipping and Delivery</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Please refer to our <a href="/shipping" className="text-primary-500 hover:underline">Shipping Policy</a> for 
                  detailed information about delivery times, charges, and procedures.
                </p>
                <p>Key points:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss passes to you upon delivery</li>
                  <li>We are not liable for delays caused by third parties</li>
                  <li>You must provide accurate delivery information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Returns and Refunds</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Please refer to our <a href="/returns" className="text-primary-500 hover:underline">Return Policy</a> for 
                  detailed information about returns, refunds, and exchanges.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  All content on this website, including text, graphics, logos, images, and 
                  software, is the property of Vashudha Ghee or its licensors and is protected 
                  by copyright and intellectual property laws.
                </p>
                <p>You may not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reproduce, distribute, or modify any content without permission</li>
                  <li>Use our trademarks or branding</li>
                  <li>Create derivative works from our content</li>
                  <li>Commercially exploit our intellectual property</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  To the fullest extent permitted by law, Vashudha Ghee shall not be liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Damages arising from use or inability to use our services</li>
                  <li>Third-party actions or products</li>
                </ul>
                <p>
                  Our total liability shall not exceed the amount paid by you for the specific 
                  product or service giving rise to the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Warranty Disclaimer</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Products are sold "as is" without warranties of any kind, express or implied. 
                  We do not warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Products will meet your specific requirements</li>
                  <li>The website will be uninterrupted or error-free</li>
                  <li>Defects will be corrected</li>
                  <li>The website is free from viruses or harmful components</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  You agree to indemnify and hold harmless Vashudha Ghee, its officers, directors, 
                  employees, and agents from any claims, damages, losses, liabilities, and expenses 
                  arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your use of our website or services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of 
                  India. Any disputes arising from these Terms or your use of our services shall 
                  be subject to the exclusive jurisdiction of the courts located in [Your City], India.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Severability</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  If any provision of these Terms is found to be invalid or unenforceable, the 
                  remaining provisions shall continue in full force and effect.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  For questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Vashudha Ghee</strong></p>
                  <p>Email: info@vashudhaghee.com</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>Address: 123 Main Street, City, State 123456, India</p>
                </div>
              </div>
            </section>
          </div>

          {/* Agreement */}
          <div className="card p-6 mt-8 bg-green-50 border-l-4 border-green-500">
            <div className="flex">
              <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Agreement</h3>
                <p className="text-sm text-green-800">
                  By using our website and services, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>
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

export default TermsConditions
