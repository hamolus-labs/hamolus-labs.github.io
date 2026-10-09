#!/usr/bin/env node
/**
 * update-version.mjs — memastikan versi Hamolus terkini sebelum build.
 *
 * Dipanggil dari script `build` (node scripts/update-version.mjs && astro build).
 * Urutan sumber versi (tepercaya → cadangan):
 *   1. Monorepo Hamolus (sibling ../hamolus) — sumber kebenaran saat develop.
 *   2. `src/data/version.json` yang sudah di-commit — dipakai di CI/GitHub
 *      Pages yang tidak punya akses ke monorepo.
 * Hasilnya selalu ditulis ke `src/data/version.json` agar situs statis
 * menampilkan versi yang sama dengan sumbernya.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = resolve(root, 'src/data');
const out = resolve(outDir, 'version.json');

const candidates = [
  resolve(root, '../hamolus/package.json'),
  resolve(root, '../hamolus/packages/core/package.json'),
];

let version;
let source = '';

for (const file of candidates) {
  try {
    if (existsSync(file)) {
      const v = JSON.parse(readFileSync(file, 'utf8')).version;
      if (v) {
        version = String(v).replace(/^v/, '');
        source = `monorepo (${file.split('/').slice(-2).join('/')})`;
        break;
      }
    }
  } catch {
    /* lanjut ke kandidat berikutnya */
  }
}

if (!version) {
  try {
    version = JSON.parse(readFileSync(out, 'utf8')).version;
    source = 'committed fallback';
  } catch {
    throw new Error(
      '[version] tidak menemukan versi Hamolus: monorepo hilang dan src/data/version.json kosong.',
    );
  }
}

mkdirSync(outDir, { recursive: true });
writeFileSync(
  out,
  `${JSON.stringify(
    { version, source, updatedAt: new Date().toISOString() },
    null,
    2,
  )}\n`,
);
console.log(`[version] Hamolus v${version} <- ${source}`);