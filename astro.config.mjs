// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages user/org site: https://hamolus-labs.github.io/ → tanpa base path.
export default defineConfig({
  site: 'https://hamolus-labs.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
    starlight({
      title: 'Hamolus',
      description:
        'A headless data platform on Cloudflare Workers. Define collections, get a multi-tenant API, console, panels and AI tooling.',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Hamolus logo',
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
      },
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: true,
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'mask-icon',
            href: '/favicon.svg',
            color: '#34d399',
          },
        },
      ],
      components: {
        Header: './src/components/Header.astro',
        Head: './src/components/Head.astro',
      },
      social: [
        {
          label: 'GitHub',
          icon: 'github',
          href: 'https://github.com/hamolus-labs/hamolus',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
            { label: 'Configuration', slug: 'getting-started/configuration' },
            { label: 'Deploying', slug: 'getting-started/deploying' },
          ],
        },
        {
          label: 'Examples',
          items: [
            { label: 'Web & Mobile Apps', slug: 'examples' },
            { label: 'Panel Apps', slug: 'examples/panels' },
            { label: 'Console', slug: 'examples/console' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Hamolus Vocabulary', slug: 'concepts' },
            { label: 'Universe, Land & Colony', slug: 'concepts/scope' },
            { label: 'Collections & Records', slug: 'concepts/collections' },
          ],
        },
        {
          label: 'Core',
          items: [
            { label: 'Overview', slug: 'core' },
            { label: 'Architecture', slug: 'core/architecture' },
            { label: 'Collections API', slug: 'core/collections' },
            { label: 'Admin Console', slug: 'core/collections/console' },
            { label: 'Multi-tenancy', slug: 'core/multi-tenancy' },
            { label: 'KV Settings', slug: 'core/settings' },
          ],
        },
        {
          label: 'Field Definition',
          items: [
            { label: 'Overview', slug: 'fields' },
            { label: 'Parameters', slug: 'fields/parameters' },
            { label: 'Field Types', slug: 'fields/types' },
            { label: 'In the Admin Console', slug: 'fields/console' },
          ],
        },
        {
          label: 'Console',
          items: [
            { label: 'Overview', slug: 'console' },
            { label: 'Building Collections', slug: 'console/collection-editor' },
          ],
        },
        {
          label: 'Panels',
          items: [
            { label: 'Overview', slug: 'panels' },
            { label: 'Panel Definition', slug: 'panels/definition' },
          ],
        },
        {
          label: 'Plugins',
          items: [{ label: 'Overview', slug: 'plugins' }],
        },
        {
          label: 'MCP',
          items: [
            { label: 'Overview', slug: 'mcp' },
            { label: 'Server reference', slug: 'mcp/reference' },
            { label: 'End-to-end example', slug: 'mcp/example' },
          ],
        },
        {
          label: 'Tooling',
          items: [{ label: 'AI Skills', slug: 'tools/skills' }],
        },
        {
          label: 'Community',
          items: [
            { label: 'Contributing', slug: 'community/contributing' },
            { label: 'Changelog', slug: 'community/changelog' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'REST API', slug: 'api' },
            { label: 'Records API', slug: 'api/records' },
            { label: 'Permissions & Roles', slug: 'api/permissions' },
          ],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
  ],
});
