// Client-side translation service using Google Translate API (free tier)
// This works on localhost and doesn't require public URLs

export interface TranslationService {
  translate: (text: string, targetLang: string) => Promise<string>
  translatePage: (targetLang: string) => Promise<void>
}

// Simple translation using browser's built-in capabilities
export async function translateText(text: string, targetLang: string): Promise<string> {
  // For now, return original text
  // In production, you could use a translation API
  return text
}

// Translate page content
export async function translatePageContent(targetLang: string) {
  if (typeof window === 'undefined') return

  // Get all text nodes
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  )

  const textNodes: Text[] = []
  let node: Node | null
  while (node = walker.nextNode()) {
    const textNode = node as Text
    // Skip script and style tags
    const parent = textNode.parentElement
    if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
      continue
    }
    // Skip if empty or only whitespace
    if (textNode.textContent && textNode.textContent.trim().length > 0) {
      textNodes.push(textNode)
    }
  }

  // Use Google Translate iframe method for localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // For localhost, use a different approach
    return translateLocalhost(targetLang)
  }

  // For production, use Google Translate widget
  return translateProduction(targetLang)
}

function translateLocalhost(targetLang: string) {
  // Create an iframe that loads Google Translate
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = 'none'
  
  // Use Google Translate's translate service directly
  const currentUrl = window.location.href
  const translateUrl = `https://translate.google.com/translate?sl=en&tl=${targetLang}&u=${encodeURIComponent(currentUrl)}`
  
  // Show a message and offer to open in new tab
  const shouldOpen = confirm(
    `To translate this page, we'll open Google Translate in a new tab.\n\n` +
    `Click OK to open the translated version.`
  )
  
  if (shouldOpen) {
    window.open(translateUrl, '_blank')
  }
}

function translateProduction(targetLang: string) {
  // Use Google Translate widget for production
  // This is handled by TranslationWidget component
}

