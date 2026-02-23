import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Truck, Shield, Heart } from 'lucide-react'
import SEO from '@/components/Common/SEO'
import Button from '@/components/Common/Button'

const Home = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: '100% Pure',
      description: 'Made from pure cow milk with traditional methods'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free shipping on orders above ₹500'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Tested and certified for purity'
    },
    {
      icon: Heart,
      title: 'Natural & Healthy',
      description: 'No preservatives or artificial ingredients'
    }
  ]

  return (
    <>
      <SEO 
        title="Home - Premium Pure Desi Ghee"
        description="Experience the authentic taste of traditional Indian ghee. Made from the finest quality cow milk using time-honored methods. 100% pure, natural, and healthy."
        keywords="ghee, desi ghee, pure ghee, organic ghee, A2 ghee, cow ghee, buffalo ghee, premium ghee, traditional ghee, Indian ghee"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Vashudha Ghee',
          url: window.location.origin,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${window.location.origin}/products?search={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
                Pure Desi Ghee
                <span className="block text-primary-500">Made with Love</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Experience the authentic taste of traditional Indian ghee. 
                Made from the finest quality cow milk using time-honored methods.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img
                src="/images/hero-ghee.svg"
                alt="Pure Desi Ghee - Traditional Indian Ghee in Golden Jar"
                className="rounded-lg shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Pure Ghee?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of happy customers who trust Vashudha Ghee
          </p>
          <Link to="/products">
            <Button variant="secondary" size="lg">
              Browse Products
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
