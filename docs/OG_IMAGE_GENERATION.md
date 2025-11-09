# Open Graph Image Generation

This implementation provides dynamic OG (Open Graph) image generation for blog posts using client-side canvas rendering.

## Features

- **Dynamic Image Generation**: Creates 1200x630px OG images on-the-fly using HTML5 Canvas
- **Customizable Design**: Gradient backgrounds (primary to secondary colors), white text, rounded tag badges
- **Smart Text Wrapping**: Automatically wraps long titles and descriptions to fit within the image
- **Complete Metadata**: Includes title, description, author, date, and tags
- **Preview Page**: Interactive demo at `/og-preview` to test and visualize generated images

## Implementation

### Core Function

The `generateOGImage()` function in `src/utils/ogImage.ts` creates images with:

- **Gradient Background**: Blue-to-indigo gradient matching your site's primary/secondary colors
- **Title**: Bold 72px font, up to 3 lines with word wrapping
- **Description**: 32px font, up to 2 lines with word wrapping
- **Tags**: Up to 5 tags displayed as rounded badges with hashtags
- **Footer**: Author name (left) and formatted date (right)
- **Texture Overlay**: Subtle noise pattern for visual depth

### Usage

```typescript
import { generateOGImage, generateBlogPostOGImage } from '@/utils/ogImage'

// Generate OG image for a blog post
const ogImageUrl = generateBlogPostOGImage(post)

// Generate custom OG image
const customImage = generateOGImage({
  title: 'Your Title',
  description: 'Your description',
  author: 'Author Name',
  date: '2025-11-09',
  tags: ['vue', 'typescript', 'web-dev']
})
```

### Integration

OG images are automatically generated for blog posts and included in SEO meta tags:

```vue
<!-- BlogPost.vue -->
<script setup lang="ts">
import { getOGImage } from '@/utils/ogImage'

const seoMeta = computed(() => ({
  ...
  image: getOGImage('post', post.value),  // Auto-generates OG image
  ...
}))
</script>
```

## Preview Page

Visit `/og-preview` to:
- See examples of generated OG images for your blog posts
- Test custom titles, descriptions, and tags
- Download generated images for use elsewhere

## Examples

### Blog Post OG Image
- Displays post title prominently
- Shows excerpt as description
- Includes all post tags
- Shows author and publication date

### Custom OG Image
Use the interactive generator on the preview page to create custom images with your own content.

## Technical Details

- **Image Size**: 1200x630px (standard OG image dimensions)
- **Format**: PNG (data URL)
- **Quality**: 95%
- **Font**: System UI font stack for consistency
- **Colors**: Uses CSS custom properties from your theme

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas API
- Canvas `roundRect()` method (or polyfill automatically applied)
- Data URLs

## Future Enhancements

Possible improvements:
- Server-side generation for faster loading
- Caching generated images
- More customizable templates
- Support for custom fonts/logos
- Animation/video OG images

## Performance

- Images generated on-demand (only when needed)
- Lightweight implementation (~5KB additional bundle size)
- No external dependencies
- Client-side rendering (no server required)
