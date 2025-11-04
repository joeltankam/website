# RSS & Atom Feeds

Your blog automatically generates RSS and Atom feeds for readers to subscribe to updates.

## What Are Feeds?

RSS (Really Simple Syndication) and Atom feeds allow readers to subscribe to your blog and get notified of new posts automatically through feed readers like Feedly, Inoreader, or NetNewsWire.

## Feed URLs

Your blog generates two types of feeds:

- **RSS Feed**: `https://joeltankam.com/rss.xml`
- **Atom Feed**: `https://joeltankam.com/atom.xml`

Both feeds are automatically generated during build and contain the same content.

## Features

### What's Included in the Feeds

Each feed entry includes:
- **Title**: Post title
- **Link**: Direct URL to the post
- **Description**: Post excerpt or description
- **Publication Date**: When the post was published
- **Categories**: Post tags/categories
- **GUID**: Unique identifier for the post

### Auto-Discovery

The feeds are discoverable by browsers and feed readers through `<link>` tags in the HTML `<head>`:

```html
<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
<link rel="alternate" type="application/atom+xml" title="Atom Feed" href="/atom.xml" />
```

### RSS Button

An orange RSS button is displayed in the blog header for easy subscription.

## How It Works

### Build Process

1. During build (`npm run build`), the RSS plugin runs
2. It reads all markdown files from `src/posts/`
3. Extracts frontmatter (title, date, excerpt, tags)
4. Generates both `rss.xml` and `atom.xml` in the `dist/` folder
5. Posts are sorted by date (newest first)

### Implementation

The RSS generation is handled by `vite-plugin-rss.ts`:

```javascript
import rssPlugin from './vite-plugin-rss'

export default defineConfig({
  plugins: [
    vue(),
    sitemapPlugin({ hostname: 'https://joeltankam.com' }),
    rssPlugin()
  ]
})
```

## Testing Your Feed

### 1. Build the Project

```bash
npm run build
```

This generates `dist/rss.xml` and `dist/atom.xml`.

### 2. Preview Locally

```bash
npm run preview
```

Then visit:
- http://localhost:4173/rss.xml
- http://localhost:4173/atom.xml

### 3. Validate Your Feed

Use online validators to ensure your feed is valid:

- **RSS**: https://validator.w3.org/feed/
- **Atom**: https://validator.w3.org/feed/

Just paste your feed URL and click "Check".

## Popular Feed Readers

Recommend these to your subscribers:

### Desktop/Web
- **Feedly** - https://feedly.com (Web, iOS, Android)
- **Inoreader** - https://www.inoreader.com (Web, iOS, Android)
- **The Old Reader** - https://theoldreader.com (Web)
- **NewsBlur** - https://newsblur.com (Web, iOS, Android)

### Desktop Apps
- **NetNewsWire** (macOS, iOS) - Free and open source
- **Reeder** (macOS, iOS) - Premium, beautiful UI
- **FeedReader** (Windows, Linux) - Free

### Mobile Apps
- **Feedly** (iOS, Android)
- **NewsBlur** (iOS, Android)
- **Inoreader** (iOS, Android)

## Customization

### Change Blog Metadata

Edit `vite-plugin-rss.ts`:

```javascript
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Your Blog Title</title>  <!-- Change this -->
    <link>${hostname}</link>
    <description>Your description</description>  <!-- Change this -->
    <language>en-us</language>  <!-- Change language if needed -->
```

### Add Author Information

Add author to each item:

```javascript
<item>
  <title><![CDATA[${post.title}]]></title>
  <link>${post.link}</link>
  <author>your@email.com (Your Name)</author>  <!-- Add this -->
  <description><![CDATA[${post.description}]]></description>
  <pubDate>${post.pubDate}</pubDate>
</item>
```

### Include Full Content

To include full post content instead of just excerpts:

```javascript
const { data, content } = matter(fileContents)

// Later in the RSS generation:
<description><![CDATA[${content}]]></description>
```

Note: This increases feed size significantly.

### Add Images

To include post images in the feed:

```javascript
// In frontmatter:
image: /images/my-post-image.jpg

// In RSS generation:
${post.image ? `<enclosure url="${hostname}${post.image}" type="image/jpeg" />` : ''}
```

## Styling the RSS Button

The RSS button in the header uses orange (RSS's traditional color):

```vue
<a 
  href="/rss.xml" 
  class="bg-orange-500 hover:bg-orange-600"
>
  <svg><!-- RSS icon --></svg>
  RSS
</a>
```

To change the color, update the classes to use a different color scheme.

## Troubleshooting

### Feed Not Updating

1. Rebuild the project: `npm run build`
2. Clear browser cache
3. Check `dist/rss.xml` exists and has latest content

### Feed Validation Errors

Common issues:

**Invalid Date Format**
- Ensure dates in frontmatter are valid: `2024-11-04`
- RSS uses RFC 822: `Mon, 04 Nov 2024 00:00:00 GMT`

**Special Characters**
- Use `<![CDATA[...]]>` for titles and descriptions
- This handles HTML and special characters safely

**Missing Required Fields**
- Every post needs: title, date, description
- Check your markdown frontmatter

### Feed Not Discoverable

Ensure these links are in `index.html`:

```html
<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
<link rel="alternate" type="application/atom+xml" title="Atom Feed" href="/atom.xml" />
```

## Best Practices

### 1. Consistent Publishing

- Publish on a regular schedule
- Update feed metadata (lastBuildDate) on each build

### 2. Good Excerpts

- Write compelling excerpts in frontmatter
- Keep them under 200 characters
- Include the main point or hook

### 3. Categories

- Use consistent tag names
- Limit to 3-5 tags per post
- Tags appear as `<category>` in RSS

### 4. Permalinks

- Never change post URLs (slugs)
- RSS readers use GUIDs to track posts
- Changing URLs creates duplicate entries

### 5. Feed Length

- Include last 10-20 posts (configurable)
- Full archive can make feed too large
- Most readers only check recent posts

## Advanced Features

### Podcast Support

To make your blog a podcast feed, add to each item:

```xml
<enclosure 
  url="https://example.com/episode.mp3" 
  length="12345678" 
  type="audio/mpeg" 
/>
<itunes:duration>30:00</itunes:duration>
```

### Comments Count

Show number of comments per post:

```xml
<comments>https://example.com/post/my-post#comments</comments>
<slash:comments>42</slash:comments>
```

### Media RSS

For image-heavy blogs, add Media RSS namespace:

```xml
<rss xmlns:media="http://search.yahoo.com/mrss/">
  <item>
    <media:content 
      url="https://example.com/image.jpg" 
      medium="image" 
    />
  </item>
</rss>
```

## Analytics

Track RSS subscribers using:

1. **FeedBurner** - Google's feed management (being sunset)
2. **FeedPress** - Premium feed analytics
3. **Custom tracking** - Add query parameters to links

Example:
```javascript
link: `${hostname}/post/${slug}?utm_source=rss&utm_medium=feed`
```

## Security

### Best Practices

1. **Validate input** - Sanitize all content from markdown
2. **Use CDATA** - Prevents XSS in feed readers
3. **HTTPS only** - Serve feeds over secure connection
4. **Rate limiting** - Prevent feed scraping abuse

### Content Security

```javascript
// Sanitize HTML in descriptions
import sanitizeHtml from 'sanitize-html'

description: sanitizeHtml(data.excerpt, {
  allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  allowedAttributes: { 'a': ['href'] }
})
```

## Further Reading

- **RSS 2.0 Specification**: https://www.rssboard.org/rss-specification
- **Atom Specification**: https://datatracker.ietf.org/doc/html/rfc4287
- **Feed Validation**: https://validator.w3.org/feed/
- **RSS Best Practices**: https://www.rssboard.org/rss-profile

## Support

If readers have trouble subscribing:

1. Test feed in multiple readers
2. Validate with W3C validator
3. Check feed URL is accessible
4. Ensure proper Content-Type headers

The feed should be served with:
- RSS: `Content-Type: application/rss+xml`
- Atom: `Content-Type: application/atom+xml`

Nginx (in Docker) handles this automatically based on `.xml` extension.
