# Comments - Giscus

Giscus integration for comments (GitHub Discussions-powered). Free, no tracking, Markdown support.

## Setup

1. Enable Discussions on GitHub repo
2. Install Giscus app: https://github.com/apps/giscus
3. Configure at giscus.app to get `data-repo-id` and `data-category-id`
4. Update [`src/components/Comments.vue`](../src/components/Comments.vue) with IDs

## Configuration

From giscus.app:
- Repo: `joeltankam/website`
- Mapping: "pathname" (each post = unique discussion)
- Category: "Blog Comments" (created in Discussions)

## How It Works

- First comment auto-creates GitHub Discussion
- Readers sign in with GitHub
- Moderation via GitHub Discussions interface
- Notifications via GitHub

## Custom Theme

Custom CSS theme in [`public/giscus-theme.css`](../public/giscus-theme.css).
See [giscus-theme.md](giscus-theme.md) for details.

## Troubleshooting

- Comments not loading → Verify repo-id and category-id in [`Comments.vue`](../src/components/Comments.vue)
- Style issues → Check [`giscus-theme.css`](../public/giscus-theme.css) loads
- CORS errors → Use localhost detection or same-domain hosting
