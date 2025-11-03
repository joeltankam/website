# Vue.js Blog Website

A modern blog website built with Vue.js and TailwindCSS that publishes blog posts from markdown files and supports social media sharing.

## Features

- 📝 **Markdown Support**: Write blog posts in markdown format
- 🎨 **TailwindCSS Styling**: Beautiful, responsive design
- 📱 **Mobile Responsive**: Works on all device sizes
- 🚀 **Fast Performance**: Built with Vite for optimal performance
- 🔗 **Social Media Sharing**: Share posts on X (Twitter), Facebook, LinkedIn, Reddit, WhatsApp, and Telegram
- 💬 **Comments System**: GitHub Discussions-powered comments (Giscus)
- 📧 **Newsletter Integration**: Email subscription with multiple provider support (Mailchimp, ConvertKit, custom)
- 🧭 **Vue Router**: Clean URL routing for blog posts
- 🔍 **Advanced SEO**: Comprehensive search engine optimization
  - Dynamic meta tags for each page
  - Open Graph tags for social media
  - X (Twitter) Card support
  - Schema.org structured data (JSON-LD)
  - Canonical URLs
  - Semantic HTML with microdata
  - robots.txt and dynamically generated sitemap.xml
- 🔖 **Search & Filter**: Search articles and filter by tags
- 💡 **Syntax Highlighting**: Code blocks with highlight.js
- 🎯 **TypeScript**: Full type safety throughout the codebase

## SEO Features

This blog implements comprehensive SEO best practices:

### Dynamic Meta Tags
- Unique title, description, and keywords for each page
- Automatically generated from blog post frontmatter
- Open Graph (Facebook) and X (Twitter) Card meta tags
- Article-specific tags (published time, modified time, section)

### Structured Data
- JSON-LD Schema.org markup for BlogPosting
- Author information with social profile links
- Article metadata (word count, publish date, keywords)
- Breadcrumb navigation support

### Technical SEO
- Semantic HTML5 markup
- Microdata attributes (itemscope, itemprop)
- Canonical URLs for each page
- robots.txt for crawler directives
- Dynamically generated sitemap.xml (auto-updates on build)
- Proper heading hierarchy
- Alt text for images
- Fast loading performance with Vite

### Composable SEO System
The `useSeo` composable provides:
- Automatic meta tag management
- Clean up on component unmount
- Reactive updates when content changes
- Structured data injection

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

### Comments Setup

This blog uses Giscus (GitHub Discussions) for comments. To enable:

1. Enable GitHub Discussions on your repository
2. Install the Giscus app: https://github.com/apps/giscus
3. Configure at https://giscus.app to get your repo ID and category ID
4. Update `src/components/Comments.vue` with your configuration

For detailed instructions, see [docs/COMMENTS.md](docs/COMMENTS.md)

### Newsletter Setup

This blog includes a newsletter subscription system. To enable:

1. Choose an email provider (Mailchimp, ConvertKit, Buttondown, or custom)
2. Get your API credentials from the provider
3. Update `src/components/Newsletter.vue` with your configuration
4. Configure your email automation (welcome email, etc.)

For detailed instructions, see [docs/NEWSLETTER.md](docs/NEWSLETTER.md)

### Docker Deployment

The easiest way to deploy the blog is using Docker:

```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or using Docker CLI
docker build -t joeltankam-blog .
docker run -d -p 8080:80 joeltankam-blog
```

Access at: http://localhost:8080

See [docs/DOCKER.md](docs/DOCKER.md) for detailed deployment options including AWS, Google Cloud, Azure, and Kubernetes.

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
- X (Twitter)
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
- **Docker** - Containerization for easy deployment
- **Nginx** - High-performance web server

## Deployment

### Quick Deploy with Docker

```bash
# Build and run with Docker Compose
npm run docker:up

# Or manually
npm run docker:build
npm run docker:run
```

Access at: http://localhost:8080

### Production Platforms

This blog can be deployed to:
- **AWS ECS/Fargate** - Container orchestration
- **Google Cloud Run** - Serverless containers
- **Azure Container Instances** - Quick container deployment
- **DigitalOcean App Platform** - Simple PaaS
- **Any VPS** - Using Docker or static files

See [docs/DOCKER.md](docs/DOCKER.md) for detailed deployment guides.

## License

MIT License - feel free to use this project for your own blog!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

If you encounter any issues or have questions, please open an issue on the repository.
