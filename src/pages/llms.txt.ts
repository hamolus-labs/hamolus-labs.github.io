import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * `llms.txt` — indeks ringkas untuk LLM crawler (proposal llmstxt.org).
 * Menghasilkan daftar semua halaman docs beserta satu-baris deskripsi.
 * Prerender penuh sehingga mendarat sebagai file statis `/llms.txt`.
 */
export const prerender = true;

const SITE = 'https://hamolus-labs.github.io';

function compare(a: { id: string }, b: { id: string }): number {
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

export const GET: APIRoute = async () => {
  const entries = (await getCollection('docs'))
    .filter((e) => e.id !== 'index')
    .sort(compare);

  const lines = [
    '# Hamolus',
    '',
    '> A framework-agnostic, headless data platform on Cloudflare Workers. Define a collection as metadata; Hamolus creates the D1 table, exposes a multi-tenant CRUD API, then generates an admin console, user-facing panels and AI tooling (MCP server + agent skills).',
    '>',
    '> - Repository: https://github.com/hamolus-labs/hamolus',
    '> - Issues & feedback: https://github.com/hamolus-labs/hamolus/issues',
    '> - License: MIT',
    '',
    '## Hamolus Docs',
    '',
    `- [Home](https://hamolus-labs.github.io/): A headless data platform on Cloudflare Workers.`,
    ...entries.map(
      (e) =>
        `- [${e.data.title}](${SITE}/${e.id}/): ${
          e.data.description ?? 'Documentation page in the Hamolus docs.'
        }`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};