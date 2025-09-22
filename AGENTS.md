# Repository Guidelines

## Project Structure & Module Organization
The site ships as a static bundle rooted at `index.html`, supported by `styles.css` for primary styling, `script.js` for navigation logic, and focused modules such as `animations.js`, `loading-screen.js`, and `password-protection.js`. Minified files (`*.min.css`, `*.min.js`) are generated artifacts—modify the readable sources only. Assets live under `Resourcers/`: raw inputs in `Images/`, processed outputs in `Images/optimized/`, WebP conversions in `Images/webp/`, and brand assets in `Logo/`. Use `manifest.json`, `sw.js`, and `performance-test.html` when preparing deployments or perf checks.

## Build, Optimize & Development Commands
- `node minify.js` – regenerates `styles.min.css` and `script.min.js` from the editable sources.
- `bash optimize-images.sh` – requires `sharp` CLI (`npm install --global sharp-cli`) and rescales/compresses assets into `Resourcers/Images/optimized/`.
- `bash convert-to-webp.sh` – converts optimized images to WebP using `cwebp` (`brew install webp`), keeping size metrics in the log.
- `node update-html-webp.js` – injects `data-webp` attributes so the markup can swap WebP fallbacks.
- `python3 -m http.server 4173` – quick local preview; open `http://localhost:4173/index.html`.

## Coding Style & Naming Conventions
Use four-space indentation in HTML, CSS, and JS to match the existing files. Keep CSS selectors in kebab-case, JavaScript variables in camelCase, and avoid editing generated `.min.*` files. Maintain CSS custom properties declared in `:root` and reuse utility classes instead of duplicating rules. When adding assets, mirror the naming used by slide/page order (e.g., `slide-06-host.jpg`) to keep background bindings predictable.

## Testing & QA Guidelines
There is no automated suite; rely on manual verification. After changes, reload via the local server, test the navigation dots, loading screen, and password gate across desktop, tablet, and mobile breakpoints. Run Lighthouse in Chrome or open `performance-test.html` for quick audits, ensuring animations remain smooth and lazy loading is intact.

## Commit & Pull Request Guidelines
Follow the concise, imperative style already in Git history (`Add password protection`, `Remove slide-based scroll`). Group logically related changes per commit and include asset outputs created by the scripts. PRs should describe the intent, mention affected sections/pages, and attach before/after screenshots or screen recordings for UX changes. Link tracking issues when available and call out any manual steps (e.g., rerunning image pipelines).
