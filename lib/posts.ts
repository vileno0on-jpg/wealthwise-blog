import { Post } from './types'

// Sample blog posts data
export const posts: Post[] = [
  {
    slug: 'best-high-yield-savings-accounts-2025',
    title: 'Best High-Yield Savings Accounts 2025: Earn 5%+ APY on Your Money',
    excerpt: 'Discover the top high-yield savings accounts offering 5%+ APY in 2025. Compare rates, fees, and features to maximize your savings growth.',
    date: '2025-01-15',
    category: 'Savings',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    featured: true,
    tags: ['savings', 'high-yield', 'banking', 'interest rates'],
    metaDescription: 'Find the best high-yield savings accounts with 5%+ APY in 2025. Compare rates, minimum deposits, and features from top banks.',
  },
  {
    slug: 'how-to-invest-1000-dollars-crypto',
    title: 'How to Invest $1,000 in Crypto Without Losing Your Shirt: A Beginner\'s Guide',
    excerpt: 'Learn how to safely invest $1,000 in cryptocurrency as a beginner. We cover risk management, diversification, and proven strategies.',
    date: '2025-01-10',
    category: 'Investing',
    readTime: 15,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    featured: false,
    tags: ['crypto', 'investing', 'bitcoin', 'beginner'],
    metaDescription: 'Complete guide to investing $1,000 in cryptocurrency safely. Learn risk management, diversification, and beginner-friendly strategies.',
  },
  {
    slug: 'best-credit-cards-for-beginners-2025',
    title: 'Best Credit Cards for Beginners 2025: Build Credit and Earn Rewards',
    excerpt: 'Find the perfect starter credit card to build your credit score while earning cashback and rewards. Compare top options for first-time cardholders.',
    date: '2025-01-08',
    category: 'Credit',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
    featured: false,
    tags: ['credit cards', 'beginner', 'credit score', 'rewards'],
    metaDescription: 'Best credit cards for beginners in 2025. Compare starter cards to build credit and earn rewards with no annual fees.',
  },
  {
    slug: 'budgeting-apps-2025-comparison',
    title: 'Best Budgeting Apps 2025: Top 10 Apps to Take Control of Your Finances',
    excerpt: 'Compare the best budgeting apps of 2025. From Mint to YNAB, find the perfect app to track expenses, save money, and reach your financial goals.',
    date: '2025-01-05',
    category: 'Budgeting',
    readTime: 14,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    featured: true,
    tags: ['budgeting', 'apps', 'personal finance', 'money management'],
    metaDescription: 'Compare the best budgeting apps for 2025. Find the perfect app to track expenses, save money, and achieve financial goals.',
  },
  {
    slug: 'debt-snowball-vs-debt-avalanche',
    title: 'Debt Snowball vs Debt Avalanche: Which Method Saves More Money?',
    excerpt: 'Compare the debt snowball and debt avalanche methods. Learn which debt payoff strategy works best for your situation and saves the most money.',
    date: '2025-01-03',
    category: 'Debt',
    readTime: 11,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    featured: false,
    tags: ['debt', 'debt payoff', 'personal finance', 'money management'],
    metaDescription: 'Compare debt snowball vs debt avalanche methods. Learn which strategy saves more money and works best for paying off debt.',
  },
]

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export function getRecentPosts(limit: number = 5): Post[] {
  return getAllPosts().slice(0, limit)
}

export function searchPosts(query: string): Post[] {
  const lowerQuery = query.toLowerCase()
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

