// Enhanced markdown to HTML converter for blog posts
// In production, you'd use a library like 'remark' or 'markdown-it'

export function markdownToHtml(markdown: string): string {
  let html = markdown

  // Remove the first H1 (title) as it's already in the page header
  html = html.replace(/^# .*$/m, '')

  // Convert headers (process from H3 to H2 to avoid conflicts)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')

  // Convert bold and italic (bold first, then italic)
  html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-gray-900">$1</strong>')
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

  // Convert inline code
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>')

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-primary-600 hover:underline">$1</a>')

  // Convert tables (basic support)
  const lines = html.split('\n')
  let inTable = false
  let isFirstRow = true
  const processedLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const nextLine = i < lines.length - 1 ? lines[i + 1] : ''
    
    if (line.trim().startsWith('|') && line.includes('---')) {
      // Table header separator, mark next row as header
      isFirstRow = true
      continue
    }
    if (line.trim().startsWith('|')) {
      if (!inTable) {
        inTable = true
        processedLines.push('<table class="w-full border-collapse mb-6">')
      }
      const cells = line.split('|').filter(cell => cell.trim() && !cell.trim().match(/^:?-+:?$/))
      const tag = isFirstRow ? 'th' : 'td'
      const row = `<tr>${cells.map(cell => `<${tag} class="border border-gray-300 px-4 py-2">${cell.trim()}</${tag}>`).join('')}</tr>`
      processedLines.push(row)
      isFirstRow = false
    } else {
      if (inTable) {
        processedLines.push('</table>')
        inTable = false
        isFirstRow = true
      }
      processedLines.push(line)
    }
  }
  if (inTable) {
    processedLines.push('</table>')
  }
  html = processedLines.join('\n')

  // Convert unordered lists
  const listLines: string[] = []
  let inList = false
  const finalLines: string[] = []

  for (const line of html.split('\n')) {
    if (/^[\*\-\+] .+/.test(line.trim())) {
      if (!inList) {
        inList = true
        finalLines.push('<ul class="list-disc pl-6 mb-4">')
      }
      const content = line.replace(/^[\*\-\+] /, '')
      finalLines.push(`<li class="mb-2">${content}</li>`)
    } else if (/^\d+\. .+/.test(line.trim())) {
      if (!inList) {
        inList = true
        finalLines.push('<ol class="list-decimal pl-6 mb-4">')
      }
      const content = line.replace(/^\d+\. /, '')
      finalLines.push(`<li class="mb-2">${content}</li>`)
    } else {
      if (inList) {
        finalLines.push(inList && listLines.length > 0 && /^\d+\./.test(listLines[listLines.length - 1]) ? '</ol>' : '</ul>')
        inList = false
      }
      finalLines.push(line)
    }
  }
  if (inList) {
    finalLines.push('</ul>')
  }
  html = finalLines.join('\n')

  // Convert paragraphs
  html = html.split('\n\n').map(block => {
    block = block.trim()
    if (!block) return ''
    if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol') || 
        block.startsWith('<table') || block.startsWith('<li') || block.startsWith('</')) {
      return block
    }
    return `<p class="mb-4 leading-relaxed">${block}</p>`
  }).join('\n\n')

  // Clean up
  html = html.replace(/\n{3,}/g, '\n\n')
  html = html.replace(/<p><\/p>/g, '')

  return html
}

