export interface Post {
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
  content?: string
}

export interface Category {
  name: string
  slug: string
  description: string
  postCount: number
}

