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
 * Generate Open Graph image URL
 * In a production environment, you would use a service like:
 * - @vercel/og
 * - Cloudinary
 * - imgix
 * - Custom image generation API
 * 
 * For now, we'll return a default image or generate a URL for future implementation
 */
export function generateOGImage(_options: OGImageOptions): string {
  const baseUrl = window.location.origin
  
  // Option 1: Use a default static OG image
  // return `${baseUrl}/og-default.svg`
  
  // Option 2: Generate dynamic image URL (requires backend implementation)
  // Future implementation: call image generation service with _options
  // const params = new URLSearchParams({
  //   title: _options.title,
  //   ...(options.description && { description: _options.description }),
  //   ...(options.author && { author: _options.author }),
  //   ...(options.date && { date: _options.date }),
  //   ...(options.tags && { tags: _options.tags.join(',') })
  // })
  // return `${baseUrl}/api/og?${params.toString()}`
  
  // For now, return default image
  return `${baseUrl}/og-default.svg`
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
      return post ? generateBlogPostOGImage(post) : `${baseUrl}/og-default.svg`
    default:
      return `${baseUrl}/og-default.svg`
  }
}
