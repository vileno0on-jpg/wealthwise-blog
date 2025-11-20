'use client'

import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
  title?: string
}

export default function FAQAccordion({ faqs, title = 'Frequently Asked Questions' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="my-12">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <button
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-primary-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
              <span className={`text-2xl text-primary-600 transform transition-transform flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 pt-0 animate-slide-down">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

