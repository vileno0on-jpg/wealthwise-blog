import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | WealthWise</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <div className="bg-white py-16 min-h-screen flex items-center">
        <div className="container-custom text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Go Home
            </Link>
            <Link href="/blog" className="btn-secondary">
              Browse Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

