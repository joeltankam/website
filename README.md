# Vue.js Blog Website

A modern blog website built with Vue.js and TailwindCSS that publishes blog posts from markdown files and supports social media sharing.

## Features

- 📝 **Markdown Support**: Write blog posts in markdown format
- 🎨 **TailwindCSS Styling**: Beautiful, responsive design
- 📱 **Mobile Responsive**: Works on all device sizes
- 🚀 **Fast Performance**: Built with Vite for optimal performance
- 🔗 **Social Media Sharing**: Share posts on Twitter, Facebook, LinkedIn, Reddit, WhatsApp, and Telegram
- 🧭 **Vue Router**: Clean URL routing for blog posts
- 🎯 **SEO Friendly**: Proper meta tags and structure

## Project Structure

```
src/
├── components/          # Vue components
├── views/              # Vue views (Home, BlogPost)
├── router/             # Vue Router configuration  
├── utils/              # Utility functions for blog processing
├── posts/              # Markdown blog posts
├── assets/             # Static assets
└── style.css           # TailwindCSS styles
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The blog will be available at `http://localhost:5173`

**Important**: If you don't see blog posts or CSS styling:
1. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Restart the dev server
3. Check browser console for any errors

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Writing Blog Posts

1. Create a new markdown file in the `src/posts/` directory
2. Add frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
date: "2025-01-15"
excerpt: "Brief description of your post"
tags: ["tag1", "tag2", "tag3"]
---

# Your Post Content

Write your blog post content here using markdown syntax.
```

3. The blog will automatically detect and display the new post

**Note:** The `author` field is optional and not displayed since this is a personal blog.

## Social Media Sharing

The blog includes built-in social media sharing buttons for:
- Twitter
- Facebook  
- LinkedIn
- Reddit
- WhatsApp
- Telegram

Sharing links are automatically generated with the post title and URL.

## Customization

### Styling
- Modify `src/style.css` for global styles
- Update `tailwind.config.js` for TailwindCSS customization
- Component styles are scoped within each Vue file

### Blog Configuration
- Update blog title and description in `src/views/Home.vue`
- Modify social sharing platforms in `src/views/BlogPost.vue`
- Customize markdown parsing in `src/utils/blog.js`

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Vue Router 4** - Official router for Vue.js
- **Marked** - Markdown parser and compiler
- **Gray Matter** - Front matter parser

## License

MIT License - feel free to use this project for your own blog!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any issues or have questions, please open an issue on the repository.
