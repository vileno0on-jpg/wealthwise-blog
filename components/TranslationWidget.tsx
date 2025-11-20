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
      const translateDiv = document.createElement('div')
      translateDiv.id = 'google_translate_element'
      translateDiv.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;visibility:hidden;'
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

          // Wait for the widget to fully initialize
          const attemptTranslation = () => {
            // Try to find the select element
            const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
            
            if (select) {
              console.log('Found Google Translate select element')
              
              // Get all available options
              const options = Array.from(select.options)
              console.log('Available language options:', options.map(opt => ({ value: opt.value, text: opt.text })))
              
              // Try to find the target language
              // Google Translate uses format like "en|es" or just the language code
              let targetOption = options.find(opt => {
                const val = opt.value.toLowerCase()
                const target = targetLang.toLowerCase()
                return val === target || 
                       val === `en|${target}` || 
                       val === `${target}|en` ||
                       val.includes(`|${target}|`) ||
                       val.startsWith(`${target}|`) ||
                       val.endsWith(`|${target}`) ||
                       val.split('|').includes(target)
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
                
                // Set the value
                select.value = targetOption.value
                
                // Create a proper change event
                const event = new Event('change', { 
                  bubbles: true, 
                  cancelable: true 
                })
                
                // Dispatch the event
                select.dispatchEvent(event)
                
                // Also try calling the onchange handler directly
                if (select.onchange) {
                  try {
                    select.onchange(event as any)
                  } catch (e) {
                    console.log('onchange handler error:', e)
                  }
                }

                // Force a click to ensure the change is registered
                setTimeout(() => {
                  select.focus()
                  select.click()
                  
                  // Try setting value again after click
                  setTimeout(() => {
                    select.value = targetOption!.value
                    select.dispatchEvent(new Event('change', { bubbles: true }))
                    
                    // Check if translation happened
                    setTimeout(() => {
                      const body = document.body
                      const isTranslated = body.classList.contains('translated-ltr') || 
                                          body.classList.contains('translated-rtl') ||
                                          body.getAttribute('dir') === 'rtl' ||
                                          document.querySelector('.goog-te-banner-frame') !== null
                      
                      if (isTranslated) {
                        console.log('✅ Translation successful!')
                        // Show success indicator
                        showTranslationStatus('success', targetLang)
                      } else {
                        console.log('⚠️ Translation may not have triggered, trying alternative method')
                        tryAlternativeTranslation(targetLang)
                      }
                    }, 1500)
                  }, 200)
                }, 300)

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
          const maxAttempts = 25
          const interval = setInterval(() => {
            attempts++
            if (attemptTranslation()) {
              clearInterval(interval)
              return
            }
            if (attempts >= maxAttempts) {
              clearInterval(interval)
              console.error('Failed to trigger translation after', maxAttempts, 'attempts')
              tryAlternativeTranslation(targetLang)
            }
          }, 400)
        } catch (error) {
          console.error('Error initializing Google Translate:', error)
          tryAlternativeTranslation(targetLang)
        }
      }

      // Load Google Translate script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      script.onerror = () => {
        console.error('Failed to load Google Translate script')
        tryAlternativeTranslation(targetLang)
      }
      document.body.appendChild(script)
    }

    const tryAlternativeTranslation = (lang: string) => {
      // Alternative method: Directly manipulate the Google Translate iframe
      console.log('Trying alternative translation method for:', lang)
      
      const checkForFrame = setInterval(() => {
        const frames = document.querySelectorAll('iframe[src*="translate.google"]')
        frames.forEach((frame) => {
          const iframe = frame as HTMLIFrameElement
          if (iframe.contentWindow) {
            try {
              // Try to access the iframe's document
              const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
              if (iframeDoc) {
                const select = iframeDoc.querySelector('select') as HTMLSelectElement
                if (select) {
                  // Find and select the target language
                  const option = Array.from(select.options).find(opt => {
                    const val = opt.value.toLowerCase()
                    return val === lang.toLowerCase() || 
                           val.includes(`|${lang.toLowerCase()}`) ||
                           val.split('|').includes(lang.toLowerCase())
                  })
                  if (option) {
                    select.value = option.value
                    select.dispatchEvent(new Event('change', { bubbles: true }))
                    console.log('✅ Alternative translation method triggered')
                    showTranslationStatus('success', lang)
                    clearInterval(checkForFrame)
                  }
                }
              }
            } catch (e) {
              // Cross-origin restrictions - this is expected
            }
          }
        })
      }, 500)

      setTimeout(() => {
        clearInterval(checkForFrame)
        // If still not translated, show manual option
        if (!document.body.classList.contains('translated-ltr') && 
            !document.body.classList.contains('translated-rtl')) {
          console.warn('⚠️ Automatic translation failed. Manual translation may be needed.')
          showTranslationStatus('manual', lang)
        }
      }, 10000)
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
        // Show manual translation option
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
            Look for the Google Translate widget on the page to translate manually.
          </div>
        `
        document.body.appendChild(statusDiv)
        setTimeout(() => statusDiv.remove(), 8000)
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
    const timer = setTimeout(initTranslation, 300)

    return () => {
      clearTimeout(timer)
      initializedRef.current = false
    }
  }, [language])

  return null
}
