'use client'

import { useState, useEffect } from 'react'
import TranslationModal from './TranslationModal'
import TranslationWidget from './TranslationWidget'

interface AutoTranslatorProps {
  children: React.ReactNode
}

export default function AutoTranslator({ children }: AutoTranslatorProps) {
  const [showModal, setShowModal] = useState(false)
  const [translationEnabled, setTranslationEnabled] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if user has already made a choice
    const translationChoice = localStorage.getItem('translationChoice')
    const savedLanguage = localStorage.getItem('targetLanguage')
    
    if (translationChoice === 'dismissed' || translationChoice === 'declined') {
      // User has already dismissed or declined, don't show again
      return
    }

    if (translationChoice === 'enabled' && savedLanguage) {
      // User previously enabled translation
      setTranslationEnabled(true)
      setTargetLanguage(savedLanguage)
      return
    }

    // Show modal for first-time visitors
    const hasSeenModal = sessionStorage.getItem('hasSeenTranslationModal')
    if (!hasSeenModal) {
      // Small delay to ensure page is loaded
      setTimeout(() => {
        setShowModal(true)
        sessionStorage.setItem('hasSeenTranslationModal', 'true')
      }, 1000)
    }
  }, [])

  const handleConfirm = (language: string) => {
    setShowModal(false)
    setTranslationEnabled(true)
    setTargetLanguage(language)
    localStorage.setItem('translationChoice', 'enabled')
    localStorage.setItem('targetLanguage', language)
  }

  const handleDismiss = () => {
    setShowModal(false)
    localStorage.setItem('translationChoice', 'dismissed')
  }

  return (
    <>
      {showModal && (
        <TranslationModal
          onConfirm={handleConfirm}
          onDismiss={handleDismiss}
        />
      )}
      {translationEnabled && targetLanguage && (
        <TranslationWidget language={targetLanguage} />
      )}
      {children}
    </>
  )
}

