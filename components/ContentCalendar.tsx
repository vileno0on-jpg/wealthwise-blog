import Link from 'next/link'
import { getUpcomingContent, getMonetizationOpportunities, publishingSchedule, contentChecklist } from '@/lib/contentCalendar'

export default function ContentCalendar() {
  const upcomingContent = getUpcomingContent(8)
  const highValueContent = getMonetizationOpportunities()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMonetizationColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Content Calendar</h2>
        <span className="text-sm text-gray-500">Regular publishing schedule</span>
      </div>

      {/* Publishing Schedule */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Publishing Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(publishingSchedule).map(([day, topics]) => (
            <div key={day} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 capitalize mb-2">{day}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {topics.map((topic, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* High-Value Content Opportunities */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">💰</span>
          High-Value Content Opportunities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highValueContent.slice(0, 4).map((content) => (
            <div key={content.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 line-clamp-2">{content.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMonetizationColor(content.monetizationPotential)}`}>
                  {content.monetizationPotential}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{content.description}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{content.category}</span>
                <span>•</span>
                <span>{content.estimatedWordCount} words</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full ${getStatusColor(content.status)}`}>
                  {content.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Content Pipeline */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📝</span>
          Upcoming Content Pipeline
        </h3>
        <div className="space-y-3">
          {upcomingContent.map((content) => (
            <div key={content.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{content.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-1">{content.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(content.priority)}`}>
                    {content.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                    {content.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    {content.category}
                  </span>
                  <span>{content.estimatedWordCount} words</span>
                  <span className="flex items-center">
                    <span className="mr-1">💰</span>
                    {content.monetizationPotential}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {content.targetKeywords.slice(0, 2).map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Quality Checklist */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">✅</span>
          Content Quality Checklist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              SEO Optimization
            </h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {contentChecklist.seo.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Quality Assurance
            </h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {contentChecklist.quality.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Monetization
            </h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {contentChecklist.monetization.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            View Published Content
          </Link>
          <button
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => window.print()}
          >
            Print Calendar
          </button>
          <Link
            href="/categories"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
  )
}
