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

  const handleConfirm = () => {
    if (selectedLanguage) {
      onConfirm(selectedLanguage)
    }
  }

  // Always show language picker, but highlight detected language
  useEffect(() => {
    if (!isLoading && !selectedLanguage && detectedLanguage) {
      setSelectedLanguage(detectedLanguage)
    }
  }, [isLoading, detectedLanguage, selectedLanguage])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-600 text-sm">Detecting your location...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl transform scale-100 animate-scaleIn max-h-[90vh] overflow-y-auto">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 mb-6">
            <svg className="h-10 w-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Choose Your Language
          </h2>

          {/* Detection Message */}
          {detectedLanguage && country && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">📍 Detected Location:</span> {country}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">🌐 Suggested Language:</span> {getLanguageName(detectedLanguage)} {getLanguageFlag(detectedLanguage)}
              </p>
            </div>
          )}

          {detectedLanguage && !country && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">🌐 Browser Language Detected:</span> {getLanguageName(detectedLanguage)} {getLanguageFlag(detectedLanguage)}
              </p>
            </div>
          )}

          {/* Language Selection */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">
              {detectedLanguage ? 'Confirm the detected language or choose a different one:' : 'Select a language to translate the site:'}
            </p>
            
            {/* Selected Language Display - Prominent */}
            {selectedLanguage && (
              <div className="mb-4 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border-2 border-primary-300 shadow-md">
                <p className="text-xs text-gray-600 mb-2 font-semibold uppercase tracking-wide">Selected Language</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">{getLanguageFlag(selectedLanguage)}</span>
                  <span className="text-xl font-bold text-gray-900">{getLanguageName(selectedLanguage)}</span>
                </div>
              </div>
            )}

            {/* Language Picker - Always Visible */}
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3 max-h-64 overflow-y-auto p-3 border-2 border-gray-200 rounded-xl bg-gray-50">
              {languages.map((lang) => {
                const isDetected = detectedLanguage === lang.code
                const isSelected = selectedLanguage === lang.code
                return (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                      isSelected
                        ? 'border-primary-500 bg-primary-100 shadow-lg scale-105'
                        : isDetected
                        ? 'border-blue-300 bg-blue-50 hover:border-primary-400'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                    }`}
                    title={isDetected ? 'Detected language' : ''}
                  >
                    <div className="text-3xl mb-2">{lang.flag}</div>
                    <div className={`text-xs font-medium ${isSelected ? 'text-primary-900 font-bold' : 'text-gray-700'}`}>
                      {lang.name}
                    </div>
                    {isDetected && !isSelected && (
                      <div className="mt-1 text-[10px] text-blue-600 font-semibold">Detected</div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onDismiss}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              No, Thanks
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedLanguage}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Translate Site
            </button>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-500 mt-6">
            The site will be automatically translated to your selected language
          </p>
        </div>
      </div>
    </div>
  )
}

