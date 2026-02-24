import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Truck, Shield, Heart, Star, Leaf, Award, ChevronRight, CheckCircle } from 'lucide-react'
import SEO from '@/components/Common/SEO'
import Button from '@/components/Common/Button'
import ProductCard from '@/components/Product/ProductCard'
import productService from '@/services/product.service'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setProductsLoading(true)
        const data = await productService.getProducts({ limit: 4, sort: 'newest' })
        setFeaturedProducts((data.products || data).slice(0, 4))
      } catch {
        setFeaturedProducts([])
      } finally {
        setProductsLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const features = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'No additives, no preservatives — just pure traditional ghee'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free shipping on orders above ₹500 across India'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Lab-tested and certified for premium purity'
    },
    {
      icon: Heart,
      title: 'A2 Desi Cow',
      description: 'Sourced from indigenous grass-fed Gir cow milk'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Fresh A2 Milk',
      description: 'We collect fresh milk every morning from our grass-fed Gir cows raised in natural surroundings.',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      step: '02',
      title: 'Curd Setting',
      description: 'The milk is cultured overnight into rich, creamy curd using our traditional starter culture.',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      step: '03',
      title: 'Bilona Churning',
      description: 'Curd is hand-churned with the ancient bilona method to separate pure white butter.',
      color: 'bg-amber-50 border-amber-200'
    },
    {
      step: '04',
      title: 'Slow Simmering',
      description: 'The butter is slowly simmered on a low flame until golden, aromatic ghee is ready.',
      color: 'bg-green-50 border-green-200'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'The aroma of Vashudha Ghee reminds me of my grandmother\'s kitchen. Absolutely pure and delicious. My family loves it!'
    },
    {
      name: 'Rajesh Patel',
      location: 'Ahmedabad',
      rating: 5,
      text: 'I\'ve tried many ghee brands but this one stands out. You can clearly taste the difference — it\'s genuinely authentic.'
    },
    {
      name: 'Anita Desai',
      location: 'Bangalore',
      rating: 5,
      text: 'We switched to Vashudha Ghee for health reasons and we\'re so glad we did. The quality is exceptional and delivery is always on time.'
    }
  ]

  const benefits = [
    'Rich in fat-soluble vitamins A, D, E & K',
    'Boosts immunity and supports gut health',
    'Enhances flavour of every dish',
    'Good source of healthy saturated fats',
    'Supports bone and brain health',
    'Lactose & casein free (suitable for many dairy-sensitive people)'
  ]

  return (
    <>
      <SEO 
        title="Home - Premium Pure Desi Ghee"
        description="Experience the authentic taste of traditional Indian ghee. Made from the finest quality A2 cow milk using time-honored bilona methods. 100% pure, natural, and healthy."
        keywords="ghee, desi ghee, pure ghee, organic ghee, A2 ghee, cow ghee, buffalo ghee, premium ghee, traditional ghee, Indian ghee, bilona ghee"
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
      <section className="relative bg-gradient-to-br from-primary-50 via-yellow-50 to-secondary-50 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full opacity-40 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-100 rounded-full opacity-30 translate-y-1/3 -translate-x-1/4" />
        
        <div className="container-custom py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Leaf size={14} />
                100% Pure A2 Bilona Ghee
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6 leading-tight">
                Pure Desi Ghee,
                <span className="block text-primary-600 mt-1">Made with Love</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experience the authentic taste of traditional Indian ghee.
                Handcrafted using the ancient bilona method from A2 milk of
                grass-fed Gir cows — just as nature intended.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/products">
                  <Button size="lg" className="shadow-lg hover:shadow-xl">
                    Shop Now
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Our Story
                  </Button>
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-secondary-500" />
                  Lab Tested & Certified
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-secondary-500" />
                  No Preservatives
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-secondary-500" />
                  Free Shipping ₹500+
                </div>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="relative">
                <img
                  src="/images/hero-ghee-jar.svg"
                  alt="Vashudha Pure Desi Ghee - Traditional Indian Ghee Jar"
                  className="w-full max-w-md drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-600 text-white py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10,000+', label: 'Happy Customers' },
              { value: '100%', label: 'Pure & Natural' },
              { value: 'A2', label: 'Gir Cow Milk' },
              { value: 'Zero', label: 'Preservatives' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold font-heading">{stat.value}</div>
                <div className="text-primary-100 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Benefits Bar */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                    <Icon size={30} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Products</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
                Bestselling Ghee
              </h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              View All <ChevronRight size={18} />
            </Link>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="bg-gray-200 h-56" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Products coming soon!</p>
              <Link to="/products">
                <Button>Browse All Products</Button>
              </Link>
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link to="/products">
              <Button variant="outline">
                View All Products <ChevronRight size={18} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It's Made - Process Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                The Ancient Bilona Method
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our ghee is made using the traditional bilona process — a centuries-old technique that preserves
                all the natural goodness and creates that distinctive, rich aroma you can&apos;t get anywhere else.
              </p>
              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div key={step.step} className={`flex gap-4 p-4 rounded-xl border ${step.color}`}>
                    <div className="text-2xl font-bold font-heading text-primary-400 w-10 shrink-0">{step.step}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/bilona-process.svg"
                alt="Traditional Bilona ghee making process"
                className="w-full rounded-2xl shadow-xl"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary-500 text-white rounded-xl p-4 shadow-lg hidden md:block">
                <Award size={28} className="mb-1" />
                <div className="text-sm font-semibold">Handcrafted</div>
                <div className="text-xs opacity-90">with care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/images/desi-cow.svg"
                alt="A2 Desi Gir Cow - Source of our pure milk"
                className="w-full rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-2">Why Ghee?</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                Health Benefits of Pure Desi Ghee
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Ghee has been a cornerstone of Indian cooking and Ayurvedic medicine for thousands of years.
                Our pure A2 bilona ghee brings you all the natural health benefits in every spoonful.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-secondary-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/products">
                  <Button size="lg">
                    Shop Now <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Thousands of happy families trust Vashudha Ghee for their daily needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 shadow-soft hover:shadow-md transition-shadow">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{t.name}</div>
                    <div className="text-gray-500 text-sm">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-16 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500 rounded-full opacity-50 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-700 rounded-full opacity-40 translate-y-1/2 -translate-x-1/4" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Ready to Experience Pure Ghee?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto">
            Join 10,000+ happy families who trust Vashudha Ghee for pure, authentic taste every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button variant="secondary" size="lg" className="shadow-lg">
                Shop Now
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline-white" size="lg">
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
