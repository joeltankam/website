import { type BlogPost } from './blog'
import { siteConfig } from '../../site.config.ts'

export interface OGImageOptions {
  title: string
  description?: string
  author?: string
  date?: string
  tags?: string[]
}

/**
 * Generate Open Graph image using canvas
 * Creates a dynamic OG image with title, description, author, date, and tags
 */
export function generateOGImage(options: OGImageOptions): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    // Fallback to default image if canvas not supported
    return `${window.location.origin}/og-default.svg`
  }
  
  // OG Image standard size: 1200x630
  const width = 1200
  const height = 630
  canvas.width = width
  canvas.height = height
  
  // Gradient background (primary to secondary)
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#3b82f6') // primary-600
  gradient.addColorStop(1, '#6366f1') // secondary-600
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  // Add noise/texture overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const size = Math.random() * 2
    ctx.fillRect(x, y, size, size)
  }
  
  // Content area with padding
  const padding = 80
  const contentWidth = width - (padding * 2)
  
  // Title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 72px system-ui, -apple-system, sans-serif'
  ctx.textBaseline = 'top'
  
  // Word wrap for title
  const words = options.title.split(' ')
  const lines: string[] = []
  let currentLine = words[0]
  
  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i]
    const metrics = ctx.measureText(testLine)
    
    if (metrics.width > contentWidth && i > 0) {
      lines.push(currentLine)
      currentLine = words[i]
    } else {
      currentLine = testLine
    }
  }
  lines.push(currentLine)
  
  // Draw title lines (max 3 lines)
  let yOffset = 100
  const maxTitleLines = 3
  const titleLines = lines.slice(0, maxTitleLines)
  
  titleLines.forEach((line, index) => {
    ctx.fillText(line, padding, yOffset + (index * 85))
  })
  
  yOffset += titleLines.length * 85 + 40
  
  // Description
  if (options.description) {
    ctx.font = '32px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    
    // Word wrap for description
    const descWords = options.description.split(' ')
    const descLines: string[] = []
    let currentDescLine = descWords[0] || ''
    
    for (let i = 1; i < descWords.length; i++) {
      const testLine = currentDescLine + ' ' + descWords[i]
      const metrics = ctx.measureText(testLine)
      
      if (metrics.width > contentWidth) {
        descLines.push(currentDescLine)
        currentDescLine = descWords[i]
      } else {
        currentDescLine = testLine
      }
    }
    descLines.push(currentDescLine)
    
    // Draw description lines (max 2 lines)
    const maxDescLines = 2
    descLines.slice(0, maxDescLines).forEach((line, index) => {
      ctx.fillText(line, padding, yOffset + (index * 45))
    })
    
    yOffset += Math.min(descLines.length, maxDescLines) * 45 + 30
  }
  
  // Tags
  if (options.tags && options.tags.length > 0) {
    yOffset += 20
    ctx.font = '24px system-ui, -apple-system, sans-serif'
    
    let xOffset = padding
    const tagPadding = 20
    const tagHeight = 40
    
    options.tags.slice(0, 5).forEach(tag => {
      const tagText = `#${tag}`
      const metrics = ctx.measureText(tagText)
      const tagWidth = metrics.width + (tagPadding * 2)
      
      // Tag background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.beginPath()
      ctx.roundRect(xOffset, yOffset, tagWidth, tagHeight, 20)
      ctx.fill()
      
      // Tag text
      ctx.fillStyle = '#ffffff'
      ctx.fillText(tagText, xOffset + tagPadding, yOffset + 10)
      
      xOffset += tagWidth + 15
    })
    
    yOffset += tagHeight + 30
  }
  
  // Footer with author and date
  const footerY = height - 80
  
  // Author
  if (options.author) {
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(options.author, padding, footerY)
  }
  
  // Date
  if (options.date) {
    ctx.font = '24px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    const dateText = new Date(options.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const dateMetrics = ctx.measureText(dateText)
    ctx.fillText(dateText, width - padding - dateMetrics.width, footerY)
  }
  
  // Convert canvas to data URL
  return canvas.toDataURL('image/png', 0.95)
}

/**
 * Generate OG image for a blog post
 */
export function generateBlogPostOGImage(post: BlogPost): string {
  return generateOGImage({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    author: siteConfig.author,
    date: post.frontmatter.date,
    tags: post.frontmatter.tags
  })
}

/**
 * Get the appropriate OG image for a page
 */
export function getOGImage(type: 'home' | 'blog' | 'about' | 'post', post?: BlogPost): string {
  const baseUrl = window.location.origin
  
  switch (type) {
    case 'home':
      return `${baseUrl}/og-default.svg`
    case 'blog':
      return `${baseUrl}/og-blog.svg`
    case 'about':
      return `${baseUrl}/og-about.svg`
    case 'post':
      // Generate dynamic OG image for blog posts
      return post ? generateBlogPostOGImage(post) : `${baseUrl}/og-default.svg`
    default:
      return `${baseUrl}/og-default.svg`
  }
}
