# Giscus Custom Theme

Custom CSS theme for Giscus comments matching site design (blue/indigo color scheme).

## Files

- Theme: [`public/giscus-theme.css`](../public/giscus-theme.css)
- Component: [`src/components/Comments.vue`](../src/components/Comments.vue)

## Implementation

Theme uses latest Giscus CSS variable structure (RGB format in `main` selector).

See [`public/giscus-theme.css`](../public/giscus-theme.css) for full implementation.

## Theme Loading

[`Comments.vue`](../src/components/Comments.vue) handles theme loading:

- **Production**: Loads `${window.location.origin}/giscus-theme.css`
- **Localhost**: Falls back to `'light'` theme (CORS workaround)
- **Other options**: `'dark'`, `'auto'`, `'custom'`

### Why Localhost Fallback?

Giscus iframe (HTTPS from giscus.app) can't load localhost resources (HTTP) due to browser security:
- Mixed content policy
- Private network access
- CORS restrictions

## Customization

### Update Colors

Edit [`public/giscus-theme.css`](../public/giscus-theme.css):

```css
main {
  --primary-default: 37, 99, 235;  /* #2563eb (RGB format) */
  --color-btn-primary-bg: #2563eb;
  --color-prettylights-syntax-keyword: #6366f1;
}
```

### Color System

Colors match TailwindCSS theme:
- Primary: #2563eb (blue-600) → RGB: 37, 99, 235
- Secondary: #6366f1 (indigo-500)
- Background: #f6f6f7 (gray-100) → RGB: 246, 246, 247

Aligns with [`tailwind.css`](../tailwind.css) semantic color definitions.

## CSS Variables

Full Giscus variable reference: https://github.com/giscus/giscus

**Key Categories**:
- `--color-prettylights-syntax-*` - Syntax highlighting
- `--color-btn-*` - Button styles
- `--color-canvas-*` - Background colors
- `--color-accent-*` - Accent colors
- `--color-border-*` - Borders
- `--color-fg-*` - Text colors

See [`giscus-theme.css`](../public/giscus-theme.css) for complete variable list (~150 variables).

## Testing

**Development**:
```bash
npm run dev  # Uses 'light' theme (localhost fallback)
```

**Production build locally**:
```bash
npm run build
npm run preview  # Serves at :4173 with custom theme
```

**Production**:
Deploy and verify custom theme loads from same domain.

## Platform Comparison

| Platform | Theme File | CORS | Notes |
|----------|-----------|------|-------|
| Giscus | Custom CSS URL | Yes | Must be same-origin or public CDN |
| Utterances | GitHub theme | No | Limited customization |
| Disqus | JavaScript config | No | Requires paid plan for custom CSS |

Giscus offers best customization via CSS variables.
