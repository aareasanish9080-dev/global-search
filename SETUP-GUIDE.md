# Global Search — Android-friendly AI Search prototype

This is a responsive website starter with:
- Mobile-first search homepage
- Web results from Brave Search API
- Optional AI summaries from Gemini
- Source links, error handling, and secure server-side API keys

**Important:** the frontend is ready, but live search is not active until you deploy it and add API keys. No API keys are included in these files.

## Easiest free deployment route

Use a phone browser in Desktop site mode if a dashboard is hard to navigate.

1. Create/sign in to GitHub: https://github.com/
2. Create a new repository called `global-search`. Upload `index.html` to the repository root and create the folders/files `functions/api/search.js` using the matching files from this project. Keep the `functions` folder at the repository root (not inside `public`).
3. Create a Cloudflare account: https://dash.cloudflare.com/
4. Go to Workers & Pages → Create → Pages → Connect to Git. Select your `global-search` repository.
5. Build settings: Framework preset = None; Build command = leave blank; Build output directory = `/` (or `public` if you move `index.html` into the public folder and keep `functions` at the root). Recommended easiest setup: put `index.html` in `public/`, set output directory to `public`, and keep `functions/api/search.js` at repository root.
6. Deploy. Cloudflare provides a `*.pages.dev` website address.

## API keys (keep private)

### Brave Search
1. Sign up at https://brave.com/search/api/
2. Create a Search API key and review the current price/free credits.
3. Cloudflare dashboard → your Pages project → Settings → Variables and Secrets → add secret:
   - Name: `BRAVE_SEARCH_API_KEY`
   - Value: your Brave Search API key

### Gemini AI (optional but recommended)
1. Create a key at https://aistudio.google.com/
2. Add another secret in Cloudflare:
   - Name: `GEMINI_API_KEY`
   - Value: your Gemini API key

3. Redeploy if needed and test a search on your website.

## Costs / limits
- This project has no keys or paid service baked in.
- Free tiers and terms can change. Check current API pricing and limits before launching.
- A free static site does not make search/AI APIs free. Add usage limits/rate limiting before sharing widely.
- Do not expose API keys in `index.html`, public GitHub files, screenshots, or messages.

## Before public launch
- Add rate limiting and bot protection.
- Add privacy policy, terms, and a real contact email.
- Verify current API licensing, storage, display and attribution requirements.
- AI answers can be inaccurate; keep visible source links.
- This is an independent prototype and is not affiliated with Google.
- Replace the `.example` contact email in `index.html` with a real address you control.
