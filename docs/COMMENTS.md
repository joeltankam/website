# Comments Setup Guide

This blog uses **Giscus** - a comments system powered by GitHub Discussions. It's free, open-source, and has no ads or tracking.

## Why Giscus?

✅ **Free & Open Source** - No costs, no vendor lock-in  
✅ **GitHub-Powered** - Uses GitHub Discussions (familiar to developers)  
✅ **Privacy-Friendly** - No ads, no tracking  
✅ **Markdown Support** - Full markdown in comments  
✅ **Reactions** - Emoji reactions on comments  
✅ **Themeable** - Matches your site design  
✅ **Moderation** - Full control via GitHub  

## Setup Instructions

### 1. Enable GitHub Discussions

1. Go to your GitHub repository: `https://github.com/joeltankam/joeltankam.github.io`
2. Click **Settings** tab
3. Scroll down to **Features** section
4. Check ✅ **Discussions**
5. Click **Set up discussions**
6. Create initial discussion categories (or use defaults)

### 2. Install Giscus App

1. Visit: https://github.com/apps/giscus
2. Click **Install**
3. Select **Only select repositories**
4. Choose: `joeltankam/joeltankam.github.io`
5. Click **Install**

### 3. Configure Giscus

1. Visit: https://giscus.app
2. Fill in the configuration:
   - **Repository**: `joeltankam/joeltankam.github.io`
   - **Page ↔️ Discussions Mapping**: Choose "Discussion title contains page pathname" or "Discussion title contains page URL"
   - **Discussion Category**: Choose "Blog Comments" (or create a new category)
   - **Features**: Enable reactions
   - **Theme**: Choose "Light" or "Preferred color scheme"

3. Giscus will generate configuration values:
   ```
   data-repo="joeltankam/joeltankam.github.io"
   data-repo-id="R_xxx..."
   data-category="Blog Comments"
   data-category-id="DIC_xxx..."
   ```

### 4. Update Comments Component

Open `src/components/Comments.vue` and update the configuration:

```vue
<script setup lang="ts">
const loadGiscus = () => {
  // ... existing code ...
  
  script.setAttribute('data-repo', 'joeltankam/joeltankam.github.io')
  script.setAttribute('data-repo-id', 'R_YOUR_ACTUAL_REPO_ID') // From giscus.app
  script.setAttribute('data-category', 'Blog Comments')
  script.setAttribute('data-category-id', 'DIC_YOUR_ACTUAL_CATEGORY_ID') // From giscus.app
  
  // ... rest of code ...
}
</script>
```

### 5. Create Discussion Category (Optional)

For better organization, create a dedicated category:

1. Go to: `https://github.com/joeltankam/joeltankam.github.io/discussions`
2. Click **Categories** tab
3. Click **New category**
4. Name: "Blog Comments"
5. Description: "Comments from blog posts"
6. Format: Choose "Open-ended discussion"
7. Click **Create**

## How It Works

1. **First Comment**: When someone comments on a post, Giscus automatically creates a GitHub Discussion
2. **Discussion Mapping**: Each blog post URL maps to a unique discussion thread
3. **Authentication**: Readers sign in with their GitHub account to comment
4. **Moderation**: You can moderate comments via GitHub Discussions interface
5. **Notifications**: You'll get GitHub notifications for new comments

## Features

### For Readers
- ✅ Sign in with GitHub
- ✅ Write comments in Markdown
- ✅ Add emoji reactions
- ✅ Get notifications for replies
- ✅ Edit/delete their own comments

### For You (Blog Owner)
- ✅ Manage all comments in GitHub Discussions
- ✅ Lock/unlock discussion threads
- ✅ Pin important comments
- ✅ Mark comments as answer
- ✅ Delete spam/inappropriate comments
- ✅ Get email notifications for new comments

## Alternative: Utterances

If you prefer a simpler option (uses GitHub Issues instead of Discussions):

1. Visit: https://utteranc.es
2. Follow setup instructions
3. Replace Giscus component with Utterances script

**Utterances vs Giscus:**
- Utterances: Simpler, uses Issues
- Giscus: More features, uses Discussions (newer, better organized)

## Alternative: Disqus

For non-GitHub users, you can use Disqus:

1. Create account at: https://disqus.com
2. Install Disqus component
3. Note: Disqus has ads (unless you pay) and tracks users

## Testing

After setup:

1. Run dev server: `npm run dev`
2. Open a blog post: `http://localhost:5173/post/your-first-post`
3. Scroll to comments section
4. Should see Giscus widget
5. Try signing in with GitHub
6. Post a test comment
7. Check GitHub Discussions to see it appear

## Troubleshooting

### Comments Not Loading
- Check browser console for errors
- Verify `data-repo-id` and `data-category-id` are correct
- Ensure Giscus app is installed on your repository
- Check GitHub Discussions are enabled

### "Discussion not found"
- First comment creates the discussion
- Ensure discussion category exists
- Check mapping configuration

### Styling Issues
- Giscus inherits some styles from your site
- You can customize theme in `Comments.vue`
- Use `data-theme` attribute for dark/light mode

## Security & Privacy

✅ **No Third-Party Tracking** - Giscus doesn't track users  
✅ **GitHub OAuth** - Secure authentication  
✅ **GDPR Compliant** - No personal data stored by Giscus  
✅ **Open Source** - Fully transparent code  

## Cost

💰 **$0** - Completely free for public repositories

## Support

- Giscus Docs: https://giscus.app
- Giscus GitHub: https://github.com/giscus/giscus
- Issues: https://github.com/giscus/giscus/issues
