import Link from 'next/link'
import { format } from 'date-fns'
import AdSlot from './AdSlot'
import FinancePlannerDownload from './FinancePlannerDownload'
import { Post } from '@/lib/types'

interface SidebarProps {
  recentPosts?: Post[]
}

export default function Sidebar({ recentPosts = [] }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* AdSense Rectangle Ad */}
      <AdSlot format="rectangle" />

      {/* Email Signup */}
      <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Get Free Finance Tips</h3>
        <p className="text-gray-700 text-sm mb-4">
          Join 10,000+ subscribers and get weekly money-saving tips delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
            required
          />
          <button type="submit" className="w-full btn-primary">
            Subscribe Free
          </button>
        </form>
        <p className="text-xs text-gray-600 mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* Top Credit Cards Widget (Affiliate) */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top Credit Cards 2025</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-primary-500 pl-4 hover:bg-primary-50 p-3 rounded-r-lg transition-colors">
            <h4 className="font-semibold text-gray-900 mb-1">Chase Sapphire Preferred</h4>
            <p className="text-sm text-gray-600 mb-2">60,000 bonus points after $4K spend</p>
            <a
              href="https://www.referyourchasecard.com/6j/CHASE_SAPPHIRE_PREFERRED"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group"
              onClick={() => {
                // Track affiliate click
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'click', {
                    event_category: 'affiliate',
                    event_label: 'Chase Sapphire Preferred',
                  })
                }
              }}
            >
              Apply Now 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          <div className="border-l-4 border-primary-500 pl-4 hover:bg-primary-50 p-3 rounded-r-lg transition-colors">
            <h4 className="font-semibold text-gray-900 mb-1">American Express Gold</h4>
            <p className="text-sm text-gray-600 mb-2">90,000 Membership Rewards points</p>
            <a
              href="https://www.americanexpress.com/us/credit-cards/card/gold-card/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group"
              onClick={() => {
                // Track affiliate click
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'click', {
                    event_category: 'affiliate',
                    event_label: 'American Express Gold',
                  })
                }
              }}
            >
              Apply Now 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 italic">
          *We may earn a commission from these links
        </p>
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="card p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {recentPosts.slice(0, 5).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500">{format(new Date(post.date), 'MMM d, yyyy')}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Digital Product Promotion */}
      <div className="card p-6 bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Finance Planner PDF</h3>
        <p className="text-gray-600 text-sm mb-4">
          Complete budgeting and investment tracking templates. Download instantly.
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary-600">$19</span>
            <span className="text-sm text-gray-500 line-through ml-2">$39</span>
          </div>
          <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full font-semibold">50% OFF</span>
        </div>
        <FinancePlannerDownload />
        <p className="text-xs text-gray-500 mt-3 text-center">
          ✓ Instant download • ✓ 30-day money-back guarantee
        </p>
      </div>

      {/* Another Ad Slot */}
      <AdSlot format="rectangle" />
    </aside>
  )
}

