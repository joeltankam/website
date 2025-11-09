# Open Graph Image Generation

Dynamic OG image generation for social sharing.

## Implementation

File: [`src/utils/ogImage.ts`](../src/utils/ogImage.ts)

See source for full implementation including canvas rendering and text wrapping algorithms.

Generates 1200x630px canvas images with:
- Gradient background (primary → secondary colors)
- Post title (bold, 72px, up to 3 lines)
- Description (32px, up to 2 lines)
- Tags (up to 5, rounded badges)
- Author + date in footer

## Usage

Auto-used in [`BlogPost.vue`](../src/views/BlogPost.vue) via [`useSeo`](../src/composables/useSeo.ts) composable.

## Preview

Visit `/og-preview` to test image generation with custom content.

## Technical Notes

- Client-side canvas rendering
- Returns base64 data URL
- Colors from [`tailwind.css`](../tailwind.css) theme
- Text wrapping for long titles
- Noise texture overlay

## Limitations

- Data URLs: 60-100KB
- Some platforms may have size limits
- Alternative: Static generation at build time (not implemented)

## Testing

- View page source for `og:image` meta tag
- Facebook debugger: https://developers.facebook.com/tools/debug/
- Twitter validator: https://cards-dev.twitter.com/validator
