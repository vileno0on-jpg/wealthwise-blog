import Head from 'next/head'
import Link from 'next/link'
import { generateSEOMeta } from '@/lib/seo'

export default function PrivacyPolicy() {
  const seo = generateSEOMeta({
    title: 'Privacy Policy | WealthWise',
    description: 'WealthWise Privacy Policy - Learn how we collect, use, and protect your personal information.',
    url: 'https://wealthwise-blog.netlify.app/privacy',
  })

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.openGraph.title} />
        <meta property="og:description" content={seo.openGraph.description} />
        <meta property="og:url" content={seo.openGraph.url} />
        <link rel="canonical" href={seo.alternates.canonical} />
      </Head>

      <div className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose-custom">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to WealthWise ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide</h3>
              <p className="mb-4">
                We may collect information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name and email address when you subscribe to our newsletter</li>
                <li>Contact information when you reach out to us</li>
                <li>Comments and feedback you submit</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
              <p className="mb-4">
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide, maintain, and improve our website</li>
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Respond to your inquiries and comments</li>
                <li>Analyze website usage and trends</li>
                <li>Personalize your experience</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
              </p>
              <p className="mb-4">
                We use cookies for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Essential website functionality</li>
                <li>Analytics and performance monitoring</li>
                <li>Advertising and personalization (via Google AdSense)</li>
                <li>Remembering your preferences</li>
              </ul>
              <p className="mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Google AdSense</h2>
              <p className="mb-4">
                Our website uses Google AdSense, a service provided by Google LLC. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website or other websites.
              </p>
              <p className="mb-4">
                Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  Google's Ads Settings
                </a>.
              </p>
              <p className="mb-4">
                For more information about how Google uses data when you use our website, visit{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  Google's Privacy & Terms
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
              <p className="mb-4">
                We may use third-party services that collect, monitor, and analyze information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Google AdSense for advertising</li>
                <li>Email service providers for newsletters</li>
                <li>Translation services (Google Translate)</li>
              </ul>
              <p className="mb-4">
                These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Objection to processing of your information</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="mb-4">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none mb-4 space-y-2">
                <li>Email: <Link href="/contact" className="text-primary-600 hover:underline">Contact Form</Link></li>
                <li>Website: <Link href="/contact" className="text-primary-600 hover:underline">WealthWise Contact Page</Link></li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-primary-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

