# Custom Newsletter Backend Examples

If you want full control over your newsletter data, here are simple backend implementations.

## Option 1: Node.js + Express + MongoDB

```javascript
// server/newsletter.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Subscriber Schema
const subscriberSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  ipAddress: String,
  userAgent: String
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Subscribe endpoint
router.post('/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Already subscribed' });
    }
    
    // Create subscriber
    const subscriber = new Subscriber({
      name,
      email,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });
    
    await subscriber.save();
    
    // TODO: Send welcome email here
    
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
});

// Unsubscribe endpoint
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    await Subscriber.findOneAndUpdate(
      { email },
      { isActive: false }
    );
    
    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Unsubscribe failed' });
  }
});

module.exports = router;
```

## Option 2: Serverless (Vercel/Netlify)

```javascript
// api/newsletter/subscribe.js (Vercel)
// or netlify/functions/newsletter.js (Netlify)

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { name, email } = req.body;
    
    // Validate
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    
    // Connect to DB
    await client.connect();
    const db = client.db('blog');
    const subscribers = db.collection('subscribers');
    
    // Check existing
    const existing = await subscribers.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Already subscribed' });
    }
    
    // Insert
    await subscribers.insertOne({
      name,
      email,
      subscribedAt: new Date(),
      isActive: true
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Subscription failed' });
  } finally {
    await client.close();
  }
}
```

## Option 3: Firebase Functions

```javascript
// functions/newsletter.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.subscribe = functions.https.onRequest(async (req, res) => {
  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).send('');
  }
  
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }
  
  try {
    const { name, email } = req.body;
    
    // Validate
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    
    // Check if exists
    const snapshot = await db.collection('subscribers')
      .where('email', '==', email)
      .limit(1)
      .get();
    
    if (!snapshot.empty) {
      return res.status(409).json({ error: 'Already subscribed' });
    }
    
    // Add subscriber
    await db.collection('subscribers').add({
      name,
      email,
      subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
      isActive: true
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
});
```

## Option 4: Supabase (Postgres)

```javascript
// api/newsletter.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { name, email } = req.body;
    
    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    
    // Insert (Postgres will handle duplicate via unique constraint)
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        { 
          name, 
          email, 
          subscribed_at: new Date().toISOString(),
          is_active: true 
        }
      ]);
    
    if (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(409).json({ error: 'Already subscribed' });
      }
      throw error;
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
}
```

### Supabase Table Setup

```sql
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
```

## Option 5: Google Sheets (Simple!)

```javascript
// api/newsletter.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { name, email } = req.body;
    
    // Validate
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    
    // Append to Google Sheet via Apps Script Web App
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to save');
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
}
```

### Google Apps Script (for Google Sheets)

```javascript
// In Google Sheets: Extensions → Apps Script
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  // Check if email already exists
  const emails = sheet.getRange('B:B').getValues();
  const emailExists = emails.some(row => row[0] === data.email);
  
  if (emailExists) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'Already subscribed' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Append new subscriber
  sheet.appendRow([
    data.name,
    data.email,
    data.timestamp
  ]);
  
  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

## Email Sending

### With Nodemailer (SMTP)

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendWelcomeEmail(email, name) {
  await transporter.sendMail({
    from: '"Your Blog" <noreply@yourblog.com>',
    to: email,
    subject: 'Welcome to the Newsletter!',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thanks for subscribing to the newsletter.</p>
      <p>You'll receive updates on new articles and insights.</p>
      <p><a href="https://yourblog.com/unsubscribe?email=${email}">Unsubscribe</a></p>
    `
  });
}
```

### With SendGrid

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendWelcomeEmail(email, name) {
  await sgMail.send({
    to: email,
    from: 'noreply@yourblog.com',
    subject: 'Welcome!',
    html: `<h1>Welcome ${name}!</h1>...`
  });
}
```

### With AWS SES

```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

async function sendWelcomeEmail(email, name) {
  await ses.sendEmail({
    Source: 'noreply@yourblog.com',
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: 'Welcome!' },
      Body: {
        Html: { Data: `<h1>Welcome ${name}!</h1>...` }
      }
    }
  }).promise();
}
```

## Environment Variables

Create `.env.local`:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/blog
# or
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your-key

# Email
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=your-app-password
# or
SENDGRID_API_KEY=SG.xxx
# or
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# Google Sheets
GOOGLE_SCRIPT_URL=https://script.google.com/xxx
```

## Update Newsletter Component

```vue
<!-- src/components/Newsletter.vue -->
<Newsletter 
  provider="custom"
  api-endpoint="/api/newsletter/subscribe"
/>
```

## Deploy

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### Firebase
```bash
firebase deploy --only functions
```

## Testing

```bash
# Test locally
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

## Security Checklist

- ✅ Validate email format
- ✅ Check for duplicates
- ✅ Rate limiting (prevent spam)
- ✅ HTTPS only
- ✅ CORS properly configured
- ✅ Environment variables for secrets
- ✅ Sanitize inputs
- ✅ Log errors securely

## Choose Your Stack

| Stack | Difficulty | Cost | Best For |
|-------|------------|------|----------|
| Google Sheets | Easy | Free | Testing |
| Firebase | Medium | Free tier | Quick start |
| Supabase | Medium | Free tier | SQL fans |
| Vercel + MongoDB | Medium | ~$10/mo | Scalable |
| Custom VPS | Hard | ~$5/mo | Full control |

Pick what fits your skills and budget!
