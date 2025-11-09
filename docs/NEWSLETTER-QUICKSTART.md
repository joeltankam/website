# Newsletter Quick Start (5 Minutes)

Get your newsletter up and running in 5 minutes. Choose your platform:

## Recommended Platforms

### For Technical Blogs with Auto-Send: **Buttondown** ⭐
- ✅ RSS-to-Email **FREE** on all plans
- ✅ Markdown-native (write in Markdown)
- ✅ Developer-friendly API
- ✅ Privacy-focused
- Free: 100 subscribers | $9/mo: 1,000 subscribers

**→ See [Buttondown Setup](#buttondown-setup) below**

### For Most Free Subscribers: **EmailOctopus**
- ✅ 2,500 free subscribers (best free tier)
- ✅ Only $8/mo for RSS campaigns
- ✅ Cheapest scaling
- Free: 2,500 subs | $8/mo: 5,000 subs + RSS

**→ See [EmailOctopus Setup](#emailoctopus-setup) below**

### For Beginners: **Mailchimp**
- ✅ Familiar interface
- ✅ Lots of integrations
- ⚠️ RSS requires $13/mo
- Free: 500 subs | $13/mo: RSS campaigns

**→ See [Mailchimp Setup](#mailchimp-setup) below**

---

## Buttondown Setup (2 Minutes) ⭐

Perfect for technical blogs. RSS-to-Email is **FREE** and built-in.

### Step 1: Create Account (1 min)

1. Go to https://buttondown.email
2. Click **Start your newsletter**
3. Enter your email and create password
4. Choose a username (e.g., `joeltankam`)

### Step 2: Enable RSS-to-Email (30 sec)

1. Go to **Settings** → **RSS**
2. Toggle **Enable RSS**
3. Enter your feed URL: `https://yourdomain.com/rss.xml`
4. Set **Send frequency**: "Immediately when new items appear"
5. Click **Save**

### Step 3: Get Embed Code (30 sec)

1. Go to **Settings** → **Embedding**
2. Copy the form HTML or use their API
3. Your subscription URL: `https://buttondown.email/joeltankam`

### That's It! 🎉

Buttondown will automatically email subscribers when you publish new blog posts. No paid plan needed!

**Test it:**
1. Subscribe with your own email
2. Publish a new blog post
3. Buttondown detects it via RSS
4. Email sent automatically!

---

## EmailOctopus Setup (3 Minutes)

Best for budget-conscious bloggers. 2,500 free subscribers!

### Step 1: Create Account (1 min)

1. Go to https://emailoctopus.com
2. Click **Get started for free**
3. Enter your email and create password
4. Verify your email

### Step 2: Create a List (1 min)

1. Click **Lists** → **Create a list**
2. Enter list name: "Blog Subscribers"
3. Click **Create list**
4. Copy the **List ID** from the URL

### Step 3: Get API Key (30 sec)

1. Go to **Settings** → **API**
2. Click **Create a new API key**
3. Copy the API key

### Step 4: Add Subscription Form (30 sec)

Use their embedded form or integrate via API:

```javascript
// API integration example
const response = await fetch(`https://emailoctopus.com/api/1.6/lists/YOUR_LIST_ID/contacts`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: 'YOUR_API_KEY',
    email_address: email,
    fields: { FirstName: name }
  })
})
```

### Step 5: Enable RSS (Requires $8/mo)

1. Upgrade to Pro ($8/mo)
2. **Campaigns** → **Create campaign** → **RSS campaign**
3. Add feed: `https://yourdomain.com/rss.xml`
4. Set check frequency
5. Customize email template

**Note:** RSS campaigns require Pro plan. Free plan is great for 2,500 subscribers, but no auto-send.

---

## Mailchimp Setup (3 Minutes)

Familiar platform with good integrations. RSS requires paid plan.

### Step 1: Create Account (1 min)

1. Go to https://mailchimp.com
2. Click **Sign Up Free**
3. Enter your email and create password
4. Verify your email
5. Complete onboarding

### Step 2: Create Your Audience (1 min)

1. Click **Audience** → **Audience Dashboard**
2. Click **Create Audience**
3. Fill in:
   - **Audience name**: "Blog Subscribers"
   - **Default from email**: your@email.com
   - **Default from name**: Your Name
4. Click **Save**

## Step 3: Get Your Form Details (1 min)

1. Go to **Audience** → **Signup forms**
2. Click **Embedded forms**
3. Copy the form action URL (looks like):
   ```
   https://YOUR_DC.list-manage.com/subscribe/post?u=XXXX&id=YYYY
   ```
4. Note your datacenter (dc) - it's in the URL (us1, us2, etc.)

### Step 4: Enable RSS Campaigns (Requires $13/mo)

1. Upgrade to Essentials plan ($13/mo)
2. **Campaigns** → **Create Campaign** → **RSS**
3. Add feed: `https://yourdomain.com/rss.xml`
4. Customize email template
5. Set send frequency

**Note:** RSS campaigns require paid plan. Free plan is great for basic subscriptions but no auto-send.

### Optional: Integrate with Your Form

Use their embedded form or integrate via JSONP to avoid CORS. See [NEWSLETTER.md](NEWSLETTER.md) for detailed code examples.

---

## Comparison Summary

| Platform | Free Subs | RSS Free? | Cost for RSS | Best For |
|----------|-----------|-----------|--------------|----------|
| **Buttondown** | 100 | ✅ Yes | Free | Technical blogs |
| **EmailOctopus** | 2,500 | ❌ No | $8/mo | Budget-friendly |
| **Mailchimp** | 500 | ❌ No | $13/mo | Beginners |

---

## Next Steps

### All Platforms

1. **Test your subscription form**
   - Subscribe with your own email
   - Verify you receive confirmation
   - Check the platform dashboard

2. **Create welcome email** (if supported)
   - Set up automated welcome message
   - Introduce yourself and what to expect

3. **Customize the Newsletter component**
   ```vue
   <Newsletter 
     title="Join My Newsletter"
     description="Get updates on new posts"
     button-text="Subscribe Now"
   />
   ```

4. **Add privacy policy**
   - Explain data collection
   - Link to unsubscribe process
   - Mention your email provider

---

## Troubleshooting

### General Issues

**"Subscribers not appearing"**
- Check spam/junk folder for confirmation emails
- Verify double opt-in settings
- Check platform dashboard (may take a few minutes)

**"Form not submitting"**
- Check browser console for errors
- Verify API keys/credentials
- Test in incognito mode

**"RSS not working"**
- Verify your RSS feed is accessible: `https://yourdomain.com/rss.xml`
- Check RSS feed format (must be valid XML)
- Ensure RSS feature is enabled (may require paid plan)

### Platform-Specific

**Buttondown:**
- RSS URL must be publicly accessible
- Check Settings → RSS for sync status
- Verify feed items have proper dates

**EmailOctopus:**
- RSS campaigns require Pro plan ($8/mo)
- Check campaign status in dashboard

**Mailchimp:**
- RSS campaigns require Essentials plan ($13/mo)
- Datacenter code must match in URLs
- JSONP required for frontend integration (CORS)

---

## Cost Comparison

| Platform | Free Plan | RSS Cost | 1k Subs Cost | 5k Subs Cost |
|----------|-----------|----------|--------------|--------------|
| **Buttondown** | 100 subs | Free ✅ | $9/mo | $29/mo |
| **EmailOctopus** | 2,500 subs | $8/mo | $8/mo | $8/mo |
| **Mailchimp** | 500 subs | $13/mo | $13/mo | $20/mo |
| **ConvertKit** | 1,000 subs* | $15/mo | $15/mo | $29/mo |

\* Limited features on free plan

---

## Full Documentation

For detailed integration guides, API documentation, and advanced features:

**[→ Complete Newsletter Documentation (NEWSLETTER.md)](NEWSLETTER.md)**

---

**Recommendation:** Start with **Buttondown** if you want auto-send on new posts (RSS free). Choose **EmailOctopus** if you need more free subscribers initially and can upgrade later for RSS ($8/mo).

