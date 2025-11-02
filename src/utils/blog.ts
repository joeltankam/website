import { marked } from 'marked'
import matter from 'gray-matter'

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
})

export interface BlogPost {
  slug: string
  frontmatter: {
    title: string
    date: string
    excerpt: string
    author: string
    tags: string[]
  }
  html: string
}

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
}

export function parseMarkdown(content: string): { frontmatter: PostFrontmatter; html: string } {
  const { data, content: markdown } = matter(content)
  const html = marked(markdown) as string
  return {
    frontmatter: data as PostFrontmatter,
    html
  }
}



export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log('Starting getAllPosts...')
    
    // Use Vite's glob import with eager loading
    const postModules = import.meta.glob('../posts/*.md', { 
      query: '?raw', 
      import: 'default',
      eager: true 
    }) as Record<string, string>
    
    console.log('Found post modules:', Object.keys(postModules))
    
    const posts: BlogPost[] = []
    
    for (const path in postModules) {
      try {
        console.log(`Processing post: ${path}`)
        const content = postModules[path]
        const { frontmatter, html } = parseMarkdown(content)
        const slug = path.replace('../posts/', '').replace('.md', '')
        
        console.log(`Parsed post: ${slug}`, frontmatter)
        
        posts.push({
          slug,
          frontmatter,
          html
        })
      } catch (error) {
        console.error(`Error loading post from ${path}:`, error)
      }
    }
    
    console.log(`Total posts loaded: ${posts.length}`)
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    
  } catch (error) {
    console.error('Error in getAllPosts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Loading post by slug: ${slug}`)
    
    // Get all posts and find the one we need
    const allPosts = await getAllPosts()
    const post = allPosts.find(p => p.slug === slug)
    
    if (post) {
      console.log(`Found post: ${slug}`)
      return post
    }
    
    console.log(`Post not found: ${slug}`)
    return null
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export function generateShareUrl(platform: string, post: BlogPost, baseUrl: string = window.location.origin): string {
  const url = `${baseUrl}/post/${post.slug}`
  const title = post.frontmatter.title
  
  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  }
  
  return shareUrls[platform] || url
}