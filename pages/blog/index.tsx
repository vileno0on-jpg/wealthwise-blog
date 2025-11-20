import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAllPosts, searchPosts } from '@/lib/posts'
import { generateSEOMeta } from '@/lib/seo'
import PostCard from '@/components/PostCard'
import Sidebar from '@/components/Sidebar'
import AdSlot from '@/components/AdSlot'

export default function BlogIndex() {
  const router = useRouter()
  const searchQuery = (router.query.search as string) || ''
  
  const allPosts = getAllPosts()
  const [posts, setPosts] = useState(allPosts)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  useEffect(() => {
    if (searchQuery) {
      setPosts(searchPosts(searchQuery))
      setCurrentPage(1)
    } else {
      setPosts(allPosts)
    }
  }, [searchQuery])

  const totalPages = Math.ceil(posts.length / postsPerPage)
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const seo = generateSEOMeta({
    title: 'Personal Finance Blog | Expert Money Tips & Investment Advice',
    description: 'Browse our complete collection of personal finance articles. Learn about budgeting, investing, debt management, and more.',
    url: 'https://financehub.com/blog',
  })

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.openGraph.title} />
        <meta property="og:description" content={seo.openGraph.description} />
        <link rel="canonical" href={seo.alternates.canonical} />
      </Head>

      <div className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Finance Blog</h1>
            <p className="text-lg text-gray-600">
              Expert tips, strategies, and advice to help you master your money and build wealth.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const query = (formData.get('search') as string) || ''
                router.push(`/blog${query ? `?search=${encodeURIComponent(query)}` : ''}`)
                setPosts(query ? searchPosts(query) : allPosts)
                setCurrentPage(1)
              }}
              className="max-w-2xl"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  name="search"
                  defaultValue={searchQuery}
                  placeholder="Search articles..."
                  className="flex-1 px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
                />
                <button type="submit" className="btn-primary">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {paginatedPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {paginatedPosts.map((post) => (
                      <PostCard key={post.slug} {...post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No articles found. Try a different search term.</p>
                </div>
              )}

              {/* Mid-Content Ad */}
              <AdSlot
                format="leaderboard"
                className="my-8"
                category="blog-index"
                keywords={['personal finance', 'finance blog', 'money tips']}
                targeting={{ position: 'mid-page', page: 'blog-index' }}
                refreshInterval={30}
                maxRefreshes={3}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar recentPosts={allPosts.slice(0, 5)} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

