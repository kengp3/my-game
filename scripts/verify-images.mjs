#!/usr/bin/env node
// scripts/verify-images.mjs
// Nyquist validation harness for Phase 03.1.
// Sources: 03.1-VALIDATION.md Per-Task Verification Map, 03.1-RESEARCH.md Validation Architecture.

import fs from 'node:fs';
import path from 'node:path';

// Exhaustive 8-file target list (D-10)
const IMAGE_TARGETS = [
  { md: 'guide/characters/kliff.md',                  webp: 'public/images/characters/kliff.webp',                  maxWidth: 600, category: 'characters' },
  { md: 'guide/characters/damiane.md',                webp: 'public/images/characters/damiane.webp',                maxWidth: 600, category: 'characters' },
  { md: 'guide/characters/oongka.md',                 webp: 'public/images/characters/oongka.webp',                 maxWidth: 600, category: 'characters' },
  { md: 'guide/bosses/example-boss.md',               webp: 'public/images/bosses/example-boss.webp',               maxWidth: 600, category: 'bosses' },
  { md: 'guide/equipment/example-equipment.md',       webp: 'public/images/equipment/example-equipment.webp',       maxWidth: 400, category: 'equipment' },
  { md: 'guide/equipment/sword-of-the-wolf.md',       webp: 'public/images/equipment/sword-of-the-wolf.webp',       maxWidth: 400, category: 'equipment' },
  { md: 'guide/equipment/grey-wolf-leather-armor.md', webp: 'public/images/equipment/grey-wolf-leather-armor.webp', maxWidth: 400, category: 'equipment' },
  { md: 'guide/equipment/pailunese-signet.md',        webp: 'public/images/equipment/pailunese-signet.webp',        maxWidth: 400, category: 'equipment' },
];

const TEMPLATES = [
  '.vitepress/theme/components/CharacterTemplate.vue',
  '.vitepress/theme/components/BossTemplate.vue',
  '.vitepress/theme/components/EquipmentTemplate.vue',
];

const MAX_FILE_BYTES = 500 * 1024; // Dimension 2: < 500KB

let failures = 0;
const flags = new Set(process.argv.slice(2));
const runAll = flags.size === 0;

function fail(msg) { console.error(`FAIL: ${msg}`); failures += 1; }
function ok(msg)   { console.log(`OK: ${msg}`); }

// --- Dimension 1: artifact existence + Dimension 2 (size) ---
function checkFiles() {
  console.log('\n[--files] Dimension 1/2: WebP existence, size, magic bytes');
  for (const t of IMAGE_TARGETS) {
    if (!fs.existsSync(t.webp)) { fail(`MISSING: ${t.webp}`); continue; }
    const buf = fs.readFileSync(t.webp);
    if (buf.length === 0) { fail(`EMPTY: ${t.webp}`); continue; }
    if (buf.length > MAX_FILE_BYTES) { fail(`TOO_LARGE (${buf.length}B > 500KB): ${t.webp}`); continue; }
    // WebP magic: RIFF....WEBP (bytes 0-3 = RIFF, bytes 8-11 = WEBP)
    const riff = buf.slice(0, 4).toString('ascii');
    const webp = buf.slice(8, 12).toString('ascii');
    if (riff !== 'RIFF' || webp !== 'WEBP') { fail(`NOT_WEBP: ${t.webp} (magic=${riff}/${webp})`); continue; }
    ok(`${t.webp} (${buf.length}B)`);
  }
}

// --- Dimension 2: width constraints (needs sharp) ---
async function checkWidths() {
  console.log('\n[--widths] Dimension 2: image widths');
  const { default: sharp } = await import('sharp'); // CJS interop via dynamic import
  for (const t of IMAGE_TARGETS) {
    if (!fs.existsSync(t.webp)) { fail(`MISSING for width check: ${t.webp}`); continue; }
    const meta = await sharp(t.webp).metadata();
    if (meta.format !== 'webp') { fail(`NOT_WEBP meta: ${t.webp} (${meta.format})`); continue; }
    if (meta.width > t.maxWidth) { fail(`TOO_WIDE (${meta.width} > ${t.maxWidth}): ${t.webp}`); continue; }
    ok(`${t.webp} ${meta.width}x${meta.height} ${meta.format}`);
  }
}

// --- Dimension 3: frontmatter integrity ---
function checkFrontmatter() {
  console.log('\n[--frontmatter] Dimension 3: Markdown frontmatter integrity');
  for (const t of IMAGE_TARGETS) {
    if (!fs.existsSync(t.md)) { fail(`MD MISSING: ${t.md}`); continue; }
    const src = fs.readFileSync(t.md, 'utf8');
    // Extract only the frontmatter block
    const fmMatch = src.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) { fail(`NO_FRONTMATTER: ${t.md}`); continue; }
    const fm = fmMatch[1];
    const imageLine = fm.match(/^image:\s*(.*)$/m);
    if (!imageLine) { fail(`NO_IMAGE_KEY: ${t.md}`); continue; }
    const value = imageLine[1].trim();
    if (value === 'null' || value === '') { fail(`IMAGE_NULL: ${t.md}`); continue; }
    const expected = '/' + t.webp.replace(/^public\//, '');
    if (value !== expected) { fail(`IMAGE_MISMATCH: ${t.md} has "${value}" expected "${expected}"`); continue; }
    ok(`${t.md} -> ${value}`);
  }
}

// --- Dimension 4: template withBase() correctness ---
function checkTemplates() {
  console.log('\n[--templates] Dimension 4: Vue template :src bindings use withBase()');
  let bareCount = 0;
  let withBaseCount = 0;
  for (const f of TEMPLATES) {
    if (!fs.existsSync(f)) { fail(`TEMPLATE MISSING: ${f}`); continue; }
    const src = fs.readFileSync(f, 'utf8');
    // Count bare :src="frontmatter.image" (BAD)
    const bareMatches = src.match(/:src="frontmatter\.image"/g) || [];
    // Count :src="withBase(frontmatter.image)" (GOOD)
    const wbMatches = src.match(/:src="withBase\(frontmatter\.image\)"/g) || [];
    bareCount += bareMatches.length;
    withBaseCount += wbMatches.length;
    if (bareMatches.length > 0) fail(`BARE :src in ${f} (${bareMatches.length} occurrences)`);
    if (wbMatches.length > 0)   ok(`withBase in ${f} (${wbMatches.length} occurrences)`);
  }
  if (bareCount > 0) fail(`Total bare :src="frontmatter.image": ${bareCount} (expected 0)`);
  if (withBaseCount !== 3) fail(`Total withBase(frontmatter.image): ${withBaseCount} (expected 3)`);
  if (bareCount === 0 && withBaseCount === 3) ok('Template path correctness: 0 bare, 3 withBase');
}

// --- Dimension 5: dist/ build output ---
function checkDist() {
  console.log('\n[--dist] Dimension 5: .vitepress/dist/images/**/*.webp exists + HTML base-prefix check');
  // VitePress writes to .vitepress/dist/ with a flat layout. The `base: '/my-game/'`
  // config is a URL prefix applied at runtime (served by GitHub Pages from the repo path),
  // NOT a directory prefix in the dist tree.
  const distBase = path.join('.vitepress', 'dist', 'images');
  if (!fs.existsSync(distBase)) { fail(`DIST MISSING: ${distBase}`); return; }
  for (const t of IMAGE_TARGETS) {
    const distFile = path.join('.vitepress', 'dist', t.webp.replace(/^public\//, ''));
    if (!fs.existsSync(distFile)) { fail(`DIST FILE MISSING: ${distFile}`); continue; }
    ok(`dist: ${distFile}`);
  }
  // Verify each HTML page references the base-prefixed URL `/my-game/images/...`
  // (i.e., withBase() was applied) and NOT the bare `/images/...` path.
  for (const t of IMAGE_TARGETS) {
    const htmlFile = path.join('.vitepress', 'dist', t.md.replace(/\.md$/, '.html'));
    if (!fs.existsSync(htmlFile)) { fail(`DIST HTML MISSING: ${htmlFile}`); continue; }
    const html = fs.readFileSync(htmlFile, 'utf8');
    const expectedUrl = '/my-game/' + t.webp.replace(/^public\//, '');
    if (!html.includes(expectedUrl)) { fail(`HTML missing base-prefixed URL: ${htmlFile} expected to contain ${expectedUrl}`); continue; }
    // Negative: bare /images/... for this specific slug is a regression.
    const bareUrl = '/' + t.webp.replace(/^public\//, '');
    const bareRegex = new RegExp(`src="${bareUrl.replace(/[/.]/g, '\\$&')}"`);
    if (bareRegex.test(html)) { fail(`HTML contains bare (non-base-prefixed) URL: ${htmlFile} has ${bareUrl}`); continue; }
    ok(`html: ${htmlFile} references ${expectedUrl}`);
  }
}

// --- Run selected checks ---
(async () => {
  if (runAll || flags.has('--files'))       checkFiles();
  if (runAll || flags.has('--widths'))      await checkWidths();
  if (runAll || flags.has('--frontmatter')) checkFrontmatter();
  if (runAll || flags.has('--templates'))   checkTemplates();
  if (runAll || flags.has('--dist'))        checkDist();

  console.log('\n---');
  if (failures > 0) {
    console.error(`VERIFY FAILED: ${failures} issue(s)`);
    process.exit(1);
  }
  console.log('VERIFY PASSED');
})();
