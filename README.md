# Hamolus Documentation

Documentation site for [Hamolus](https://github.com/hamolus-labs/hamolus) — a
headless data platform on Cloudflare Workers.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
+ [Tailwind CSS v4](https://tailwindcss.com). Deployed to GitHub Pages at
<https://hamolus-labs.github.io/>.

## Develop

```bash
pnpm install
# allow native build scripts (sharp / esbuild) if prompted
pnpm approve-builds
pnpm dev
```

Local URL: `http://localhost:4321/`

## Build

```bash
pnpm build
pnpm preview
```

Output goes to `dist/`.

## Styling

Tailwind v4 is wired through the `@tailwindcss/vite` plugin. Design tokens
(fonts, emerald–teal brand palette, canvas colors) live in `@theme` inside
`src/styles/global.css`; the same file overrides Starlight's `--sl-*` tokens so
the whole site shares one identity. Preflight is intentionally skipped to avoid
clobbering Starlight's base styles.

## SEO

- Canonical URLs + sitemap (`@astrojs/sitemap` → `/sitemap-index.xml`)
- `robots.txt` pointing at the sitemap
- Open Graph / Twitter card meta (custom `Head.astro`)
- JSON-LD (`WebSite` + `SoftwareApplication` + `WebPage`)
- Per-page `description` frontmatter → `<meta name="description">`

## Deploy

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to
GitHub Pages on every push to `main`.

### One-time GitHub Pages setup

1. Create a repo named `hamolus-labs.github.io` (user/org site → served at the
   domain root, no base path).
2. Push this project to the repo's `main` branch.
3. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Structure

```
src/
  components/
    Header.astro         Custom header: logo + primary nav + search
    Head.astro           SEO meta (OG, Twitter, JSON-LD)
  content/docs/
    getting-started/     Installation, quick start, configuration
    concepts/            Vocabulary, universe/land/colony, collections
    core/                Architecture, collections, multi-tenancy
    fields/              Field definition (params, types, console UI)
    console/             Admin console + collection editor
    panels/              Panels + panel definition
    plugins/             Console plugins + plugin KV
    mcp/                 MCP server & instances
    api/                 REST API + permissions & roles
  styles/global.css      Tailwind theme + Starlight token overrides
```

## Content sources

Documentation is derived from the Hamolus monorepo:

- `docs/definitions/*.md`
- `packages/*/docs/*.md`
- `utils/hamolus-*/SKILL.md`
- Source schemas in `packages/types/src/`
