'use client'

import { useState } from 'react'

interface ComparisonItem {
  name: string
  apy: number
  minDeposit: string
  monthlyFee: string
  mobileApp: boolean
  fdicInsured: boolean
  rating: number
  pros: string[]
  cons: string[]
}

interface ComparisonTableProps {
  items: ComparisonItem[]
  title?: string
}

export default function ComparisonTable({ items, title = 'Comparison Table' }: ComparisonTableProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <div className="my-12">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h3>
      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-bold">Bank/Provider</th>
              <th className="px-6 py-4 text-center font-bold">APY</th>
              <th className="px-6 py-4 text-center font-bold">Min. Deposit</th>
              <th className="px-6 py-4 text-center font-bold">Monthly Fee</th>
              <th className="px-6 py-4 text-center font-bold">Mobile App</th>
              <th className="px-6 py-4 text-center font-bold">FDIC Insured</th>
              <th className="px-6 py-4 text-center font-bold">Rating</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 hover:bg-primary-50 transition-colors cursor-pointer ${
                  selectedItem === index ? 'bg-primary-100' : ''
                }`}
                onClick={() => setSelectedItem(selectedItem === index ? null : index)}
              >
                <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-2xl font-bold text-primary-600">{item.apy}%</span>
                </td>
                <td className="px-6 py-4 text-center text-gray-700">{item.minDeposit}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.monthlyFee}</td>
                <td className="px-6 py-4 text-center">
                  {item.mobileApp ? (
                    <span className="text-green-600 font-bold">✓</span>
                  ) : (
                    <span className="text-red-600 font-bold">✗</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {item.fdicInsured ? (
                    <span className="text-green-600 font-bold">✓</span>
                  ) : (
                    <span className="text-red-600 font-bold">✗</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItem !== null && (
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border-2 border-primary-200 animate-fade-in">
          <h4 className="text-2xl font-bold text-gray-900 mb-6">{items[selectedItem].name} - Detailed Review</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="text-lg font-semibold text-green-600 mb-3">Pros</h5>
              <ul className="space-y-2">
                {items[selectedItem].pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-red-600 mb-3">Cons</h5>
              <ul className="space-y-2">
                {items[selectedItem].cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

