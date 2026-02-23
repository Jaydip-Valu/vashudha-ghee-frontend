import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '@/components/Common/SEO'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'What is the delivery time for orders?',
          answer: 'We typically deliver within 3-5 business days for most locations. For remote areas, it may take 5-7 business days. You will receive tracking information once your order is shipped.'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes, we offer free shipping on all orders above ₹500. For orders below ₹500, a nominal shipping charge of ₹50 applies.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes, once your order is shipped, you will receive a tracking number via email and SMS. You can use this to track your order on our Track Order page.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD) for eligible orders.'
        }
      ]
    },
    {
      category: 'Product Information',
      questions: [
        {
          question: 'Is your ghee 100% pure?',
          answer: 'Yes, our ghee is 100% pure and natural. We use traditional bilona method to extract ghee from A2 cow milk. No preservatives, additives, or artificial colors are added.'
        },
        {
          question: 'What is A2 ghee?',
          answer: 'A2 ghee is made from the milk of indigenous Indian cows that produce A2 beta-casein protein. This protein is easier to digest and is considered more beneficial for health compared to A1 protein found in regular milk.'
        },
        {
          question: 'How should I store the ghee?',
          answer: 'Store ghee in a cool, dry place away from direct sunlight. Once opened, keep it in an airtight container. Refrigeration is not necessary, but ghee can be refrigerated if preferred.'
        },
        {
          question: 'What is the shelf life of your products?',
          answer: 'Our ghee has a shelf life of 12 months from the date of manufacturing when stored properly. The manufacturing and expiry dates are clearly marked on each jar.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy from the date of delivery. If you\'re not satisfied with the product quality, you can return it for a full refund. The product should be unused and in original packaging.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'To initiate a return, please contact our customer support at info@vashudhaghee.com or call us at +91 98765 43210. Our team will guide you through the return process.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Once we receive and inspect the returned product, refunds are processed within 5-7 business days. The amount will be credited to your original payment method.'
        }
      ]
    },
    {
      category: 'Quality & Safety',
      questions: [
        {
          question: 'Is your ghee tested for quality?',
          answer: 'Yes, all our products undergo rigorous quality testing in certified laboratories. We test for purity, authenticity, and safety standards before packaging.'
        },
        {
          question: 'Are your products organic?',
          answer: 'Yes, we offer both regular and certified organic ghee options. Our organic ghee is made from milk of cows fed with organic fodder and is certified by recognized organic certification bodies.'
        },
        {
          question: 'Do you use any preservatives?',
          answer: 'No, we do not use any preservatives, additives, or artificial ingredients. Our traditional preparation method ensures natural preservation without any chemicals.'
        }
      ]
    }
  ]

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <SEO 
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about Vashudha Ghee products, ordering, shipping, returns, and more. Get help with your queries."
        keywords="vashudha ghee faq, ghee questions, order help, product information"
      />

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600">
              Find answers to common questions about our products and services
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-4 text-primary-600">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, questionIndex) => {
                    const index = `${categoryIndex}-${questionIndex}`
                    const isOpen = openIndex === index

                    return (
                      <div 
                        key={questionIndex} 
                        className="card overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                        >
                          <span className="font-semibold text-gray-900 pr-8">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="text-primary-500 flex-shrink-0" size={24} />
                          ) : (
                            <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-gray-700">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="card p-8 mt-12 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-700 mb-6">
                Can't find the answer you're looking for? Our customer support team is here to help.
              </p>
              <a 
                href="/contact" 
                className="inline-block btn-primary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQ
