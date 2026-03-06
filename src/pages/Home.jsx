import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, Heart, Star, Leaf, Award, CheckCircle, Flame, Brain, Zap, Moon, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
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
      text: 'The best ghee I have ever tasted! The aroma is heavenly and the quality is simply outstanding. My family loves it!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
    },
    {
      name: 'Rajesh Patel',
      location: 'Ahmedabad',
      rating: 5,
      text: 'Vashudha Ghee brings back childhood memories. Purely authentic, no artificial taste. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
    },
    {
      name: 'Anita Desai',
      location: 'Surat',
      rating: 5,
      text: 'The buffalo ghee is absolutely rich and creamy. Perfect for making sweets. Will keep ordering from here!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80',
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
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [brokenAvatars, setBrokenAvatars] = useState(new Set())

  const heroSlides = [
    {
      badge: '🌿 100% Pure A2 Bilona Ghee',
      title: 'Pure Desi Ghee',
      subtitle: 'Made with Love & Tradition',
      description: 'Experience the authentic taste of traditional Indian ghee. Made from the finest A2 Gir cow & buffalo milk using the time-honored Bilona method.',
      bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80',
      fallbackBg: 'linear-gradient(135deg, #78350f 0%, #92400e 40%, #d97706 100%)',
      productImage: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=700&q=80',
      imageAlt: 'Pure Desi Ghee in glass jar on wooden table',
    },
    {
      badge: '⚙️ Traditional Bilona Process',
      title: 'Ancient Bilona Method',
      subtitle: '5000 Years of Vedic Tradition',
      description: 'Our ghee is crafted using the ancient Vedic Bilona churning process — hand-churned from curd, slow-cooked on low flame, preserving every nutrient.',
      bgImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80',
      fallbackBg: 'linear-gradient(135deg, #365314 0%, #4d7c0f 40%, #84cc16 100%)',
      productImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80',
      imageAlt: 'Traditional bilona churning process for making pure ghee',
    },
    {
      badge: '💚 Ayurvedic Superfood',
      title: 'Pure Health',
      subtitle: 'In Every Golden Spoonful',
      description: 'Rich in A2 beta-casein protein, vitamins A, D, E & K, and essential fatty acids. Ayurveda\'s most revered superfood — your family\'s daily wellness ritual.',
      bgImage: 'https://images.unsplash.com/photo-1467621591366-f0da5f7d7be1?auto=format&fit=crop&w=1920&q=80',
      fallbackBg: 'linear-gradient(135deg, #451a03 0%, #7c2d12 40%, #c2410c 100%)',
      productImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
      imageAlt: 'Healthy Indian food cooked with pure desi ghee',
    },
  ]

  const goToSlide = useCallback((index) => {
    setCurrentHeroSlide(index)
  }, [])

  const SLIDE_COUNT = 3

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % SLIDE_COUNT)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

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

      {/* Hero Slider Section */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 90px)', minHeight: '580px', maxHeight: '820px' }}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ background: slide.fallbackBg }}
          >
            {/* Background image (loads on top of gradient fallback) */}
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20"></div>
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* Slide content */}
            <div className="relative h-full container-custom flex items-center">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-8">
                {/* Left: Text content */}
                <div className="text-white">
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest border border-white/25">
                    {slide.badge}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-4 leading-tight">
                    {slide.title}
                    <span className="block text-amber-300 mt-1 text-3xl md:text-4xl lg:text-5xl">{slide.subtitle}</span>
                  </h1>
                  <p className="text-base md:text-lg text-white/85 mb-7 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>
                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm border border-white/20">
                      <CheckCircle size={13} className="text-amber-300" /> 100% Natural
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm border border-white/20">
                      <CheckCircle size={13} className="text-amber-300" /> No Preservatives
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm border border-white/20">
                      <CheckCircle size={13} className="text-amber-300" /> FSSAI Certified
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/products">
                      <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-lg hover:shadow-xl">
                        Shop Now
                        <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="outline" size="lg" className="border-white/70 text-white hover:bg-white/15 hover:border-white">
                        Our Story
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Product image */}
                <div className="hidden md:flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute -inset-8 bg-amber-300/20 rounded-full blur-3xl"></div>
                    <img
                      src={slide.productImage}
                      alt={slide.imageAlt}
                      className="relative rounded-3xl shadow-2xl max-w-xs lg:max-w-sm w-full object-cover border-2 border-white/20"
                      style={{ maxHeight: '420px' }}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentHeroSlide ? 'w-7 h-3 bg-amber-400' : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev arrow */}
        <button
          onClick={() => setCurrentHeroSlide(prev => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        {/* Next arrow */}
        <button
          onClick={() => setCurrentHeroSlide(prev => (prev + 1) % SLIDE_COUNT)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-all border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </section>

      {/* Features / USP Strip */}
      <section className="py-16 bg-primary-500">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '10,000+', label: 'Happy Customers' },
              { value: '100%', label: 'Pure & Natural' },
              { value: 'A2', label: 'Gir Cow Milk' },
              { value: 'Zero', label: 'Preservatives' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold font-heading">{stat.value}</div>
                <div className="text-amber-100 text-sm mt-1">{stat.label}</div>
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
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-primary-600 mb-4">
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
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
                  alt="Desi Cow - Source of Pure A2 Cow Ghee"
                  className="relative rounded-2xl shadow-xl w-full max-w-md object-cover bg-amber-100 min-h-[280px]"
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
                  src="https://images.unsplash.com/photo-1592483591000-ac5af7e0c7e6?auto=format&fit=crop&w=900&q=80"
                  alt="Buffalo - Source of Rich Creamy Buffalo Ghee"
                  className="relative rounded-2xl shadow-xl w-full max-w-md object-cover"
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

          {/* Process Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80"
                alt="Fresh milk collection from indigenous desi cows"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Fresh Milk Collection</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80"
                alt="Traditional bilona hand-churning process"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Bilona Hand-Churning</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-premium aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
                alt="Slow simmering to create pure golden ghee"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Slow-Cooked to Perfection</p>
              </div>
            </div>
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
                <p className="text-gray-600 italic mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  {brokenAvatars.has(i) ? (
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg border-2 border-amber-200">
                      {t.name.charAt(0)}
                    </div>
                  ) : (
                    <img
                      src={t.avatar}
                      alt={`${t.name} - Verified Customer`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
                      loading="lazy"
                      onError={() => setBrokenAvatars(prev => new Set([...prev, i]))}
                    />
                  )}
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

      {/* Special Offers Section */}
      <section className="py-14 bg-gradient-to-r from-amber-600 to-yellow-500">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                badge: '🎉 New Customer',
                title: '10% OFF Your First Order',
                desc: 'Use code WELCOME10 at checkout',
                cta: 'Shop Now',
                link: '/products',
              },
              {
                badge: '🚚 Free Shipping',
                title: 'Free Delivery on ₹500+',
                desc: 'Pan-India delivery, no hidden charges',
                cta: 'Browse Products',
                link: '/products',
              },
              {
                badge: '📦 Bulk Order',
                title: 'Save More on Bulk Orders',
                desc: 'Special pricing for 5L+ orders — call us!',
                cta: 'WhatsApp Us',
                link: 'https://wa.me/919876543210',
                external: true,
              },
            ].map((offer, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/20 hover:bg-white/20 transition-all">
                <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-3 inline-block">
                  {offer.badge}
                </span>
                <h3 className="text-xl font-bold font-heading mb-1">{offer.title}</h3>
                <p className="text-yellow-100 text-sm mb-4">{offer.desc}</p>
                {offer.external ? (
                  <a
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold bg-white text-amber-700 px-4 py-2 rounded-full hover:bg-yellow-50 transition-colors"
                  >
                    {offer.cta} <ArrowRight size={15} />
                  </a>
                ) : (
                  <Link
                    to={offer.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold bg-white text-amber-700 px-4 py-2 rounded-full hover:bg-yellow-50 transition-colors"
                  >
                    {offer.cta} <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Instagram Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-badge">📸 Instagram</span>
            <h2 className="section-title mb-2">Follow Our Journey</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">
              Real customers, real kitchens, real love. Follow us{' '}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 font-semibold hover:underline"
              >
                @vashudhaghee
              </a>{' '}
              for daily ghee recipes and health tips.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              {
                src: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&h=400&q=80',
                label: 'Dal Tadka with Ghee',
              },
              {
                src: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=400&h=400&q=80',
                label: 'Fresh Ghee Jar',
              },
              {
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=400&q=80',
                label: 'Gir Cow',
              },
              {
                src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=400&h=400&q=80',
                label: 'Organic Farm',
              },
              {
                src: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=400&h=400&q=80',
                label: 'Churning Process',
              },
              {
                src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&h=400&q=80',
                label: 'Golden Ghee',
              },
            ].map((item, i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group relative"
                aria-label={item.label}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-end justify-center pb-2">
                  <span className="text-white text-[10px] font-semibold text-center px-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {item.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              Follow @vashudhaghee on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-cream-100 to-yellow-50 border-y border-amber-100">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-badge">📬 Newsletter</span>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-3">
              Get Exclusive Offers & Health Tips
            </h2>
            <p className="text-gray-600 mb-7">
              Join 5,000+ subscribers who receive Ayurvedic recipes, ghee benefits,
              and exclusive discount offers straight to their inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-full border border-amber-200 bg-white focus:outline-none focus:border-primary-500 text-sm shadow-sm"
              />
              <button
                type="submit"
                className="btn-primary px-7 py-3.5 whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">
              No spam, ever. Unsubscribe anytime. 🌿
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-800 via-yellow-800 to-amber-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        <div className="container-custom text-center relative">
          <span className="inline-block bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            🌿 Experience the Difference
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-5 leading-tight">
            Ready for Pure, Authentic Ghee?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto text-amber-100">
            Join 10,000+ families who trust Vashudha Ghee for pure, authentic,
            traditionally-made desi ghee — delivered fresh to their doorstep.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button variant="secondary" size="lg">
                Browse Products
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%21%20I%20want%20to%20order%20Vashudha%20Ghee."
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-green-500 hover:bg-green-600 text-white px-7 py-3 text-base"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
