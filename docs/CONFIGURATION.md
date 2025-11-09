# Site Configuration

Central configuration file: [`site.config.ts`](../site.config.ts)

See source file for complete structure and current values.

## Structure

```ts
export const siteConfig = {
  hostname: string,
  title: string,
  description: string,
  author: { name, email, social: { github, linkedin, twitter } }
}
```

## Hostname

Default in [`site.config.ts`](../site.config.ts), override with env var:

```bash
# .env.local
VITE_HOSTNAME=https://joeltankam.com
```

Used in:
- Sitemap generation ([`vite-plugin-sitemap-generator.ts`](../vite-plugin-sitemap-generator.ts))
- RSS/Atom feeds ([`vite-plugin-rss-feed-generator.ts`](../vite-plugin-rss-feed-generator.ts))
- SEO canonical URLs ([`useSeo.ts`](../src/composables/useSeo.ts))
- Social sharing links
- OG meta tags

## Author Info

Used in:
- RSS/Atom feeds (author field)
- Schema.org structured data (Person schema)
- Blog post metadata
- Footer/about sections

## Import

```ts
import { siteConfig } from '@/site.config'
```
