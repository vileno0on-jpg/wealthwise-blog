'use client'

import { useState, useEffect } from 'react'

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState(10000)
  const [apy, setApy] = useState(5.0)
  const [years, setYears] = useState(10)
  const [result, setResult] = useState({ final: 0, interest: 0, monthly: 0 })

  useEffect(() => {
    const calculate = () => {
      const rate = apy / 100
      const final = principal * Math.pow(1 + rate / 12, years * 12)
      const interest = final - principal
      const monthly = final / (years * 12)
      setResult({ final, interest, monthly })
    }
    calculate()
  }, [principal, apy, years])

  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 my-12 border-2 border-primary-100 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">High-Yield Savings Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Initial Deposit ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all selection:bg-primary-100 selection:text-gray-900"
            min="0"
            step="100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            APY (%)
          </label>
          <input
            type="number"
            value={apy}
            onChange={(e) => setApy(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all selection:bg-primary-100 selection:text-gray-900"
            min="0"
            max="10"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Years
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all selection:bg-primary-100 selection:text-gray-900"
            min="1"
            max="50"
          />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Final Balance</p>
            <p className="text-3xl font-bold text-primary-600">
              ${result.final.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Interest Earned</p>
            <p className="text-3xl font-bold text-green-600">
              ${result.interest.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Monthly Equivalent</p>
            <p className="text-3xl font-bold text-blue-600">
              ${result.monthly.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

