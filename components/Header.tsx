import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-400 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <nav className="container-custom py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">WealthWise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-300">
              Home
            </Link>
            <Link href="/blog" className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-300">
              Blog
            </Link>
            <Link href="/categories" className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-300">
              Categories
            </Link>
            <Link href="/about" className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-300">
              About
            </Link>
            <Link href="/contact" className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-all duration-300">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-5 py-2.5 bg-white text-gray-900 border-2 border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64 transition-all duration-300 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-r-xl hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 fade-in">
            <Link href="/" className="block py-2 text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-primary-600">
              Blog
            </Link>
            <Link href="/categories" className="block py-2 text-gray-700 hover:text-primary-600">
              Categories
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-primary-600">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary-600">
              Contact
            </Link>
            <form onSubmit={handleSearch} className="pt-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
              />
            </form>
          </div>
        )}
      </nav>

      {/* AdSense Header Ad Placeholder */}
      <div className="container-custom pb-2">
        <div className="ad-container leaderboard">
          {/* Google AdSense Leaderboard Ad - 728x90 */}
          <div className="bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
            AdSense Leaderboard (728x90)
            <br />
            Place your AdSense code here
          </div>
        </div>
      </div>
    </header>
  )
}

