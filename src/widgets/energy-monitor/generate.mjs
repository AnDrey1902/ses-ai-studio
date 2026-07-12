#!/usr/bin/env node
/* =========================================================
   generate.mjs — build a standalone folder per widget
   ---------------------------------------------------------
   Reads ./configs.json (the array exported by demo.html) and writes, for
   every widget, a self-contained folder under ./dist/<slug>/ containing:
     - index.html         standalone page with the configured <energy-monitor>
     - energy-monitor.js   a copy of the component (so the folder is portable)

   Run:   node generate.mjs
   Each dist/<slug>/ folder can be copied to any page or website as-is.
   ========================================================= */
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC_JS = join(HERE, 'energy-monitor.js');
const CONFIGS = join(HERE, 'configs.json');
const OUT = join(HERE, 'dist');

/* form schema → widget .config (kept in sync with demo.html toWidgetConfig) */
function toWidgetConfig(c) {
  const pl = (s) => String(s).split(',').map((x) => parseFloat(x.trim())).filter((n) => Number.isFinite(n));
  return {
    title: c.title, type: c.type, power: +c.power,
    hourMs: +c.hourMs, autoplay: !!c.autoplay,
    locale: c.locale, currency: c.currency, unit: c.unit,
    types: {
      home: { label: 'Дім', tariff: +c.tariffHome, powers: pl(c.powersHome) },
      biz:  { label: 'Бізнес', tariff: +c.tariffBiz, powers: pl(c.powersBiz) }
    }
  };
}

function slugify(s, fallback) {
  const out = String(s || '').trim().toLowerCase()
    .replace(/[^a-z0-9а-яіїєґ]+/gi, '-').replace(/^-+|-+$/g, '');
  return out || fallback;
}

function pageHtml(cfg) {
  const w = toWidgetConfig(cfg);
  const accent = cfg.accent || '#ffc742';
  const accent2 = cfg.accent2 || accent;
  return `<!DOCTYPE html>
<html lang="${(cfg.locale || 'uk-UA').slice(0, 2)}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(cfg.title || 'energy-monitor')}</title>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 2rem;
      background: radial-gradient(120% 120% at 80% 0%, #114433 0%, #0a2a1e 70%);
      font-family: 'Manrope', system-ui, sans-serif; }
    energy-monitor { width: min(420px, 100%); }
  </style>
</head>
<body>
  <!-- Self-contained widget. Copy this whole folder anywhere. -->
  <energy-monitor id="w" style="--em-accent:${accent};--em-accent-2:${accent2};--em-grad-sun:linear-gradient(135deg,${accent},${accent2})"></energy-monitor>

  <script src="./energy-monitor.js"></script>
  <script>
    document.getElementById('w').config = ${JSON.stringify(w, null, 2).replace(/\n/g, '\n    ')};
  </script>
</body>
</html>
`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

async function main() {
  if (!existsSync(CONFIGS)) {
    console.error('✗ configs.json не знайдено поряд із generate.mjs.\n  Експортуйте його кнопкою «Зберегти configs.json» у demo.html і покладіть сюди.');
    process.exit(1);
  }
  const configs = JSON.parse(await readFile(CONFIGS, 'utf8'));
  if (!Array.isArray(configs) || !configs.length) {
    console.error('✗ configs.json порожній або не масив.');
    process.exit(1);
  }

  await mkdir(OUT, { recursive: true });
  const used = new Set();
  let n = 0;
  for (const cfg of configs) {
    let slug = slugify(cfg.id || cfg.title, 'widget-' + (n + 1));
    while (used.has(slug)) slug = slug + '-' + (n + 1);
    used.add(slug);

    const dir = join(OUT, slug);
    await mkdir(dir, { recursive: true });
    await copyFile(SRC_JS, join(dir, 'energy-monitor.js'));
    await writeFile(join(dir, 'index.html'), pageHtml(cfg), 'utf8');
    console.log(`✓ dist/${slug}/  (index.html + energy-monitor.js)`);
    n++;
  }
  console.log(`\nГотово: ${n} віджет(ів) → ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
