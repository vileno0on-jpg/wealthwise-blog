'use client'

import { useState } from 'react'

export default function FinancePlannerDownload() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      // Dynamically import jsPDF
      const { default: jsPDF } = await import('jspdf')
      const doc = new jsPDF()

      // Set up colors
      const primaryColor = [37, 99, 235] // primary-600
      const textColor = [31, 41, 55] // gray-900

      // Title
      doc.setFontSize(24)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.setFont('helvetica', 'bold')
      doc.text('WealthWise Finance Planner', 105, 30, { align: 'center' })

      // Subtitle
      doc.setFontSize(12)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.setFont('helvetica', 'normal')
      doc.text('Complete Budgeting & Investment Tracking System', 105, 40, { align: 'center' })

      let yPos = 55

      // Monthly Budget Worksheet
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('MONTHLY BUDGET WORKSHEET', 20, yPos)
      yPos += 10

      // Income Section
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text('Income Sources', 20, yPos)
      yPos += 8

      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text('Salary/Wages: $____________', 25, yPos)
      yPos += 7
      doc.text('Other Income: $____________', 25, yPos)
      yPos += 7
      doc.text('Total Income: $____________', 25, yPos)
      yPos += 12

      // Expenses Section
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('Expenses', 20, yPos)
      yPos += 8

      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      const expenses = [
        'Housing (Rent/Mortgage): $____________',
        'Utilities: $____________',
        'Groceries: $____________',
        'Transportation: $____________',
        'Insurance: $____________',
        'Entertainment: $____________',
        'Savings: $____________',
        'Other: $____________',
      ]
      expenses.forEach((expense) => {
        doc.text(expense, 25, yPos)
        yPos += 7
      })
      doc.text('Total Expenses: $____________', 25, yPos)
      yPos += 10
      doc.setFont('helvetica', 'bold')
      doc.text('Net Income: $____________', 25, yPos)
      yPos += 20

      // Investment Tracker
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('INVESTMENT TRACKER', 20, yPos)
      yPos += 10

      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text('Investment Account: ____________', 25, yPos)
      yPos += 7
      doc.text('Current Value: $____________', 25, yPos)
      yPos += 7
      doc.text('Monthly Contribution: $____________', 25, yPos)
      yPos += 7
      doc.text('Target Goal: $____________', 25, yPos)
      yPos += 12

      // Debt Payoff Tracker
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('DEBT PAYOFF TRACKER', 20, yPos)
      yPos += 10

      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text('Debt Name: ____________', 25, yPos)
      yPos += 7
      doc.text('Current Balance: $____________', 25, yPos)
      yPos += 7
      doc.text('Interest Rate: ____________%', 25, yPos)
      yPos += 7
      doc.text('Monthly Payment: $____________', 25, yPos)
      yPos += 7
      doc.text('Target Payoff Date: ____________', 25, yPos)

      // Footer
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text('© 2025 WealthWise. All rights reserved.', 105, 285, { align: 'center' })

      // Save the PDF
      doc.save('WealthWise-Finance-Planner.pdf')

      // Track download
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'download', {
          event_category: 'product',
          event_label: 'Finance Planner PDF',
          value: 19,
        })
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="w-full btn-primary text-center"
    >
      {isGenerating ? 'Generating...' : 'Download Now'}
    </button>
  )
}
