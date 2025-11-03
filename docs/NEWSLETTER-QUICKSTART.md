# Newsletter Quick Start (5 Minutes)

Get your newsletter up and running in 5 minutes with Mailchimp (free for up to 500 subscribers).

## Step 1: Create Mailchimp Account (2 min)

1. Go to https://mailchimp.com
2. Click **Sign Up Free**
3. Enter your email and create password
4. Verify your email
5. Complete onboarding

## Step 2: Create Your Audience (1 min)

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

## Step 4: Update Newsletter Component (1 min)

Open `src/components/Newsletter.vue` and find the `handleSubmit` function.

Replace the custom API call with Mailchimp:

```javascript
const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Create form data
    const form = document.createElement('form')
    form.action = 'https://YOUR_DC.list-manage.com/subscribe/post-json?u=YOUR_U&id=YOUR_ID'
    form.method = 'GET'
    
    const emailInput = document.createElement('input')
    emailInput.name = 'EMAIL'
    emailInput.value = formData.email
    form.appendChild(emailInput)
    
    if (formData.name) {
      const nameInput = document.createElement('input')
      nameInput.name = 'FNAME'
      nameInput.value = formData.name
      form.appendChild(nameInput)
    }
    
    // Add callback parameter
    const callbackInput = document.createElement('input')
    callbackInput.name = 'c'
    callbackInput.value = 'callback'
    form.appendChild(callbackInput)

    // Submit via JSONP (Mailchimp doesn't support CORS)
    const script = document.createElement('script')
    const params = new URLSearchParams(new FormData(form) as any)
    script.src = `${form.action}&${params.toString()}`
    
    window.callback = () => {
      isSuccess.value = true
      formData.name = ''
      formData.email = ''
      delete window.callback
    }
    
    document.body.appendChild(script)
    
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    errorMessage.value = 'Something went wrong. Please try again later.'
  } finally {
    isSubmitting.value = false
  }
}
```

## Step 5: Test It! (30 sec)

1. Run `npm run dev`
2. Go to a blog post
3. Scroll to newsletter
4. Enter your email
5. Click Subscribe
6. Check Mailchimp dashboard for new subscriber

## That's It! 🎉

You now have a working newsletter system!

## Next Steps (Optional)

### 1. Create Welcome Email
1. Go to **Automations** → **Create** → **Welcome new subscribers**
2. Design your welcome email
3. Activate the automation

### 2. Customize the Form
Edit the Newsletter component props:

```vue
<Newsletter 
  title="Join My Newsletter"
  description="Get weekly insights on software engineering"
  button-text="Subscribe Now"
  :collect-name="false"
/>  <!-- Remove name field if you want --!>
```

### 3. Add Privacy Policy
Create a simple privacy page explaining:
- What data you collect (email, name)
- How you use it (sending newsletters)
- How to unsubscribe (link in every email)
- That you use Mailchimp

## Troubleshooting

**"It's not working!"**
- Check the datacenter (us1, us19, etc.) matches in URL
- Verify u= and id= parameters are correct
- Check browser console for errors
- Try in incognito mode

**"I don't see the subscriber in Mailchimp"**
- Check your Audience → All contacts
- Look in spam/junk folder for confirmation email
- Double opt-in might be enabled (check Settings)

**"Getting CORS errors"**
- This is normal - Mailchimp doesn't support CORS
- The JSONP approach above bypasses this
- Alternatively, use a serverless function proxy

## Cost

- **Free**: Up to 500 subscribers
- **$13/mo**: Up to 500 contacts with features
- **$20/mo**: Up to 2,500 contacts

See: https://mailchimp.com/pricing/

## Alternative: ConvertKit

If you prefer ConvertKit:

1. Sign up at https://convertkit.com (free up to 1,000)
2. Create a form
3. Get the form ID
4. Use their API endpoint

See full guide: [docs/NEWSLETTER.md](NEWSLETTER.md)

---

**Stuck?** See the full documentation: [NEWSLETTER.md](NEWSLETTER.md)
