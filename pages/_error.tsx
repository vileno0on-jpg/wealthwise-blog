import { NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'

interface ErrorProps {
  statusCode?: number
  hasGetInitialPropsRun?: boolean
  err?: Error
}

function Error({ statusCode }: ErrorProps) {
  return (
    <>
      <Head>
        <title>{statusCode || 'Error'} - WealthWise</title>
        <meta name="description" content="An error occurred while loading this page." />
      </Head>

      <div className="bg-white py-16 min-h-screen flex items-center">
        <div className="container-custom text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            {statusCode || 'Error'}
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            {statusCode === 404
              ? "The page you're looking for doesn't exist or has been moved."
              : "An unexpected error occurred. Please try again later."
            }
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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err as any).statusCode : 404
  return { statusCode }
}

export default Error
