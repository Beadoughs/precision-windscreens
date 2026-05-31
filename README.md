# Precision Windscreens

Marketing website for Precision Windscreens — vehicle glass repair, replacement and mobile auto glass services. Built with plain HTML, CSS, and JavaScript (no build step).

Inspired by the layout and UX of [O'Brien](https://www.obrien.com.au/).

## Sections

1. Emergency call bar + header navigation
2. Hero with service finder (select service + location)
3. Service cards (repair, replacement, mobile, ADAS)
4. Customer reviews carousel
5. Why choose us
6. Find a local expert CTA banner
7. Commitments tabs (service, community, people, environment)
8. Useful links
9. FAQ accordion
10. Booking / contact form
11. Footer

## Run locally

```bash
python3 -m http.server 8080
# Visit http://localhost:8080
```

## Customize

- **Phone number** — Update `0419 507 803` / `0419507803` throughout `index.html`
- **Email** — Change `hello@precisionwindscreens.com.au` in the footer
- **Booking form** — Wire `js/main.js` to Formspree, your CRM, or a backend API
- **Hero image** — Replace the Unsplash URL in `index.html` with your own photography
- **Reviews** — Update with real customer testimonials
- **Locations** — Add a locations page or integrate a store locator

## Structure

```
marketing-site/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/logo.png
├── assets/favicon.ico
├── assets/favicon.png
├── assets/favicon-16.png
├── assets/favicon-48.png
├── assets/apple-touch-icon.png
└── README.md
```
