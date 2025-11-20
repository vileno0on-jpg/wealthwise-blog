import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { generateSEOMeta } from '@/lib/seo'

export default function Categories() {
  const posts = getAllPosts()
  
  const categories = [
    {
      name: 'Budgeting',
      slug: 'budgeting',
      description: 'Learn how to create and stick to a budget, track expenses, and manage your money effectively.',
      count: posts.filter((p) => p.category === 'Budgeting').length,
    },
    {
      name: 'Investing',
      slug: 'investing',
      description: 'Investment strategies, stock market tips, cryptocurrency guides, and portfolio management advice.',
      count: posts.filter((p) => p.category === 'Investing').length,
    },
    {
      name: 'Debt',
      slug: 'debt',
      description: 'Debt payoff strategies, credit card management, and tips for becoming debt-free faster.',
      count: posts.filter((p) => p.category === 'Debt').length,
    },
    {
      name: 'Savings',
      slug: 'savings',
      description: 'High-yield savings accounts, emergency funds, and strategies to maximize your savings growth.',
      count: posts.filter((p) => p.category === 'Savings').length,
    },
    {
      name: 'Credit',
      slug: 'credit',
      description: 'Credit card reviews, credit score improvement, and building healthy credit habits.',
      count: posts.filter((p) => p.category === 'Credit').length,
    },
  ]

  const seo = generateSEOMeta({
    title: 'Categories | Personal Finance Topics',
    description: 'Browse personal finance articles by category: Budgeting, Investing, Debt Management, Savings, and Credit.',
    url: 'https://financehub.com/categories',
  })

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.alternates.canonical} />
      </Head>

      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Browse by Category</h1>
          <p className="text-xl text-gray-600 mb-12">
            Explore our personal finance articles organized by topic
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="card p-8 group hover:border-primary-300 transition-colors"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <span className="text-3xl">💰</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-primary-600 font-semibold">
                  {category.count} {category.count === 1 ? 'Article' : 'Articles'} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

