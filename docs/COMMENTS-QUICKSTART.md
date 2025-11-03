# Giscus Comments System - Quick Reference

## What You'll See

### When No Comments Exist Yet
```
┌─────────────────────────────────────────────────────┐
│ 💬 Comments                                         │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Sign in with GitHub to leave a comment       │   │
│ │                                               │   │
│ │ [🔑 Sign in with GitHub]                     │   │
│ └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### With Existing Comments
```
┌─────────────────────────────────────────────────────┐
│ 💬 Comments (3)                                     │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 👤 JohnDoe                          2d ago   │   │
│ │ Great article! Really helped me understand   │   │
│ │ the concepts.                                │   │
│ │ 👍 5  ❤️ 2  [Reply]                          │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 👤 JaneDev                          1d ago   │   │
│ │ Thanks for this! One question - how do you   │   │
│ │ handle edge cases?                           │   │
│ │ 👍 2  [Reply]                                │   │
│ │                                               │   │
│ │   ↳ 👤 JoëlTankam (Author)        1d ago    │   │
│ │     Good question! Here's how...             │   │
│ │     👍 3                                     │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Write a comment...                           │   │
│ │                                               │   │
│ │ **Markdown** is supported                    │   │
│ │                                               │   │
│ │ [Comment]                                    │   │
│ └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Configuration IDs You Need

Visit https://giscus.app and enter your repo to get these:

```javascript
// In src/components/Comments.vue, replace:

script.setAttribute('data-repo', 'joeltankam/joeltankam.github.io')
script.setAttribute('data-repo-id', 'R_kgDOJ...')      // ← Get from giscus.app
script.setAttribute('data-category', 'Blog Comments')
script.setAttribute('data-category-id', 'DIC_kwDOJ...') // ← Get from giscus.app
```

## Step-by-Step Setup

### 1. Enable Discussions (1 minute)
```
GitHub Repo → Settings → Features → ✅ Discussions
```

### 2. Install Giscus App (30 seconds)
```
https://github.com/apps/giscus → Install
→ Select your repo → Install
```

### 3. Get Configuration (1 minute)
```
https://giscus.app
→ Enter: joeltankam/joeltankam.github.io
→ Choose: pathname mapping
→ Category: Blog Comments (or create new)
→ Copy the generated IDs
```

### 4. Update Code (30 seconds)
```
Open: src/components/Comments.vue
Replace: data-repo-id and data-category-id
Save
```

### 5. Test (1 minute)
```
npm run dev
→ Open blog post
→ Scroll to comments
→ Sign in with GitHub
→ Post test comment
```

## Features

✅ **Markdown** - Full markdown support in comments  
✅ **Reactions** - 👍 ❤️ 🎉 emojis on comments  
✅ **Threading** - Reply to specific comments  
✅ **Notifications** - Email when someone replies  
✅ **Moderation** - Lock threads, delete spam  
✅ **No Tracking** - Privacy-friendly, no ads  

## GitHub Discussions Location

Comments appear at:
```
https://github.com/joeltankam/joeltankam.github.io/discussions
```

Each blog post creates a new discussion automatically.

## Moderation

### Lock a Thread
```
GitHub Discussions → Find discussion → Lock conversation
```

### Delete Spam
```
GitHub Discussions → Find comment → ... → Delete
```

### Pin Important Comments
```
GitHub Discussions → Find comment → Pin
```

## Testing Checklist

- [ ] GitHub Discussions enabled
- [ ] Giscus app installed
- [ ] Configuration IDs updated in Comments.vue
- [ ] Dev server running
- [ ] Comments widget loads on blog post
- [ ] Can sign in with GitHub
- [ ] Test comment posts successfully
- [ ] Comment appears in GitHub Discussions
- [ ] Notifications working

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Comments not loading | Check `data-repo-id` and `data-category-id` are correct |
| "Discussion not found" | Post first comment to create discussion |
| Script not loading | Check browser console, verify Giscus app installed |
| Theme not matching | Change `data-theme` in Comments.vue |

## Alternative Options

If Giscus doesn't work for you:

1. **Utterances** (simpler, uses Issues)
   - https://utteranc.es
   - Good for basic commenting

2. **Disqus** (most popular, has ads)
   - https://disqus.com
   - Better for non-developer audience

3. **Commento** (self-hosted, paid)
   - https://commento.io
   - Full privacy control

## Cost

🆓 **Giscus is 100% free** for public repositories

---

**Total Setup Time**: ~5 minutes  
**Maintenance**: Zero (GitHub handles everything)  
**Privacy**: Excellent (no tracking)  
**Developer-Friendly**: ⭐⭐⭐⭐⭐
