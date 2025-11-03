import type { Plugin } from 'vite'
import { writeFileSync } from 'fs'
import { resolve, join } from 'path'
import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'

interface SitemapOptions {
  hostname: string
}

interface SitemapPage {
  path: string
  lastmod?: string
  priority: string
  changefreq: string
}

async function getPostsFromFileSystem(): Promise<Array<{ slug: string; frontmatter: any }>> {
  const postsDir = resolve(__dirname, 'src/posts')
  
  try {
    const files = readdirSync(postsDir).filter(file => file.endsWith('.md'))
    
    const posts = files.map(file => {
      const filePath = join(postsDir, file)
      const content = readFileSync(filePath, 'utf-8')
      const { data } = matter(content)
      const slug = file.replace('.md', '')
      
      return {
        slug,
        frontmatter: data
      }
    })
    
    return posts.sort((a, b) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function sitemapPlugin(options: SitemapOptions): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    async closeBundle() {
      const { hostname } = options
      const posts = await getPostsFromFileSystem()
      
      const staticPages: SitemapPage[] = [
        { path: '/', priority: '1.0', changefreq: 'monthly' },
        { path: '/about', priority: '0.9', changefreq: 'monthly' },
        { path: '/blog', priority: '0.9', changefreq: 'weekly' }
      ]
      
      const postPages: SitemapPage[] = posts.map((post: any) => ({
        path: `/post/${post.slug}`,
        lastmod: post.frontmatter.date,
        priority: '0.8',
        changefreq: 'monthly'
      }))
      
      const allPages = [...staticPages, ...postPages]
      
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${hostname}${page.path}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : `<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
      
      // Write sitemap to dist folder
      const fs = await import('fs')
      const path = await import('path')
      const distPath = path.resolve(process.cwd(), 'dist', 'sitemap.xml')
      
      fs.writeFileSync(distPath, sitemap, 'utf-8')
      console.log(`✓ Generated sitemap.xml with ${allPages.length} URLs`)
    }
  }
}
