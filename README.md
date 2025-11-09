# Personal Blog Repository

Personal blog built with Vue.js 3, TailwindCSS v4, and TypeScript.

## Development Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs at `http://localhost:5173`

### Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access at http://localhost:8080
```

See `docs/docker.md` for deployment options.

## Configuration

- **Hostname**: Set in `site.config.ts` or via `VITE_HOSTNAME` environment variable
- **Comments**: Configure Giscus in `src/components/Comments.vue` - see `docs/comments.md`
- **Newsletter**: Buttondown username in `src/components/Newsletter.vue` - see `docs/newsletter.md`
- **RSS Feeds**: Auto-generated at `/rss.xml` and `/atom.xml` - see `docs/rss.md`
- **Theme**: TailwindCSS v4 config in `tailwind.css` - see `docs/tailwind-v4-migration.md`

Full documentation available in `docs/` folder.

## Project Structure

```
src/
├── components/     # Vue components
├── views/          # Page views
├── router/         # Vue Router config
├── utils/          # Utilities
├── posts/          # Markdown blog posts
└── style.css       # Global styles
docs/               # Documentation
public/             # Static assets
```

## Contributing

**This is a personal blog repository.** Contributions are limited to:

- ✅ Typo fixes
- ✅ Grammar corrections
- ✅ Bug fixes (technical issues only)
- ✅ Documentation improvements

**Not accepted:**
- ❌ New blog posts
- ❌ Design/style changes
- ❌ Structural changes
- ❌ Feature additions
- ❌ Content suggestions

For typos or bugs, please open an issue or submit a small pull request.

## License

MIT
