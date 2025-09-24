# Repository Guidelines

## Project Structure & Module Organization
The static bundle lives at `index.html`, with global styles in `styles.css` and navigation logic in `script.js`. Feature-specific scripts (`animations.js`, `loading-screen.js`, `password-protection.js`) sit alongside `manifest.json` and `sw.js` at the project root. Processed assets are under `Resourcers/`: raw inputs in `Images/`, compressed results in `Images/optimized/`, WebP variants in `Images/webp/`, and logos in `Logo/`. Edit only the non-minified sources; `*.min.css` and `*.min.js` are build outputs.

## Build, Test, and Development Commands
- `node minify.js` regenerates `styles.min.css` and `script.min.js` from the readable sources.
- `bash optimize-images.sh` resizes and compresses assets into `Resourcers/Images/optimized/` (requires `sharp-cli`).
- `bash convert-to-webp.sh` converts optimized assets into WebP via `cwebp`, preserving size metrics in the log.
- `node update-html-webp.js` injects `data-webp` attributes so markup can swap fallbacks.
- `python3 -m http.server 4173` serves the site locally at `http://localhost:4173/index.html` for manual QA.

## Coding Style & Naming Conventions
Use four-space indentation across HTML, CSS, and JS. Keep CSS selectors in kebab-case, JavaScript variables and functions in camelCase, and match slide-based asset names (e.g., `slide-06-host.jpg`). Reuse declared CSS custom properties in `:root` before introducing new ones, and avoid editing generated `.min.*` files directly.

## Testing Guidelines
There is no automated test suite. After changes, reload the local server, verify navigation dots, loading screen, and password gate across desktop, tablet, and mobile widths. Run Chrome Lighthouse or open `performance-test.html` to spot regressions in animation smoothness, lazy loading, and performance metrics.

## Commit & Pull Request Guidelines
Write concise, imperative commit messages mirroring existing history (e.g., `Add password protection`, `Remove slide-based scroll`). Each PR should highlight intent, mention affected sections or slides, link tracking issues, and include before/after screenshots or recordings for UX changes. Note any manual follow-up steps such as rerunning image pipelines.

## Asset Workflow Tips
Before shipping assets, run the optimize and WebP scripts, then confirm that new files land in the correct `Resourcers/Images` subfolders. Keep original sources intact for future processing and document any third-party licenses in the asset metadata when applicable.
