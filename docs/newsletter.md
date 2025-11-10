# Newsletter - Buttondown

Buttondown integration for email subscriptions. Markdown-native, RSS-to-email on paid plans.

## Current Setup

- Component: [`src/components/Newsletter.vue`](../src/components/Newsletter.vue)
- Endpoint: `https://buttondown.email/api/emails/embed-subscribe/joeltankam`
- Collects: Email only (no name)
- Method: Embedded form (no API key needed)

## Component Props

See [`src/components/Newsletter.vue`](../src/components/Newsletter.vue) for current implementation.

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `title` | String | "Subscribe to Newsletter" | Heading |
| `description` | String | Default text | Description |
| `buttonText` | String | "Subscribe" | Button label |
| `successMessage` | String | Default text | After subscribe |
| `privacyText` | String | Default text | Privacy notice |

## Usage

```vue
<Newsletter
  title="Custom Title"
  description="Custom description"
/>
```

## Platform Comparison

| Platform | Free Tier | RSS-to-Email | Cost (1k subs) | Notes |
|----------|-----------|--------------|----------------|-------|
| Buttondown | 100 subs | $9/mo | $9 | Currently using |
| EmailOctopus | 2,500 subs | $8/mo add-on | $8 | Best free tier |
| Kit (ConvertKit) | 10k subs* | $33/mo | $33 | Powerful automation |
| Mailchimp | 500 subs | $17/mo | $17 | Overkill |

\* Free tier has no RSS automation

## Buttondown Setup

1. Create account at buttondown.email
2. Username becomes endpoint: `/joeltankam`
3. Embedded form works immediately

For RSS-to-email (requires paid plan):
- Settings → RSS → Add feed URL
- Set frequency (daily/weekly/per post)

## Privacy/GDPR

- GDPR-compliant by default
- Double opt-in supported
- Automatic unsubscribe links
- Built-in data portability
- Mentioned in [`src/views/Privacy.vue`](../src/views/Privacy.vue)

## Related Documentation

When updating newsletter code, check:
- This file ([`newsletter.md`](newsletter.md))
- Component props match tables above
- Privacy policy ([`src/views/Privacy.vue`](../src/views/Privacy.vue))
- [README.md](../README.md) newsletter section
