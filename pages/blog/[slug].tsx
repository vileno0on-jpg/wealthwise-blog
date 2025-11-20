import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { generateSEOMeta, generateArticleStructuredData, generateBreadcrumbStructuredData, generateFAQStructuredData } from '@/lib/seo'
import Sidebar from '@/components/Sidebar'
import AdSlot from '@/components/AdSlot'
import InterestCalculator from '@/components/InterestCalculator'
import ComparisonTable from '@/components/ComparisonTable'
import FAQAccordion from '@/components/FAQAccordion'
import KeyTakeaways from '@/components/KeyTakeaways'
import { Post } from '@/lib/types'

interface BlogPostProps {
  post: Post
  content: string
}

export default function BlogPost({ post, content }: BlogPostProps) {
  const seo = generateSEOMeta({
    title: post.title,
    description: post.metaDescription,
    image: post.image,
    url: `https://wealthwise.com/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags,
  })

  const articleStructuredData = generateArticleStructuredData(post)
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://wealthwise.com' },
    { name: 'Blog', url: 'https://wealthwise.com/blog' },
    { name: post.title, url: `https://wealthwise.com/blog/${post.slug}` },
  ])
  
  // FAQ data for SEO - dynamically generated based on post
  const faqs = post.slug.includes('savings') ? [
    {
      question: 'Are high-yield savings accounts safe?',
      answer: 'Yes, as long as the bank is FDIC insured, your deposits are protected up to $250,000 per account, per bank. This means even if the bank fails, your money is safe.',
    },
    {
      question: 'Can I lose money in a high-yield savings account?',
      answer: 'No, high-yield savings accounts are not investments—they\'re deposit accounts. Your principal is protected by FDIC insurance, so you cannot lose your initial deposit.',
    },
    {
      question: 'How often is interest compounded?',
      answer: 'Most high-yield savings accounts compound interest daily and credit it to your account monthly. This means you earn interest on your interest, maximizing your returns.',
    },
    {
      question: 'Is there a limit on how much I can deposit?',
      answer: 'While there\'s no legal limit on deposits, FDIC insurance only covers up to $250,000 per account, per bank. If you have more than this amount, consider opening accounts at multiple banks.',
    },
    {
      question: 'Can I withdraw money anytime?',
      answer: 'Yes, high-yield savings accounts allow you to withdraw money at any time. However, federal regulations limit certain types of withdrawals to six per month (though this limit was suspended in 2020 and may vary by bank).',
    },
  ] : []
  
  const faqStructuredData = faqs.length > 0 ? generateFAQStructuredData(faqs) : null

  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3)

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
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="WealthWise Team" />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content={seo.twitter.card} />
        <meta name="twitter:title" content={seo.twitter.title} />
        <meta name="twitter:description" content={seo.twitter.description} />
        <link rel="canonical" href={seo.alternates.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
        {faqStructuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        )}
      </Head>

      <article className="bg-white">
        {/* Breadcrumb */}
        <nav className="container-custom py-4 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-primary-600">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{post.title}</li>
          </ol>
        </nav>

        <div className="container-custom py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content - Wider Display */}
            <div className="lg:col-span-8">
              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                  <span>{post.readTime} min read</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
                <p className="text-2xl text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime} min read
                  </span>
                  <span>•</span>
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                </div>
              </header>

              {/* Featured Image */}
              {post.image && (
                <div className="relative h-80 md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              )}

              {/* Ad Slot - Below H1 - Strategic Placement */}
              <div className="my-12">
                <AdSlot
                  format="leaderboard"
                  className="mb-8"
                  category={post.category.toLowerCase()}
                  keywords={post.tags}
                  targeting={{ position: 'above-content', article: post.slug }}
                  refreshInterval={45}
                  maxRefreshes={2}
                />
              </div>

              {/* Key Takeaways - Conditional based on post */}
              {post.slug.includes('savings') && (
                <KeyTakeaways
                  items={[
                    'High-yield savings accounts offer 10-20x higher interest rates than traditional banks',
                    'FDIC insurance protects deposits up to $250,000 per account',
                    'Compound interest can significantly grow your savings over time',
                    'Look for accounts with no fees and competitive APY rates',
                    'Consider multiple accounts for different financial goals',
                  ]}
                />
              )}

              {/* Interactive Calculator - Conditional based on post */}
              {post.slug.includes('savings') && <InterestCalculator />}

              {/* Article Content - Enhanced Typography */}
              <div
                className="prose prose-lg prose-primary max-w-none mb-8 text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                }}
              />

              {/* Comparison Table */}
              {post.slug.includes('savings') && (
                <ComparisonTable
                  title="Top High-Yield Savings Accounts Comparison 2025"
                  items={[
                    {
                      name: 'Marcus by Goldman Sachs',
                      apy: 4.60,
                      minDeposit: '$0',
                      monthlyFee: 'None',
                      mobileApp: true,
                      fdicInsured: true,
                      rating: 5,
                      pros: ['Highest APY', 'No fees', 'Backed by Goldman Sachs'],
                      cons: ['Limited banking features', 'No ATM access'],
                    },
                    {
                      name: 'Discover Bank',
                      apy: 4.55,
                      minDeposit: '$0',
                      monthlyFee: 'None',
                      mobileApp: true,
                      fdicInsured: true,
                      rating: 5,
                      pros: ['Competitive rate', 'Excellent customer service', 'No fees'],
                      cons: ['Rates can change', 'Limited branches'],
                    },
                    {
                      name: 'Ally Bank',
                      apy: 4.50,
                      minDeposit: '$0',
                      monthlyFee: 'None',
                      mobileApp: true,
                      fdicInsured: true,
                      rating: 5,
                      pros: ['No minimum balance', 'Great mobile app', '24/7 support'],
                      cons: ['No physical branches', 'Rates fluctuate'],
                    },
                  ]}
                />
              )}

              {/* FAQ Section - Conditional */}
              {faqs.length > 0 && <FAQAccordion faqs={faqs} />}

              {/* Mid-Article Ad - Strategic Placement */}
              <div className="my-16 flex justify-center">
                <AdSlot
                  format="rectangle"
                  category={post.category.toLowerCase()}
                  keywords={post.tags}
                  targeting={{ position: 'mid-content', article: post.slug }}
                  refreshInterval={60}
                  maxRefreshes={1}
                />
              </div>
              
              {/* In-Article Ad - After Key Content */}
              <div className="my-16">
                <AdSlot
                  format="leaderboard"
                  category={post.category.toLowerCase()}
                  keywords={post.tags}
                  targeting={{ position: 'after-content', article: post.slug }}
                  refreshInterval={90}
                  maxRefreshes={1}
                />
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="border-t border-b border-gray-200 py-6 mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Share this article:</h3>
                <div className="flex space-x-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://wealthwise.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://wealthwise.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="card p-4 group"
                      >
                        {relatedPost.image && (
                          <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                            <Image
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <Sidebar recentPosts={getAllPosts().slice(0, 5)} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  // Load markdown content
  let postContent = ''
  try {
    const fs = await import('fs')
    const path = await import('path')
    const { markdownToHtml } = await import('@/lib/markdown')
    
    const filePath = path.default.join(process.cwd(), 'content', 'posts', `${slug}.md`)
    const fileContents = fs.default.readFileSync(filePath, 'utf8')
    postContent = markdownToHtml(fileContents)
  } catch (error) {
    // Fallback content if file not found
    postContent = `
      <h2>Introduction</h2>
      <p>${post.excerpt}</p>
      <h2>Key Points</h2>
      <ul>
        <li>This is a comprehensive guide to ${post.title.toLowerCase()}</li>
        <li>We'll cover all the essential information you need</li>
        <li>Stay tuned for detailed insights and actionable advice</li>
      </ul>
      <h2>Conclusion</h2>
      <p>Thank you for reading. For more personal finance tips, check out our other articles.</p>
    `
  }

  return {
    props: {
      post,
      content: postContent,
    },
    revalidate: 3600, // Revalidate every hour
  }
}

