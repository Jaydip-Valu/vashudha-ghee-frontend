import { Link } from 'react-router-dom'
import { ArrowRight, Clock, User, Tag } from 'lucide-react'
import SEO from '@/components/Common/SEO'

const blogPosts = [
  {
    id: 1,
    slug: 'benefits-of-a2-desi-ghee',
    title: '10 Powerful Health Benefits of A2 Desi Cow Ghee',
    excerpt:
      'Discover why A2 Desi Cow Ghee is considered a superfood in Ayurveda. From boosting immunity to improving digestion, learn how this golden elixir can transform your health.',
    category: 'Health & Wellness',
    readTime: '5 min read',
    author: 'Dr. Priya Sharma',
    date: 'February 15, 2026',
    image: '/images/hero-ghee-jar.svg',
    tags: ['A2 Ghee', 'Health Benefits', 'Ayurveda'],
  },
  {
    id: 2,
    slug: 'bilona-method-explained',
    title: 'The Ancient Bilona Method: How Traditional Ghee is Made',
    excerpt:
      'The Bilona process is a 5000-year-old Vedic technique for making ghee. Learn how this hand-churning method preserves all the natural nutrients and medicinal properties that are lost in industrial ghee production.',
    category: 'Our Process',
    readTime: '7 min read',
    author: 'Vashudha Team',
    date: 'January 28, 2026',
    image: '/images/bilona-process.svg',
    tags: ['Bilona Method', 'Traditional Process', 'Valona Paddhati'],
  },
  {
    id: 3,
    slug: 'ghee-vs-butter',
    title: 'Ghee vs Butter: Which is Healthier for Indian Cooking?',
    excerpt:
      'Both ghee and butter are popular cooking fats, but which one is truly better for your health? We compare smoke points, nutritional profiles, digestibility, and taste to help you make the right choice.',
    category: 'Nutrition',
    readTime: '6 min read',
    author: 'Nutritionist Anita Desai',
    date: 'January 10, 2026',
    image: '/images/hero-ghee.svg',
    tags: ['Ghee vs Butter', 'Nutrition', 'Cooking Tips'],
  },
  {
    id: 4,
    slug: 'healthy-cooking-with-ghee',
    title: 'Healthy Cooking with Ghee: 8 Recipes You Must Try',
    excerpt:
      'From dal tadka to kheer, ghee elevates every Indian recipe. Explore our collection of traditional recipes that make the most of pure desi ghee — and learn why cooking with ghee is healthier than you think.',
    category: 'Recipes',
    readTime: '8 min read',
    author: 'Chef Meena Patel',
    date: 'December 20, 2025',
    image: '/images/hero-ghee.svg',
    tags: ['Recipes', 'Cooking', 'Indian Food'],
  },
  {
    id: 5,
    slug: 'a2-vs-a1-milk',
    title: 'A2 Milk vs A1 Milk: Why It Matters for Your Ghee',
    excerpt:
      "Not all ghee is created equal. The difference between A1 and A2 beta-casein protein in cow's milk makes a huge impact on your health. Here's everything you need to know about A2 ghee.",
    category: 'Health & Wellness',
    readTime: '6 min read',
    author: 'Dr. Priya Sharma',
    date: 'December 5, 2025',
    image: '/images/desi-cow.svg',
    tags: ['A2 Milk', 'A1 vs A2', 'Gir Cow'],
  },
  {
    id: 6,
    slug: 'ghee-for-weight-loss',
    title: 'Can Ghee Help with Weight Loss? The Surprising Truth',
    excerpt:
      "Many people avoid ghee thinking it causes weight gain. But Ayurveda and modern research both suggest that pure desi ghee — consumed in moderation — can actually support healthy weight management.",
    category: 'Health & Wellness',
    readTime: '5 min read',
    author: 'Vashudha Team',
    date: 'November 18, 2025',
    image: '/images/hero-ghee.svg',
    tags: ['Weight Loss', 'Metabolism', 'Healthy Fats'],
  },
]

const categoryColors = {
  'Health & Wellness': 'bg-green-100 text-green-700',
  'Our Process': 'bg-amber-100 text-amber-700',
  'Nutrition': 'bg-blue-100 text-blue-700',
  'Recipes': 'bg-orange-100 text-orange-700',
}

const Blog = () => {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <>
      <SEO
        title="Blog - Ghee Health Benefits, Recipes & Ayurvedic Tips | Vashudha Ghee"
        description="Read our blog for expert articles on A2 Desi Ghee health benefits, traditional Bilona method, Ayurvedic recipes, and tips for healthy cooking with ghee."
        keywords="ghee blog, A2 ghee benefits, bilona method, ghee recipes, healthy cooking ghee, ayurvedic ghee"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      {/* Page Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-cream-100 to-yellow-50 py-14 border-b border-amber-100">
        <div className="container-custom text-center">
          <span className="section-badge">📝 Knowledge Hub</span>
          <h1 className="section-title mb-3">Vashudha Ghee Blog</h1>
          <div className="gold-divider"></div>
          <p className="section-subtitle">
            Expert articles on A2 ghee health benefits, traditional recipes, Ayurvedic wisdom,
            and the ancient art of Bilona ghee making.
          </p>
        </div>
      </section>

      <div className="container-custom py-14">
        {/* Featured Post */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-amber-500">★</span> Featured Article
          </h2>
          <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 border border-amber-100 group">
            <div className="grid md:grid-cols-2">
              <div className="overflow-hidden bg-amber-50 flex items-center justify-center min-h-56">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover max-h-72 md:max-h-none group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category] || 'bg-gray-100 text-gray-700'}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-3 leading-snug group-hover:text-primary-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User size={14} />
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                  </div>
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-semibold text-sm group-hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 border border-amber-50 group hover:-translate-y-1"
              >
                {/* Image */}
                <div className="overflow-hidden bg-amber-50 h-48 flex items-center justify-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="text-xs text-gray-400">
                      <span>{post.date}</span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                    >
                      Read <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA to subscribe */}
        <div className="mt-16 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-10 text-center border border-amber-100">
          <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">
            Never Miss a Health Tip
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for weekly Ayurvedic recipes, health tips, and exclusive offers.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3 rounded-full border border-amber-200 bg-white focus:outline-none focus:border-primary-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full transition-colors text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Blog
