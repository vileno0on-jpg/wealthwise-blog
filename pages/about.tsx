import Head from 'next/head'
import { generateSEOMeta } from '@/lib/seo'

export default function About() {
  const seo = generateSEOMeta({
    title: 'About Us | WealthWise',
    description: 'Learn about WealthWise, your trusted source for personal finance tips, investment strategies, and money management advice.',
    url: 'https://wealthwise.com/about',
  })

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.alternates.canonical} />
      </Head>

      <div className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">About WealthWise</h1>
          
          <div className="prose-custom">
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Welcome to WealthWise, your trusted source for personal finance education and money management advice.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to empower individuals to take control of their financial future through 
              accessible, actionable, and evidence-based financial advice. We believe that everyone deserves 
              the knowledge and tools to build wealth, regardless of their current financial situation.
            </p>

            <h2>What We Do</h2>
            <p>
              WealthWise provides comprehensive guides, tips, and strategies covering:
            </p>
            <ul>
              <li><strong>Budgeting:</strong> Learn how to create and stick to a budget that works for your lifestyle</li>
              <li><strong>Investing:</strong> Understand investment strategies for beginners and advanced investors</li>
              <li><strong>Debt Management:</strong> Proven methods to pay off debt faster and smarter</li>
              <li><strong>Savings Strategies:</strong> Maximize your savings with high-yield accounts and smart tactics</li>
              <li><strong>Credit Management:</strong> Build and maintain excellent credit scores</li>
            </ul>

            <h2>Our Values</h2>
            <p>
              <strong>Transparency:</strong> We provide honest, unbiased information and clearly disclose any 
              affiliate relationships or partnerships.
            </p>
            <p>
              <strong>Accessibility:</strong> We break down complex financial concepts into easy-to-understand 
              language that anyone can apply.
            </p>
            <p>
              <strong>Accuracy:</strong> Our content is thoroughly researched and regularly updated to reflect 
              current financial trends and regulations.
            </p>

            <h2>Editorial Standards</h2>
            <p>
              All content on WealthWise is written by financial experts and reviewed for accuracy. We follow 
              strict editorial guidelines to ensure our readers receive reliable, up-to-date information. 
              When we recommend products or services, we only suggest those we believe provide genuine value.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have questions or suggestions? We'd love to hear from you. Visit our{' '}
              <a href="/contact">contact page</a> to get in touch.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

