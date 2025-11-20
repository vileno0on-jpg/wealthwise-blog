'use client'

import { useState, useEffect } from 'react'
import { detectUserLocation, getBrowserLanguage } from '@/lib/ipDetection'

interface TranslationModalProps {
  onConfirm: (language: string) => void
  onDismiss: () => void
}

const languages = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
]

export default function TranslationModal({ onConfirm, onDismiss }: TranslationModalProps) {
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        // Try IP-based detection first
        const location = await detectUserLocation()
        if (location && location.language !== 'en') {
          setDetectedLanguage(location.language)
          setSelectedLanguage(location.language)
          setCountry(location.country)
        } else {
          // Fallback to browser language
          const browserLang = getBrowserLanguage()
          if (browserLang !== 'en') {
            setDetectedLanguage(browserLang)
            setSelectedLanguage(browserLang)
            setCountry(null)
          }
        }
      } catch (error) {
        console.error('Error detecting language:', error)
        // Fallback to browser language
        const browserLang = getBrowserLanguage()
        if (browserLang !== 'en') {
          setDetectedLanguage(browserLang)
          setSelectedLanguage(browserLang)
        }
      } finally {
        setIsLoading(false)
      }
    }

    detectLanguage()
  }, [])

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code.toUpperCase()
  }

  const getLanguageFlag = (code: string) => {
    return languages.find(lang => lang.code === code)?.flag || '🌐'
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!detectedLanguage && !showLanguagePicker) {
    // Show language picker if no language detected
    setShowLanguagePicker(true)
  }

  const handleConfirm = () => {
    if (selectedLanguage) {
      onConfirm(selectedLanguage)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl transform scale-100 animate-scaleIn max-h-[90vh] overflow-y-auto">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
            <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Language Detected
          </h2>

          {/* Description */}
          {detectedLanguage && (
            <p className="text-gray-600 mb-4">
              {country ? (
                <>
                  We detected you're visiting from <strong className="text-gray-900">{country}</strong>.
                  <br />
                  <strong className="text-gray-900">{getLanguageName(detectedLanguage)}</strong> detected.
                </>
              ) : (
                <>
                  We detected your browser language: <strong className="text-gray-900">{getLanguageName(detectedLanguage)}</strong>
                </>
              )}
            </p>
          )}

          {/* Language Selection */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              {detectedLanguage ? 'Confirm or pick a different language:' : 'Select a language to translate:'}
            </p>
            
            {/* Selected Language Display */}
            {selectedLanguage && (
              <div className="mb-4 p-3 bg-primary-50 rounded-lg border-2 border-primary-200">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{getLanguageFlag(selectedLanguage)}</span>
                  <span className="font-semibold text-gray-900">{getLanguageName(selectedLanguage)}</span>
                </div>
              </div>
            )}

            {/* Language Picker */}
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedLanguage === lang.code
                      ? 'border-primary-500 bg-primary-100 shadow-md'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <div className="text-xs font-medium text-gray-700">{lang.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleConfirm}
              disabled={!selectedLanguage}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Translate Site
            </button>
            <button
              onClick={onDismiss}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              No, Thanks
            </button>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-500 mt-4">
            The site will be translated on this page
          </p>
        </div>
      </div>
    </div>
  )
}

