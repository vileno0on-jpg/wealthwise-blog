import { useEffect, useRef, useState } from 'react'

interface AdSlotProps {
  format?: 'leaderboard' | 'rectangle' | 'auto' | 'in-article'
  className?: string
  id?: string
  refreshInterval?: number // Auto-refresh interval in seconds
  maxRefreshes?: number // Maximum number of refreshes
  targeting?: Record<string, string> // Custom targeting parameters
  category?: string // Content category for targeting
  keywords?: string[] // Keywords for targeting
}

export default function AdSlot({
  format = 'auto',
  className = '',
  id,
  refreshInterval = 30, // 30 seconds default
  maxRefreshes = 3, // Max 3 refreshes
  targeting = {},
  category = '',
  keywords = []
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [refreshCount, setRefreshCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Intersection Observer for viewability tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.5 } // 50% of ad must be visible
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current)
      }
    }
  }, [])

  // Ad refresh logic
  useEffect(() => {
    if (!isVisible || refreshCount >= maxRefreshes) return

    const startRefreshTimer = () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }

      refreshTimerRef.current = setTimeout(() => {
        if (isVisible && refreshCount < maxRefreshes) {
          refreshAd()
          setRefreshCount(prev => prev + 1)
        }
      }, refreshInterval * 1000)
    }

    startRefreshTimer()

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [isVisible, refreshCount, refreshInterval, maxRefreshes])

  const refreshAd = () => {
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        // Clear existing ad
        if (adRef.current) {
          adRef.current.innerHTML = ''
        }

        // Push new ad
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      } catch (e) {
        console.error('AdSense refresh error:', e)
      }
    }
  }

  // Set up targeting when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).googletag && (window as any).googletag.pubads) {
      try {
        const googletag = (window as any).googletag

        // Set page-level targeting
        if (googletag.pubads) {
          googletag.pubads().setTargeting('category', category || 'finance')
          googletag.pubads().setTargeting('keywords', keywords.join(',') || 'personal-finance,investing,savings')

          // Set custom targeting
          Object.entries(targeting).forEach(([key, value]) => {
            googletag.pubads().setTargeting(key, value)
          })

          // Enable SRA and services
          googletag.pubads().enableSingleRequest()
          googletag.enableServices()
        }
      } catch (e) {
        // Silently fail if googletag is not ready
        console.error('AdSense targeting error:', e)
      }
    }
  }, [category, keywords, targeting])

  // Initialize AdSense
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load GPT library if not already loaded
      if (!(window as any).googletag) {
        const gpt = document.createElement('script')
        gpt.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js'
        gpt.async = true
        document.head.appendChild(gpt)
      }

      // Initialize AdSense
      if ((window as any).adsbygoogle) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (e) {
          console.error('AdSense initialization error:', e)
        }
      }
    }
  }, [])

  const getAdDimensions = () => {
    switch (format) {
      case 'leaderboard':
        return '728x90'
      case 'rectangle':
        return '336x280'
      case 'in-article':
        return 'responsive'
      default:
        return 'auto'
    }
  }

  return (
    <div
      ref={adRef}
      className={`ad-container ${format === 'leaderboard' ? 'leaderboard' : format === 'rectangle' ? 'rectangle' : ''} ${className}`}
      id={id}
      data-ad-refresh={refreshCount}
      data-ad-visible={isVisible ? 'true' : 'false'}
    >
      {/* AdSense Ad Code with Advanced Features */}
      {/* Uncomment and add your AdSense code when ready */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format={format === 'auto' ? 'auto' : format === 'leaderboard' ? 'horizontal' : format === 'rectangle' ? 'rectangle' : 'auto'}
        data-full-width-responsive="true"
        data-ad-targeting={JSON.stringify({
          category: category || 'finance',
          keywords: keywords.join(','),
          ...targeting
        })}
      />

      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      */}

      {/* Development placeholder with advanced features info */}
      <div className="bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm text-center p-4">
        <div>
          <p className="font-semibold">AdSense {format === 'auto' ? 'Responsive' : format} Ad</p>
          <p className="text-xs mt-1">{getAdDimensions()}</p>
          <p className="text-xs mt-1">Auto-refresh: {refreshInterval}s (max {maxRefreshes})</p>
          <p className="text-xs mt-1">Refreshes: {refreshCount}/{maxRefreshes}</p>
          <p className="text-xs mt-1">Visible: {isVisible ? 'Yes' : 'No'}</p>
          <p className="text-xs mt-1">Category: {category || 'finance'}</p>
          <p className="text-xs mt-1 font-bold text-red-500">⚠️ Add AdSense code above</p>
        </div>
      </div>
    </div>
  )
}

