# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Next.js, Turbopack default)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)

There is no test suite configured in this repository.

## Architecture

This is a French-language marketing/brochure site for MATLOC (a Benin-based construction-equipment rental company), built on the Next.js App Router with React 19 and Tailwind CSS 4.

### Route structure (`app/`)

Static marketing pages: `/`, `/apropos`, `/services`, `/realisations` (+ dynamic `/realisations/[slug]`), `/contact`. Every page component is a client component (`"use client"`) because they all read translated strings from the i18n context. The only server-side logic is the API route `app/api/forms/route.ts`, which handles both the contact and quote (devis) forms.

### Content model: static data vs. translated strings (two separate sources)

Structural/non-text content (icons, image paths, ids, stats, categories, video URLs) lives in `public/assets/assets.tsx` — e.g. `SERVICES`, `CONTACT_INFO`, `VALUES`, `MEMBERS`, `VIDEOS`, `ACHIEVEMENTS`, `PROJECTS`. This file is imported via the `@/public/assets/assets` path.

All user-facing text lives separately in `lib/i18n.ts`, as a single large `resources` object with parallel `fr`/`en` trees under one `translation` namespace (no per-locale files, no routing-based locale). Components join the two: they iterate a static array from `assets.tsx` for structure, then look up the actual label text by id via `t(\`data.services.${s.id}.title\`)` etc. When adding or editing a content item (a service, an achievement, a team member), you generally need to touch **both** files — the static entry in `assets.tsx` and the matching key in both `fr` and `en` in `lib/i18n.ts`.

### i18n runtime

`lib/i18n.ts` configures `i18next` with `i18next-browser-languagedetector` (detects from `localStorage`, falls back to `navigator`), default/fallback language `fr`. `contexts/I18nContext.tsx` wraps this in a React context (`useI18n()` → `{ language, t, changeLanguage }`) rather than exposing `i18next`/`react-i18next` hooks directly. Note the deliberate hydration guard in that file: state always renders `"fr"` on first render and only syncs to the detected language inside a `useEffect`/`queueMicrotask`, to keep SSR and first client render identical and avoid hydration mismatches. Preserve this pattern if you touch language detection — don't read `i18n.language` directly during render.

### Forms and email

`components/DevisForm.tsx` (quote request) and `components/ContactForm.tsx` both POST to `app/api/forms/route.ts` with a `formType: "quote" | "contact"` discriminator. The route validates input, then sends mail via `nodemailer` using SMTP credentials from env vars (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM`, `MAIL_TO` — see `.env.example`). Email HTML bodies are rendered by `components/emails/emails.tsx` (`renderContactEmail` / `renderQuoteEmail`). Service option labels for the quote form come from `constants/form.ts` (`SERVICE_OPTIONS`), not from `assets.tsx`.

### Unused scaffolding

`lib/auth.ts`, `services/auth.ts`, `contexts/AuthContext.tsx`, `providers/AuthProvider.tsx`, `hooks/useAuth.tsx`, `types/user.ts`, and `middlewares/index.ts` are all empty placeholder files — no auth or middleware is currently implemented. Don't assume these wire up to anything.

### Styling

Tailwind CSS 4 via `@tailwindcss/postcss` (no `tailwind.config.*` — v4 uses CSS-based config in `app/globals.css`). Custom utility classes like `btn-primary`, `btn-outline-white`, `section-title`, `container-site` are defined there rather than composed inline everywhere.

### Path aliases

`@/*` maps to the repo root (see `tsconfig.json`), so `@/components/...`, `@/lib/...`, `@/public/assets/assets` etc. all resolve from the project root, not from `app/`.
