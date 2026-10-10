# Zahra’s Universe (دنیای زهرا) ✨🌙

A serene, celestial web universe created especially for **Zahra** celebrating Girls' Day. Built with high-fidelity celestial design tokens, interactive constellations, custom letters under the stars, starry wishes, and an astrolabe timekeeper.

---

## 🌌 Features

- **Direct Image & Asset Linking**: The celestial crescent emblem and all orbital graphics are directly linked and embedded, complete with resilient SVG backups.
- **Full Bilingual Support**: Instant switching between **Persian (فارسی)** with native RTL layout and Vazirmatn typography, and **English (LTR)** with Plus Jakarta Sans & Inter typography.
- **Ambient Celestial Harmonic Audio**: Generates a gentle 432Hz meditative cosmic tone via the Web Audio API—no external audio files or broken links.
- **Live Twinkling Stardust Canvas**: Procedural star generation with real-time twinkle, flicker, and atmospheric nebular diffusion.
- **Handwritten Letter Under the Stars**: Interactive wax-sealed envelope that unpacks with a click, complete with in-browser customization and local saving.
- **Interactive Constellation Map**: 6 clickable starry nodes on a celestial coordinate map, discovery counter, and popover messages.
- **Cosmic Mystery Gift Box**: Clickable gift with ribbon unwrap animation and celebration message.
- **Astrolabe & Event Countdown Clock**: Dual modes—a mechanical rotating celestial astrolabe with moving hands, or a live countdown timer with target date configuration.
- **Smooth Navigation Rail**: Sticky floating bar highlighting active landmarks as you explore.

---

## 🚀 How to Host on GitHub Pages

### Option 1: Automated Deployment via GitHub Pages (Recommended)

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Zahra's Universe"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```

2. In your repository on GitHub:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**
   - Create `.github/workflows/deploy.yml` with the standard Vite / static deploy action (or select the **Static HTML / Vite** template).

### Option 2: Build and Push `dist/`

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. The compiled assets will be generated in `dist/`. You can host the contents of `dist/` directly on GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run the development server (runs on port 3000)
npm run dev

# Compile and check for errors
npm run build
npm run lint
```

---

Made with warmth, care, and starlight for Zahra 💜
