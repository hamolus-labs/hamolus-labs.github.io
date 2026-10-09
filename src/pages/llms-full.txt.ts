import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * `llms-full.txt` — seluruh dokumen dalam satu file teks untuk LLM
 * (proposal llmstxt.org). Menggabungkan isi setiap halaman docs yang
 * diurutkan dengan beranda paling depan.
 */
export const prerender = true;

const SITE = 'https://hamolus-labs.github.io';

function compare(a: { id: string }, b: { id: string }): number {
  if (a.id === 'index') return -1;
  if (b.id === 'index') return 1;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/** Bersihkan artefak MDX (baris `import`, komponen CardGroup/Card)
 *  agar hasil tetap markdown yang enak dibaca LLM. */
function cleanBody(body: string): string {
  return body
    .replace(/\s*<CardGrid(?:\s[^>]*)?>\s*/g, '\n')
    .replace(/\s*<\/CardGrid>\s*/g, '\n')
    .replace(/<Card\s+title="([^"]+)"(?:\s[^>]*)?[^>]*>/g, (_m, title: string) => `\n\n**${title}**\n`)
    .replace(/\s*<\/Card>\s*/g, '\n')
    .split('\n')
    .filter((line) => !/^import\s/.test(line.trim()))
    .join('\n')
    .trim();
}

export const GET: APIRoute = async () => {
  const entries = (await getCollection('docs')).sort(compare);

  const parts: string[] = [
    '# Hamolus — Full Documentation',
    '',
    '> Source of truth: https://github.com/hamolus-labs/hamolus',
    `> Generated from the public docs at ${SITE}`,
    '',
  ];

  for (const entry of entries) {
    parts.push(`# ${entry.data.nav_title ?? entry.data.title}`);
    parts.push('');
    parts.push(cleanBody(String(entry.body ?? '')));
    parts.push('');
  }

  return new Response(parts.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};