import Head from 'next/head'
import Link from 'next/link'
import { generateSEOMeta } from '@/lib/seo'

export default function TermsOfService() {
  const seo = generateSEOMeta({
    title: 'Terms of Service | WealthWise',
    description: 'WealthWise Terms of Service - Read our terms and conditions for using our website.',
    url: 'https://wealthwise-blog.netlify.app/terms',
  })

  return (
    <>
      <Head>
        {seo}
      </Head>

      <div className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose-custom">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using WealthWise ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials on WealthWise's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
              <p className="mb-4">
                <strong className="text-gray-900">The materials on WealthWise's website are provided on an 'as is' basis.</strong> WealthWise makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="mb-4">
                <strong className="text-gray-900">Financial Information Disclaimer:</strong> The information provided on this website is for educational and informational purposes only. It is not intended as financial, investment, tax, or legal advice. You should consult with a qualified financial advisor or other professional before making any financial decisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
              <p className="mb-4">
                In no event shall WealthWise or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WealthWise's website, even if WealthWise or a WealthWise authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
              <p className="mb-4">
                The materials appearing on WealthWise's website could include technical, typographical, or photographic errors. WealthWise does not warrant that any of the materials on its website are accurate, complete, or current. WealthWise may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Affiliate Disclosure</h2>
              <p className="mb-4">
                WealthWise may contain affiliate links. This means that if you click on a link and make a purchase, we may receive a commission at no additional cost to you. We only recommend products and services that we believe will be valuable to our readers.
              </p>
              <p className="mb-4">
                Our affiliate relationships include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Credit card companies (Chase, American Express, etc.)</li>
                <li>Financial service providers</li>
                <li>Investment platforms</li>
                <li>Budgeting and financial apps</li>
              </ul>
              <p className="mb-4">
                We are committed to transparency and will always disclose when a link is an affiliate link.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Links</h2>
              <p className="mb-4">
                WealthWise has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WealthWise of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modifications</h2>
              <p className="mb-4">
                WealthWise may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. User Conduct</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Use the website in any way that violates any applicable laws or regulations</li>
                <li>Transmit any viruses, malware, or other harmful code</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Use automated systems to access the website without permission</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
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

