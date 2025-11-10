## Purpose

This file contains concise, repository-specific guidance for AI coding agents (Copilot-style) to be immediately productive in the `library-project` front-end app.

Keep suggestions focused on concrete edits, follow the project's patterns, and run the standard dev/test/lint commands before proposing PR-ready changes.

## Quick facts

- Tech: React (JSX) + Vite. Entry: `src/main.jsx` -> `src/App.jsx`.
- Build tools: `vite` (see `vite.config.js`). Scripts in `package.json`:
  - `npm run dev` — start dev server with HMR
  - `npm run build` — production build
  - `npm run preview` — preview built output
  - `npm run lint` — run ESLint over the codebase
- No backend code in this repository; static frontend only. Static assets served from the project root/public (e.g. `/release-black.png` used in `src/App.jsx`).

## Project layout (important files)

- `src/main.jsx` — app bootstrap (ReactDOM.createRoot).
- `src/App.jsx` — main UI layout and examples of component structure, local state, and event handlers. Use this as the canonical example when adding new components.
- `src/*.css` (e.g. `index.css`, `App.css`) — global stylesheet imports; components use plain CSS classes (no CSS modules present).
- `public/` or root static files — place static images like `release-black.png` here; referenced as `/filename` in JSX.
- `vite.config.js` — plugin setup (`@vitejs/plugin-react`).
- `package.json` — dependencies and developer scripts.
- `eslint.config.js` — repository lint rules. Run `npm run lint` before submitting changes.

## Conventions and patterns (do not invent new ones without approval)

- Components are plain function components in `.jsx` files. Keep new components under `src/` (suggest `src/components/` for grouped components).
- Styling: use existing `.css` files and class names; keep patterns consistent with `App.css` (global class-based styling). Avoid introducing CSS-in-JS or CSS modules unless the repo is migrated.
- Assets: put images in `public/` (referenced with absolute paths like `/release-black.png`). Do not import them from nested paths unless bundling is intended.
- State and events: small local state lives in components (see `useState` usage in `src/App.jsx`). For larger state, propose a clear plan (e.g., add context or state management) and include a migration note.

## Common tasks and examples

- Add a new presentational component:
  - Create `src/components/MyComponent.jsx` (function component, export default).
  - Add CSS in `src/components/MyComponent.css` and import it from the component.
  - Import and use it from `src/App.jsx` for manual smoke testing.

- Change the header logo:
  - Replace `/release-black.png` in the project root (public) or update the `<img src="/..." />` in `src/App.jsx`.

- Verify work locally:
  - Start dev server: `npm run dev` (use HMR for fast iteration).
  - Run linter: `npm run lint` and fix any reported issues.
  - Build and preview: `npm run build` && `npm run preview` to validate production output.

## What not to change (unless necessary)

- `type` in `package.json` (currently `module`) — changing module format affects builds and import semantics.
- Core bundler config in `vite.config.js` unless adding a necessary plugin; propose changes and provide a reproducible test plan.

## PR guidance for suggestions from an AI agent

- Keep changes small and focused. Each suggested PR should include:
  1. What was changed (1-3 files is ideal for small features/bugfixes).
 2. How to test manually (dev steps above).
 3. Any lint fixes applied.
- If adding a new dependency, include why it is necessary, a minimal reproducible example, and run `npm install` locally before suggesting code.

## Where to look for examples

- UI patterns and markup: `src/App.jsx` (tabs, loan button, header + search UI)
- App bootstrapping: `src/main.jsx`
- Build & dev scripts: `package.json`

---

If any part of this is unclear or you'd like the instructions to prefer a different component layout or testing policy, tell me which area to expand and I'll iterate.
