# Giscus Custom Theme

This project includes a custom CSS theme for Giscus comments that matches the website's design system using the latest Giscus CSS variable structure.

## Overview

The Giscus comments section uses a custom CSS file (`/giscus-theme.css`) that applies the site's primary (blue) and secondary (indigo) color scheme to all comment elements. The theme uses Giscus's latest CSS variable structure with RGB color format for maximum compatibility.

## Theme Features

### Color Palette
- **Primary**: Blue (#2563eb, RGB: 37, 99, 235)
- **Secondary**: Indigo (#6366f1)
- **Background**: Light gray (#f6f6f7)
- **Syntax Highlighting**: Blue/indigo-themed code blocks

### Styled Elements
- ✅ All Giscus CSS variables (`main` selector)
- ✅ Primary color in RGB format for `rgba()` usage
- ✅ Syntax highlighting colors (prettylights)
- ✅ Button styles (text, background, borders, shadows)
- ✅ Canvas colors (backgrounds, borders)
- ✅ Accent colors (primary, emphasis, muted)
- ✅ Reaction buttons and counters
- ✅ Links and hover states
- ✅ Comment cards with 12px border-radius
- ✅ Interactive elements with 8px border-radius

## Implementation

### CSS File
Located at: `public/giscus-theme.css`

Uses the latest Giscus CSS variable structure:
```css
main {
  /* Primary color in RGB format for rgba() usage */
  --primary-default: 37, 99, 235; /* #2563eb */
  --bg-default: 246, 246, 247;
  
  /* Comprehensive variable coverage */
  --color-prettylights-syntax-*
  --color-btn-*
  --color-canvas-*
  --color-accent-*
  --color-border-*
  /* ...and many more */
}
```

The file is served as a static asset and referenced by Giscus using the `data-theme` attribute.

### Comments Component
File: `src/components/Comments.vue`

The component supports multiple theme options with environment-aware logic:

```typescript
const getTheme = () => {
  if (props.theme === 'custom') {
    // In development, use 'light' theme to avoid CORS issues
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1'
    
    if (isLocalhost) {
      return 'light'
    }
    
    // In production, use custom CSS from your domain
    return `${window.location.origin}/giscus-theme.css`
  }
  
  return props.theme // 'light', 'dark', or 'auto'
}

script.setAttribute('data-theme', getTheme())
```

**Theme Options:**
- `'light'` - Built-in Giscus light theme
- `'dark'` - Built-in Giscus dark theme
- `'auto'` - Automatic based on system preference
- `'custom'` - Custom CSS theme (with localhost fallback)

**CORS Handling:**
The custom theme automatically falls back to `'light'` in development (localhost) to avoid CORS errors. This is because the Giscus iframe (HTTPS from `giscus.app`) cannot load resources from localhost (HTTP, private network) due to browser security policies (mixed content, private network access, and CORS).

## Customization

To modify the theme:

1. **Edit colors**: Update CSS variables in `public/giscus-theme.css`
   ```css
   main {
     /* Update primary color (RGB format) */
     --primary-default: 37, 99, 235;  /* #2563eb */
     
     /* Update syntax highlighting */
     --color-prettylights-syntax-constant: #2563eb;
     --color-prettylights-syntax-keyword: #6366f1;
     
     /* Update button colors */
     --color-btn-primary-bg: #2563eb;
     --color-btn-primary-hover-bg: #1d4ed8;
   }
   ```

2. **Add new variables**: Reference the [Giscus source code](https://github.com/giscus/giscus) for all available CSS variables

3. **Test changes**: 
   - **Development**: Run `npm run dev` - will use built-in 'light' theme (CORS workaround)
   - **Production**: Build with `npm run build` and deploy - will use custom theme
   - To test custom theme locally: Deploy to a staging environment or modify `getTheme()` to bypass localhost check

4. **Production Testing**:
   ```bash
   npm run build
   npm run preview  # Serves production build locally
   # Access at http://localhost:4173 to see custom theme
   ```

## Color System Integration

The theme uses RGB color format to match Giscus's CSS variable structure:
- Primary color: `37, 99, 235` (#2563eb) - matches TailwindCSS `primary-600`
- Background: `246, 246, 247` (#f6f6f7) - matches TailwindCSS `gray-100`
- All colors align with `src/assets/tailwind.css` semantic color definitions
- Ensures visual consistency across the entire site

## CSS Variable Structure

The theme follows Giscus's latest CSS variable naming convention:

**Syntax Highlighting** (`--color-prettylights-syntax-*`):
- `comment`, `constant`, `entity`, `keyword`, `string`, `variable`
- `markup-*` (heading, bold, italic, deleted, inserted, changed)
- `brackethighlighter-*`, `carriage-return-*`

**Button Styles** (`--color-btn-*`):
- `text`, `bg`, `border`, `shadow`, `inset-shadow`
- `hover-bg`, `hover-border`
- `active-bg`, `active-border`, `selected-bg`
- `counter-bg`, `primary-*` variants

**Canvas Colors** (`--color-canvas-*`):
- `default`, `overlay`, `inset`, `subtle`

**Accent Colors** (`--color-accent-*`):
- `fg`, `emphasis`, `muted`, `subtle`

**Border Colors** (`--color-border-*`):
- `default`, `muted`, `subtle`

See `public/giscus-theme.css` for the complete list (~150 lines of CSS variables).

## Browser Compatibility

Works in all modern browsers. CSS custom properties (CSS variables) are used for theming, which are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

## Usage in Blog Posts

The custom theme is used in `src/views/BlogPost.vue`:

```vue
<Comments theme="custom" />
```

This will automatically:
- Use 'light' theme when running on localhost (development)
- Use custom CSS theme when deployed (production)

## Troubleshooting

### Theme not loading in production
1. Check that `giscus-theme.css` is in the `public` folder
2. Verify the file is copied to `dist` during build (`npm run build`)
3. Check browser console for 404 errors on `/giscus-theme.css`
4. Ensure the `data-theme` attribute uses the correct URL

### Custom theme not visible in development
**This is expected behavior.** The custom theme is automatically disabled on localhost to avoid CORS errors. To test the custom theme:
- Build and preview: `npm run build && npm run preview`
- Deploy to a staging environment
- Or temporarily modify `getTheme()` in `Comments.vue` to bypass localhost check

### CORS errors
If you see CORS errors when Giscus tries to load the theme CSS:
```
Access to CSS stylesheet at '...' from origin 'https://giscus.app' has been blocked by CORS policy
```

**Cause:** The Giscus iframe runs on HTTPS (`giscus.app`) and cannot load resources from:
- HTTP localhost (mixed content)
- Private network addresses (private network access policy)
- Origins without proper CORS headers

**Solution:** The code already handles this by using `'light'` theme on localhost. For production, ensure your hosting platform serves `giscus-theme.css` with appropriate CORS headers (most static hosts do this by default).

### Colors not matching exactly
1. Compare CSS variables in `giscus-theme.css` with `src/assets/tailwind.css`
2. Use browser DevTools to inspect Giscus iframe styles:
   - Right-click on comment element → Inspect
   - Check computed styles for `--primary-default` and other variables
3. Ensure RGB format matches: `37, 99, 235` not `#2563eb`

### Theme changes not applying
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check if you're testing on localhost (custom theme is disabled)
4. Verify production deployment includes updated CSS file

### Dark mode support
Currently, the theme is optimized for light mode. To add dark mode:

1. **Option A: Separate Dark Theme File**
   - Duplicate `giscus-theme.css` as `giscus-theme-dark.css`
   - Update color values for dark backgrounds:
     ```css
     main {
       --primary-default: 96, 165, 250; /* lighter blue for dark bg */
       --bg-default: 17, 24, 39; /* dark gray */
       --color-prettylights-syntax-comment: #8b949e;
       /* ...update all colors for dark mode */
     }
     ```
   - Modify `getTheme()` in `Comments.vue`:
     ```typescript
     if (props.theme === 'custom') {
       const isDark = document.documentElement.classList.contains('dark')
       const themePath = isDark ? 'giscus-theme-dark.css' : 'giscus-theme.css'
       return `${window.location.origin}/${themePath}`
     }
     ```

2. **Option B: System Preference**
   - Use Giscus's built-in `'auto'` theme:
     ```vue
     <Comments theme="auto" />
     ```
   - This automatically switches between light/dark based on system preference
   - But uses Giscus default colors, not your custom colors

3. **Option C: CSS Media Query** (not recommended for Giscus)
   - Giscus runs in an iframe, so parent page media queries don't apply
   - You would need to use the separate file approach (Option A)

## Key Files

- **Theme CSS**: `public/giscus-theme.css` (~150 lines)
- **Component**: `src/components/Comments.vue`
- **Usage**: `src/views/BlogPost.vue`
- **Config**: Site colors defined in `src/assets/tailwind.css`

## Technical Notes

### Why RGB Format?
Giscus uses CSS variables with `rgba()` for transparency effects:
```css
/* Giscus internal usage */
background: rgba(var(--primary-default), 0.1);
border: 1px solid rgba(var(--primary-default), 0.3);
```

Using RGB format (`37, 99, 235`) instead of hex (`#2563eb`) allows Giscus to create transparent variants without additional variables.

### Why Localhost Detection?
Browsers enforce three security policies that prevent localhost from loading the custom theme:

1. **Mixed Content**: Giscus iframe uses HTTPS, localhost uses HTTP
2. **Private Network Access**: Public websites (giscus.app) cannot access private network resources (localhost)
3. **CORS Policy**: Cross-origin resource sharing blocked between different origins

The localhost detection automatically falls back to a built-in theme that works in all environments.

### File Serving
- **Development**: Files served by Vite dev server from `public/`
- **Production**: Files copied to `dist/` during build, served by web server
- **Giscus loads**: CSS file via `<link>` tag in iframe with `data-theme` URL

## Resources

- [Giscus Documentation](https://giscus.app/)
- [Giscus GitHub Repository](https://github.com/giscus/giscus)
- [Giscus Theming Guide](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-theme)
- [CSS Variables Reference](https://github.com/giscus/giscus/blob/main/styles/themes/light.css)
- [TailwindCSS Configuration](../src/assets/tailwind.css)
- [Blog Post Component](../src/views/BlogPost.vue)
