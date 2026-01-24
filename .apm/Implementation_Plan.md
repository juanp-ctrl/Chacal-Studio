# Chacal Estudio Website – Implementation Plan

**Version:** 1.0.6
**Memory Strategy:** Dynamic-MD (directory structure with Markdown logs)
**Last Modification:** Added Tasks 9.11-9.14 (Cursor refactor, AnimatedText speed, IntroLoader deprecation, Projects section) - Manager Agent 9
**Project Overview:** Rebuild the Chacal Estudio website as a high-fidelity Next.js App Router landing, implementing the Figma Make design pixel-close with atomic design, React Compiler, `next-intl` i18n (Spanish + English), strong SEO/JSON-LD, accessibility, legal pages, cookie banner, and a contact form powered by React Hook Form, Zod, Cloudflare Turnstile, and Resend. Deployment via AWS Amplify with Husky-enforced quality gates.

---

## Phase 1: Project Setup & Tooling

### Task 1.1 – Initialize project workflow, branches, and quality tooling │ Agent_Frontend_Architecture

- **Objective:** Establish the Git branching model, linting/formatting toolchain, and Husky hooks to enforce code quality on every commit and push.
- **Output:** Configured `develop` and `main` branches; ESLint + Prettier config files; Husky pre-commit (lint) and pre-push (lint + build) hooks working with pnpm; CONTRIBUTING/README documentation.
- **Guidance:** Use modern Next.js/React ESLint presets. Husky hooks must work seamlessly with pnpm. Document the workflow so any contributor can onboard quickly.

1. **Git Branching:** Create `main` (production) and `develop` (integration) branches. Document the branching strategy in CONTRIBUTING.md or README.
2. **Linting & Formatting:** Set up ESLint with TypeScript and React plugins, plus Prettier (or equivalent). Align rules with modern Next.js and React best practices.
3. **Husky Hooks:** Configure Husky so pre-commit runs `pnpm lint` and pre-push runs `pnpm lint && pnpm build`. Verify hooks trigger correctly.
4. **Documentation:** Add README notes explaining how to run `pnpm dev`, `pnpm lint`, `pnpm build`, and the branching workflow.

---

### Task 1.2 – Configure Next.js app, React Compiler, and base infrastructure │ Agent_Frontend_Architecture

- **Objective:** Ensure the existing `chacal-web` Next.js app is correctly configured for App Router, React Compiler, and TypeScript strictness, and install all core dependencies needed for later phases.
- **Output:** Updated `next.config.ts` with React Compiler and App Router settings; all core dependencies installed (`next-intl`, `react-hook-form`, `zod`, `resend`, `@marsidev/react-turnstile`); verified `pnpm dev`, `pnpm lint`, and `pnpm build` pass.
- **Guidance:** Do not wire features yet—only install and configure. React Compiler requires specific Next.js config; follow official docs. Keep TypeScript strict for type safety.

1. **Review & Update Config:** Audit `next.config.ts` and enable React Compiler (`experimental.reactCompiler`), confirm App Router structure in `app/`, and enforce TypeScript strictness in `tsconfig.json`.
2. **App Router Validation:** Ensure the project uses the `app/` directory correctly with layouts, pages, and server/client component conventions.
3. **Install Dependencies:** Add `next-intl`, `react-hook-form`, `@hookform/resolvers`, `zod`, `resend`, `@marsidev/react-turnstile` (or equivalent Turnstile client) without wiring them yet.
4. **Build Verification:** Run `pnpm dev`, `pnpm lint`, and `pnpm build` to confirm no errors after changes.

---

### Task 1.3 – Prepare AWS Amplify deployment pipeline │ Agent_Frontend_Architecture

- **Objective:** Document and prepare the deployment flow for AWS Amplify so production deploys from `main` are straightforward and environment variables are clearly specified.
- **Output:** `amplify.yml` (or equivalent build spec) running install, lint, and build; documented env var requirements (Resend API key, Turnstile site/secret keys); README notes on deployment.
- **Guidance:** Do not commit secrets. Amplify build settings should mirror local Husky checks. Optionally document `develop` branch for preview environments.

1. **Deployment Documentation:** Write deployment flow notes (connect repo to Amplify, deploy from `main`, optional preview from `develop`).
2. **Build Spec:** Create `amplify.yml` specifying `pnpm install`, `pnpm lint`, and `pnpm build` steps aligned with local hooks.
3. **Environment Variables:** List required env vars (`RESEND_API_KEY`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) and add placeholder documentation without committing secrets.

---

## Phase 2: Design System & Global Layout

### Task 2.1 – Define design tokens and theming based on Figma │ Agent_Design_System

- **Objective:** Extract and implement design tokens (colors, typography, spacing, radii) from the Figma file to ensure visual consistency across all components.
- **Output:** Centralized design tokens (CSS variables or a tokens module) including brand blue `#2F2E59`; no theme switcher (fixed brand background).
- **Guidance:** Use Figma MCP or manual extraction. Tokens should be easily consumable by Tailwind config or CSS-in-JS. Ignore any Figma theme switcher—always use the brand blue background.

1. **Token Extraction:** Extract typography (font families, sizes, weights, line heights), color palette (brand blue `#2F2E59`, accent colors, text colors), spacing scale, and border-radius values from Figma.
2. **Token Implementation:** Implement tokens as CSS custom properties in `globals.css` or a dedicated `design-tokens.css`/module, ensuring they are easily referenced by components.
3. **Theme Lock:** Enforce the fixed brand blue background throughout the app; remove or ignore any Figma theme switcher behavior.

---

### Task 2.2 – Build core atomic components (atoms and molecules) │ Agent_Design_System

- **Objective:** Create reusable, accessible atomic components (buttons, headings, text, links, icons, cards, badges) derived from the Figma design, using the design tokens.
- **Output:** A set of typed React components in an atomic design structure (`components/atoms/`, `components/molecules/`) that are composable and accessible.
- **Guidance:** Refactor any Figma-generated code into clean, idiomatic React. Prioritize accessibility (semantic HTML, focus states, ARIA where needed). Components should accept props for flexibility.

1. **Component Identification:** Review Figma for common atomic elements: Button, Heading (h1–h6), Text/Paragraph, Link, Icon, Badge, Card, Input, etc.
2. **Component Implementation:** Build each component using design tokens, with TypeScript props interfaces, semantic HTML, and accessible defaults (e.g., proper button types, focus-visible states).
3. **Figma Code Refactor:** Where Figma Make provides React code, translate it into clean, typed, composable components—do not use Figma code verbatim if it violates best practices.

---

### Task 2.3 – Implement global layout, navigation, and footer │ Agent_Design_System

- **Objective:** Create the global layout shell (header, navigation, footer) matching the Figma structure, wired to anchor links and routes for all main sections and pages.
- **Output:** `RootLayout` component with header/nav/footer; navigation items linked to Home sections (The Method, Projects, Our Impact, Services, Plant Based Treaty) and pages (`/projects`); responsive and accessible layout.
- **Guidance:** Use atomic components. Ensure responsive behavior (mobile hamburger menu if in Figma). Add skip links and landmark roles for accessibility.

1. **Layout Shell:** Implement a `RootLayout` (or equivalent) wrapping all pages, including `<header>`, `<main>`, and `<footer>` elements with appropriate ARIA landmarks.
2. **Navigation Wiring:** Create header navigation with links/anchors to Home sections (The Method, Projects preview, Our Impact, Services, Plant Based Treaty) and to `/projects` page. Support smooth scrolling for in-page anchors.
3. **Footer Implementation:** Build footer with contact info, social links, legal page links (privacy, terms), and any additional content from Figma.
4. **Responsive & A11y:** Ensure the layout is responsive (mobile, tablet, desktop) per Figma; add skip-to-content link and keyboard-navigable menu.

---

## Phase 3: Page & Section Implementation from Figma

### Task 3.1a – Implement Home hero section │ Agent_Feature_Pages

- **Objective:** Build the hero section of the Home page matching the Figma design, using atomic components and design tokens.
- **Output:** Hero section component with headline ("Comunicando lo humano"), subtext, imagery/background, and CTA (if present), styled pixel-close to Figma.
- **Guidance:** Depends on Phase 2 design system. Ensure responsive behavior and any entry animations are faithful to Figma.

1. **Hero Structure:** Implement the hero section with headline, supporting text, and any imagery or background treatment from Figma.
2. **Styling & Animation:** Apply design tokens for typography, color, spacing; add entry animations if present in Figma prototype (CSS or Framer Motion).

---

### Task 3.1b – Implement "The Method" section │ Agent_Feature_Pages

- **Objective:** Build "El Método" / "The Method" section with the process steps visualization as designed in Figma.
- **Output:** Section component displaying the method steps (análisis → descubrimiento → objetivos → estrategias → soluciones → resultados → huellas) with appropriate visual treatment.
- **Guidance:** Use design tokens and atomic components. Ensure responsive layout and accessible markup (e.g., ordered list or descriptive structure).

1. **Section Implementation:** Build the section with the method steps visualization (timeline, cards, or diagram as in Figma).
2. **Responsive & A11y:** Ensure the section is responsive and uses semantic, accessible markup.

---

### Task 3.1c – Implement "Our Impact" and "Services" sections │ Agent_Feature_Pages

- **Objective:** Build "Nuestro Impacto" (Our Impact) and "Lo que hacemos" (Services) sections as per Figma, showcasing the three impact pillars and service offerings.
- **Output:** Two section components: Our Impact (equipo, comunidad, planeta pillars) and Services (Consultoría, Asesoría, Diagnóstico, Gestión, Consultoría Sustentable).
- **Guidance:** Use cards or list components from the design system. Ensure responsive grid/layout and accessible markup.

1. **Our Impact Section:** Implement the three pillars (En el equipo, En la comunidad, En el planeta) with icons/visuals and descriptions from Figma.
2. **Services Section:** Implement the service offerings as cards or a list, including the transversal "Consultoría Sustentable" service.
3. **Responsive & A11y:** Ensure both sections use design tokens, are responsive, and have accessible structure.

---

### Task 3.1d – Implement "Plant Based Treaty" alliance section │ Agent_Feature_Pages

- **Objective:** Build the Plant Based Treaty partnership section with mission summary, 3R principles, endorsements, CTAs, and donation link as per Figma.
- **Output:** Section component with treaty mission, 3R principles (Relinquish, Redirect, Restore), endorsement mentions, CTAs (sign as individual/org/business, donate), and links to plantbasedtreaty.org.
- **Guidance:** Ensure CTAs are prominent; external links open in new tab with `rel="noopener"`. Match visual prominence from Figma.

1. **Section Content:** Implement the Plant Based Treaty section with mission summary, 3R principles, endorsement highlights, and Chacal's contribution.
2. **CTAs & Links:** Add prominent CTAs for signing and donating, linking to plantbasedtreaty.org with appropriate target and rel attributes.

---

### Task 3.1e – Implement remaining content sections (ODS, alliances, footer content) │ Agent_Feature_Pages

- **Objective:** Build the ODS (Objetivos de Desarrollo Sostenible), "Somos parte de" alliances, and any remaining Home page content sections from Figma.
- **Output:** Section components for ODS (with icons and descriptions), alliances (Animal Save Movement, Clean Creatives, ati, Red Creer), and any other Home content.
- **Guidance:** Use design system components. ODS section should include relevant ODS icons/logos. Alliance section should include logos and brief descriptions.

1. **ODS Section:** Implement the Sustainable Development Goals section with icons/logos for ODS 5, 8, 11, 12, 13 and their descriptions.
2. **Alliances Section:** Implement "Somos parte de" with logos and descriptions for Animal Save Movement, Clean Creatives, ati, Red Creer.
3. **Remaining Sections:** Implement any other Home page content sections visible in Figma not covered by previous tasks.

---

### Task 3.2 – Implement Projects index page │ Agent_Feature_Pages

- **Objective:** Build the `/projects` page listing all projects with title, summary, tags, and thumbnail, using design system components.
- **Output:** Projects index page with responsive grid/list of project cards, each linking to `/projects/[slug]`.
- **Guidance:** Define a static data model for projects (can be JSON or TypeScript array). Ensure page is accessible and SEO-friendly.

1. **Data Model:** Define a project data model (title, slug, summary, tags, thumbnail) as a static JSON or TypeScript array.
2. **Page Implementation:** Build the `/projects` page with a responsive grid/list of project cards using design system components.
3. **Linking & A11y:** Ensure each card links to `/projects/[slug]` and the page is accessible (semantic markup, focus states).

---

### Task 3.3 – Implement Project detail pages │ Agent_Feature_Pages

- **Objective:** Build the dynamic `/projects/[slug]` route for individual project pages with content structure consistent with the brand.
- **Output:** Dynamic route rendering project detail pages with images, text blocks, and case-study style sections; 404 handling for invalid slugs.
- **Guidance:** Use static generation (`generateStaticParams`) for known slugs. Ensure visual language matches the main design.

1. **Dynamic Route:** Implement `/projects/[slug]` using Next.js App Router dynamic segments and `generateStaticParams` for static generation.
2. **Content Structure:** Render project detail content (images, text blocks, case-study sections) using design system components.
3. **404 Handling:** Add sensible fallback and 404 behavior if a project slug does not exist.

---

## Phase 4: Internationalization & Content Localization

### Task 4.1 – Set up `next-intl` with App Router and routing │ Agent_i18n_SEO_Legal

- **Objective:** Install and configure `next-intl` for the App Router, implementing locale-based routing (Spanish and English) with SEO-friendly URLs.
- **Output:** `next-intl` configured with `i18n/request.ts`, plugin in `next.config.ts`, and top-level `[locale]` segment or cookie-based routing; both server and client components can access translations.
- **Guidance:** Follow `next-intl` App Router guide. Decide on `[locale]` segment routing (e.g., `/es/...`, `/en/...`) for SEO. Default locale should be Spanish (`es-AR`).

1. **Install & Configure:** Install `next-intl` and configure `i18n/request.ts` and plugin integration in `next.config.ts` per App Router docs.
2. **Routing Strategy:** Implement top-level `[locale]` segment routing (recommended for SEO) with Spanish (`es-AR`) as default and English (`en`) as alternate.
3. **Component Access:** Ensure both server components (via `getTranslations`) and client components (via `useTranslations`) can access translations.

---

### Task 4.2 – Create and organize translation messages for all pages and sections │ Agent_i18n_SEO_Legal

- **Objective:** Create structured message files for Spanish and English covering all UI copy, and replace hardcoded strings in components with translation hooks.
- **Output:** `messages/es-AR.json` and `messages/en.json` with structured keys for all pages, sections, navigation, footer, and legal placeholders; all components using `next-intl` hooks.
- **Guidance:** Depends on Phase 3 pages/sections. Structure keys logically (e.g., `HomePage.hero.headline`, `Nav.projects`). Verify language switching or locale routing works correctly.

1. **Message Files:** Create `messages/es-AR.json` and `messages/en.json` with structured keys covering Home sections, Projects pages, navigation, footer, contact form, and legal page placeholders.
2. **Component Integration:** Replace all hardcoded strings in components with `useTranslations` or `getTranslations` hooks, using consistent key naming.
3. **Locale Switching Verification:** Test that locale routing (e.g., `/es/...` vs `/en/...`) or language switcher renders correct content in both languages.

---

### Task 4.3 – Localize long-form content and ensure tone consistency │ Agent_i18n_SEO_Legal

- **Objective:** Integrate the provided Spanish long-form content into the translations system and draft/refine English equivalents that match Chacal Estudio's communication style.
- **Output:** Complete Spanish content for all sections (El aullido, El método, El presente que buscamos, Nuestro impacto, Lo que hacemos, alliances, ODS, Plant Based Treaty) and polished English translations in message files.
- **Guidance:** Preserve the tone, values, and terminology of Chacal Estudio. User review step for nuanced phrasing.

1. **Spanish Content Integration:** Add the provided Spanish content for all major sections (El aullido, El método, El presente que buscamos, Nuestro impacto, Lo que hacemos, alliances, ODS descriptions, Plant Based Treaty) into `messages/es-AR.json`.
2. **English Translation:** Draft or refine English equivalents in `messages/en.json` that match the communication style, values, and positioning of Chacal Estudio.
3. **User Review Checkpoint:** Coordinate with the user for any nuanced phrasing, terminology, or brand voice confirmation before finalizing.

---

## Phase 5: SEO, Accessibility, Legal & Cookie Banner

### Task 5.1 – Implement metadata and JSON-LD structured data │ Agent_i18n_SEO_Legal

- **Objective:** Implement locale-aware metadata (titles, descriptions, keywords) and JSON-LD structured data for key pages, following SEO best practices for communication agencies.
- **Output:** Next.js metadata exports for Home, Projects index, and Project detail pages (locale-aware); JSON-LD scripts (`Organization`, `LocalBusiness`, `WebSite`) embedded in pages.
- **Guidance:** Analyze current site ([chacalestudio.ar](https://chacalestudio.ar)) for baseline metadata. Research SEO keywords for Argentinian communication/creative agencies. JSON-LD should include services, contact info, and social profiles.

1. **Metadata Derivation:** Analyze [chacalestudio.ar](https://chacalestudio.ar) and research SEO patterns for communication agencies to derive titles, descriptions, and keywords for each locale and key page.
2. **Metadata Implementation:** Implement Next.js `metadata` exports (App Router pattern) for Home, Projects, and Project detail pages, including locale-aware titles and descriptions.
3. **JSON-LD Structured Data:** Add JSON-LD scripts (`Organization` / `LocalBusiness` / `WebSite`) with services, contact info (`hola@chacalestudio.ar`), location (Patagonia Argentina), and social profiles, localized where appropriate.

---

### Task 5.2 – Implement accessibility improvements and validation │ Agent_i18n_SEO_Legal

- **Objective:** Review and improve accessibility across all components and pages, ensuring semantic HTML, ARIA usage, color contrast, focus states, and keyboard navigation.
- **Output:** Accessibility-compliant components and pages; Lighthouse/axe audit results with no critical issues; documentation of any remaining edge cases.
- **Guidance:** Pay special attention to color contrast with brand blue background. Ensure all interactive elements are keyboard accessible and focus-visible.

1. **A11y Review:** Audit components and pages for semantic HTML, ARIA roles/attributes, color contrast (especially white text on brand blue), focus states, and keyboard navigation.
2. **Issue Remediation:** Fix identified issues (add alt text, improve contrast, add focus-visible styles, correct heading hierarchy, etc.).
3. **Automated Validation:** Run Lighthouse and axe audits; address critical and serious issues. Document any remaining edge cases or known limitations.

---

### Task 5.3a – Draft and implement privacy policy page │ Agent_i18n_SEO_Legal

- **Objective:** Draft privacy policy content appropriate for the site's services and Argentinian context, and implement a dedicated privacy page in both languages.
- **Output:** `/privacy` (or `/privacidad`) page with localized privacy policy content, styled consistently with the design system, linked from footer.
- **Guidance:** Content should reflect the site's values and Argentinian legal norms. User review recommended before finalization.

1. **Content Drafting:** Draft privacy policy content covering data collection, usage, rights, and contact info, appropriate for Argentinian context and the site's ethical commitments, in Spanish and English.
2. **Page Implementation:** Implement `/privacy` (with locale routing) using design system components for consistent styling.
3. **Linking:** Add privacy policy link to the footer and any relevant legal references.

---

### Task 5.3b – Draft and implement terms and cookies policy page │ Agent_i18n_SEO_Legal

- **Objective:** Draft terms of service and cookie policy content, and implement a dedicated terms page in both languages.
- **Output:** `/terms` (or `/terminos`) page with localized terms and cookie policy content, styled consistently, linked from footer and cookie banner.
- **Guidance:** Content should align with Argentinian norms and the site's communication style. User review recommended.

1. **Content Drafting:** Draft terms of service and cookie policy content appropriate for the site's context and Argentinian legal norms, in Spanish and English.
2. **Page Implementation:** Implement `/terms` (with locale routing) using design system components.
3. **Linking:** Add terms page link to the footer and cookie banner.

---

### Task 5.3c – Implement cookie consent banner │ Agent_i18n_SEO_Legal

- **Objective:** Implement a cookie consent banner component that is localized, accessible, and persists the user's choice.
- **Output:** Cookie banner component displayed on first visit, with accept/decline options, localized text, accessible markup, and persistence (localStorage or cookie).
- **Guidance:** UX similar to the referenced example (Visual Ilusión). Banner should link to the terms/cookies page. Respect user choice on subsequent visits.

1. **Banner Component:** Implement a cookie consent banner using design system components, with accept/decline buttons and link to `/terms`.
2. **Localization:** Ensure banner text is localized (Spanish/English) via the i18n system.
3. **Persistence & A11y:** Persist user choice (localStorage or cookie) so the banner doesn't reappear after acceptance. Ensure the banner is accessible (focus management, keyboard operable, screen reader friendly).
4. **Integration:** Integrate the banner into the global layout so it appears on first visit.

---

## Phase 6: Contact Flow Integration (Resend, Turnstile, RHF, Zod)

### Task 6.1 – Design and implement the Contact form UI │ Agent_Contact_Integration

- **Objective:** Build the Contact form UI matching the Figma layout, with all fields, localized labels/placeholders, and the Turnstile widget.
- **Output:** Contact form component with fields (name, email, phone, organization, message), inline error states, localized text, and embedded Turnstile widget.
- **Guidance:** Depends on Phase 2 design system and Phase 4 i18n. Ensure accessible form markup (labels, error announcements).

1. **Form UI:** Implement the Contact form UI matching Figma, with fields: name, email, phone, organization, and message.
2. **Localization:** Ensure labels, placeholders, and help text are localized via the i18n system.
3. **Turnstile Widget:** Add the Cloudflare Turnstile widget in the appropriate location within the form.
4. **Accessibility:** Ensure accessible markup (associated labels, error announcements, focus management).

---

### Task 6.2 – Implement validation and form state with React Hook Form and Zod │ Agent_Contact_Integration

- **Objective:** Wire the Contact form with React Hook Form and Zod for schema-based validation, with localized error messages and clear UI states.
- **Output:** Contact form integrated with RHF + Zod resolver; validation errors displayed inline in the correct locale; pending, success, and error states handled in UI.
- **Guidance:** Zod schema should validate name (required), email (valid format), phone (optional, valid format), organization (optional), message (required, min length). Use i18n for error messages.

1. **Zod Schema:** Define a Zod schema for the contact form with sensible validation rules (name required, email valid, phone optional valid, organization optional, message required with min length).
2. **RHF Integration:** Integrate React Hook Form with `@hookform/resolvers/zod`, wiring the schema and connecting to form fields.
3. **Localized Errors:** Wire validation messages through the i18n system so errors display in the current locale.
4. **UI States:** Handle pending (submitting), success (confirmation message), and error (submission failed) states in the UI with clear, localized feedback.

---

### Task 6.3 – Integrate Resend and Turnstile verification in a secure API route │ Agent_Contact_Integration

- **Objective:** Implement a Next.js route handler that verifies the Turnstile token server-side and sends the contact form data via Resend to `hola@chacalestudio.ar`.
- **Output:** `/api/contact` route handler that validates Turnstile token, sends email via Resend on success, and returns localized success/error responses.
- **Guidance:** Use environment variables for secrets. Handle errors gracefully without leaking sensitive info. Follow Resend's Next.js integration patterns.

1. **Turnstile Verification:** Implement server-side verification of the Cloudflare Turnstile token using the secret key from env vars.
2. **Resend Email:** On successful verification, send an email via Resend to `hola@chacalestudio.ar` with the submitted form data (name, email, phone, organization, message), following Resend's Next.js patterns.
3. **Error Handling:** Handle and log errors gracefully (without leaking sensitive information); return localized success/failure JSON responses to the frontend.

---

## Phase 7: QA, Performance, and Deployment Finalization

### Task 7.1 – End-to-end QA across locales and pages │ Agent_Frontend_Architecture

- **Objective:** Manually test all pages, sections, and flows in both Spanish and English to catch visual, functional, or localization discrepancies.
- **Output:** QA report documenting any issues found; all critical issues triaged and addressed.
- **Guidance:** Test on multiple viewports (mobile, tablet, desktop). Verify all links, anchors, and in-page navigation. Compare implementation to Figma.

1. **Functional Testing:** Test navigation, sections, and flows on Home, Projects index, Project detail pages, and Contact form in both Spanish and English.
2. **Link & Anchor Verification:** Verify all links, anchors, and in-page navigation (header links to sections) behave as expected.
3. **Visual Comparison:** Compare implementation to Figma and capture any visual or functional discrepancies for triage.

---

### Task 7.2 – Performance and SEO verification │ Agent_Frontend_Architecture

- **Objective:** Run Lighthouse audits for performance, accessibility, best practices, and SEO; address major issues and confirm structured data validity.
- **Output:** Lighthouse reports for key pages in both locales; major issues addressed; structured data validated via Rich Results Test or similar.
- **Guidance:** Focus on Core Web Vitals, image optimization, and metadata completeness. Confirm JSON-LD is detected and error-free.

1. **Lighthouse Audits:** Run Lighthouse (or similar) for performance, accessibility, best practices, and SEO on Home, Projects, and Project detail pages in both locales.
2. **Issue Remediation:** Address major issues within scope (image optimization, layout shifts, metadata gaps, contrast).
3. **Structured Data Validation:** Confirm JSON-LD is detected and valid using Google's Rich Results Test or Schema.org validator.

---

### Task 7.3 – Finalize deployment on AWS Amplify │ Agent_Frontend_Architecture

- **Objective:** Connect the repository to AWS Amplify, configure build settings and environment variables, deploy from `main`, and validate the live site.
- **Output:** Live production site on AWS Amplify; environment variables configured (Resend, Turnstile); deployment process and rollback strategy documented.
- **Guidance:** Ensure Amplify build settings match local scripts and Husky checks. Test contact flow on live site.

1. **Amplify Connection:** Ensure Amplify is connected to the repository with build settings matching local scripts (`pnpm install`, `pnpm lint`, `pnpm build`).
2. **Environment Variables:** Configure required env vars (`RESEND_API_KEY`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) in Amplify's environment settings.
3. **Production Deployment:** Deploy from `main`, validate the live site (all pages, contact flow), and document the deployment process and rollback strategy.

---

### Task 7.4 – IntroLoader Animation Rework │ Agent_Frontend_Architecture

- **Objective:** Fix the IntroLoader animation to scale images DOWN (not up) at the end, animate VideoHeroSection entry from small to full size for smooth transition, and fix the cycling taglines with italic styling and left-to-center animation.
- **Output:** Updated IntroLoader with: (1) images scaling down to diminutive size in final animation, (2) VideoHeroSection starting small and expanding to full screen, (3) working tagline cycling with italic text and left-to-center entry animation.
- **Guidance:** The goal is to create a seamless visual connection between the loader exit and the hero entrance. Use Framer Motion for animations. Ensure the tagline interval is properly managed.

1. **Fix Tagline Cycling:** Debug and fix the interval-based tagline cycling that's stuck on one text. Ensure proper state updates and interval cleanup.
2. **Style Taglines:** Add italic styling to taglines and change animation from y-axis to x-axis (left-to-center entry).
3. **Reverse Image Scale Animation:** Change the exit animation so images scale DOWN (become diminutive) instead of scaling up.
4. **VideoHeroSection Entry Animation:** Add initial state where VideoHeroSection starts at diminutive scale, then animates to full size to seamlessly connect with the loader exit.
5. **Coordinate Timing:** Ensure the loader exit and hero entrance animations overlap smoothly.

---

### Task 7.5 – Add MarqueeSection and FutureSection │ Agent_Frontend_Architecture

- **Objective:** Implement the missing MarqueeSection (text banner) and FutureSection ("El futuro que construimos") from the Figma design, placing them in the correct positions on the homepage.
- **Output:** Two new section components integrated into the homepage: MarqueeSection between HeroSection and MethodSection, FutureSection between MethodSection and ImpactSection. Full i18n support for both.
- **Guidance:** Reference `landing-page-redesign-source/src/components/MarqueeSection.tsx` and `FutureSection.tsx` for design patterns. Adapt to use the project's design system, next-intl translations, and Framer Motion.

1. **Create MarqueeSection:** Build an infinite scrolling text banner using CSS or Framer Motion animation. Use gradient background matching brand colors.
2. **Create FutureSection:** Implement the "El futuro que construimos" section with text content and image, using the two-column grid layout from the reference.
3. **Add Translations:** Add translation keys to `messages/es.json` and `messages/en.json` for both sections.
4. **Integrate into Homepage:** Update `app/[locale]/page.tsx` to include both sections in the correct order.

---

### Task 7.6 – Entry Animations and Button Cursor Fix │ Agent_Frontend_Architecture

- **Objective:** Add scroll-triggered entry animations to all sections for a modern, dynamic feel, and ensure all buttons have `cursor: pointer` styling.
- **Output:** All homepage sections have staggered fade-in/slide-up animations on scroll. All buttons across the codebase have cursor pointer.
- **Guidance:** Use Framer Motion's `useInView` hook for scroll-triggered animations. Apply consistent animation patterns (fade + slide). Check Button component and any inline button styles.

1. **Audit Button Cursor:** Search codebase for all button elements and ensure `cursor-pointer` class or CSS is applied. Fix in Button atom and any inline usages.
2. **Add Section Entry Animations:** Implement scroll-triggered animations for each section (HeroSection, MethodSection, ImpactSection, ServicesSection, etc.) using Framer Motion.
3. **Stagger Child Animations:** For sections with multiple cards/items, add staggered reveal animations.
4. **Verify Animation Timing:** Ensure animations feel smooth and don't interfere with user scrolling.

---

### Task 7.7 – React ViewTransition Implementation │ Agent_Frontend_Architecture

- **Objective:** Implement React's `<ViewTransition>` component throughout the application, especially for the Projects section navigation, to create smooth page transitions.
- **Output:** ViewTransition wrapper around key navigable elements. Smooth cross-fade or custom transitions between project cards and detail pages. Updated to React Canary if needed.
- **Guidance:** ViewTransition is in React Canary. Verify React version supports it, upgrade if needed. Focus on Projects index → detail page transitions. Reference https://react.dev/reference/react/ViewTransition.

1. **Verify/Upgrade React:** Check if current React 19.2.0 includes ViewTransition. If not, upgrade to React Canary.
2. **Wrap Project Cards:** Add `<ViewTransition>` around project cards with appropriate names for shared element transitions.
3. **Wrap Project Detail Content:** Add corresponding `<ViewTransition>` with matching names on project detail pages.
4. **Add Global ViewTransition:** Consider wrapping page content for cross-page transitions.
5. **Test Navigation:** Verify smooth transitions when navigating between projects.

---

### Task 7.8 – Mobile Responsiveness Review │ Agent_Frontend_Architecture

- **Objective:** Comprehensive mobile responsiveness review across all pages, with special focus on Header breakpoints and burger menu behavior.
- **Output:** All content displays correctly on mobile viewports. Header breakpoint optimized for when to show/hide nav vs burger menu. Burger menu fully functional across key scenarios.
- **Guidance:** Test on common mobile viewports (375px, 390px, 414px). Review header at various widths to find optimal breakpoint. Test burger menu open/close, navigation, scroll behavior.

1. **Header Breakpoint Analysis:** Review current header breakpoint for nav/burger toggle. Test at various widths to determine optimal breakpoint for shorter devices.
2. **Burger Menu Testing:** Test burger menu open/close behavior, link navigation, scroll handling, and overlay dismissal.
3. **Content Review:** Check all sections on mobile for overflow issues, text sizing, spacing, and touch target sizes.
4. **Form Review:** Verify contact form is usable on mobile with proper input sizing and keyboard handling.
5. **Document Findings:** Note any issues found and fixes applied.

---

## Phase 8: UI/UX Enhancements

### Task 8.1 – Lighthouse Metrics Optimization │ Agent_Frontend_Architecture

- **Objective:** Analyze current Lighthouse scores and implement optimizations to improve Performance, Accessibility, Best Practices, and SEO metrics.
- **Output:** Improved Lighthouse scores across all categories; documented optimizations applied; before/after comparison.
- **Guidance:** Focus on Core Web Vitals (LCP, FID, CLS), image optimization, font loading, and accessibility improvements. User will provide current Lighthouse summary as baseline.

1. **Baseline Analysis:** Review user-provided Lighthouse summary to identify key areas for improvement.
2. **Performance Optimization:** Address largest contentful paint (LCP), cumulative layout shift (CLS), and total blocking time issues.
3. **Image Optimization:** Ensure all images use Next.js Image component with proper sizing, lazy loading, and modern formats.
4. **Font Loading:** Optimize font loading strategy to prevent layout shifts.
5. **Accessibility Fixes:** Address any accessibility issues identified in Lighthouse audit.

---

### Task 8.2 – Custom Cursor Implementation │ Agent_Frontend_Architecture

- **Objective:** Implement a custom cursor using the white Chacal logo SVG that follows the mouse pointer across the site.
- **Output:** Custom cursor component that displays the white Chacal logo SVG following the mouse; smooth tracking animation; proper fallback for touch devices.
- **Guidance:** Use Framer Motion for smooth cursor tracking. Hide on mobile/touch devices. Ensure the cursor doesn't interfere with clickable elements. Consider blend modes or opacity for visibility on different backgrounds.

1. **Create Cursor Component:** Build a custom cursor component using the white Chacal logo SVG with Framer Motion for smooth position tracking.
2. **Mouse Event Handling:** Track mouse position globally and update cursor position with smooth interpolation.
3. **Touch Device Detection:** Detect touch devices and disable custom cursor, showing default cursor instead.
4. **Interactive States:** Add hover states when over interactive elements (scale, color change, or other effect).
5. **Integration:** Add the custom cursor to the global layout.

---

### Task 8.3 – Hero Section Letter-by-Letter Animation │ Agent_Frontend_Architecture

- **Objective:** Add a letter-by-letter reveal animation to the hero section headline "Comunicando lo humano" for an engaging entry effect.
- **Output:** Hero headline animates letter-by-letter on page load with staggered timing; smooth and readable animation; respects reduced motion preferences.
- **Guidance:** Use Framer Motion's stagger children pattern. Split text into individual characters/spans. Consider opacity and y-position animation per character. Add reduced motion media query support.

1. **Text Splitting Utility:** Create a utility or component to split text into individual character spans for animation.
2. **Stagger Animation:** Implement staggered fade-in/slide-up animation for each character using Framer Motion variants.
3. **Timing Configuration:** Fine-tune animation duration, stagger delay, and easing for optimal readability.
4. **Reduced Motion Support:** Add `prefers-reduced-motion` support to disable or simplify animation for accessibility.
5. **Integration:** Apply the animation to the HeroSection headline component.

---

### Task 8.4 – Mobile Menu Staggered Animation │ Agent_Frontend_Architecture

- **Objective:** Add staggered reveal animation to mobile menu items that animate from right to left on open, and reverse on close.
- **Output:** Mobile menu items animate individually with stagger effect; right-to-left entrance on open; left-to-right exit on close; smooth and performant.
- **Guidance:** Use Framer Motion's AnimatePresence and staggerChildren. Each menu item should slide from right (off-screen) to center. Reverse the animation on close with proper exit variants.

1. **Menu Item Animation Variants:** Create Framer Motion variants for menu item enter (right to center) and exit (center to right) animations.
2. **Stagger Configuration:** Configure staggerChildren on the parent container for sequential item animation.
3. **Open Animation:** Implement staggered right-to-left reveal when menu opens.
4. **Close Animation:** Implement staggered left-to-right exit when menu closes (reverse order).
5. **Performance:** Ensure animations are GPU-accelerated and don't cause jank.

---

### Task 8.5 – Method Section Card Styling Update │ Agent_Frontend_Architecture

- **Objective:** Update the Method section cards to use the primary brand color background with white text for better visual consistency.
- **Output:** Method section cards have primary color (`#2F2E59`) background; all text is white; icons and other elements adjusted for visibility on dark background.
- **Guidance:** Update MethodSection component styles. Ensure proper contrast for accessibility. Adjust hover states to work with new color scheme.

1. **Card Background Update:** Change method card background from current styling to primary brand color (`bg-primary`).
2. **Text Color Update:** Update all text within cards to white for proper contrast.
3. **Icon Styling:** Adjust icon colors and backgrounds to work with the dark card background.
4. **Hover States:** Update hover effects to provide visual feedback on the primary background.
5. **Accessibility Check:** Verify color contrast meets WCAG standards for the new color scheme.

---

## Phase 9: Maintainability & Bug Fixing

> **Note:** This is an ongoing maintenance phase. Tasks will be added as bugs are discovered or improvements are needed. The phase remains open until a new major feature phase is required.

### Task 9.1 – Fix Project Pages 500 Error in Production │ Agent_Frontend_Architecture

- **Objective:** Fix the critical DYNAMIC_SERVER_USAGE error causing 500 Internal Server Error on project detail pages (`/projects/[slug]`) in production builds.
- **Output:** Project detail pages render correctly in production mode (`pnpm build && pnpm start`); no 500 errors; proper static generation.
- **Guidance:** The error `digest: 'DYNAMIC_SERVER_USAGE'` indicates a server component is using dynamic APIs (cookies, headers, searchParams) that prevent static generation. Investigate the project detail page and its dependencies. Ensure `generateStaticParams` is properly implemented.

1. **Diagnose Error:** Run `pnpm build` and check build output for errors. Test `pnpm start` and navigate to project pages to reproduce the issue.
2. **Identify Dynamic Usage:** Search for dynamic API usage in project page and imported components (`cookies()`, `headers()`, `useSearchParams()`, `next-intl` dynamic features).
3. **Fix Static Generation:** Ensure project pages can be statically generated. May require moving dynamic APIs to client components or using proper configuration.
4. **Verify Fix:** Run `pnpm build && pnpm start` and confirm all project pages load without 500 errors.
5. **Git Commit:** `git add -A && git commit -m "fix(task-9.1): resolve project pages 500 error in production"`

---

### Task 9.2 – Fix Contact Section Button Hover Logo Visibility │ Agent_Frontend_Architecture

- **Objective:** Fix the issue where logos in the Contact section disappear when hovering over the contact button (logos turn the same color as the orange background).
- **Output:** Contact section logos remain visible during button hover states; consistent behavior with Footer logos.
- **Guidance:** Compare `ContactSection.tsx` logo implementation with `Footer.tsx` which works correctly. The issue is likely related to CSS color inheritance or icon fill colors during hover states.

1. **Reproduce Issue:** Identify the exact hover behavior causing logo disappearance in Contact section.
2. **Compare Implementations:** Review Footer logos (which work correctly) vs Contact section logos.
3. **Fix Color Handling:** Update logo/icon colors to prevent inheritance issues during hover states.
4. **Verify Fix:** Test hover states on contact button and confirm logos remain visible.
5. **Git Commit:** `git add -A && git commit -m "fix(task-9.2): fix contact section logo visibility on button hover"`

---

### Task 9.3 – Implement Open Graph for Social Sharing │ Agent_Frontend_Architecture

- **Objective:** Implement proper Open Graph metadata for rich social sharing previews using `chacal-paisaje.webp` for Twitter cards and `logo.webp` for WhatsApp/other platforms.
- **Output:** Twitter Card displays `chacal-paisaje.webp` landscape image; WhatsApp and other platforms display `logo.webp`; proper locale-aware titles and descriptions.
- **Guidance:** Use Next.js metadata API with `openGraph` and `twitter` properties. Twitter prefers large landscape images (summary_large_image), WhatsApp uses og:image. May need different images for different platforms.

1. **Review Current Metadata:** Check existing Open Graph implementation in `app/[locale]/layout.tsx` and page components.
2. **Configure Twitter Card:** Set up Twitter metadata with `card: 'summary_large_image'` using `chacal-paisaje.webp` (landscape image).
3. **Configure Open Graph:** Set up og:image with `logo.webp` for WhatsApp and general social sharing.
4. **Add Image Metadata:** Ensure images have proper dimensions, alt text, and absolute URLs.
5. **Test Sharing:** Use social media debuggers (Twitter Card Validator, Facebook Sharing Debugger) to verify previews.
6. **Git Commit:** `git add -A && git commit -m "feat(task-9.3): implement Open Graph for social sharing"`

---

### Task 9.4 – Fix Dark Mode Text Contrast │ Agent_Frontend_Architecture

- **Objective:** Fix text contrast issues when device has dark mode enabled - sections with white backgrounds correctly change to black, but text remains blue which has no contrast on black backgrounds.
- **Output:** Text in white-background sections adapts to white color when dark mode is active; proper contrast maintained across all color schemes.
- **Guidance:** Use Tailwind's `dark:` variant to apply `dark:text-white` or appropriate contrast colors. Review all sections that have white backgrounds to ensure text adapts. Consider using CSS custom properties for easier theme management.

1. **Identify Affected Sections:** Find all sections with white/light backgrounds where text uses brand blue.
2. **Add Dark Mode Variants:** Apply `dark:text-white` or appropriate dark mode text colors to affected text elements.
3. **Test Dark Mode:** Enable system dark mode and verify all text has sufficient contrast.
4. **Consistency Check:** Ensure dark mode behavior is consistent across all pages and sections.
5. **Git Commit:** `git add -A && git commit -m "fix(task-9.4): fix dark mode text contrast issues"`

---

### Task 9.5 – Implement Lenis Smooth Scroll │ Agent_Frontend_Architecture

- **Objective:** Implement smooth scrolling across the entire site using Lenis library for a polished, modern scrolling experience.
- **Output:** Smooth scrolling enabled site-wide; Lenis integrated with React/Next.js App Router; compatible with existing Framer Motion animations.
- **Guidance:** Use Lenis (not Locomotive Scroll) as it maintains native scrollbar behavior and works alongside Framer Motion. Create a provider/context for global scroll instance. Ensure compatibility with existing scroll-triggered animations.

1. **Install Lenis:** Add `lenis` package to dependencies.
2. **Create Scroll Provider:** Build a `SmoothScrollProvider` component that initializes Lenis and provides the scroll instance via React Context.
3. **Integrate with Layout:** Wrap the app in the SmoothScrollProvider at the layout level.
4. **Configure Options:** Set appropriate smooth scrolling options (lerp, duration, easing).
5. **Framer Motion Compatibility:** Ensure existing scroll-triggered animations (useInView, etc.) work correctly with Lenis.
6. **Accessibility:** Respect `prefers-reduced-motion` preference by disabling smooth scroll for users who prefer it.
7. **Git Commit:** `git add -A && git commit -m "feat(task-9.5): implement Lenis smooth scroll"`

---

### Task 9.6 – Refactor IntroLoader i18n implementation │ Agent_Frontend_Architecture

- **Objective:** Consolidate `IntroLoader` localization by moving hardcoded internal `CONTENT` to the central `next-intl` message files. ✅ **COMPLETE**
- **Output:** `IntroLoader` component refactored to use `useTranslations` (client) or `getTranslations` (server) with keys from `messages/es.json` and `messages/en.json`; removal of unused `CONTENT` object.
- **Guidance:** The component currently has duplicate content in both `IntroLoader.tsx` and the locale JSON files. Standardize on the locale files to ensure maintainability and consistency.
- **Depends on:** Phase 4 i18n implementation.

1. **Review i18n Keys:** Verify `IntroLoader` keys in `messages/es.json` and `messages/en.json` (headline, tagline1, tagline2) match the content needed. ✅
2. **Refactor Component:** Replace internal `CONTENT` object usage in `IntroLoader.tsx` with `next-intl` translation hooks. ✅
3. **Clean Up:** Delete the hardcoded `CONTENT` object from `IntroLoader.tsx`. ✅
4. **Verification:** Confirm the loader displays correctly in both Spanish and English after the refactor. ✅
5. **Git Commit:** `git add -A && git commit -m "fix(task-9.6): refactor IntroLoader to use central i18n messages"` ✅

---

### Task 9.7 – Hide Projects Section Temporarily │ Agent_Frontend_Architecture

- **Objective:** Hide the Projects section from the homepage and navigation while keeping the underlying code intact for future use. ✅ **COMPLETE**
- **Output:** Projects section removed from the Home page layout; Projects link removed from Header and Footer navigation; direct `/projects` routes optionally disabled or hidden from UI.
- **Guidance:** Do not delete the components or data files. Simply comment out or conditionally hide the entry points to the Projects section.
- **Depends on:** Phase 3 implementation.

1. **Homepage Update:** Remove or comment out the Projects section component in `app/[locale]/page.tsx`. ✅ (Not present)
2. **Navigation Update:** Remove "Proyectos" / "Projects" links from `Header.tsx` and `Footer.tsx`. ✅ (Header updated; Footer had no link)
3. **Route Disabling:** Added `notFound()` and noindex/nofollow to `/projects` and `/projects/[slug]` pages. ✅
4. **Verification:** Ensure the site functions correctly without the projects section and navigation links are updated in both languages. ✅
5. **Git Commit:** `git add -A && git commit -m "feat(task-9.7): hide projects section and navigation links"` ✅

---

### Task 9.8 – Implement Bebas Neue typography for H1 elements │ Agent_Frontend_Architecture

- **Objective:** Update all `H1` headings across the site to use the Bebas Neue font for a more impactful brand presentation. ✅ **COMPLETE**
- **Output:** `H1` elements styled with Bebas Neue font; Next.js font loading updated to include Bebas Neue; design system/Tailwind config updated if necessary.
- **Guidance:** Reference https://fonts.google.com/specimen/Bebas+Neue. Ensure the font is loaded efficiently via `next/font/google`. Check all pages (Home, legal, etc.) for `H1` consistency.
- **Depends on:** Phase 2 Design System.

1. **Font Configuration:** Add `Bebas_Neue` from `next/font/google` to the layout or a dedicated font utility. ✅
2. **CSS/Tailwind Update:** Update `H1` styles in `globals.css` or the `Heading` atom to use the new font family. ✅ (Extended to H1-H3)
3. **Audit Headings:** Review all sections and pages to ensure all `H1` elements have correctly transitioned to the new typography. ✅
4. **Verification:** Confirm Bebas Neue is rendering correctly and matches the intended design impact. ✅
5. **Git Commit:** `git add -A && git commit -m "feat(task-9.8): implement Bebas Neue typography for H1 headings"` ✅ (Commit: daa1494)

---

### Task 9.9 – Implement Phase 9 UI Enhancements (PBT, SDG, Partners) │ Agent_Frontend_Architecture

- **Objective:** Implement specific UI enhancements for the Plant Based Treaty, SDG, and Partners sections involving logo integrations and layout adjustments. ✅ **COMPLETE**
- **Output:** Updated sections with new logo treatments, corrected card layouts, and improved visual hierarchy.
- **Guidance:**
    - **PBT Section:** Replace leaf icon/title with `Plant-Based-Treaty-logo.svg` in a white rounded div.
    - **SDG Section:** Replace text title with `ODS-logo.svg` in similar rounded style. Update cards to show Number (left) + Image `ODS-X.svg` (right).
    - **Partners Section:** Add partner logos (`partner-X.svg`) to cards. Fix "Conocer más" link positioning (pinned to bottom).
- **Depends on:** Phase 3 implementation.

1. **PlantBasedTreatySection:** Replace the header pill content with the logo image on a white background. ✅
2. **SDGSection Title:** Replace the `AnimatedText` title with the `ODS-logo.svg` centered image. Keep the subtitle. ✅
3. **SDGSection Cards:** Update the card header layout to a flex row displaying the number and the corresponding `ODS/ODS-{index+1}.svg` image. ✅
4. **PartnersSection Images:** Add `Image` component to partner cards using `partners/partner-{index+1}.svg`. Ensure consistent sizing. ✅
5. **PartnersSection Layout:** Update card flex layout to ensure the "Conocer más" link is pushed to the bottom (`mt-auto`). ✅
6. **Git Commit:** `git add -A && git commit -m "feat(task-9.9): implement UI enhancements for PBT, SDG, and Partners sections"` ✅

---

### Task 9.10 – Verify Deployment Readiness │ Agent_Frontend_Architecture

- **Objective:** Final check of all Phase 9 changes (Tasks 9.1-9.9) to ensure readiness for deployment to `develop` and eventually `main`.
- **Output:** Verification report confirming no critical issues; fix any final linter or build warnings.
- **Guidance:** Run a full build (`pnpm build`) locally. Check for any regression in the hidden Projects section (ensure 404 works). Verify all new assets load correctly.
- **Depends on:** All Phase 9 tasks.

1. **Local Build:** Run `pnpm build` to ensure the application builds successfully with all recent changes.
2. **Asset Verification:** Verify that all new images (PBT logo, ODS logo, partner logos) are in `public/` and load correctly in a local build.
3. **Regression Check:** Confirm Projects section is still hidden and routes return 404.
4. **Git Status:** Ensure all changes are committed.
5. **Final Push:** Push all commits to the `develop` branch.

---

### Task 9.11 – Refactor Custom Cursor for Accessibility │ Agent_Frontend_Architecture

- **Objective:** Refactor the custom cursor implementation to restore normal browser cursor behavior while keeping the Chacal logo image as a following element, ensuring proper accessibility.
- **Output:** Updated `CustomCursor` component that displays the Chacal logo following the mouse without replacing the native cursor; normal cursor behavior preserved for all interactive elements.
- **Guidance:** The current implementation replaces the cursor with the Chacal image, which can cause accessibility issues. Instead, keep the native cursor visible and have the Chacal image follow as a decorative trailing element. Use `pointer-events: none` on the following image to avoid interaction interference.

1. **Review Current Implementation:** Examine `components/organisms/CustomCursor.tsx` to understand current cursor replacement logic.
2. **Restore Native Cursor:** Remove any CSS that hides the default cursor (`cursor: none`). Ensure all elements show their appropriate cursor (pointer, text, default, etc.).
3. **Implement Following Element:** Keep the Chacal logo as a decorative element that follows the cursor with smooth animation, positioned slightly offset from the actual cursor.
4. **Ensure Non-Interference:** Apply `pointer-events: none` to the following element so it doesn't block clicks or hover states.
5. **Test Accessibility:** Verify that all interactive elements (buttons, links, inputs) show correct cursor states and remain fully accessible.
6. **Git Commit:** `git add -A && git commit -m "fix(task-9.11): refactor custom cursor for accessibility"`

---

### Task 9.12 – Create Fast AnimatedText Variant for Long Texts │ Agent_Frontend_Architecture

- **Objective:** Create a speed variant for the `AnimatedText` component to display long texts 2x faster, specifically for the HeroSection subtitle.
- **Output:** Updated `AnimatedText` component with a `speed` prop or variant; HeroSection subtitle using the faster animation variant.
- **Guidance:** The current letter-by-letter animation is too slow for longer text blocks like the HeroSection subtitle. Create a configurable speed option (e.g., `speed="fast"` or `staggerDelay` prop) that doubles the animation speed. Apply this to the HeroSection subtitle specifically.

1. **Review AnimatedText:** Examine `components/atoms/AnimatedText.tsx` to understand current animation timing configuration.
2. **Add Speed Prop:** Add a `speed` prop with options like `"normal"` (default) and `"fast"` (2x speed), or a numeric `staggerMultiplier` prop.
3. **Update Animation Logic:** Modify the stagger delay calculation to account for the speed setting (e.g., halve the delay for "fast" mode).
4. **Update HeroSection:** Apply the fast variant to the subtitle `AnimatedText` in `components/sections/HeroSection.tsx`.
5. **Test Animation:** Verify the faster animation feels natural and readable while being noticeably quicker.
6. **Git Commit:** `git add -A && git commit -m "feat(task-9.12): add fast variant for AnimatedText long texts"`

---

### Task 9.13 – Deprecate IntroLoader Animation │ Agent_Frontend_Architecture

- **Objective:** Deprecate the IntroLoader animation by moving it to a deprecated folder, preserving the code for potential future use while removing it from the active page load flow.
- **Output:** IntroLoader component moved to `components/deprecated/IntroLoader/`; removed from layout/page rendering; normal page load without intro animation.
- **Guidance:** Do not delete the IntroLoader code—move it to a deprecated folder structure. Remove all references from the active rendering pipeline. The page should now load directly without any intro animation sequence.

1. **Create Deprecated Folder:** Create `components/deprecated/IntroLoader/` directory structure.
2. **Move Component:** Move `components/organisms/IntroLoader.tsx` to `components/deprecated/IntroLoader/IntroLoader.tsx`.
3. **Update Exports:** If IntroLoader is exported from `components/index.ts`, remove or comment out that export.
4. **Remove from Layout/Page:** Remove IntroLoader usage from `app/[locale]/layout.tsx` or `app/[locale]/page.tsx` (wherever it's rendered).
5. **Clean Up Related Code:** Remove any sessionStorage logic (`chacal-intro-seen`) or state management related to intro visibility from parent components.
6. **Verify Page Load:** Confirm the page loads directly without intro animation.
7. **Git Commit:** `git add -A && git commit -m "chore(task-9.13): deprecate IntroLoader animation"`

---

### Task 9.14 – Implement Projects Portfolio Section │ Agent_Frontend_Architecture

- **Objective:** Create a new Projects portfolio section for the homepage with a responsive masonry-style grid that respects image aspect ratios, positioned after the HeroSection.
- **Output:** New `ProjectsSection` component with centered H2 title "Proyectos", responsive grid (max 4 columns desktop, min 2 columns mobile), 16 placeholder images/gifs with proper aspect ratio handling, small border radius and gaps. Reference: https://bardo.ar portfolio grid.
- **Guidance:** This is a new feature implementation. Create a responsive grid that adapts column count based on viewport (4 cols → 3 cols → 2 cols). Each card should maintain the original image aspect ratio (vertical images taller, horizontal images wider). Use CSS Grid with `grid-auto-rows` or a masonry library. Use free placeholder images from Unsplash or similar. Add i18n support for the section title.

1. **Plan Implementation:**
   - Research CSS Grid masonry approaches or consider libraries like `react-masonry-css`
   - Design responsive breakpoints: 4 cols (≥1280px), 3 cols (≥768px), 2 cols (<768px)
   - Plan image sourcing (16 varied aspect ratio placeholders)

2. **Create ProjectsSection Component:**
   - Create `components/sections/ProjectsSection.tsx`
   - Add centered H2 title using `Heading` component with i18n key
   - Implement responsive grid container with gap and border-radius styling

3. **Implement Responsive Grid:**
   - Use CSS Grid with responsive column configuration
   - Ensure images maintain aspect ratio (object-fit: cover or natural sizing)
   - Apply small border-radius to cards and consistent gap between items

4. **Add Placeholder Content:**
   - Source 16 free images/gifs with varied aspect ratios (mix of vertical and horizontal)
   - Create project card component with image and optional overlay/hover effect
   - Store placeholder images in `public/projects/` or use external URLs

5. **Add i18n Support:**
   - Add `ProjectsSection.title` key to `messages/es.json` ("Proyectos") and `messages/en.json` ("Projects")

6. **Integrate into Homepage:**
   - Import and add `ProjectsSection` to `app/[locale]/page.tsx` after `HeroSection` (before `MarqueeSection`)

7. **Test Responsiveness:**
   - Verify grid behavior at all breakpoints
   - Confirm image aspect ratios are preserved
   - Test on mobile viewports (2 columns minimum)

8. **Git Commit:** `git add -A && git commit -m "feat(task-9.14): implement Projects portfolio section"`
