# RSS Feeds

Auto-generated RSS and Atom feeds on build.

## Files Generated

- `/rss.xml` - RSS 2.0 feed
- `/atom.xml` - Atom 1.0 feed

Both auto-discoverable via `<link>` tags in HTML head.

## Implementation

- Vite plugin: [`vite-plugin-rss-feed-generator.ts`](../vite-plugin-rss-feed-generator.ts)
- Config source: [`site.config.ts`](../site.config.ts)
- Runs on: `npm run build`
- Includes: All posts from `src/posts/*.md`

## Feed Content

Each entry includes:
- Title, description, date
- Full content (HTML from markdown)
- Author info
- Categories/tags
- Canonical URL

## Subscribe Button

RSS icon in blog header links to `/rss.xml`.

## Buttondown Integration

Buttondown RSS-to-email ($9/mo) auto-sends posts to subscribers:
- Settings → RSS → Add `/rss.xml` URL
- Set frequency
- Done

See [newsletter.md](newsletter.md) for Buttondown configuration.

## Testing

- Build: `npm run build`
- Check: `dist/rss.xml` and `dist/atom.xml` exist
- Validate: https://validator.w3.org/feed/

## Extended Documentation

See [rss-extended.md](rss-extended.md) for:
- Popular feed readers
- Troubleshooting common issues
- Best practices
- Advanced features
