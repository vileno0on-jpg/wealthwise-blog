import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { generateSEOMeta } from '@/lib/seo'
import PostCard from '@/components/PostCard'
import AdSlot from '@/components/AdSlot'

export default function Home() {
  const posts = getAllPosts()
  if (!posts || posts.length === 0) {
    return <div>No posts available</div>
  }
  const featuredPost = posts.find((p) => p.featured) || posts[0]
  const recentPosts = posts.filter((p) => p.slug !== featuredPost.slug).slice(0, 6)

  const seo = generateSEOMeta({
    title: 'WealthWise | Personal Finance Blog | Save & Invest Smart in 2025',
    description: 'Expert personal finance tips, investment strategies, and money management advice. Learn how to save, invest, and build wealth in 2025.',
  })

  const categories = [
    { name: 'Budgeting', slug: 'budgeting', description: 'Learn to budget like a pro', count: 12 },
    { name: 'Investing', slug: 'investing', description: 'Grow your wealth smartly', count: 15 },
    { name: 'Debt Management', slug: 'debt', description: 'Get out of debt faster', count: 8 },
    { name: 'Savings', slug: 'savings', description: 'Maximize your savings', count: 10 },
  ]

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.openGraph.title} />
        <meta property="og:description" content={seo.openGraph.description} />
        <meta property="og:image" content={seo.openGraph.images[0].url} />
        <meta property="og:url" content={seo.openGraph.url} />
        <meta property="og:type" content={seo.openGraph.type} />
        <meta name="twitter:card" content={seo.twitter.card} />
        <meta name="twitter:title" content={seo.twitter.title} />
        <meta name="twitter:description" content={seo.twitter.description} />
        <link rel="canonical" href={seo.alternates.canonical} />
        {/* Google AdSense - Also in page head for verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6751442219383870"
          crossOrigin="anonymous"
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-slide-up leading-tight">
              Master Your Money in 2025
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed animate-slide-up animation-delay-200">
              Expert personal finance tips, investment strategies, and money management advice to help you save, invest, and build lasting wealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
              <Link href="/blog" className="btn-primary text-center">
                Read Latest Articles
              </Link>
              <Link href="/categories" className="btn-secondary text-center">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Featured Article</h2>
          <div className="animate-scale-in">
            <PostCard {...featuredPost} featured={true} />
          </div>
        </div>
      </section>

      {/* Ad Slot - Leaderboard */}
      {/* Temporarily disabled for testing */}
      {/* <AdSlot
        format="leaderboard"
        className="container-custom"
        category="homepage"
        keywords={['personal finance', 'budgeting', 'investing', 'savings']}
        targeting={{ position: 'above-fold', page: 'home' }}
      /> */}

      {/* Categories Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Explore Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="card p-8 text-center group hover:border-primary-400 transition-all duration-400"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-400 transform group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <p className="text-primary-600 font-semibold text-sm">{category.count} Articles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Latest Articles</h2>
            <Link href="/blog" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors flex items-center gap-2 group">
              View All 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div key={post.slug} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Start Saving Today</h2>
          <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Join 10,000+ readers getting weekly finance tips delivered to their inbox. Free resources, no spam.
          </p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary-300 shadow-lg transform hover:scale-105 transition-transform placeholder:text-gray-400"
              required
            />
            <button type="submit" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe Free
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

