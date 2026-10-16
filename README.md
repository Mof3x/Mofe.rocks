12# Shirli Irenimofe Williams — Portfolio

A static portfolio site for GitHub Pages. It's built with plain HTML, CSS and JavaScript: no frameworks, no build step, no server, no database.

The theme is a dark, esoteric take on a terminal and a HUD ID card, with ASCII art of African plants made from public-domain botanical engravings. There's a dark **Night** theme (the default) and a light **Parchment** theme. The toggle is in the header, and each visitor's choice is remembered in their browser.

---

## What's in the folder

| File | What it is |
| --- | --- |
| `index.html` | Home: terminal "fastfetch" hero, featured projects |
| `about.html` | About: ID-card dossier (photo, focus-areas chart, facts, bio, toolkit) |
| `projects.html` | All three projects |
| `upset-live.html`, `project-game.html`, `project-application.html` | One case study per project (website, game, application) |
| `cv.html` | CV page (prints cleanly) + PDF download |
| `contact.html` | Email (with copy button), GitHub, LinkedIn |
| `404.html` | "Page not found" page that GitHub Pages shows for broken links |
| **`data.js`** | **All of your text, links and image paths. This is the file you edit.** |
| `script.js` | Builds the pages from `data.js`, theme toggle, mobile menu. You shouldn't need to edit it. |
| `style.css` | All styling. Colours are defined at the top. |
| `assets/` | Images, icons and your CV PDF |
| `play/Komms/` | The playable Unity web build of Komms |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

---

## 1. Add your real content

Open **`data.js`** in any text editor (VS Code, Notepad++, even Notepad). It's commented section by section.

- Anything still written as `"[PLACEHOLDER: ...]"` shows on the site as a **dashed yellow chip**, so you can see at a glance what's unfinished.
- Before you publish, search `data.js` for `[PLACEHOLDER` and replace every one.
- Keep the quotes and commas exactly as they are. If a page suddenly shows "Couldn't build this section", a missing comma or quote in `data.js` is the usual cause.

| To change… | Edit in `data.js` |
| --- | --- |
| Name, role, location, what you're open to | `person` |
| Email, GitHub, LinkedIn, CV file | `links` |
| About-page photo, bio paragraphs, fact table | `about` |
| Hexagon chart (six areas, each 1–5) | `focusAreas` (`null` = not set yet) |
| Skills / toolkit tags | `skills` |
| Education, experience (CV page) | `education`, `experience` |
| Each project's title, summary, tools, links, write-up, thumbnail, screenshots, live embed | `projects` |

### Images

1. Put the image in `assets/img/`, e.g. `assets/img/game-menu.png`.
2. Point to it in `data.js`, e.g. `thumbnail: "assets/img/game-menu.png"`.
3. Always write alt text that describes what the image shows (`thumbnailAlt`, `alt`).

| Image | Shape | Export at | Keep under |
| --- | --- | --- | --- |
| Project card thumbnail (one per project) | 16:10 landscape | 1200 × 750 px | ~200 KB |
| Desktop screenshots (website, game) | 16:10 or 16:9 | 1600 px wide | ~300 KB |
| Phone screenshots (app) | portrait, as captured | about 600 × 1300 px | ~150 KB |
| Your About photo | 4:5 portrait | 800 × 1000 px | ~200 KB |

- **Cropping:** thumbnails and the photo are cropped to fill their box, so keep the subject centred.
- **Screenshots** sit two to a row, so 2 or 4 per project looks tidiest.
- **Format:** JPG or WebP for photos and screenshots, PNG only for flat UI. [Squoosh](https://squoosh.app) resizes and compresses for free.
- **File names:** lowercase-with-hyphens, no spaces, e.g. `komms-station.jpg`.

If a path is wrong, the site shows a **FILE NOT FOUND** box with the path, so it's easy to spot.

### Screenshots and the live embed

```js
screenshots: [
  { src: "assets/img/komms-station.jpg", alt: "Inside the radio station, transmitter on the left", caption: "Starting area" },
],
```

The UpsetXociety page also has an `embed` that shows upset.live live in a browser-style frame above the screenshots. Delete the `embed: { ... }` lines in `data.js` to remove it. Only embed sites you own or trust.

### Your game (Komms)

The Unity web build lives in `play/Komms/`. On the game's case-study page it sits behind a **Play** button, so the 23 MB only downloads when someone chooses to play. It fills its frame and has a Fullscreen button and a controls list. The controls are set under `game: { ... }` in `data.js`.

To update the game, rebuild in Unity and replace the contents of `play/Komms/`:

- **Platform:** Web (WebGL), with **Compression Format: Gzip** and **Decompression Fallback** ticked in Player Settings → Publishing Settings. GitHub Pages needs this, and it's why the build files end in `.unityweb`.
- **Names:** keep the folder name `Komms` and the build name `Komms`. GitHub Pages is case-sensitive, so `play/komms/` would be a different, missing address.
- **Size:** every file must stay under 100 MB, GitHub's limit.
- **Testing:** use a local server (see section 2). Unity web builds don't run by double-clicking `index.html`.

### Your CV

Your CV is `assets/cv/Shirli_Williams_CV_Techpriv.pdf`. To update it, replace that file. If you use a new file name, also change `cv:` under `links` in `data.js`, and the two `href="assets/cv/..."` links in `index.html` and `cv.html`.

---

## 2. Preview on your computer

Double-clicking `index.html` works for a quick look. A local server behaves exactly like GitHub Pages, though. In this folder, run:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. Press `Ctrl+C` to stop.

---

## 3. Publish on GitHub Pages (free)

### Option A: in the browser (no Git needed)

1. Sign in at <https://github.com> and click **New repository**.
2. Name it, e.g. `portfolio`, and set it to **Public**. Leave "Add a README" unticked. Click **Create repository**.
3. On the next page, click **uploading an existing file**.
4. Drag in **everything inside this folder**: all the `.html` files, `style.css`, `script.js`, `data.js`, `README.md`, `.nojekyll` and the `assets` folder.
   - Windows hides files starting with a dot, so make sure `.nojekyll` goes up too.
5. Click **Commit changes**.
6. Go to **Settings → Pages**.
7. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, and click **Save**.
8. Wait a minute or two, then refresh the Pages settings. Your address appears at the top, e.g. `https://YOUR-USERNAME.github.io/portfolio/`.

### Option B: with Git

```bash
git init
```
```bash
git add .
```
```bash
git commit -m "Initial portfolio"
```
```bash
git branch -M main
```
```bash
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
```
```bash
git push -u origin main
```

Then do steps 6–8 above.

### Updating the site later

Edit the files and upload or push them again. GitHub Pages republishes automatically, usually within a minute or two. If you don't see the change, hard-refresh with `Ctrl+F5`.

### Project site vs. user site

- **Project site** (any repo name, e.g. `portfolio`): the address is `https://YOUR-USERNAME.github.io/portfolio/`. This works out of the box, because every link in the site is relative.
- **User site** (repo named exactly `YOUR-USERNAME.github.io`): the address is `https://YOUR-USERNAME.github.io/`. If you use this, open `404.html` and change `<meta name="site-base" content="">` to `content="/"`.

---

## 4. Connect a custom domain (later)

You need a domain from a registrar (Namecheap, Cloudflare, Porkbun, etc.). These steps use `example.com`; replace it with your domain.

1. **Verify the domain** (recommended, as it stops anyone else claiming it on GitHub). Go to GitHub → your profile picture → **Settings → Pages → Add a domain**. Follow the steps: add the TXT record it shows you at your registrar, then click **Verify**.
2. **Add DNS records at your registrar.**
   - For the bare domain `example.com`, add four **A** records with host `@`:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Optional, for IPv6, add four **AAAA** records with host `@`:
     - `2606:50c0:8000::153`
     - `2606:50c0:8001::153`
     - `2606:50c0:8002::153`
     - `2606:50c0:8003::153`
   - For `www.example.com`, add a **CNAME** record with host `www` pointing to `YOUR-USERNAME.github.io`.
   - Remove any old "parking" A or CNAME records the registrar added for `@` or `www`.
3. **Tell GitHub.** In the repo, go to **Settings → Pages → Custom domain**, enter `example.com`, and click **Save**. GitHub adds a `CNAME` file to the repo. Keep it there, and if you upload files manually, don't delete it.
4. **Wait for DNS.** This takes anything from a few minutes to 24 hours. Then tick **Enforce HTTPS** on the same page. The tickbox becomes available once GitHub has issued the certificate.
5. **Pull the CNAME file.** GitHub added a `CNAME` file to the repository when you saved the domain. Run `git pull` once before your next push, or the push will be rejected. Nothing in the site itself needs changing: links are relative, and the 404 page detects a custom domain automatically.

GitHub's official guide is [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

---

## 5. Pre-launch checklist

- [ ] No `[PLACEHOLDER` left in `data.js` (search for it).
- [ ] Email address is correct and the Copy button works on the Contact page.
- [ ] GitHub and LinkedIn links open the right profiles.
- [ ] Each project's Live and Code links point to the right place.
- [ ] Real CV PDF in `assets/cv/`, and the Download button works.
- [ ] Every image has useful alt text.
- [ ] No technologies, claims or numbers you can't back up.
- [ ] Nothing private: no API keys, passwords, home address or phone number in any file.
- [ ] Checked on your phone and on a computer, in both the Night and Parchment themes.
- [ ] Tabbed through each page with the keyboard. You can always see where you are, and the menu works.
- [ ] A made-up address like `.../portfolio/nope` shows the 404 page with a working **Go home** button.

---

## Accessibility notes

- Semantic landmarks, a "Skip to content" link, a visible focus outline, and keyboard-operable menu and theme toggle (Esc closes the menu).
- Every text colour meets WCAG AA contrast (4.5:1) on every background in both themes.
- Animations (typing, drifting stars, rotating ring, blinking cursor) switch off when the visitor's device asks for reduced motion.
- ASCII art is labelled for screen readers, and decorative elements are hidden from them.

## Credits

All botanical ASCII art was generated from public-domain images on Wikimedia Commons:

- *Sabdarifa*: woodcut from Rembert Dodoens, 1583. [Source](https://commons.wikimedia.org/wiki/File:Sabdarifa_646_Dodoens_1583.png)
- *Bahobab* (baobab): Prospero Alpino, 1735. [Source](https://commons.wikimedia.org/wiki/File:Bahobab_Alpin_1735_alpha.png)
- *Palma Thebaica* (doum palm): Richard Pococke, 1743. [Source](https://commons.wikimedia.org/wiki/File:Palma_Thebaica_-_Pococke_Richard_-_1743.jpg)
- *Elaeis guineensis* (oil palm): Franz Eugen Köhler, *Köhler's Medizinal-Pflanzen*, 1887. [Source](https://commons.wikimedia.org/wiki/File:Elaeis_guineensis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-056.jpg)

Fonts come from Google Fonts: Cormorant Garamond, IBM Plex Sans and JetBrains Mono, all under the SIL Open Font License.
