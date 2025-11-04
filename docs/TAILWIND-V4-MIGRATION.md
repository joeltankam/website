# TailwindCSS v4 Migration Guide

This document outlines the migration from TailwindCSS v3 to v4 performed on this project.

## What Changed

### 1. **Configuration System**
- **Before (v3)**: JavaScript config file (`tailwind.config.js`)
- **After (v4)**: CSS-based configuration (`tailwind.css`)

### 2. **CSS Imports**
- **Before (v3)**: 
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- **After (v4)**:
  ```css
  @import "tailwindcss";
  ```

### 3. **Vite Integration**
- **Before (v3)**: PostCSS plugin
- **After (v4)**: Native Vite plugin (`@tailwindcss/vite`)

### 4. **Plugin System**
- **Before (v3)**: Required in `tailwind.config.js`
- **After (v4)**: Declared in CSS with `@plugin` directive

### 5. **Theme Customization**
- **Before (v3)**: JavaScript config with `theme.extend`
- **After (v4)**: CSS custom properties in `@theme` block

## Files Modified

### Created
- ✅ `tailwind.css` - New CSS-based configuration

### Modified
- ✅ `vite.config.js` - Added `@tailwindcss/vite` plugin
- ✅ `src/style.css` - Updated to import new Tailwind config
- ✅ `package.json` - Updated dependencies
- ✅ `README.md` - Updated to reflect v4
- ✅ `.github/copilot-instructions.md` - Updated stack documentation

### Removed
- ❌ `postcss.config.js` - No longer needed with Vite plugin
- ❌ `autoprefixer` package - Built into Tailwind v4
- ❌ `postcss` package - Handled by Vite plugin
- ❌ `@tailwindcss/typography@0.5.19` - Replaced with v4 version

### Backed Up
- 📦 `tailwind.config.js` → `tailwind.config.js.v3-backup`

## New Configuration File

The new `tailwind.css` configuration:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Custom color palette */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
}
```

## Package Changes

### Installed
- `tailwindcss@4.1.16` - Core framework
- `@tailwindcss/vite@4.1.16` - Vite plugin
- `@tailwindcss/typography@0.5.0-alpha.3` - v4 compatible typography plugin

### Removed
- `autoprefixer` - Now built-in
- `postcss` - Handled by Vite plugin
- `@tailwindcss/typography@0.5.19` - v3 version

## Benefits of v4

1. **Faster Build Times**: Native Vite integration is more performant
2. **Smaller Bundle Size**: More efficient CSS generation
3. **Better DX**: CSS-based config is more intuitive
4. **Modern Features**: Latest Tailwind features and improvements
5. **Simplified Setup**: No PostCSS configuration needed

## Compatibility

✅ All existing styles work without changes  
✅ Custom color palette preserved  
✅ Typography plugin working  
✅ Build process successful  
✅ Dev server running correctly  

## Rollback Instructions

If you need to rollback to v3:

1. Restore config: `mv tailwind.config.js.v3-backup tailwind.config.js`
2. Restore packages:
   ```bash
   npm install -D tailwindcss@^3.4.18 @tailwindcss/typography@^0.5.19 autoprefixer@^10.4.21 postcss@^8.5.6
   npm uninstall @tailwindcss/vite
   ```
3. Create `postcss.config.js`:
   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```
4. Update `src/style.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
5. Remove `@tailwindcss/vite` from `vite.config.js`
6. Delete `tailwind.css`

## References

- [TailwindCSS v4 Documentation](https://tailwindcss.com/docs)
- [TailwindCSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [@tailwindcss/vite Plugin](https://github.com/tailwindlabs/tailwindcss-vite)
