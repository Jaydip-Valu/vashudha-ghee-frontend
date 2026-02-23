import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Truck, Shield, Heart, Star, Leaf, Award, CheckCircle } from 'lucide-react'
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

  const cowBenefits = [
    { icon: Leaf, text: 'Rich in A2 beta-casein protein' },
    { icon: Award, text: 'Boosts immunity & digestion' },
    { icon: CheckCircle, text: 'Traditional Bilona churning method' },
    { icon: Star, text: 'Grass-fed free-roaming cows' },
  ]

  const buffaloBenefits = [
    { icon: Leaf, text: 'Higher fat content & creaminess' },
    { icon: Award, text: 'Rich source of calcium & minerals' },
    { icon: CheckCircle, text: 'Slow-cooked for deep aroma' },
    { icon: Star, text: 'Ideal for cooking & sweets' },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Fresh Milk Collection',
      description: 'We collect fresh, pure milk from healthy, grass-fed cows and buffaloes every morning.'
    },
    {
      step: '02',
      title: 'Curd Preparation',
      description: 'The milk is slowly fermented into curd using traditional natural starters overnight.'
    },
    {
      step: '03',
      title: 'Bilona Churning',
      description: 'Curd is hand-churned using the ancient Bilona method to separate pure butter.'
    },
    {
      step: '04',
      title: 'Slow Simmering',
      description: 'The butter is slow-cooked on a low flame until it transforms into golden, aromatic ghee.'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'The best ghee I have ever tasted! The aroma is heavenly and the quality is simply outstanding. My family loves it!'
    },
    {
      name: 'Rajesh Patel',
      location: 'Ahmedabad',
      rating: 5,
      text: 'Vashudha Ghee brings back childhood memories. Purely authentic, no artificial taste. Highly recommended!'
    },
    {
      name: 'Anita Desai',
      location: 'Surat',
      rating: 5,
      text: 'The buffalo ghee is absolutely rich and creamy. Perfect for making sweets. Will keep ordering from here!'
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
      <section className="bg-gradient-to-br from-primary-50 via-amber-50 to-secondary-50 py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/logo.svg" alt="Vashudha Ghee Logo" className="h-14 w-auto" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
                Pure Desi Ghee
                <span className="block text-primary-500">Made with Love</span>
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Experience the authentic taste of traditional Indian ghee. 
                Made from the finest quality cow &amp; buffalo milk using time-honored Bilona methods.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle size={14} /> 100% Natural
                </span>
                <span className="inline-flex items-center gap-1 bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle size={14} /> No Preservatives
                </span>
                <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle size={14} /> Farm Fresh
                </span>
              </div>
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
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-3xl opacity-30 blur-xl"></div>
              <img
                src="/images/hero-ghee.svg"
                alt="Pure Desi Ghee - Traditional Indian Ghee in Golden Jar"
                className="relative rounded-2xl shadow-2xl w-full"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features / USP Strip */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
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

      {/* Section 3 - Cow Ghee */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-primary-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1 rounded-full mb-4 uppercase tracking-wide">
                🐄 Cow Ghee
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-5">
                Pure A2 Desi Cow Ghee
                <span className="block text-primary-500 text-2xl md:text-3xl mt-1">Nature&apos;s Golden Elixir</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Our desi cow ghee is handcrafted from the milk of free-roaming, grass-fed indigenous cows. 
                Prepared using the traditional Bilona method, every spoonful carries the richness of nature 
                and the warmth of heritage.
              </p>
              <ul className="space-y-3 mb-8">
                {cowBenefits.map((benefit, i) => {
                  const Icon = benefit.icon
                  return (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Icon size={16} className="text-primary-600" />
                      </span>
                      {benefit.text}
                    </li>
                  )
                })}
              </ul>
              <Link to="/products">
                <Button size="lg">
                  Shop Cow Ghee
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary-200 rounded-3xl opacity-20 blur-xl"></div>
                <img
                  src="/images/cow.svg"
                  alt="Desi Cow - Source of Pure A2 Cow Ghee"
                  className="relative rounded-2xl shadow-xl w-full max-w-md"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Buffalo Ghee */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-violet-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-purple-200 rounded-3xl opacity-20 blur-xl"></div>
                <img
                  src="/images/buffalo.svg"
                  alt="Buffalo - Source of Rich Creamy Buffalo Ghee"
                  className="relative rounded-2xl shadow-xl w-full max-w-md"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4 uppercase tracking-wide">
                🐃 Buffalo Ghee
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-5">
                Pure Buffalo Ghee
                <span className="block text-purple-600 text-2xl md:text-3xl mt-1">Rich, Creamy &amp; Aromatic</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Our buffalo ghee is prepared from the pure, thick milk of well-nourished buffaloes. 
                Slow-cooked to perfection, it delivers a deep, rich flavour and a golden hue that 
                elevates every dish it touches.
              </p>
              <ul className="space-y-3 mb-8">
                {buffaloBenefits.map((benefit, i) => {
                  const Icon = benefit.icon
                  return (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Icon size={16} className="text-purple-600" />
                      </span>
                      {benefit.text}
                    </li>
                  )
                })}
              </ul>
              <Link to="/products">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Shop Buffalo Ghee
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-secondary-100 text-secondary-700 text-sm font-semibold px-4 py-1 rounded-full mb-3 uppercase tracking-wide">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
              From Farm to Your Table
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-lg">
              Every jar of Vashudha Ghee follows our time-tested 4-step traditional process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="relative text-center p-6 rounded-2xl border border-primary-100 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500 text-white text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-amber-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1 rounded-full mb-3 uppercase tracking-wide">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-soft hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-primary-500 fill-primary-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container-custom text-center">
          <div className="flex justify-center mb-6">
            <h2 className="text-4xl font-bold font-heading">Vashudha Ghee</h2>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Pure Ghee?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto">
            Join thousands of happy customers who trust Vashudha Ghee for pure, authentic, 
            and naturally made desi ghee delivered to their doorstep.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button variant="secondary" size="lg">
                Browse Products
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
