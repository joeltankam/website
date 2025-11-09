# SEO - Extended Documentation

Additional SEO reference, best practices, and optimization strategies.

## Best Practices

### Content Optimization

**Title Tags**:
- 50-60 characters optimal
- Include primary keyword
- Unique per page
- Front-load important words

**Meta Descriptions**:
- 150-160 characters
- Include call-to-action
- Use active voice
- Match page content

**Headings**:
- One H1 per page (page title)
- Logical hierarchy (H2 → H3 → H4)
- Include keywords naturally
- Descriptive and scannable

**Keywords**:
- 3-5 relevant keywords per post
- Use in: title, description, H2s, first paragraph
- Avoid keyword stuffing
- Use semantic variations

### Technical Optimization

**URLs**:
- Use kebab-case slugs
- Include primary keyword
- Keep short (3-5 words)
- Avoid dates in URLs (timeless)

**Images**:
- Always include `alt` text
- Descriptive file names
- Compress/optimize (WebP format)
- Lazy loading for below-fold images

**Page Speed**:
- Minimize JavaScript bundles
- Code splitting (Vite does this)
- Serve static assets (no SSR needed)
- Enable gzip/brotli compression

**Mobile**:
- Responsive design (TailwindCSS handles this)
- Touch-friendly buttons (48x48px min)
- Fast mobile load times

### Schema.org Structured Data

**Current Implementation**:
- BlogPosting schema
- Author (Person schema)
- Article metadata

**Potential Additions**:
- BreadcrumbList
- WebSite (sitewide search)
- Organization (about page)
- FAQPage (FAQ posts)

## Testing Tools

### Validation

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **HTML Validator**: https://validator.w3.org/
- **Lighthouse** (Chrome DevTools): Audit tab

### Social Previews

- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### Performance

- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

### Mobile-Friendly

- **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Responsive Design Checker**: https://responsivedesignchecker.com/

## Monitoring

### Analytics

**Google Search Console**:
- Submit sitemap: `/sitemap.xml`
- Monitor indexing status
- Check search queries
- Track click-through rates

**Google Analytics 4**:
- Track page views
- Monitor bounce rates
- Analyze user behavior
- Set up conversion goals

### SEO Metrics

Track these metrics:
- **Organic traffic** - visitors from search
- **Keyword rankings** - position in search results
- **Click-through rate (CTR)** - impressions vs clicks
- **Bounce rate** - single-page sessions
- **Average session duration** - engagement
- **Page load time** - performance

### Monitoring Tools

- **Google Search Console** - free, essential
- **Ahrefs** - comprehensive SEO tool (paid)
- **SEMrush** - keyword tracking (paid)
- **Moz** - domain authority tracking (paid)

## Future Enhancements

### AMP (Accelerated Mobile Pages)

**Not Currently Implemented**

Pros:
- Faster mobile loading
- Google may prioritize in mobile search
- Reduced bounce rates

Cons:
- Limited JavaScript
- Restricted CSS
- Maintenance overhead
- Google's support declining

**Implementation** (if needed):
- Install `vite-plugin-amp`
- Create AMP templates
- Add AMP-specific meta tags

### Pagination SEO

For blog listing pages:

```html
<!-- Page 2 -->
<link rel="prev" href="/blog?page=1">
<link rel="next" href="/blog?page=3">
```

Prevents duplicate content issues.

### Internationalization (i18n)

For multi-language support:

```html
<link rel="alternate" hreflang="en" href="https://joeltankam.com/en/post">
<link rel="alternate" hreflang="fr" href="https://joeltankam.com/fr/post">
```

### Breadcrumbs

Already have semantic HTML. Add BreadcrumbList schema:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://joeltankam.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Blog",
    "item": "https://joeltankam.com/blog"
  }]
}
```

### Video Schema

If adding video content:

```json
{
  "@type": "VideoObject",
  "name": "Video Title",
  "description": "Description",
  "thumbnailUrl": "https://...",
  "uploadDate": "2025-01-01",
  "contentUrl": "https://..."
}
```

## SEO Checklist for New Posts

Before publishing a post:

**Content**:
- [ ] Title 50-60 characters
- [ ] Meta description 150-160 characters
- [ ] 3-5 relevant keywords/tags
- [ ] H2/H3 headings with keywords
- [ ] 1000+ words (for ranking)
- [ ] Internal links to other posts
- [ ] External links to authoritative sources

**Technical**:
- [ ] Slug is kebab-case
- [ ] Frontmatter complete (title, date, excerpt, tags)
- [ ] Images have `alt` text
- [ ] Images compressed/optimized
- [ ] No broken links

**SEO Meta**:
- [ ] OG image generates correctly (`/og-preview`)
- [ ] View source shows correct meta tags
- [ ] Test Twitter Card validator
- [ ] Test Facebook debugger

**After Publishing**:
- [ ] Rebuild site (`npm run build`)
- [ ] Check `/sitemap.xml` includes new post
- [ ] Verify post appears in `/rss.xml`
- [ ] Submit to Google Search Console (optional)
- [ ] Share on social media

## Common SEO Mistakes to Avoid

- **Duplicate content** - canonical URLs prevent this
- **Thin content** - aim for 1000+ words
- **Keyword stuffing** - write naturally
- **Slow load times** - optimize images, minimize JS
- **Missing alt text** - accessibility and SEO
- **Broken links** - check before publishing
- **No mobile optimization** - TailwindCSS handles this
- **Missing structured data** - use useSeo composable
- **Ignoring analytics** - track and improve

## Resources

- **Google SEO Starter Guide**: https://developers.google.com/search/docs/beginner/seo-starter-guide
- **Moz Beginner's Guide**: https://moz.com/beginners-guide-to-seo
- **Search Engine Journal**: https://www.searchenginejournal.com/
- **Google Webmaster Central**: https://developers.google.com/search

## Additional Potential Improvements

### Local SEO

For location-based visibility:

**LocalBusiness Schema**:
- Add Organization schema with address
- Include geo-coordinates
- List service areas
- Add business hours

**Google My Business**:
- Create/claim business listing
- Link to website
- Encourage reviews
- Post regular updates

### Featured Snippets Optimization

Target "position zero" in search results:

**Strategies**:
- Answer specific questions in H2s
- Use bullet/numbered lists
- Include definition paragraphs (40-60 words)
- Add tables for comparisons
- Use FAQ schema for common questions

**Best Formats**:
- Paragraph snippets (40-60 words)
- List snippets (ordered/unordered)
- Table snippets (comparison data)
- Video snippets (with VideoObject schema)

### Core Web Vitals

Google ranking factors (2021+):

**Metrics**:
- **LCP (Largest Contentful Paint)** - < 2.5s (loading performance)
- **FID (First Input Delay)** - < 100ms (interactivity)
- **CLS (Cumulative Layout Shift)** - < 0.1 (visual stability)

**Optimizations**:
- Preload critical resources
- Optimize images (WebP, lazy loading)
- Minimize JavaScript execution time
- Use font-display: swap
- Reserve space for dynamic content

### Semantic HTML5

Enhance accessibility and SEO:

**Elements**:
- `<article>` for blog posts
- `<section>` for content sections
- `<nav>` for navigation
- `<aside>` for sidebars
- `<header>` and `<footer>` for structure
- `<time>` for dates (with datetime attribute)

### Link Building

Internal linking strategy:

**Best Practices**:
- Link to related posts within content
- Use descriptive anchor text (not "click here")
- Create content hubs (pillar pages)
- Build topic clusters
- Update old posts with links to new ones

**External Links**:
- Link to authoritative sources
- Use rel="nofollow" for sponsored links
- Check for broken external links regularly
- Consider outbound link value

### Voice Search Optimization

Optimize for voice assistants:

**Strategies**:
- Use natural, conversational language
- Target long-tail keywords
- Answer specific questions
- Use question format in headings
- Optimize for "near me" searches
- Include FAQ sections

### E-A-T (Expertise, Authoritativeness, Trustworthiness)

Google's quality guidelines:

**Demonstrate Expertise**:
- Author bio with credentials
- About page with background
- Link to social profiles
- Guest posts on authoritative sites

**Build Authority**:
- Consistent publishing schedule
- High-quality, well-researched content
- Citations and references
- Industry recognition

**Establish Trust**:
- HTTPS (SSL certificate)
- Privacy policy page
- Contact information
- No intrusive ads
- Accurate, up-to-date information

### Content Freshness

Keep content current:

**Strategies**:
- Add "Last Updated" dates
- Update old posts with new information
- Refresh statistics and examples
- Add new sections to evergreen content
- Use "Updated [Year]" in titles

### Image SEO

Beyond alt text:

**Optimizations**:
- Descriptive filenames (not IMG_1234.jpg)
- Image sitemaps (for image search)
- Appropriate file formats (WebP for photos, SVG for graphics)
- Responsive images (srcset)
- Image compression without quality loss
- Structured data for images (ImageObject)

### Social Signals

While not direct ranking factors, social presence helps:

**Benefits**:
- Increased brand awareness
- More backlinks
- Higher engagement
- Improved click-through rates

**Actions**:
- Share posts on social media
- Encourage social sharing
- Engage with followers
- Use social proof (share counts)

### Analytics-Driven Optimization

Data-informed improvements:

**Track**:
- Top-performing pages
- High-exit pages (needs improvement)
- Search queries bringing traffic
- Pages with low dwell time
- Conversion paths

**Optimize Based on Data**:
- Improve underperforming pages
- Create more content on popular topics
- Fix pages with high bounce rates
- Update content gaps
- A/B test improvements
