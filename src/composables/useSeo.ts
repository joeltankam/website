import { onMounted, onUnmounted, watch, type Ref } from 'vue'

export interface SeoMetaTags {
  title: string
  description: string
  keywords?: string[]
  author?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  section?: string
  prevUrl?: string
  nextUrl?: string
}

export function useSeo(metaTags: Ref<SeoMetaTags | null>) {
  const originalTitle = document.title
  const createdElements: HTMLElement[] = []

  const updateMetaTags = () => {
    if (!metaTags.value) return

    const {
      title,
      description,
      keywords,
      author,
      url,
      image,
      type = 'website',
      publishedTime,
      modifiedTime,
      tags,
      section,
      prevUrl,
      nextUrl
    } = metaTags.value

    // Update document title
    document.title = title

    // Remove previously created meta tags
    createdElements.forEach(el => el.remove())
    createdElements.length = 0

    // Helper to create or update meta tag
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, property)
        document.head.appendChild(element)
        createdElements.push(element)
      }
      
      element.setAttribute('content', content)
    }

    // Basic meta tags
    setMetaTag('description', description)
    
    if (keywords && keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '))
    }
    
    if (author) {
      setMetaTag('author', author)
    }

    // Open Graph tags
    setMetaTag('og:title', title, true)
    setMetaTag('og:description', description, true)
    setMetaTag('og:type', type, true)
    
    if (url) {
      setMetaTag('og:url', url, true)
      
      // Add canonical link
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
        createdElements.push(canonical)
      }
      canonical.setAttribute('href', url)
    }
    
    // Add prev/next links for pagination
    if (prevUrl) {
      let prev = document.querySelector('link[rel="prev"]') as HTMLLinkElement
      if (!prev) {
        prev = document.createElement('link')
        prev.setAttribute('rel', 'prev')
        document.head.appendChild(prev)
        createdElements.push(prev)
      }
      prev.setAttribute('href', prevUrl)
    }
    
    if (nextUrl) {
      let next = document.querySelector('link[rel="next"]') as HTMLLinkElement
      if (!next) {
        next = document.createElement('link')
        next.setAttribute('rel', 'next')
        document.head.appendChild(next)
        createdElements.push(next)
      }
      next.setAttribute('href', nextUrl)
    }
    
    if (image) {
      setMetaTag('og:image', image, true)
      setMetaTag('og:image:alt', title, true)
    }

    // Twitter Card tags
    setMetaTag('twitter:card', image ? 'summary_large_image' : 'summary')
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)
    
    if (image) {
      setMetaTag('twitter:image', image)
    }

    // Article-specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        setMetaTag('article:published_time', publishedTime, true)
      }
      
      if (modifiedTime) {
        setMetaTag('article:modified_time', modifiedTime, true)
      }
      
      if (author) {
        setMetaTag('article:author', author, true)
      }
      
      if (section) {
        setMetaTag('article:section', section, true)
      }
      
      if (tags && tags.length > 0) {
        tags.forEach(tag => {
          const tagElement = document.createElement('meta')
          tagElement.setAttribute('property', 'article:tag')
          tagElement.setAttribute('content', tag)
          document.head.appendChild(tagElement)
          createdElements.push(tagElement)
        })
      }
    }
  }

  const addStructuredData = (data: any) => {
    const scriptId = 'structured-data'
    let script = document.getElementById(scriptId) as HTMLScriptElement
    
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
      createdElements.push(script)
    }
    
    script.textContent = JSON.stringify(data)
  }

  const cleanup = () => {
    // Restore original title
    document.title = originalTitle
    
    // Remove created elements
    createdElements.forEach(el => el.remove())
    createdElements.length = 0
  }

  onMounted(() => {
    updateMetaTags()
  })

  watch(metaTags, () => {
    updateMetaTags()
  }, { deep: true })

  onUnmounted(() => {
    cleanup()
  })

  return {
    updateMetaTags,
    addStructuredData,
    cleanup
  }
}
