import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1920&q=85',
    fallbackColor: 'from-amber-800 via-yellow-700 to-amber-900',
    badge: '🌿 100% Pure A2 Bilona Ghee',
    title: 'Pure Desi Ghee',
    subtitle: 'Made with Love & Tradition',
    description: 'Golden, aromatic, and full of Ayurvedic goodness — straight from our traditional farm to your table.',
    tags: ['100% Natural', 'No Preservatives', 'FSSAI Certified'],
    primaryCta: { text: 'Shop Now', link: '/products' },
    secondaryCta: { text: 'Our Story', link: '/about' },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1920&q=85',
    fallbackColor: 'from-green-900 via-emerald-800 to-green-900',
    badge: '🐄 Indigenous Gir Cows & Buffalo',
    title: 'Farm Fresh',
    subtitle: 'A2 Milk from Free-Roaming Cows',
    description: 'Our ghee begins with the finest A2 milk from grass-fed indigenous cows roaming freely on natural pastures.',
    tags: ['Grass-Fed Cows', 'A2 Milk', 'Ethical Farming'],
    primaryCta: { text: 'Our Farm Story', link: '/about' },
    secondaryCta: { text: 'Shop Cow Ghee', link: '/products' },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e562?auto=format&fit=crop&w=1920&q=85',
    fallbackColor: 'from-amber-700 via-orange-700 to-amber-800',
    badge: '🍯 Traditional Bilona Method',
    title: 'Pure Golden Ghee',
    subtitle: 'Ancient Recipe, Modern Quality',
    description: 'Slow-cooked to perfection using the 5000-year-old Bilona method — preserving maximum nutrients and aroma.',
    tags: ['Hand Churned', 'Slow Cooked', 'Lab Tested'],
    primaryCta: { text: 'Order Now', link: '/products' },
    secondaryCta: { text: 'Our Process', link: '/about' },
  },
]

const HeroSlider = () => {
  const [current, setCurrent] = useState(0)
  const [imgErrors, setImgErrors] = useState({})
  const blockRef = useRef(false)

  const goTo = useCallback((index) => {
    if (blockRef.current) return
    blockRef.current = true
    setCurrent(index)
    setTimeout(() => { blockRef.current = false }, 700)
  }, [])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + slides.length) % slides.length)
  }, [])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'min(90vh, 700px)' }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background image */}
          {!imgErrors[i] ? (
            <img
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-r ${s.fallbackColor}`} />
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-amber-500/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              {slide.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-3 leading-tight">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl text-amber-300 font-medium mb-4">
              {slide.subtitle}
            </p>
            <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-xl">
              {slide.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {slide.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
                  <CheckCircle size={12} className="text-amber-300" />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to={slide.primaryCta.link}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                {slide.primaryCta.text}
                <ArrowRight size={17} />
              </Link>
              <Link
                to={slide.secondaryCta.link}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-semibold px-7 py-3.5 rounded-full transition-all border border-white/30"
              >
                {slide.secondaryCta.text}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:scale-105 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:scale-105 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-3 bg-amber-400'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 md:right-10 z-30 text-white/70 text-sm font-medium">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  )
}

export default HeroSlider
