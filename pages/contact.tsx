import Head from 'next/head'
import { generateSEOMeta } from '@/lib/seo'

export default function Contact() {
  const seo = generateSEOMeta({
    title: 'Contact Us | WealthWise',
    description: 'Get in touch with WealthWise. Have questions, suggestions, or feedback? We\'d love to hear from you.',
    url: 'https://wealthwise.com/contact',
  })

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.alternates.canonical} />
      </Head>

      <div className="bg-white py-16">
        <div className="container-custom max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Contact Us</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from you.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Other Ways to Reach Us</h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Email:</strong> contact@wealthwise.com
              </p>
              <p>
                <strong>Social Media:</strong> Follow us on{' '}
                <a href="https://twitter.com" className="text-primary-600 hover:underline">
                  Twitter
                </a>{' '}
                and{' '}
                <a href="https://linkedin.com" className="text-primary-600 hover:underline">
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

