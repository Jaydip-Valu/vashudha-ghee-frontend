import { Shield, Lock, Eye, Database } from 'lucide-react'
import SEO from '@/components/Common/SEO'

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - Data Protection"
        description="Read Vashudha Ghee's privacy policy to understand how we collect, use, and protect your personal information. Your privacy is important to us."
        keywords="privacy policy, data protection, personal information, privacy rights"
      />

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading mb-4">Privacy Policy</h1>
            <p className="text-gray-600">
              Your privacy is important to us. Learn how we protect your personal information.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="card p-4 text-center">
              <Shield className="mx-auto text-primary-600 mb-2" size={32} />
              <p className="text-sm font-semibold">Secure</p>
            </div>
            <div className="card p-4 text-center">
              <Lock className="mx-auto text-primary-600 mb-2" size={32} />
              <p className="text-sm font-semibold">Encrypted</p>
            </div>
            <div className="card p-4 text-center">
              <Eye className="mx-auto text-primary-600 mb-2" size={32} />
              <p className="text-sm font-semibold">Transparent</p>
            </div>
            <div className="card p-4 text-center">
              <Database className="mx-auto text-primary-600 mb-2" size={32} />
              <p className="text-sm font-semibold">Protected</p>
            </div>
          </div>

          {/* Policy Content */}
          <div className="card p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Vashudha Ghee ("we," "our," or "us") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit our website and use our services.
                </p>
                <p>
                  By accessing or using our website, you agree to this Privacy Policy. If you
                  do not agree with the terms, please do not access the site.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p>We may collect personally identifiable information, including but not limited to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Name and contact details (email, phone number)</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely through payment gateways)</li>
                    <li>Order history and preferences</li>
                    <li>Account credentials</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Automatically Collected Information</h3>
                  <p>When you visit our website, we may automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <div className="space-y-3 text-gray-700">
                <p>We use the collected information for various purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate about your orders and deliveries</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Improve our products and services</li>
                  <li>Send promotional emails and marketing communications (with your consent)</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyze website usage and improve user experience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We do not sell, trade, or rent your personal information to third parties.
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Service Providers:</strong> With trusted third-party service providers
                    who assist in operating our website, processing payments, and delivering products.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law, court order, or
                    government regulation.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a merger, acquisition,
                    or sale of assets.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> When you explicitly agree to share information.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for website functionality
                    (shopping cart, authentication).
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Help us understand how visitors use our site.
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
                    (only with your consent).
                  </li>
                </ul>
                <p>
                  You can control cookies through your browser settings. However, disabling cookies
                  may affect website functionality.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We implement appropriate technical and organizational security measures to protect
                  your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p>
                  However, no method of transmission over the internet is 100% secure. While we
                  strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
              <div className="space-y-3 text-gray-700">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request a copy of your personal data we hold.
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate information.
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements).
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Request your data in a portable format.
                  </li>
                </ul>
                <p>
                  To exercise these rights, contact us at info@vashudhaghee.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Our services are not directed to individuals under 18 years of age. We do not
                  knowingly collect personal information from children. If you believe we have
                  collected information from a child, please contact us immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  Our website may contain links to third-party websites. We are not responsible
                  for the privacy practices of these external sites. We encourage you to read
                  their privacy policies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted on
                  this page with an updated "Last Modified" date. We encourage you to review this
                  policy periodically.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  If you have any questions about this Privacy Policy or our data practices,
                  please contact us:
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

          {/* Last Updated */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Last updated: February 2024
          </p>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
