// IP Detection and Geolocation Service
export interface LocationData {
  country: string
  countryCode: string
  language: string
  timezone: string
}

export async function detectUserLocation(): Promise<LocationData | null> {
  try {
    // Using ipapi.co for IP geolocation (free tier available)
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    if (data.error) {
      console.error('IP detection error:', data.reason)
      return null
    }

    // Map country codes to languages
    const languageMap: { [key: string]: string } = {
      'US': 'en',
      'GB': 'en',
      'CA': 'en',
      'AU': 'en',
      'ES': 'es',
      'MX': 'es',
      'AR': 'es',
      'CO': 'es',
      'FR': 'fr',
      'BE': 'fr',
      'CH': 'fr',
      'DE': 'de',
      'AT': 'de',
      'IT': 'it',
      'PT': 'pt',
      'BR': 'pt',
      'NL': 'nl',
      'PL': 'pl',
      'RU': 'ru',
      'CN': 'zh',
      'JP': 'ja',
      'KR': 'ko',
      'AR': 'ar',
      'SA': 'ar',
      'IN': 'hi',
    }

    const detectedLanguage = languageMap[data.country_code] || 'en'

    return {
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'US',
      language: detectedLanguage,
      timezone: data.timezone || 'UTC',
    }
  } catch (error) {
    console.error('Error detecting location:', error)
    return null
  }
}

export function getBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language || (navigator as any).userLanguage
  return browserLang.split('-')[0] // Get language code (e.g., 'en' from 'en-US')
}

