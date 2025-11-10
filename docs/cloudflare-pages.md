# Cloudflare Pages Deployment

Deployment via GitHub Actions. Push to `master` triggers auto-deploy.

## Configuration

### Cloudflare Credentials

- **Account ID**: From Cloudflare dashboard (right sidebar)
- **API Token**: From https://dash.cloudflare.com/profile/api-tokens
  - Template: Edit Cloudflare Workers
  - Permission: Account → Cloudflare Pages → Edit

### GitHub Secrets

Repository secrets required:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Pages Project

- Auto-created on first deployment
- Project name: `website`
- Build: GitHub Actions (not Cloudflare)
- Source: `dist/` directory

## GitHub Actions Workflow

See [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

Process: Checkout → Node 20 setup → npm ci → Build → Deploy

## Domain

Cloudflare-registered domain with automatic DNS configuration.

Custom domain added in Pages project → **Custom domains**.

## Environment Variables

`VITE_HOSTNAME` set in:
- GitHub Actions workflow (build time)
- Cloudflare Pages dashboard → **Settings** → **Environment variables**

## URLs

- Pages URL: `https://joeltankam.pages.dev`
- Custom domain: `https://joeltankam.com`

## Troubleshooting

- Build failures: Check GitHub Actions logs
- Deploy failures: Verify API token/account ID in secrets
- Domain issues: Verify DNS configuration in Cloudflare
