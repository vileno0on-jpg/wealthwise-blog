// Content Calendar for FinanceHub - Regular content updates strategy

export interface ContentIdea {
  id: string
  title: string
  category: string
  targetKeywords: string[]
  estimatedWordCount: number
  priority: 'high' | 'medium' | 'low'
  scheduledDate?: string
  status: 'planned' | 'in-progress' | 'published' | 'draft'
  description: string
  monetizationPotential: 'high' | 'medium' | 'low'
}

export const contentCalendar: ContentIdea[] = [
  // Week 1-2: Credit & Debt Content
  {
    id: 'credit-score-myths',
    title: '10 Credit Score Myths That Could Be Costing You Money',
    category: 'Credit',
    targetKeywords: ['credit score myths', 'improve credit score', 'credit score mistakes'],
    estimatedWordCount: 2000,
    priority: 'high',
    status: 'planned',
    description: 'Debunk common credit score myths and provide actionable advice for improving credit scores.',
    monetizationPotential: 'high'
  },
  {
    id: 'debt-consolidation-guide',
    title: 'Complete Guide to Debt Consolidation: Save Thousands on Interest',
    category: 'Debt',
    targetKeywords: ['debt consolidation', 'debt consolidation loans', 'consolidate debt'],
    estimatedWordCount: 2500,
    priority: 'high',
    status: 'planned',
    description: 'Comprehensive guide to debt consolidation strategies with real examples and calculators.',
    monetizationPotential: 'high'
  },

  // Week 3-4: Investment Content
  {
    id: 'roth-ira-guide',
    title: 'Roth IRA vs Traditional IRA: Which Is Right for You in 2025?',
    category: 'Investing',
    targetKeywords: ['roth ira vs traditional ira', 'best ira for retirement', 'ira comparison'],
    estimatedWordCount: 2200,
    priority: 'high',
    status: 'planned',
    description: 'Detailed comparison with tax implications, contribution limits, and retirement projections.',
    monetizationPotential: 'high'
  },
  {
    id: 'index-funds-beginners',
    title: 'Index Funds for Beginners: Low-Risk Way to Build Wealth',
    category: 'Investing',
    targetKeywords: ['index funds for beginners', 'what are index funds', 'index fund investing'],
    estimatedWordCount: 1800,
    priority: 'medium',
    status: 'planned',
    description: 'Explain index funds, compare to mutual funds, and provide investment strategies.',
    monetizationPotential: 'medium'
  },

  // Week 5-6: Budgeting & Saving
  {
    id: 'emergency-fund-guide',
    title: 'How to Build a 6-Month Emergency Fund in 12 Months',
    category: 'Savings',
    targetKeywords: ['emergency fund', 'build emergency fund', 'emergency savings'],
    estimatedWordCount: 1600,
    priority: 'high',
    status: 'planned',
    description: 'Step-by-step guide with savings strategies and psychological tips for building emergency funds.',
    monetizationPotential: 'high'
  },
  {
    id: 'side-hustle-ideas',
    title: '25 Legitimate Side Hustles to Earn Extra Money in 2025',
    category: 'Budgeting',
    targetKeywords: ['side hustles', 'extra income ideas', 'ways to make money'],
    estimatedWordCount: 2400,
    priority: 'high',
    status: 'planned',
    description: 'Comprehensive list of legitimate side hustles with startup costs, time requirements, and earning potential.',
    monetizationPotential: 'high'
  },

  // Week 7-8: Advanced Topics
  {
    id: 'tax-optimization-strategies',
    title: 'Tax Optimization Strategies for High-Income Earners',
    category: 'Taxes',
    targetKeywords: ['tax optimization', 'tax strategies', 'reduce taxes legally'],
    estimatedWordCount: 2800,
    priority: 'high',
    status: 'planned',
    description: 'Advanced tax strategies including deductions, credits, and retirement account optimization.',
    monetizationPotential: 'high'
  },
  {
    id: 'real-estate-investing-basics',
    title: 'Real Estate Investing for Beginners: REITs vs Rental Properties',
    category: 'Investing',
    targetKeywords: ['real estate investing', 'reits for beginners', 'rental property investing'],
    estimatedWordCount: 2200,
    priority: 'medium',
    status: 'planned',
    description: 'Compare different real estate investment options with pros, cons, and getting started guide.',
    monetizationPotential: 'medium'
  },

  // Week 9-10: Seasonal Content
  {
    id: 'tax-season-preparation',
    title: 'Tax Season 2025: Complete Preparation Guide for Individuals',
    category: 'Taxes',
    targetKeywords: ['tax season preparation', 'tax filing guide', 'income tax preparation'],
    estimatedWordCount: 2000,
    priority: 'high',
    status: 'planned',
    description: 'Comprehensive tax preparation guide with checklists, deadlines, and common deductions.',
    monetizationPotential: 'high'
  },
  {
    id: 'year-end-financial-review',
    title: 'Year-End Financial Review: 50 Questions to Ask Yourself',
    category: 'Budgeting',
    targetKeywords: ['year end financial review', 'financial goals review', 'financial planning'],
    estimatedWordCount: 1900,
    priority: 'medium',
    status: 'planned',
    description: 'Comprehensive checklist for reviewing financial progress and setting goals for the next year.',
    monetizationPotential: 'medium'
  }
]

export function getUpcomingContent(limit: number = 10): ContentIdea[] {
  return contentCalendar
    .filter(item => item.status !== 'published')
    .sort((a, b) => {
      // Sort by priority first, then by status
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const statusOrder = { published: 4, 'in-progress': 3, planned: 2, draft: 1 }

      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }

      return statusOrder[b.status] - statusOrder[a.status]
    })
    .slice(0, limit)
}

export function getContentByCategory(category: string): ContentIdea[] {
  return contentCalendar.filter(item =>
    item.category.toLowerCase() === category.toLowerCase()
  )
}

export function getContentByPriority(priority: 'high' | 'medium' | 'low'): ContentIdea[] {
  return contentCalendar.filter(item => item.priority === priority)
}

export function getMonetizationOpportunities(): ContentIdea[] {
  return contentCalendar
    .filter(item => item.monetizationPotential === 'high')
    .sort((a, b) => {
      const statusOrder = { published: 4, 'in-progress': 3, planned: 2, draft: 1 }
      return statusOrder[b.status] - statusOrder[a.status]
    })
}

// Weekly publishing schedule
export const publishingSchedule = {
  monday: ['Budgeting/Saving articles', 'Weekly financial tips roundup'],
  wednesday: ['Investment guides', 'Market analysis pieces'],
  friday: ['Credit/Debt content', 'Weekend reading recommendations'],
  saturday: ['Long-form comprehensive guides', 'Case studies'],
  sunday: ['Preview next week content', 'Reader Q&A']
}

// Content quality checklist
export const contentChecklist = {
  seo: [
    'Primary keyword in title',
    'Primary keyword in first paragraph',
    'Secondary keywords naturally placed',
    'Meta description optimized',
    'URL slug optimized',
    'Internal links added',
    'External links to authoritative sources'
  ],
  quality: [
    'Word count meets target',
    'Original research included',
    'Data sources cited',
    'Examples and case studies',
    'Actionable takeaways',
    'Clear introduction and conclusion',
    'Proofread for grammar/spelling'
  ],
  monetization: [
    'Affiliate links strategically placed',
    'Ad placements optimized',
    'Lead capture forms included',
    'Product recommendations relevant',
    'Social sharing buttons',
    'Email newsletter signup'
  ]
}
