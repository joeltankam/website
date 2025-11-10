# SEO Implementation

Comprehensive SEO built-in for search engine optimization.

## useSeo Composable

[`src/composables/useSeo.ts`](../src/composables/useSeo.ts) - manages meta tags dynamically.

See source file for implementation details and all available options.

Automatically adds:
- Meta tags (title, description, keywords)
- Open Graph tags (Facebook)
- Twitter Card tags
- Canonical URLs
- Schema.org JSON-LD

## Features

### Meta Tags
- Dynamic title, description, keywords per page
- From blog post frontmatter
- Open Graph for social sharing
- Twitter Cards

### Structured Data (JSON-LD)
- BlogPosting schema for articles
- Author info with social links
- Article metadata (publish date, word count)
- Breadcrumbs

### Technical SEO
- Semantic HTML5
- `robots.txt` in public folder
- `sitemap.xml` auto-generated on build
- Canonical URLs
- Proper heading hierarchy
- Alt text on images

## Sitemap

- Plugin: [`vite-plugin-sitemap-generator.ts`](../vite-plugin-sitemap-generator.ts)
- Generated: `dist/sitemap.xml` on build
- Includes: All routes + blog posts
- Config: Uses hostname from [`site.config.ts`](../site.config.ts)

## OG Images

See [og-image-generation.md](og-image-generation.md) for Open Graph image generation.

## Testing

- Build and check `dist/sitemap.xml`
- View page source for meta tags
- Twitter validator: https://cards-dev.twitter.com/validator
- Facebook debugger: https://developers.facebook.com/tools/debug/

## Extended Documentation

See [seo-extended.md](seo-extended.md) for:
- SEO best practices
- Testing and monitoring tools
- Future enhancements
- SEO checklist for new posts
- Additional potential improvements
