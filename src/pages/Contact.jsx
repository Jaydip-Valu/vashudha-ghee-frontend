import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SEO from '@/components/Common/SEO'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
import toast from 'react-hot-toast'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      // Here you would typically send the data to your backend
      console.log('Contact form data:', data)
      toast.success('Message sent successfully! We will get back to you soon.')
      reset()
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Contact Us - Get in Touch"
        description="Contact Vashudha Ghee for inquiries, support, or feedback. We're here to help with all your questions about our premium ghee products."
        keywords="contact vashudha ghee, customer support, ghee inquiries, reach us"
      />

      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-heading mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
              />

              <Input
                label="Phone"
                placeholder="Enter your phone number"
                {...register('phone', { 
                  required: 'Phone is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Invalid phone number'
                  }
                })}
                error={errors.phone?.message}
              />

              <Input
                label="Subject"
                placeholder="What is this regarding?"
                {...register('subject', { required: 'Subject is required' })}
                error={errors.subject?.message}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    }
                  })}
                />
                {errors.message && (
                  <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                fullWidth 
                size="lg"
                loading={loading}
              >
                <Send size={20} className="mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="card p-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Main Street<br />
                      City, State 123456<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+919876543210" className="hover:text-primary-500">
                        +91 98765 43210
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Mon-Sat: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@vashudhaghee.com" className="hover:text-primary-500">
                        info@vashudhaghee.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card p-8">
              <h2 className="text-2xl font-semibold mb-6">Business Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-red-600">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
