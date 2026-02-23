import { Users, Target, Award, Heart } from 'lucide-react'
import SEO from '@/components/Common/SEO'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We never compromise on quality. Every batch of our ghee is made with the finest ingredients.'
    },
    {
      icon: Users,
      title: 'Traditional Methods',
      description: 'Following time-honored recipes passed down through generations for authentic taste.'
    },
    {
      icon: Award,
      title: '100% Pure',
      description: 'No additives, no preservatives. Just pure, natural ghee the way it should be.'
    },
    {
      icon: Target,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We ensure every customer gets the best experience.'
    }
  ]

  return (
    <>
      <SEO 
        title="About Us - Our Story & Values"
        description="Learn about Vashudha Ghee's journey, our commitment to quality, and traditional methods of making pure desi ghee. Discover what makes us special."
        keywords="about vashudha ghee, our story, traditional ghee making, pure ghee company"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' }
        ]}
      />

      <div className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            About Vashudha Ghee
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bringing the authentic taste of traditional Indian ghee to your home
          </p>
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Vashudha Ghee was born from a simple belief: everyone deserves access to 
                pure, traditional ghee made the way our ancestors made it. Our journey began 
                in a small village where generations of our family have been perfecting the 
                art of ghee-making.
              </p>
              <p>
                We started with a mission to preserve traditional methods while ensuring 
                the highest standards of quality and hygiene. Today, we're proud to serve 
                thousands of families across the country who trust us for their daily ghee needs.
              </p>
              <p>
                Every jar of Vashudha Ghee is a testament to our commitment to quality, 
                tradition, and your health. We source milk from grass-fed cows and use 
                traditional bilona method to extract the purest ghee.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="/images/hero-ghee.svg" 
              alt="Traditional ghee making process"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="card p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="card p-12 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What makes Vashudha Ghee different from others
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <p className="text-lg font-semibold mb-2">Pure & Natural</p>
              <p className="text-gray-600">No additives or preservatives</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">A2</div>
              <p className="text-lg font-semibold mb-2">Desi Cow Milk</p>
              <p className="text-gray-600">From grass-fed indigenous cows</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
              <p className="text-lg font-semibold mb-2">Happy Customers</p>
              <p className="text-gray-600">Trusted by families nationwide</p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To provide every household with access to pure, traditional ghee made 
              using authentic methods, while supporting local farmers and preserving 
              ancient wisdom of Ayurveda.
            </p>
          </div>
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              To become the most trusted name in traditional ghee products across India 
              and beyond, setting new standards for quality, purity, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
