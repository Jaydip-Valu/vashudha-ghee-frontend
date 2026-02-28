import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, Heart, Star, Leaf, Award, CheckCircle, Flame, Brain, Zap, Moon, ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '@/components/Common/SEO'
import Button from '@/components/Common/Button'
import ProductCard from '@/components/Product/ProductCard'
import productService from '@/services/product.service'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await productService.getProducts({ limit: 4, sort: 'newest' })
        setFeaturedProducts((data.products || data).slice(0, 4))
      } catch {
        setFeaturedProducts([])
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

  const healthBenefits = [
    {
      icon: Flame,
      title: 'Boosts Metabolism',
      description: 'Rich in medium-chain fatty acids that improve metabolism and support healthy weight management.'
    },
    {
      icon: Brain,
      title: 'Enhances Brain Function',
      description: 'Contains essential fats that nourish the brain and support cognitive health, memory, and focus.'
    },
    {
      icon: Heart,
      title: 'Supports Heart Health',
      description: 'Balanced omega-3 and omega-6 fatty acids promote cardiovascular health and reduce inflammation.'
    },
    {
      icon: Zap,
      title: 'Improves Digestion',
      description: 'Bilona ghee stimulates digestive enzymes, improves gut health, and helps absorb fat-soluble vitamins.'
    },
    {
      icon: Moon,
      title: 'Ayurvedic Superfood',
      description: 'Revered in Ayurveda for thousands of years as a rasayana — a rejuvenator and longevity tonic.'
    },
    {
      icon: Shield,
      title: 'Boosts Immunity',
      description: 'Loaded with antioxidants and fat-soluble vitamins A, D, E & K that strengthen your immune system.'
    },
  ]

  const homeFaqs = [
    {
      question: 'What makes Vashudha Ghee different from regular ghee?',
      answer: 'Vashudha Ghee is made using the traditional Bilona (Valona) method — curd is hand-churned to extract pure butter, which is then slow-cooked. This preserves all the natural nutrients, enzymes, and aroma that are lost in industrial ghee manufacturing. We source milk only from indigenous A2 desi cows and buffaloes that graze freely on natural pastures.'
    },
    {
      question: 'What is A2 Desi Cow Ghee?',
      answer: 'A2 ghee is made from the milk of indigenous Indian cows (like Gir, Sahiwal, Tharparkar) that naturally produce A2 beta-casein protein. This protein is easier to digest and is associated with better health outcomes compared to A1 protein found in milk of exotic breeds. Our A2 Desi Cow Ghee is 100% authentic — no A1 milk is ever mixed.'
    },
    {
      question: 'What is the Bilona / Valona Paddhati method?',
      answer: 'Bilona (also called Valona Paddhati) is the ancient Indian method of making ghee: fresh milk is boiled and cooled, converted to curd with a natural starter, the curd is then hand-churned using a wooden churner (bilona) to separate butter (makhan), and the butter is slow-cooked on low flame until it transforms into pure golden ghee. This process retains all medicinal properties of ghee as described in Ayurveda.'
    },
    {
      question: 'Do you add any preservatives or chemicals?',
      answer: 'Absolutely not. Vashudha Ghee contains only one ingredient: pure ghee. No preservatives, no artificial color, no additives, and no chemicals. Our traditional preparation process naturally preserves the ghee for up to 12 months without any chemical intervention.'
    },
    {
      question: 'Is Vashudha Ghee suitable for lactose intolerant people?',
      answer: 'Yes! Pure ghee made by the Bilona method is generally safe for people with lactose intolerance. During the churning and cooking process, milk solids (casein and lactose) are separated and removed. What remains is nearly pure clarified butter fat with negligible lactose content. However, if you have a severe dairy allergy, please consult your physician.'
    },
  ]

  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <SEO
        title="Buy Pure A2 Desi Cow Ghee & Buffalo Ghee Online | Bilona Method"
        description="Shop 100% pure A2 Desi Cow Ghee & Buffalo Bilona Ghee online. Made using traditional Valona Paddhati method. No preservatives, farm fresh, free delivery across India."
        keywords="A2 Desi Cow Ghee, Bilona Ghee, Valona Paddhati Ghee, Pure Buffalo Ghee, Organic Ghee Online India, buy ghee online, desi ghee, traditional ghee, pure ghee India"
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
              <div className="flex items-center gap-3 mb-5">
                <img src="/images/logo.svg" alt="Vashudha Ghee Logo" className="h-16 w-auto" />
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
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary-200 via-amber-200 to-secondary-200 rounded-3xl opacity-40 blur-2xl"></div>
              <img
                src="/images/hero-ghee.svg"
                alt="Pure Desi Ghee - Traditional Indian Brass Ghee Matka with Spoon and Leaves"
                className="relative rounded-3xl shadow-2xl w-full max-w-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features / USP Strip */}
      <section className="py-16 bg-white">
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
                <div key={index} className="text-center p-6 rounded-2xl hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
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

      {/* Health Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-green-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-3 uppercase tracking-wide">
              🌿 Ayurvedic Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
              Health Benefits of Bilona Ghee
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-lg">
              Traditional Bilona ghee has been revered in Ayurveda for thousands of years.
              Modern science now confirms what our ancestors always knew.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-soft hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-4">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/products">
              <Button size="lg">
                Shop Bilona Ghee Now
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-14">
              <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1 rounded-full mb-3 uppercase tracking-wide">
                Our Products
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
                Premium Ghee Collection
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto text-lg">
                Handcrafted with love using the ancient Bilona method. Pure, natural, and delivered fresh to your door.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/products">
                <Button variant="outline" size="lg">
                  View All Products
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

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

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1 rounded-full mb-3 uppercase tracking-wide">
              🏆 Certifications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
              Trusted, Tested & Certified
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Our ghee is lab-tested for purity and safety. You can trust every jar we deliver.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { badge: '🧪', title: 'Lab Tested', desc: 'FSSAI certified lab tested for purity & quality standards' },
              { badge: '🌿', title: 'No Chemicals', desc: 'Zero preservatives, additives or artificial colors — guaranteed' },
              { badge: '🐄', title: 'A2 Verified', desc: 'Sourced exclusively from indigenous A2 desi cow & buffalo milk' },
              { badge: '📦', title: 'FSSAI Approved', desc: 'Manufacturing facility is FSSAI licensed and regularly audited' },
            ].map((cert, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-primary-100 hover:shadow-soft transition-all duration-300">
                <div className="text-4xl mb-3">{cert.badge}</div>
                <h3 className="font-bold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-primary-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1 rounded-full mb-3 uppercase tracking-wide">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Everything you need to know about Vashudha Ghee and the Bilona method.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {homeFaqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                  {openFaq === i
                    ? <ChevronUp className="text-primary-500 flex-shrink-0" size={22} />
                    : <ChevronDown className="text-gray-400 flex-shrink-0" size={22} />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/faq" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2">
              View All FAQs <ArrowRight size={16} />
            </Link>
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
