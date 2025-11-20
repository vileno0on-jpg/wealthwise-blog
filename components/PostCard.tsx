import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

interface PostCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: number
  image?: string
  featured?: boolean
}

export default function PostCard({
  slug,
  title,
  excerpt,
  date,
  category,
  readTime,
  image = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
  featured = false,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block h-full">
      <article className={`card h-full ${featured ? 'md:col-span-2' : ''} group`}>
        <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {featured && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform group-hover:scale-110 transition-transform">
              Featured
            </div>
          )}
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span className="bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 px-4 py-1.5 rounded-full font-semibold">
              {category}
            </span>
            <time dateTime={date} className="text-gray-500">{format(new Date(date), 'MMM d, yyyy')}</time>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{readTime} min read</span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {title}
          </h2>
          <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed">{excerpt}</p>
          <span className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
            Read more 
            <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}

