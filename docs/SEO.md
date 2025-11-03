# SEO Implementation Guide

This document outlines the comprehensive SEO (Search Engine Optimization) features implemented in this blog website.

## Overview

The blog implements modern SEO best practices to ensure maximum visibility in search engines and optimal sharing on social media platforms.

## Features Implemented

### 1. Dynamic Meta Tags (`src/composables/useSeo.ts`)

A reusable Vue composable that manages meta tags for each page:

- **Basic Meta Tags**: title, description, keywords, author
- **Open Graph Tags**: For Facebook and LinkedIn sharing
- **X (Twitter) Cards**: For X/Twitter sharing with large image support
- **Article Tags**: Published time, modified time, section, tags
- **Canonical URLs**: Prevents duplicate content issues
- **Automatic Cleanup**: Removes meta tags when component unmounts

Usage example:
```typescript
import { useSeo } from '../composables/useSeo'

const seoMeta = computed(() => ({
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  url: currentUrl,
  type: 'article'
}))

useSeo(seoMeta)
```

### 2. Structured Data (Schema.org JSON-LD)

Each blog post includes structured data for search engines:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article description",
  "author": {
    "@type": "Person",
    "name": "Joël Tankam",
    "sameAs": [
      "https://github.com/joeltankam",
      "https://x.com/joeltankam",
      "https://linkedin.com/in/joeltankam"
    ]
  },
  "datePublished": "2025-11-01T00:00:00.000Z",
  "keywords": "vue, javascript, web-development"
}
```

### 3. Semantic HTML Markup

Blog posts use semantic HTML with microdata:

```html
<article itemscope itemtype="https://schema.org/BlogPosting">
  <h1 itemprop="headline">Article Title</h1>
  <time datetime="2025-11-01" itemprop="datePublished">November 1, 2025</time>
  <p itemprop="description">Article excerpt</p>
  <div itemprop="articleBody">Article content</div>
  <meta itemprop="author" content="Joël Tankam">
</article>
```

### 4. Sitemap Generation

#### Dynamic sitemap.xml (`vite-plugin-sitemap.ts`)
The sitemap is automatically generated during the build process using a custom Vite plugin. It:
- Scans all blog posts from `src/posts/` directory
- Includes all static pages (home, about, blog listing)
- Generates proper XML with URLs, last modified dates, change frequency, and priority
- Updates automatically when new posts are added

The sitemap is created at build time and placed in the `dist/` folder. No manual updates required!

#### robots.txt (`public/robots.txt`)
Instructs search engine crawlers:
```
User-agent: *
Allow: /
Sitemap: https://joeltankam.com/sitemap.xml
```

### 5. Page-Specific SEO

#### Home Page
- Title: "Joël Tankam - Software Engineer"
- Focus: Personal brand, location, interests
- Type: Website

#### Blog Listing
- Title: "Blog | Joël Tankam - Web Development & Technology"
- Focus: Blog overview, technology topics
- Type: Website

#### About Page
- Title: "About | Joël Tankam - R&D Software Engineer"
- Focus: Professional experience, skills
- Dynamic years of experience
- Type: Website

#### Blog Posts
- Title: "[Post Title] | Joël Tankam"
- Focus: Article content, keywords from tags
- Type: Article
- Includes publish date, read time, tags

## Meta Tags Reference

### Basic Tags
- `<title>`: Page title (50-60 characters)
- `<meta name="description">`: Page description (150-160 characters)
- `<meta name="keywords">`: Relevant keywords (comma-separated)
- `<meta name="author">`: Content author
- `<meta name="robots">`: Crawler instructions
- `<link rel="canonical">`: Canonical URL

### Open Graph (Facebook/LinkedIn)
- `og:title`: Title for social sharing
- `og:description`: Description for social sharing
- `og:type`: Content type (website/article)
- `og:url`: Page URL
- `og:image`: Preview image
- `og:site_name`: Website name
- `og:locale`: Content locale

### X (Twitter) Cards
- `twitter:card`: Card type (summary/summary_large_image)
- `twitter:title`: Title for X/Twitter
- `twitter:description`: Description for X/Twitter
- `twitter:image`: Preview image for X/Twitter
- `twitter:site`: X username (@joeltankam)
- `twitter:creator`: Author X username

### Article-Specific
- `article:published_time`: ISO 8601 publish date
- `article:modified_time`: ISO 8601 modification date
- `article:author`: Author name
- `article:section`: Content category
- `article:tag`: Content tags (multiple)

## Best Practices Implemented

### Content Optimization
- ✅ Unique title and description for each page
- ✅ Relevant keywords from blog post tags
- ✅ Clear heading hierarchy (H1 → H2 → H3)
- ✅ Descriptive alt text for images
- ✅ Internal linking between pages

### Technical Optimization
- ✅ Fast page load times (Vite build)
- ✅ Mobile-responsive design
- ✅ Clean, semantic HTML5
- ✅ Valid structured data
- ✅ Canonical URLs to prevent duplicates
- ✅ Proper URL structure (/post/slug)

### Social Media Optimization
- ✅ Open Graph tags for rich previews
- ✅ X (Twitter) Card support
- ✅ Social sharing buttons
- ✅ Author attribution with social links

## Testing SEO

### Structured Data Testing
Use Google's Rich Results Test:
```
https://search.google.com/test/rich-results
```

### Open Graph Testing
Use Facebook's Sharing Debugger:
```
https://developers.facebook.com/tools/debug/
```

### X (Twitter) Card Testing
Use X's Card Validator:
```
https://cards-dev.twitter.com/validator
```

### General SEO Analysis
Tools to use:
- Google Search Console
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- Ahrefs
- SEMrush

## Monitoring & Analytics

Consider adding:
- Google Analytics 4
- Google Search Console
- Plausible Analytics
- Umami Analytics

## Future Enhancements

Completed improvements:
- [x] Implement lazy loading for images
- [x] Add breadcrumb navigation with Schema.org markup
- [x] Generate dynamic Open Graph images per post
- [x] Implement AMP (Accelerated Mobile Pages) template
- [x] Implement pagination with proper SEO tags (rel=prev/next)

Additional potential improvements:
- [ ] Add image optimization with next-gen formats (WebP, AVIF)
- [ ] Add FAQ schema for relevant posts
- [ ] Add PWA features (service worker, manifest)
- [ ] Implement server-side rendering (SSR) for better initial SEO

## Maintenance

### Adding New Blog Posts
When creating new posts:
1. Include complete frontmatter (title, date, excerpt, tags)
2. The sitemap will automatically update on next build
3. Use descriptive slugs (filename becomes URL)
4. Add relevant tags for automatic keyword generation

### Sitemap
The sitemap is automatically generated during each build. No manual updates needed!
The plugin:
- Reads all `.md` files from `src/posts/`
- Extracts frontmatter data (title, date, tags)
- Generates `dist/sitemap.xml` with all URLs
- Uses post dates as last modification times

### SEO Checklist for New Posts
- [ ] Compelling title (50-60 characters)
- [ ] Descriptive excerpt (150-160 characters)
- [ ] Relevant tags (3-5 keywords)
- [ ] Proper heading structure
- [ ] Alt text for images
- [ ] Internal links to related posts

## Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [X (Twitter) Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Vue.js SEO Best Practices](https://vuejs.org/guide/scaling-up/ssr.html)
