import { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { siteConfig } from '../site.config.ts'

interface RssItem {
  title: string
  link: string
  description: string
  pubDate: string
  guid: string
  categories: string[]
}

interface RssPluginOptions {
  hostname: string
}

export default function rssPlugin(options: RssPluginOptions): Plugin {
  return {
    name: 'vite-plugin-rss',
    closeBundle() {
      generateRssFeed(options.hostname)
    }
  }
}

function generateRssFeed(hostname: string): void {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts')
  const outDir = path.join(process.cwd(), 'dist')
  
  // Read all markdown files
  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'))
  
  const posts: RssItem[] = files.map(filename => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    
    const slug = filename.replace(/\.md$/, '')
    
    return {
      title: data.title || 'Untitled',
      link: `${hostname}/post/${slug}`,
      description: data.excerpt || data.description || '',
      pubDate: new Date(data.date).toUTCString(),
      guid: `${hostname}/post/${slug}`,
      categories: data.tags || []
    }
  })
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  
  // Generate RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${hostname}</link>
    <description>${siteConfig.description}</description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${hostname}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <guid isPermaLink="true">${post.guid}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.pubDate}</pubDate>
      ${post.categories.map(cat => `<category>${cat}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`
  
  // Write RSS file
  fs.writeFileSync(path.join(outDir, 'rss.xml'), rssXml.trim())
  console.log('✓ RSS feed generated at dist/rss.xml')
  
  // Also generate Atom feed
  generateAtomFeed(posts, outDir, hostname)
}

function generateAtomFeed(posts: RssItem[], outDir: string, hostname: string): void {
  const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${siteConfig.title}</title>
  <link href="${hostname}"/>
  <link href="${hostname}/atom.xml" rel="self"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${hostname}/</id>
  <subtitle>${siteConfig.description}</subtitle>
  ${posts.map(post => `
  <entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${post.link}"/>
    <id>${post.guid}</id>
    <updated>${new Date(post.pubDate).toISOString()}</updated>
    <summary><![CDATA[${post.description}]]></summary>
    ${post.categories.map(cat => `<category term="${cat}"/>`).join('\n    ')}
  </entry>`).join('')}
</feed>`
  
  fs.writeFileSync(path.join(outDir, 'atom.xml'), atomXml.trim())
  console.log('✓ Atom feed generated at dist/atom.xml')
}
