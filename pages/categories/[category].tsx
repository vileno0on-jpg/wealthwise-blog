import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getPostsByCategory, getAllPosts } from '@/lib/posts'
import { generateSEOMeta } from '@/lib/seo'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  category: string
  posts: Array<{
    slug: string
    title: string
    excerpt: string
    date: string
    category: string
    readTime: number
    image?: string
    featured?: boolean
    tags: string[]
    metaDescription: string
  }>
}

export default function CategoryPage({ category, posts }: CategoryPageProps) {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
  
  const seo = generateSEOMeta({
    title: `${categoryName} Articles | Personal Finance Blog`,
    description: `Browse all ${categoryName.toLowerCase()} articles. Expert tips and strategies to help you manage your finances.`,
    url: `https://financehub.com/categories/${category}`,
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
          <nav className="mb-8 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            {' / '}
            <Link href="/categories" className="hover:text-primary-600">Categories</Link>
            {' / '}
            <span className="text-gray-900">{categoryName}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{categoryName}</h1>
          <p className="text-xl text-gray-600 mb-12">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} about {categoryName.toLowerCase()}
          </p>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found in this category yet.</p>
              <Link href="/blog" className="text-primary-600 font-semibold hover:underline mt-4 inline-block">
                Browse all articles →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['budgeting', 'investing', 'debt', 'savings', 'credit']
  
  const paths = categories.map((category) => ({
    params: { category },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string
  const posts = getPostsByCategory(category)

  return {
    props: {
      category,
      posts,
    },
    revalidate: 3600,
  }
}

