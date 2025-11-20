import { GetServerSideProps } from 'next'
import { getAllPosts } from '@/lib/posts'

function generateSiteMap(posts: Array<{ slug: string; date: string }>) {
  const baseUrl = 'https://financehub.com'
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseUrl}</loc>
       <lastmod>2025-01-15</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${baseUrl}/blog</loc>
       <lastmod>2025-01-15</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${baseUrl}/categories</loc>
       <lastmod>2025-01-15</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${baseUrl}/about</loc>
       <lastmod>2025-01-15</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${baseUrl}/contact</loc>
       <lastmod>2025-01-15</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     ${posts
       .map((post) => {
         return `
       <url>
           <loc>${baseUrl}/blog/${post.slug}</loc>
           <lastmod>${post.date}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    date: post.date,
  }))

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap

