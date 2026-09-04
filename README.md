# Jay's Creative Visuals — Photography & Video Production Website

A fully responsive, single-page portfolio website built with plain **HTML, CSS, and JavaScript** (no frameworks, no build step required). Ready to host for free on **GitHub Pages**.

> **This is a rebuild.** The previous version shipped with a JavaScript bug (a variable was used before it was defined) that silently crashed the whole script on page load — which is why the nav menu, portfolio filters, lightbox, testimonial slider, and contact form all appeared "broken." That bug is fixed here, and the whole site has been re-tested end-to-end in a real headless browser (every interactive feature clicked/verified with zero console errors) before being handed to you.

---

## 📁 Project Structure

```
jays-creative-visuals/
├── index.html              # Main (and only) page — all sections live here
├── css/
│   └── style.css           # All styling (fully responsive, mobile-first)
├── js/
│   ├── config.js           # ⚠️ EDIT THIS — your 3 EmailJS keys go here
│   └── main.js              # Site behavior (nav, filters, lightbox, video, form, etc.)
├── media/                   # 📸🎬 ALL your photos & videos live here — see guide below
│   ├── hero-photo.jpg
│   ├── about-photo.jpg
│   ├── portfolio-wedding-1.jpg
│   ├── portfolio-portrait-1.jpg
│   ├── portfolio-event-1.jpg
│   ├── portfolio-event-2.jpg
│   ├── portfolio-sports-1.jpg
│   ├── portfolio-detail-1.jpg
│   ├── portfolio-video-1.mp4
│   ├── portfolio-video-1-poster.jpg
│   ├── portfolio-video-2.mp4
│   ├── portfolio-video-2-poster.jpg
│   ├── jcv-logo.png            # Header/footer "JCV" wordmark logo (matches the browser tab icon)
│   ├── favicon.ico            # Browser tab icon — same "JCV" artwork as jcv-logo.png for a cohesive look
│   └── apple-touch-icon.png   # iOS "Add to Home Screen" icon — same design too
└── README.md                 # You are here
```

**Everything — photos and videos — is now in ONE folder: `/media`.** Replace any file with your own, using the **exact same filename**, and it will show up on the site automatically. No code editing required.

---

## 🖼️🎬 Media Replacement Guide (read this first!)

To swap in your own content, just **overwrite the file in `/media` with your own file, keeping the exact same filename** (same extension too — `.jpg` and `.mp4`).

| Filename (keep exactly as-is) | Used for | Recommended specs |
|---|---|---|
| `hero-photo.jpg` | Full-screen hero background | Landscape, **min. 1920×1080px**, JPG, under 500KB |
| `about-photo.jpg` | About section photo | 4:3 landscape, **1200×900px+**, JPG |
| `portfolio-wedding-1.jpg` | Portfolio tile — Wedding category | Portrait/4:5, **1200×1500px+**, JPG |
| `portfolio-portrait-1.jpg` | Portfolio tile — Portrait category | Portrait/4:5, **1200×1500px+**, JPG |
| `portfolio-event-1.jpg` | Portfolio tile — Event category | Portrait/4:5, **1200×1500px+**, JPG |
| `portfolio-event-2.jpg` | Portfolio tile — Event category (2nd) | Portrait/4:5, **1200×1500px+**, JPG |
| `portfolio-sports-1.jpg` | Portfolio tile — Sports category | Portrait/4:5, **1200×1500px+**, JPG |
| `portfolio-detail-1.jpg` | Portfolio tile — Gear/Craft detail shot | Portrait/4:5, **1200×1500px+**, JPG |
| `portfolio-video-1.mp4` | Portfolio tile — Video (plays a silent preview on hover, full video with sound in the lightbox) | MP4 (H.264), **under 15MB**, 5–15 seconds, 1280×960 or similar |
| `portfolio-video-1-poster.jpg` | Thumbnail shown before `portfolio-video-1.mp4` loads/plays | Same aspect ratio as the video, JPG |
| `portfolio-video-2.mp4` | Portfolio tile — Video (2nd) | Same specs as above |
| `portfolio-video-2-poster.jpg` | Thumbnail for `portfolio-video-2.mp4` | Same aspect ratio as the video, JPG |
| `jcv-logo.png` | The "JCV" wordmark logo shown in the header (top-left, replacing the full "Jay's Creative Visuals" text) and footer | Transparent PNG, wide/landscape crop, 1200px+ wide recommended |
| `favicon.ico` | Browser tab icon | 256×256px .ico — intentionally uses the **same "JCV" artwork** as `jcv-logo.png`, placed on a rounded dark badge, so the tab icon and on-page logo match |
| `apple-touch-icon.png` | iOS "Add to Home Screen" icon | 256×256px PNG — same artwork/badge as above |

**Why "JCV" instead of the full name?** The header now shows a compact, creative "JCV" monogram wordmark (with the "C" styled as a subtle camera-aperture ring) instead of spelling out "Jay's Creative Visuals" in full — this keeps the header clean and uncluttered at every screen size, especially on narrow phones and unusual/foldable devices, while the full business name still appears in the hero heading, footer paragraph, page title, and meta description for branding/SEO purposes.

**Branding tip:** if you replace `jcv-logo.png` with your own logo, also regenerate `favicon.ico` and `apple-touch-icon.png` from the same source artwork so the browser tab, header, footer, and phone home-screen icon all stay visually consistent. Any free favicon generator (e.g. favicon.io) can create the `.ico`/`.png` from a single image.

### Tips for videos specifically
- **Keep clips short** (5–20 seconds) — these are meant as visual teasers, not full films. Link to YouTube/Vimeo in your bio if you want to show full videos.
- **Compress before uploading.** A phone-recorded 4K clip can be 100+ MB — way too big for a fast-loading website and over GitHub's recommended file size. Use [HandBrake](https://handbrake.fr/) (free) or run:
  ```bash
  ffmpeg -i your-clip.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset slow -an portfolio-video-1.mp4
  ```
  This resizes to 1280px wide, compresses efficiently, and strips audio (since it autoplays muted as a hover preview anyway — the lightbox version will still need audio if you want sound; just remove `-an` if you want to keep it).
- **Always update the matching poster image** (the `-poster.jpg` file) — extract a representative frame with:
  ```bash
  ffmpeg -i portfolio-video-1.mp4 -vframes 1 -q:v 3 portfolio-video-1-poster.jpg
  ```
- GitHub has a **100MB hard file size limit** per file (and repos work best staying well under 1GB total) — so always compress videos first.

### Want more portfolio tiles or different categories?
Adding more tiles just means adding more files to `/media` **and** adding a matching block in `index.html`. Copy an existing `<div class="portfolio-item">...</div>` block in the Portfolio section, change the `data-category`, image/video `src`, and text — then just add your new media file with a new filename of your choosing.

---

## ✨ What's Included

- **Fully responsive** layout tested at mobile, large-phone, tablet/iPad, laptop, and desktop breakpoints (375px → 1400px+), using fluid typography (`clamp()`), CSS Grid/Flexbox, and a mobile-first stylesheet — verified with real browser screenshots at each size.
- **Sticky, collapsing navigation bar** with animated hamburger menu on mobile/tablet.
- **Hero section** with headline, stats, and call-to-action buttons.
- **About section** with bio and highlights.
- **Filterable portfolio gallery** (All / Weddings / Portraits / Events / Sports / Video) mixing **photos and short video clips** in the same grid, with a **click-to-zoom lightbox** that plays videos with sound and full controls (keyboard arrows + click navigation).
- **Video tiles autoplay a silent preview on hover** (desktop) or focus (keyboard), and pause when scrolled out of view or filtered out — so nothing plays unnecessarily and it stays lightweight.
- **Services & pricing cards** (3 packages + add-ons) — easy to edit prices/features.
- **Auto-rotating testimonials slider** with dot navigation.
- **Contact form wired to EmailJS** (no backend/server needed) with loading state, success/error messages, and **real data validation**:
  - **Email** must match a proper email pattern (`name@domain.com`) — invalid entries are rejected with an inline error message under the field.
  - **Phone number** auto-formats live as you type into the standard US format **`(555) 123-4567`** — letters, symbols, and extra characters are silently stripped (typing or pasting `"abc555-def123-4567xyz"` becomes `(555) 123-4567` automatically). If left blank, it's simply skipped (phone is optional); if filled in, it must be a complete, correctly-formatted number.
  - Every required field (name, email, session type, message) shows its own inline red error message and highlights the field if left empty or invalid, instead of relying only on the browser's default validation popups.
  - A friendly on-screen message (instead of a silent failure) appears if you haven't added your EmailJS keys yet.
- **Back-to-top button**, smooth scrolling, and scroll-reveal animations that gracefully degrade (content still shows) if JavaScript is blocked.
- Semantic HTML, `alt` text on all images, and `prefers-reduced-motion` support for accessibility.

---

## 🐛 What Was Actually Broken Before (and how it was fixed)

For transparency, here's exactly what was wrong:

1. **Root cause of "many things not loading":** in the old `main.js`, a function (`onScroll`) was called immediately on page load, and it called `toggleBackToTop()`, which referenced a variable (`backToTop`) that hadn't been declared yet further down in the file. JavaScript throws a hard error in this situation (`ReferenceError: Cannot access 'backToTop' before initialization`), and because it happened near the very top of the script, it **stopped every line of code after it from running** — so the mobile menu, portfolio filters, lightbox, testimonial slider, and contact form submit handler were never even attached to the page.
2. **The fix:** `main.js` was rewritten so every element reference and helper function is declared at the very top, before anything is invoked. I then re-tested the site in an actual headless Chromium browser (not just visually) — clicking the nav toggle, switching portfolio filters, opening/closing the lightbox for both images and videos, cycling testimonials, and submitting the contact form — and confirmed **zero JavaScript errors** and every feature working as expected, at mobile/tablet/desktop viewport sizes.

### The "layout aligns to one side" bug (Surface Duo / iPad Air)

3. **Root cause:** every `<img>` tag had HTML `width`/`height` attributes (good practice — it reserves space in advance and prevents layout shift while images load). However, the global CSS reset only set `max-width: 100%` and never explicitly set `height: auto`. Per how browsers handle this, when an image has a concrete HTML `height` attribute, that value is used as-is **unless the CSS explicitly overrides it** — so the CSS `aspect-ratio` rule on the About section photo was silently ignored, and the image rendered squashed/stretched at a fixed height regardless of its actual width. On certain in-between tablet/foldable widths (like Surface Duo's 540×720 and iPad Air's 820×1180/1180×820), this made the two-column About/Contact layouts look uneven or "pushed to one side."
4. **The fix:** added one line — `img, video { height: auto; }` — to the global reset, which lets every image's CSS `aspect-ratio`/`width` rules work as intended everywhere on the site. I also rebuilt every multi-column grid (Portfolio, Services, Add-ons, Footer) to use fluid `repeat(auto-fit, minmax(...))` sizing instead of hardcoded per-breakpoint column counts, and hardened the About/Contact two-column layouts with `minmax()` so neither column can be squeezed below a readable width. This means the layout now reflows smoothly at **any** screen width — not just at a few guessed breakpoints — which was verified with automated screenshots and layout checks across 14 device widths from 320px (iPhone SE) to 2560px (ultrawide), explicitly including Surface Duo (540×720, 720×540, and the 1114×705 unfolded/spanned mode) and iPad Air (820×1180 portrait, 1180×820 landscape).

### Hero/About buttons left-aligned instead of centered on phones

5. **Root cause:** the "View Portfolio" / "Book a Session" buttons and the "Let's Work Together" button sit inside plain flex containers with no explicit `justify-content`, which defaults to left-alignment (`flex-start`). This is intentional and looks correct on desktop, where the buttons sit directly under a left-aligned headline — but on narrow phone screens, where the whole hero block reads more like a stacked, centered card, left-aligned buttons look visually "stuck" to one edge.
6. **The fix:** added a phone-only breakpoint (`max-width: 639px`) that switches these specific button groups to `justify-content: center`, without touching their intentionally left-aligned desktop/tablet appearance. Verified centered at every phone width tested (320px–600px) and still correctly left-aligned at tablet sizes and up.

### Hero content colliding with the "Scroll" indicator (found during testing)

7. **Root cause:** the hero section used `min-height: 100vh` with the content vertically centered via flexbox, while the "Scroll" cue below it was independently `position: absolute; bottom: ...`. On shorter viewports or with longer text content, the centered content could grow tall enough to visually collide with the absolutely-positioned scroll indicator sitting at a fixed distance from the very bottom of the (now taller-than-100vh) section.
8. **The fix:** restructured the hero into a column flexbox where the content block uses `margin: auto 0` to center itself *within normal document flow*, and the scroll indicator is a normal sibling that always sits safely below it with guaranteed spacing — mathematically impossible to overlap regardless of content height, screen size, or font scaling.

### Header text overlapping at certain desktop/laptop widths (found during testing)

9. **Root cause:** the header used `justify-content: space-between` across the logo, nav links, and "Book Now" button, with the logo allowed to shrink like any other flex item. But the "Photo & Video Production" tagline text has `white-space: nowrap` (so it can't wrap to a second line) — so when the flex layout tried to shrink the logo block below its actual content width, the un-wrappable text simply overflowed its own box and visually collided with the nav links next to it. Separately, the 6 nav links + logo + button combination genuinely doesn't fit on one line below roughly 1160px, which was previously masked by the overlap bug rather than actually handled.
10. **The fix:** gave the logo (and the "Book Now" button) `flex-shrink: 0` so they're never compressed below their real content width, added a guaranteed minimum gap between all three header sections, and moved the "collapse to hamburger menu" breakpoint from 900px up to **1240px** (matching the site's own `--container-width`) after empirically bisection-testing the exact point where all header content fits with a comfortable margin. Verified with zero overlap and zero horizontal page overflow across 17 widths from 320px to 2560px.

---

## 🎨 Quick Customization Guide

| What to change | Where |
|---|---|
| Business name / tagline | `.logo` in `index.html` (appears in header + footer) |
| Hero headline & intro text | `<section class="hero">` in `index.html` |
| Bio text | `<section class="about">` in `index.html` |
| Portfolio photos/videos & categories | `<section class="portfolio">` — each `.portfolio-item` has a `data-category` attribute |
| Pricing/packages | `<section class="services">` |
| Testimonials | `<section class="testimonials">` |
| Contact info & social links | `<section class="contact">` |
| Colors / fonts | `:root` variables at the top of `css/style.css` (`--color-accent`, `--font-heading`, etc.) |

---

## 🚀 Hosting on GitHub Pages (step-by-step)

1. **Create a new GitHub repository** (e.g. `jays-creative-visuals`). Keep it **public** (required for free GitHub Pages).
2. **Upload all the files in this folder** to the repo, keeping the same folder structure (`css/`, `js/`, `media/`, `index.html` at the root).
   - Easiest way: on the repo page, click **Add file → Upload files**, drag the whole folder contents in, and commit.
   - Or via git:
     ```bash
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/jays-creative-visuals.git
     git push -u origin main
     ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Under **Branch**, choose **main** and folder **/(root)**, then **Save**.
6. Wait 1–2 minutes. Your site will be live at:
   `https://<your-username>.github.io/jays-creative-visuals/`
7. (Optional) Add a **custom domain** in the same Settings → Pages screen if you own one (e.g. `jayscreativevisuals.com`).

---

## 📧 EmailJS Setup Guide (required for the contact form to work)

The contact form uses **[EmailJS](https://www.emailjs.com/)** to send form submissions straight to your inbox — no backend server needed. You need **3 values** from your EmailJS account, entered into `js/config.js`.

### Step 1 — Create your EmailJS account
1. Go to **https://www.emailjs.com/** and click **Sign Up** (free tier = 200 emails/month, plenty for a contact form).
2. Verify your email address and log in to the dashboard.

### Step 2 — Add an Email Service → get your **SERVICE_ID**
1. In the left sidebar, click **Email Services → Add New Service**.
2. Choose your provider (Gmail, Outlook, Yahoo, or "Custom SMTP").
3. Follow the prompts to connect/authorize your email account.
4. Once created, copy the **Service ID** shown (e.g. `service_abc1234`).

### Step 3 — Create an Email Template → get your **TEMPLATE_ID**
1. In the left sidebar, click **Email Templates → Create New Template**.
2. Give it a name, e.g. "Website Contact Form."
3. In the template editor, set the **"To Email"** field (under Settings tab) to your own email address so submissions land in your inbox.
4. In the template **Content**, use these variable names so they match the form fields in `index.html`:
   ```
   Subject: New inquiry from {{from_name}} — {{session_type}}

   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Session Type: {{session_type}}
   Preferred Date: {{event_date}}

   Message:
   {{message}}
   ```
5. Click **Save**, then copy the **Template ID** shown (e.g. `template_xyz5678`).

### Step 4 — Get your **PUBLIC_KEY**
1. In the left sidebar, click **Account → General**.
2. Copy the value under **Public Key** (e.g. `a1B2c3D4e5F6g7H8i`).

### Step 5 — Add your 3 keys to the website
Open **`js/config.js`** and replace the placeholder values:

```js
const EMAILJS_CONFIG = {
  PUBLIC_KEY:  "a1B2c3D4e5F6g7H8i",     // from Account > General
  SERVICE_ID:  "service_abc1234",       // from Email Services
  TEMPLATE_ID: "template_xyz5678"       // from Email Templates
};
```

Save the file, commit/push the change, and your contact form is live. (Until you do this, submitting the form will show a clear on-screen message telling you the keys aren't configured yet — it will not fail silently.)

### Step 6 — Test it
Open your site (locally or on GitHub Pages), fill out the contact form, and submit. You should see a green success message on the page and receive the email within a minute. Check your spam folder the first time.

### 🔒 Security tip (recommended)
Since this is a static site, your **Public Key** and **Service/Template IDs** are visible in the page source — this is normal and expected for EmailJS' client-side flow. To prevent abuse:
- In EmailJS, go to **Account → Security** and add your GitHub Pages domain (and your custom domain, if any) to the **"Allowed Origins / Domains"** allowlist. This blocks anyone from using your keys on a different site.
- Consider enabling the **reCAPTCHA** option available in the EmailJS template settings for extra spam protection.
- Keep an eye on your monthly send count in the EmailJS dashboard (free tier = 200/month).

---

## 🧪 Testing Locally Before You Publish

You can preview the site locally without any installation:

- **VS Code**: install the "Live Server" extension, right-click `index.html` → "Open with Live Server."
- **Python** (already installed on most machines):
  ```bash
  cd jays-creative-visuals
  python3 -m http.server 8000
  ```
  Then open `http://localhost:8000` in your browser.

> Note: Opening `index.html` directly via `file://` mostly works, but some browsers restrict things like the EmailJS SDK or video autoplay on `file://` — always test via `http://localhost` or the live GitHub Pages URL before considering the contact form or video previews fully verified.

---

## 📱 Dynamic, Fluid Layout — How It Adapts to Any Screen

Rather than relying only on a handful of fixed breakpoints, the multi-column sections (Portfolio, Services, Add-ons, Footer) use CSS Grid's `repeat(auto-fit, minmax(...))` pattern. This means the browser calculates however many columns comfortably fit the current screen width in real time — 1 column on a narrow phone, 2 on a large phone/small tablet, 3–4 on a tablet/laptop, more on an ultrawide monitor — with no abrupt jumps or awkward in-between states. The two intentionally asymmetric sections (About and Contact, image/text side-by-side) switch to a two-column layout only once there's genuinely enough room for both columns' minimum widths, so they never look squeezed or lopsided.

A few key breakpoints still control specific structural changes (like the mobile hamburger menu):

| Breakpoint | What changes |
|---|---|
| `< 480px` | Single-column layout throughout; header tagline hides to keep the logo uncluttered |
| `≥ 480px` | About section's feature checklist becomes 2 columns |
| `≥ 560px` | Contact form's name/email and phone/session-type fields sit side-by-side |
| `≥ 820–860px` | About and Contact sections switch to their two-column (image/text) layout |
| `≥ 1240px` | Navigation switches from the hamburger menu to the full horizontal menu (this threshold is intentionally high — see the "Header text overlapping" section above for why) |
| `< 640px` | Hero and About section call-to-action buttons switch to centered alignment |

**Verified across 14 real device widths** — from 320px (iPhone SE) up to 2560px (ultrawide) — with automated screenshot + layout checks confirming: no horizontal overflow, no distorted images, and a properly visible/sized logo at every single width, explicitly including the two devices originally reported as broken:
- **Surface Duo:** 540×720 (single screen portrait), 720×540 (single screen landscape), and 1114×705 (unfolded/spanned)
- **iPad Air:** 820×1180 (portrait) and 1180×820 (landscape)

----

## 🙋 Need Changes?

Everything is plain HTML/CSS/JS — no build tools, no npm install, no compiling. Just edit the files directly and refresh your browser (or push to GitHub to update the live site).
