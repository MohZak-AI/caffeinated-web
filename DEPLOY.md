# Deploy and SEO launch checklist for caffeinatedweb (Hostinger)

The code side is done: metadata, sitemap, robots, schema, www -> apex redirect,
and security headers are all wired up. This file covers the Hostinger-specific
steps that have to happen in hPanel and at your registrar.

## 1. Build for production (with the env vars set)

`NEXT_PUBLIC_*` values are read at build time and again at runtime, so set them
both when you build and in Hostinger (step 3).

```bash
NEXT_PUBLIC_SITE_URL=https://caffeinatedweb.com \
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION= \
npm run build
```

`next.config.ts` uses `output: "standalone"`, so the build produces a
self-contained app in `.next/standalone/` with its own `server.js` and a pruned
`node_modules`. You deploy that folder, not the whole repo.

If your real domain is not `caffeinatedweb.com`, change it here, in
`.env.local`, in `.env.example`, and in Hostinger before building.

## 2. Upload to Hostinger

The standalone output needs three things on the server:

1. The whole `.next/standalone/` folder (contains `server.js` and node_modules).
2. `.next/static/` copied into the standalone folder, at
   `.next/standalone/.next/static/`.
3. The `public/` folder copied into the standalone folder, at
   `.next/standalone/public/`.

Quick way locally after the build:

```bash
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
```

Then upload the contents of `.next/standalone/` to Hostinger (hPanel > File
Manager, or via SSH/FTP) into the folder you will use as the Node app root,
for example `domains/caffeinatedweb.com/app` or `home/<user>/app`.

### Option A: Hostinger shared hosting with the Node.js tool

1. hPanel > Advanced > Node.js.
2. Create a Node.js application:
   - Node.js version: 20 (Next 16 needs Node 18.18 or newer, use 20).
   - Application root: the folder you uploaded into.
   - Application URL: your domain.
   - Application startup file: `server.js`.
3. Under the app, set Environment variables (see step 3 below).
4. Start the application.

Passenger (what Hostinger shared uses for Node) provides the `PORT` for you, and
`server.js` already listens on `process.env.PORT ?? 3000`, so no port config is
needed.

### Option B: Hostinger VPS / KVM (more control)

1. SSH in, install Node 20.
2. Upload the standalone folder.
3. Set the env vars, then run `PORT=3000 node server.js` under a process
   manager (PM2: `pm2 start server.js --name caffeinatedweb`).
4. Put a reverse proxy (Nginx) in front, forwarding :80 and :443 to :3000.

## 3. Environment variables in Hostinger

Set these in the Node.js app (hPanel > Node.js > your app > Environment
variables, or in your shell/pm2 env on a VPS). They must match what you used at
build time:

- `NEXT_PUBLIC_SITE_URL` = `https://caffeinatedweb.com`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = your Search Console token (step 5)

After changing them, restart the Node app. Because metadata is server-rendered
and reads these at request time, the runtime values are what actually appear in
the HTML.

## 4. Domain, DNS, and HTTPS

If the domain is registered at Hostinger, DNS is already managed there. If it
is elsewhere, point it to Hostinger:

- Apex `caffeinatedweb.com` -> A record to Hostinger (the IP hPanel shows you).
- `www.caffeinatedweb.com` -> CNAME to `caffeinatedweb.com` or to the Hostinger
  target shown in hPanel.

Then:

1. hPanel > Domains > add / assign `caffeinatedweb.com` to the Node app.
2. hPanel > SSL > Install a free Let's Encrypt SSL for the domain.
3. Turn on "Force HTTPS" in hPanel so every `http://` request is upgraded to
   `https://`. This is the real `http -> https` redirect; do it at the panel,
   not in the app.
4. For `www -> apex`: add a 301 redirect in hPanel > Domains > Redirects,
   `www.caffeinatedweb.com -> https://caffeinatedweb.com`. The `next.config.ts`
   redirect also handles this inside the app, but doing it in hPanel catches it
   at the edge. Keep apex as the canonical host.

## 5. Google Search Console verification

1. Open https://search.google.com/search-console and add a property for
   `https://caffeinatedweb.com` (URL prefix, https, apex).
2. Settings > Ownership verification > HTML tag.
3. Copy only the `content` value, e.g. from
   `<meta name="google-site-verification" content="ABC123..." />` copy
   `ABC123...`.
4. Put it in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Hostinger env + your local
   `.env.local`), rebuild, redeploy, then in Search Console click Verify. The
   meta tag is rendered in `<head>` automatically once the env var is set.
5. Submit the sitemap: Search Console > Sitemaps > enter `sitemap.xml`. The
   full URL `https://caffeinatedweb.com/sitemap.xml` resolves automatically.
   Status becomes "Success" within a day or two.
6. Repeat in Bing Webmaster Tools (free, extra indexation).

## 6. After first deploy, sanity check

- `https://caffeinatedweb.com/robots.txt` -> lists the sitemap.
- `https://caffeinatedweb.com/sitemap.xml` -> one URL entry.
- `http://caffeinatedweb.com` -> redirects to `https://`.
- `https://www.caffeinatedweb.com` -> redirects to the apex.
- View the homepage source and confirm:
  - `<title>` starts with "Affordable Website Design & Redesign from $199".
  - `<link rel="canonical" href="https://caffeinatedweb.com/">`.
  - `<meta name="google-site-verification" ...>` once the env var is set.
  - Two `<script type="application/ld+json">` blocks (ProfessionalService,
    FAQPage).
- Run the homepage through https://search.google.com/test/rich-results to
  confirm the FAQ and Offer schema are detected.

## 7. Off-site links (the part that drives rankings)

A brand new one-page site has no backlinks, so Google has little reason to rank
it. Code cannot build these for you. Work through the list below in order.

Quick wins (free, do today):
- Google Business Profile (https://business.google.com) -> add caffeinatedweb
  as a service business, category "Website Designer". This gets you into local
  and Maps results, which is huge for "affordable website" + city searches.
  Use the same NAP (name, address, phone) everywhere.
- Bing Places for Business and Apple Business Connect (free).
- Clutch.co, Sortlist, Bark, and Fiverr freelance profiles (link in bio).
- GitHub profile bio link + a public demo repo.
- LinkedIn featured link + social bios.

Mid effort (this week):
- Directories: Yelp, YellowPages, Hotfrog, Foursquare (fill them out properly).
- Behance and Dribbble portfolios with a case study linking back to the site.
- Answer questions on Reddit (r/smallbusiness, r/Entrepreneur, r/webdev) and
  Quora about affordable small business websites, linking only when it helps.
- Join relevant Slack/Discord communities and put the URL in your profile.

Higher effort (this month, real payoff):
- Add 3 to 5 short case studies on the site, one per project, linked from the
  homepage. Each is a new indexable URL that can rank for long-tail terms and
  turns the one-page site into a small content site.
- One or two guest posts on blogs read by small business owners. One good link
  beats twenty directory links.
- Ask every client to add "Built by caffeinatedweb" with a link in their
  footer. Client links are relevant and free.

### Outreach email template (guest post / client footer link)

Subject: A short post for [their blog] on affordable websites for small
businesses

Hi [name],

I run caffeinatedweb, a small studio that builds and redesigns websites for
small businesses from $199. I put together a short, practical post on [topic,
e.g. "what a $199 small business website actually includes in 2025"] that I
think would fit well for [their blog name] readers.

It is original, around 700 words, and I can adapt it to your style. Would a
draft be useful? Happy to send it over with no obligation.

Thanks,
[your name]
https://caffeinatedweb.com

## 8. Keep it honest

Do not invent client names, locations, stats, or testimonials. Google's
helpful content system and E-E-A-T signals reward genuine, specific content
and penalize fabricated proof. Real case studies and a real Google Business
Profile will outperform any made-up social proof.
