import { Post } from './types'

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
}

export function generateSEOMeta({
  title = 'WealthWise | Personal Finance Blog | Save & Invest Smart in 2025',
  description = 'Expert personal finance tips, investment strategies, and money management advice. Learn how to save, invest, and build wealth in 2025.',
  image = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop',
  url = 'https://wealthwise.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'WealthWise Team',
  tags = [],
}: SEOProps) {
  const siteName = 'WealthWise'
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      publishedTime,
      modifiedTime,
      authors: [author],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateArticleStructuredData(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image ? [post.image] : ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop'],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'WealthWise Team',
      url: 'https://wealthwise.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WealthWise',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wealthwise.com/logo.png',
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wealthwise.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: 2500,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  }
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

