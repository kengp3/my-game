// scripts/convert-images.cjs
// Batch PNG -> WebP converter for Phase 03.1.
// Reads /tmp/{slug}.png source files (downloaded in plan 02), writes public/images/{category}/{slug}.webp.
// Sources: RESEARCH.md 圖片來源清單; UI-SPEC.md Files to be Created.

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const CHAR_BOSS_WIDTH = 600; // D-05: character/boss max 600px
const EQUIP_WIDTH = 400;     // D-05: equipment max 400px
const QUALITY = 80;          // D-06: WebP quality 80

// Exact mapping — 8 conversions, exhaustive per CONTEXT.md D-10.
// [sourceTmpFile, destPath, maxWidth]
const CONVERSIONS = [
  // Characters (600px)
  ['/tmp/kliff.png',   'public/images/characters/kliff.webp',   CHAR_BOSS_WIDTH],
  ['/tmp/damiane.png', 'public/images/characters/damiane.webp', CHAR_BOSS_WIDTH],
  ['/tmp/oongka.png',  'public/images/characters/oongka.webp',  CHAR_BOSS_WIDTH],
  // Boss (600px)
  ['/tmp/kailok.png',  'public/images/bosses/example-boss.webp', CHAR_BOSS_WIDTH],
  // Equipment (400px)
  ['/tmp/sword-of-the-lord.png',       'public/images/equipment/example-equipment.webp',       EQUIP_WIDTH],
  ['/tmp/sword-of-the-wolf.png',       'public/images/equipment/sword-of-the-wolf.webp',       EQUIP_WIDTH],
  ['/tmp/grey-wolf-leather-armor.png', 'public/images/equipment/grey-wolf-leather-armor.webp', EQUIP_WIDTH],
  ['/tmp/pailunese-signet.png',        'public/images/equipment/pailunese-signet.webp',        EQUIP_WIDTH],
];

async function convertOne(src, dest, maxWidth) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source missing: ${src}`);
  }
  // Ensure destination directory exists (should already from Wave 0 task 1)
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(src)
    .resize({ width: maxWidth, withoutEnlargement: true }) // A2: avoid upscaling 300px sources
    .webp({ quality: QUALITY })
    .toFile(dest);
  const size = fs.statSync(dest).size;
  console.log(`OK: ${path.basename(dest)} (${size} bytes, max ${maxWidth}px)`);
}

async function main() {
  let failed = 0;
  for (const [src, dest, maxWidth] of CONVERSIONS) {
    try {
      await convertOne(src, dest, maxWidth);
    } catch (err) {
      console.error(`FAIL: ${dest} — ${err.message}`);
      failed += 1;
    }
  }
  if (failed > 0) {
    console.error(`\n${failed}/${CONVERSIONS.length} conversions failed`);
    process.exit(1);
  }
  console.log(`\nAll ${CONVERSIONS.length} conversions complete`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
