import { Users, Target, Award, Heart, Leaf, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '@/components/Common/SEO'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We never compromise on quality. Every batch is made with finest ingredients and tested for purity.'
    },
    {
      icon: Users,
      title: 'Traditional Methods',
      description: 'Following the 5000-year-old Bilona (Valona Paddhati) method passed down through generations.'
    },
    {
      icon: Award,
      title: '100% Pure',
      description: 'No additives, no preservatives, no artificial colors. Just pure, natural ghee the way it should be.'
    },
    {
      icon: Target,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We ensure every customer gets the best experience, every time.'
    }
  ]

  const processSteps = [
    { step: '01', title: 'Fresh Milk Collection', desc: 'We collect pure, fresh milk from grass-fed indigenous cows every morning — no mixing, no compromise.' },
    { step: '02', title: 'Natural Curd Preparation', desc: 'Milk is fermented overnight using natural starters into thick, wholesome curd.' },
    { step: '03', title: 'Bilona Hand-Churning', desc: 'The ancient wooden churner (Bilona) separates pure butter from curd — the Vedic way.' },
    { step: '04', title: 'Slow Simmering', desc: 'Butter is slow-cooked on a low flame until it transforms into golden, aromatic, nutrient-rich ghee.' },
  ]

  return (
    <>
      <SEO
        title="About Us — Our Story, Bilona Process & Quality Promise | Vashudha Ghee"
        description="Learn about Vashudha Ghee's journey, our traditional Bilona ghee-making process, quality promise, and farm-to-kitchen concept. 100% pure A2 Desi Ghee."
        keywords="about vashudha ghee, our story, bilona method, traditional ghee making, pure ghee company, A2 desi ghee"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' }
        ]}
      />

      {/* Page Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-cream-100 to-yellow-50 py-16 border-b border-amber-100">
        <div className="container-custom text-center">
          <span className="section-badge">🌿 Our Story</span>
          <h1 className="section-title mb-3">About Vashudha Ghee</h1>
          <div className="gold-divider"></div>
          <p className="section-subtitle">
            Bringing the authentic taste and Ayurvedic wisdom of traditional Indian ghee to families across the country.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-badge">🐄 Our Heritage</span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
                A Story Born in the Heart of a Village
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Vashudha Ghee was born from a simple, profound belief: <strong className="text-gray-900">every family deserves access to pure,
                  traditional ghee</strong> made exactly the way our ancestors made it — with devotion, patience, and love.
                </p>
                <p>
                  Our journey began in a small village in Gujarat, where generations of our family have been perfecting
                  the art of ghee-making using the ancient Bilona (Valona Paddhati) method. What started as a tradition
                  in our home kitchen has grown into a mission to bring this liquid gold to every household in India.
                </p>
                <p>
                  We source milk only from indigenous Gir cows and buffaloes that roam freely on natural pastures.
                  Our ghee contains <strong className="text-gray-900">zero preservatives, zero additives</strong> — just pure, golden goodness
                  as nature intended.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary">
                  Shop Our Ghee <ArrowRight size={17} className="ml-2" />
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-100 rounded-3xl opacity-40 blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80"
                alt="Vashudha Ghee — Premium Pure Desi Ghee Jar"
                className="relative rounded-3xl shadow-premium w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-primary-500">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: '10,000+', label: 'Happy Families' },
              { value: '100%', label: 'Pure & Natural' },
              { value: '5000+', label: 'Years of Tradition' },
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

      {/* Bilona Process */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-badge">⚙️ Traditional Process</span>
            <h2 className="section-title mb-2">The Bilona Method</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle">
              Our 4-step ancient Vedic process ensures every jar of Vashudha Ghee is packed with
              natural nutrients, aroma, and Ayurvedic goodness.
            </p>
          </div>

          {/* Bilona Process Photo Gallery */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {processSteps.map((step) => (
              <div key={step.step} className="relative text-center p-7 rounded-2xl border border-amber-100 bg-white hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500 text-white text-xl font-bold mb-5 shadow-gold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-badge">💛 Our Values</span>
            <h2 className="section-title mb-2">What We Stand For</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="card p-7 text-center hover:shadow-premium hover:-translate-y-1 transition-all duration-300 border border-amber-50">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon className="text-primary-600" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-badge">🏆 Quality Promise</span>
              <h2 className="section-title mb-2">Our Commitment to You</h2>
              <div className="gold-divider"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                'Sourced only from indigenous A2 Gir cows & healthy buffaloes',
                'Every batch hand-churned using traditional wooden Bilona',
                'Slow-cooked on low flame to preserve all nutrients',
                'FSSAI certified facility with regular quality audits',
                'Lab-tested for purity — every single batch',
                'No preservatives, no artificial colors, no additives — ever',
                'Packaged in food-grade, airtight containers',
                '12-month natural shelf life without any chemical treatment',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-soft">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Farm to Kitchen */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-green-100 rounded-3xl opacity-40 blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
                alt="Gir Cow - Source of A2 Milk for Vashudha Ghee"
                className="relative rounded-3xl shadow-premium w-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="section-badge">🌾 Farm to Kitchen</span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
                From Our Farm, Directly to Your Table
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe transparency is the foundation of trust. Our entire supply chain —
                from the cow to your kitchen — is short, traceable, and ethical. No middlemen,
                no compromise, no shortcuts.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Leaf, text: 'Indigenous Gir cows grazing freely on natural pastures' },
                  { icon: Heart, text: 'Ethical, stress-free environment for our animals' },
                  { icon: Award, text: 'Milk collected only once daily — never over-milked' },
                  { icon: CheckCircle, text: 'Direct from farm to your doorstep — no cold chain breaks' },
                ].map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                      <Icon size={16} className="text-primary-600" />
                    </span>
                    <span className="text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-5">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide every household with access to pure, traditional ghee made using authentic
                Bilona methods — while supporting local farmers, respecting animal welfare, and preserving
                the ancient wisdom of Ayurveda.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-5">
                <span className="text-2xl">🌟</span>
              </div>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted name in traditional ghee products across India and the world —
                setting new standards for purity, quality, and authenticity, while making healthy eating
                a way of life for every family.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
