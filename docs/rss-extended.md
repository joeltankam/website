# RSS Feeds - Extended Documentation

Additional reference for RSS feed implementation.

## Popular Feed Readers

### Desktop
- **Feedly** - https://feedly.com (web-based, most popular)
- **Inoreader** - https://www.inoreader.com (power users)
- **NewsBlur** - https://newsblur.com (open source)
- **The Old Reader** - https://theoldreader.com (simple UI)

### Mobile
- **Reeder** (iOS/macOS) - Premium, beautiful UI
- **NetNewsWire** (iOS/macOS) - Free, open source
- **Feedly** (iOS/Android) - Cross-platform sync
- **Inoreader** (iOS/Android) - Advanced features

### Self-Hosted
- **FreshRSS** - https://freshrss.org
- **Miniflux** - https://miniflux.app
- **Tiny Tiny RSS** - https://tt-rss.org

## Troubleshooting

### Feed Not Updating

**Issue**: Readers show old content

**Solutions**:
- Rebuild site: `npm run build`
- Check `dist/rss.xml` has latest posts
- Some readers cache feeds (wait 1-2 hours)
- Validate feed: https://validator.w3.org/feed/

### Invalid XML Errors

**Common causes**:
- Unescaped HTML in post content
- Invalid dates in frontmatter
- Special characters in title

**Fix**:
- Run validator on `/rss.xml`
- Check post frontmatter format
- Ensure markdown content valid

### Feed Not Discovered

**Issue**: Readers can't find feed

**Solutions**:
- Check `<link rel="alternate">` in HTML head
- Verify feed accessible at `/rss.xml`
- Use full URL: `https://joeltankam.com/rss.xml`

## Best Practices

### Content

- **Full content** in feeds (not just excerpts) - better UX
- **Clean HTML** - validate before publishing
- **Proper encoding** - UTF-8 for special characters
- **Valid dates** - ISO 8601 format

### Performance

- **Limit entries** - 20-50 recent posts (not all)
- **Cache feeds** - serve with `Cache-Control` headers
- **Compress** - gzip compression for XML

### Metadata

- **Author info** - include in each entry
- **Categories** - use post tags
- **Unique IDs** - stable permalinks
- **Timestamps** - always include publish date

## Advanced Features

### Multiple Feeds

Create category-specific feeds:

```ts
// vite-plugin-rss-feed-generator.ts
// Filter posts by tag
const tagFeeds = ['vue', 'typescript', 'devops']
tagFeeds.forEach(tag => {
  const tagPosts = posts.filter(p => p.tags?.includes(tag))
  // Generate `/rss-${tag}.xml`
})
```

### Feed Analytics

Track subscribers via:
- **FeedBurner** - Google service (deprecated but still works)
- **Feedpress** - https://feed.press (paid)
- **Custom solution** - server logs analysis

### Podcast RSS

Extend for podcast:
- Add `<enclosure>` tags for audio files
- Include `<itunes:*>` namespace
- iTunes-specific metadata

### Email Integration

Beyond Buttondown:
- **Zapier** - RSS to email automation
- **IFTTT** - Trigger on new items
- **Mailchimp RSS** - Campaign automation ($17/mo)

## Validation Tools

- **W3C Validator**: https://validator.w3.org/feed/
- **FeedValidator**: http://www.feedvalidator.org/
- **RSS Board**: https://www.rssboard.org/rss-validator/

## Feed Specifications

- **RSS 2.0**: https://www.rssboard.org/rss-specification
- **Atom 1.0**: https://datatracker.ietf.org/doc/html/rfc4287
- **Podcast**: https://help.apple.com/itc/podcasts_connect/

## Security Considerations

- **XSS Protection** - escape user content
- **URL validation** - verify link URLs
- **Content sanitization** - strip dangerous HTML
- **Rate limiting** - prevent feed scraping abuse
