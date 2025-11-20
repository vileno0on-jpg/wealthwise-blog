'use client'

import { useEffect, useRef } from 'react'

interface TranslationWidgetProps {
  language: string
}

export default function TranslationWidget({ language }: TranslationWidgetProps) {
  const initializedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (initializedRef.current) return
    initializedRef.current = true

    // Language code mapping for Google Translate
    const languageMap: { [key: string]: string } = {
      es: 'es', // Spanish
      fr: 'fr', // French
      de: 'de', // German
      it: 'it', // Italian
      pt: 'pt', // Portuguese
      nl: 'nl', // Dutch
      pl: 'pl', // Polish
      ru: 'ru', // Russian
      zh: 'zh-CN', // Chinese
      ja: 'ja', // Japanese
      ko: 'ko', // Korean
      ar: 'ar', // Arabic
      hi: 'hi', // Hindi
    }

    const targetLang = languageMap[language] || language

    const initTranslation = () => {
      // Remove any existing Google Translate elements
      const existingScript = document.querySelector('script[src*="translate.google.com"]')
      if (existingScript) {
        existingScript.remove()
      }
      
      const existingDiv = document.getElementById('google_translate_element')
      if (existingDiv) {
        existingDiv.remove()
      }

      // Remove any existing Google Translate iframes
      const existingFrames = document.querySelectorAll('iframe[src*="translate.google"]')
      existingFrames.forEach(frame => frame.remove())

      // Create container for Google Translate widget
      // Make it visible but small so users can interact if auto-translate fails
      const translateDiv = document.createElement('div')
      translateDiv.id = 'google_translate_element'
      translateDiv.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;max-width:200px;'
      document.body.appendChild(translateDiv)

      // Set up the callback
      ;(window as any).googleTranslateElementInit = () => {
        try {
          if (!(window as any).google || !(window as any).google.translate) {
            console.error('Google Translate not loaded')
            return
          }

          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'es,fr,de,it,pt,nl,pl,ru,zh-CN,ja,ko,ar,hi',
              layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          )

          // Wait for the widget to fully initialize, then trigger translation
          const triggerTranslation = () => {
            const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
            
            if (select) {
              console.log('Found Google Translate select element')
              
              // Get all available options
              const options = Array.from(select.options)
              console.log('Available language options:', options.map(opt => ({ value: opt.value, text: opt.text })))
              
              // Find the target language option
              // Google Translate uses format like "en|es" or just the language code
              let targetOption = options.find(opt => {
                const val = opt.value.toLowerCase()
                const target = targetLang.toLowerCase()
                // Check various formats
                if (val === target) return true
                if (val === `en|${target}`) return true
                if (val === `${target}|en`) return true
                if (val.includes(`|${target}|`)) return true
                if (val.startsWith(`${target}|`)) return true
                if (val.endsWith(`|${target}`)) return true
                const parts = val.split('|')
                if (parts.includes(target)) return true
                return false
              })

              // If not found, try without the country code (e.g., zh-CN -> zh)
              if (!targetOption && targetLang.includes('-')) {
                const baseLang = targetLang.split('-')[0]
                targetOption = options.find(opt => {
                  const val = opt.value.toLowerCase()
                  return val === baseLang || 
                         val === `en|${baseLang}` || 
                         val.includes(`|${baseLang}|`) ||
                         val.split('|').includes(baseLang)
                })
              }

              if (targetOption) {
                console.log('Found target language option:', targetOption.value, targetOption.text)
                
                // Use multiple methods to trigger translation
                const triggerChange = () => {
                  // Method 1: Direct value assignment and event
                  select.value = targetOption!.value
                  
                  // Method 2: Create and dispatch change event
                  const changeEvent = new Event('change', { bubbles: true, cancelable: true })
                  select.dispatchEvent(changeEvent)
                  
                  // Method 3: Try input event
                  const inputEvent = new Event('input', { bubbles: true, cancelable: true })
                  select.dispatchEvent(inputEvent)
                  
                  // Method 4: Direct onchange call if exists
                  if (select.onchange) {
                    try {
                      select.onchange(changeEvent as any)
                    } catch (e) {
                      console.log('onchange handler error:', e)
                    }
                  }
                  
                  // Method 5: Use Object.defineProperty to trigger
                  try {
                    Object.defineProperty(select, 'value', {
                      value: targetOption!.value,
                      writable: true,
                      configurable: true
                    })
                    select.dispatchEvent(new Event('change', { bubbles: true }))
                  } catch (e) {
                    console.log('defineProperty error:', e)
                  }
                  
                  // Method 6: Simulate user interaction
                  select.focus()
                  select.click()
                  
                  // Method 7: Try setting selectedIndex
                  const targetIndex = Array.from(select.options).findIndex(opt => opt.value === targetOption!.value)
                  if (targetIndex >= 0) {
                    select.selectedIndex = targetIndex
                    select.dispatchEvent(new Event('change', { bubbles: true }))
                  }
                }
                
                // Trigger immediately
                triggerChange()
                
                // Also trigger after a short delay to ensure widget is ready
                setTimeout(() => {
                  triggerChange()
                  
                  // Check if translation happened after delay
                  setTimeout(() => {
                    const body = document.body
                    const isTranslated = body.classList.contains('translated-ltr') || 
                                        body.classList.contains('translated-rtl') ||
                                        body.getAttribute('dir') === 'rtl' ||
                                        document.querySelector('.goog-te-banner-frame') !== null ||
                                        document.querySelector('.skiptranslate') !== null
                    
                    if (isTranslated) {
                      console.log('✅ Translation successful!')
                      showTranslationStatus('success', targetLang)
                    } else {
                      console.log('⚠️ Translation may not have triggered, trying one more time')
                      setTimeout(() => triggerChange(), 500)
                    }
                  }, 1000)
                }, 500)

                return true
              } else {
                console.warn('Target language option not found. Available options:', options.map(o => o.value))
                return false
              }
            }
            return false
          }

          // Try multiple times with increasing delays
          let attempts = 0
          const maxAttempts = 30
          const interval = setInterval(() => {
            attempts++
            if (triggerTranslation()) {
              clearInterval(interval)
              return
            }
            if (attempts >= maxAttempts) {
              clearInterval(interval)
              console.error('Failed to trigger translation after', maxAttempts, 'attempts')
              showTranslationStatus('manual', targetLang)
            }
          }, 300)
        } catch (error) {
          console.error('Error initializing Google Translate:', error)
          showTranslationStatus('manual', targetLang)
        }
      }

      // Load Google Translate script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      script.onerror = () => {
        console.error('Failed to load Google Translate script')
        showTranslationStatus('manual', targetLang)
      }
      document.body.appendChild(script)
    }

    const showTranslationStatus = (status: 'success' | 'manual', lang: string) => {
      // Remove any existing status
      const existing = document.getElementById('translation-status')
      if (existing) existing.remove()

      if (status === 'success') {
        // Show brief success message
        const statusDiv = document.createElement('div')
        statusDiv.id = 'translation-status'
        statusDiv.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 10000;
          font-size: 14px;
          font-weight: 500;
        `
        statusDiv.textContent = `✓ Page translated to ${getLanguageName(lang)}`
        document.body.appendChild(statusDiv)
        setTimeout(() => statusDiv.remove(), 3000)
      } else if (status === 'manual') {
        // Show manual translation option with visible widget
        const statusDiv = document.createElement('div')
        statusDiv.id = 'translation-status'
        statusDiv.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #f59e0b;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 10000;
          font-size: 14px;
          max-width: 300px;
        `
        statusDiv.innerHTML = `
          <div style="margin-bottom: 8px;">⚠️ Auto-translation unavailable</div>
          <div style="font-size: 12px; opacity: 0.9;">
            Please use the Google Translate widget at the top of the page to translate manually.
          </div>
        `
        document.body.appendChild(statusDiv)
        
        // Make the translate widget visible
        const translateDiv = document.getElementById('google_translate_element')
        if (translateDiv) {
          translateDiv.style.cssText = 'position:fixed;top:10px;right:10px;z-index:9999;'
        }
        
        setTimeout(() => statusDiv.remove(), 10000)
      }
    }

    const getLanguageName = (code: string): string => {
      const names: { [key: string]: string } = {
        es: 'Spanish', fr: 'French', de: 'German', it: 'Italian',
        pt: 'Portuguese', nl: 'Dutch', pl: 'Polish', ru: 'Russian',
        'zh-CN': 'Chinese', zh: 'Chinese', ja: 'Japanese', ko: 'Korean',
        ar: 'Arabic', hi: 'Hindi'
      }
      return names[code] || code.toUpperCase()
    }

    // Initialize after a short delay
    const timer = setTimeout(initTranslation, 500)

    return () => {
      clearTimeout(timer)
      initializedRef.current = false
    }
  }, [language])

  return null
}
