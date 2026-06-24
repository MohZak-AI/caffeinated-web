# Deploy and SEO launch checklist for caffienatedweb (Hostinger)

The code is configured for a **static export** (`output: "export"` in
`next.config.ts`). The build produces a plain `out/` folder that Hostinger
shared hosting serves directly from `public_html`. No Node server, no
Passenger, no 403. The www -> apex redirect, HTTPS forcing, HSTS, and caching
are handled by `public/.htaccess`, which ships inside the build.

This fixes the 403 you got: Hostinger's Git deploy pulled the raw repo source
into `public_html`, but there was no built `index.html`, so the server returned
403 Forbidden. The fix is to serve the built `out/` folder instead.

## 1. Build the static site (on your own machine, which has internet)

Run this from the repo. The Google Fonts fetch that fails in my sandbox works
fine on your machine.

```bash
NEXT_PUBLIC_SITE_URL=https://caffienatedweb.com npm run build
```

This creates an `out/` folder containing `index.html`, `404.html`, `robots.txt`,
`sitemap.xml`, the `caffeinated-web-logo.webp` and other public assets, the
hashed `_next/static/` assets, and the `.htaccess`.

If your real domain is not `caffienatedweb.com`, change it here and in
`.env.local` and `.env.example`.

## 2. Upload `out/` to Hostinger `public_html`

Do NOT upload the repo source. Upload the **contents** of the `out/` folder
(not the folder itself) into your domain's `public_html`.

In hPanel > Files > File Manager:
1. Open `domains/caffienatedweb.com/public_html`.
2. Delete everything currently in `public_html` (the raw repo source causing
   the 403).
3. Upload everything inside `out/` so that `public_html/index.html`,
   `public_html/.htaccess`, `public_html/robots.txt`, `public_html/sitemap.xml`,
   and `public_html/_next/...` all exist.

Tip: zip the contents of `out/` locally, upload the zip via File Manager, then
use "Extract" inside `public_html`. Make sure `.htaccess` is included (it is a
hidden file; enable "Show hidden files" in File Manager to confirm it landed).

If you prefer FTP/SFTP, the host is your domain, the user is your hosting
account user, and the target is `domains/caffienatedweb.com/public_html`.

## 3. Permissions, SSL, and the redirect

- File permissions: folders 755, files 644. File Manager has a "Fix
  Permissions" action on `public_html` that sets these.
- hPanel > SSL > install the free Let's Encrypt certificate for
  `caffienatedweb.com`.
- Turn on "Force HTTPS" in hPanel (the .htaccess also forces it as a backup).
- For `www -> apex`: the .htaccess already redirects it. Optionally also add a
  redirect in hPanel > Domains > Redirects, but it is not required.

## 4. About the Hostinger Git deployment

Hostinger shared hosting Git deploy only syncs files; it does not run
`npm run build`, so it cannot serve a Next.js site by itself. Two options:

- Easiest: ignore the Git auto-deploy for hosting, and use the manual upload in
  step 2. Re-run step 1 + step 2 each time you change the site.
- If you want auto-deploy: set up a CI (GitHub Actions) that runs
  `NEXT_PUBLIC_SITE_URL=... npm run build` and uploads `out/` to Hostinger via
  FTP/SFTP on every push. Ask me and I will add the workflow file.

The Cloudflare Pages integration on GitHub is unrelated and failing; remove it
from the Cloudflare dashboard (delete the Pages project) so it stops reporting
errors on your commits.

## 5. Google Search Console verification

1. Open https://search.google.com/search-console and add a property for
   `https://caffienatedweb.com` (URL prefix, https, apex).
2. Settings > Ownership verification > HTML tag.
3. Copy only the `content` value, e.g. from
   `<meta name="google-site-verification" content="ABC123..." />` copy
   `ABC123...`.
4. Put it in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Hostinger env + your local
   `.env.local`), rebuild, redeploy, then in Search Console click Verify. The
   meta tag is rendered in `<head>` automatically once the env var is set.
5. Submit the sitemap: Search Console > Sitemaps > enter `sitemap.xml`. The
   full URL `https://caffienatedweb.com/sitemap.xml` resolves automatically.
   Status becomes "Success" within a day or two.
6. Repeat in Bing Webmaster Tools (free, extra indexation).

## 6. After first deploy, sanity check

- `https://caffienatedweb.com/robots.txt` -> lists the sitemap.
- `https://caffienatedweb.com/sitemap.xml` -> one URL entry.
- `http://caffienatedweb.com` -> redirects to `https://`.
- `https://www.caffienatedweb.com` -> redirects to the apex.
- View the homepage source and confirm:
  - `<title>` starts with "Affordable Website Design & Redesign from $199".
  - `<link rel="canonical" href="https://caffienatedweb.com/">`.
  - `<meta name="google-site-verification" ...>` once the env var is set.
  - Two `<script type="application/ld+json">` blocks (ProfessionalService,
    FAQPage).
- Run the homepage through https://search.google.com/test/rich-results to
  confirm the FAQ and Offer schema are detected.

## 7. Off-site links (the part that drives rankings)

A brand new one-page site has no backlinks, so Google has little reason to rank
it. Code cannot build these for you. Work through the list below in order.

Quick wins (free, do today):
- Google Business Profile (https://business.google.com) -> add caffienatedweb
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
- Ask every client to add "Built by caffienatedweb" with a link in their
  footer. Client links are relevant and free.

### Outreach email template (guest post / client footer link)

Subject: A short post for [their blog] on affordable websites for small
businesses

Hi [name],

I run caffienatedweb, a small studio that builds and redesigns websites for
small businesses from $199. I put together a short, practical post on [topic,
e.g. "what a $199 small business website actually includes in 2025"] that I
think would fit well for [their blog name] readers.

It is original, around 700 words, and I can adapt it to your style. Would a
draft be useful? Happy to send it over with no obligation.

Thanks,
[your name]
https://caffienatedweb.com

## 8. Keep it honest

Do not invent client names, locations, stats, or testimonials. Google's
helpful content system and E-E-A-T signals reward genuine, specific content
and penalize fabricated proof. Real case studies and a real Google Business
Profile will outperform any made-up social proof.
