# Design System v2 — SES AI Studio (GURU ENERGY)

> Source of truth: [`src/index.css`](../src/index.css). Every value in this document is copied
> from that file (or, where noted, from what the shipped flagship components actually render).
> If the two ever disagree, `src/index.css` wins — update this doc, not the other way around.

**Status:** v2 (light-first, emerald + solar-gold). Shipped on the 4 flagship landing sections
(Hero, Services, Prices, Contact). See [§10 Migration status](#10-migration-status) for what's
still on the old dark-green/`#22C55E` palette.

---

## 1. Цвета (`@theme` в `src/index.css`)

### Brand primitives

| Токен | Hex | Роль |
|---|---|---|
| `--color-emerald` | `#18A558` | Основной CTA / интерактив / ссылки |
| `--color-emerald-deep` | `#0F7A40` | Hover, обводки, акцентный текст на светлом |
| `--color-sun` | `#FFC742` | Золото: ключевые цифры, бейджи, вторичный CTA |
| `--color-amber` | `#F59E0B` | Hover-состояние жёлтого / "внимание" |

> **Изменилось с v1:** было `#22C55E` (brand-green) / `#FBBF24` (yellow accent). В v2 это
> `#18A558` (emerald) и `#FFC742` (sun) — более глубокие, менее "неоновые" тона под light-first
> тему. Любой `#22C55E`/`#FBBF24`, ещё встречающийся в коде, — это немигрированный v1-остаток
> (см. §10), а не текущий токен.

### Ink / тёмные поверхности

| Токен | Hex | Роль |
|---|---|---|
| `--color-ink` | `#0A2A1E` | База тёмных секций (dark surface) |
| `--color-ink-2` | `#0D3527` | Второй слой на тёмном (табы, вложенные панели, таблицы) |

### Светлые поверхности

| Токен | Hex | Роль |
|---|---|---|
| `--color-surface` | `#FFFFFF` | Страница / карточки на белом |
| `--color-soft` | `#EEF5F0` | Мягкая чередующаяся светлая секция |
| `--color-line` | `#DDE8E2` | Границы / разделители на светлом |

### Текст

| Токен | Hex | Роль |
|---|---|---|
| `--color-body` | `#16271F` | Body / заголовки на светлом (~14:1 на белом) |
| `--color-muted` | `#54665D` | Вторичный текст на светлом (~5.4:1) |
| `--color-cloud` | `#CFE0D7` | Body-текст на тёмном |
| `--color-muted-dark` | `#9FBCAE` | Вторичный текст на тёмном |
| `--color-disabled` | `#6F857A` | Placeholder / disabled |

### Back-compat aliases

`src/index.css` also defines two legacy-named aliases that resolve to the v2 values, kept so any
stray old-token reference doesn't silently break:

| Токен | Значение |
|---|---|
| `--color-brand-green` | `#18A558` (= `--color-emerald`) |
| `--color-accent-yellow` | `#FFC742` (= `--color-sun`) |

All of the above are declared inside Tailwind's `@theme` block, so each generates the usual
`text-*` / `bg-*` / `border-*` utilities (`text-emerald`, `bg-ink`, `border-line`, …) — that's
the only way flagship components consume them (see §6).

### Gradients (`:root`, not `@theme`)

| Токен | Value | Роль |
|---|---|---|
| `--grad-emerald` | `linear-gradient(135deg, #22b865 0%, #0f7a40 100%)` | `.ds-btn-primary` fill |
| `--grad-sun` | `linear-gradient(135deg, #ffd23f 0%, #f59e0b 100%)` | `.ds-btn-sun` fill |
| `--grad-dark` | `linear-gradient(160deg, #11402f 0%, #0a2a1e 72%)` | `.ds-section--dark` background |

These are plain CSS custom properties (not Tailwind theme colors), so they're consumed via
`background: var(--grad-emerald)` in the `.ds-*` component classes below, not via a `bg-*`
utility.

---

## 2. Типографика

### Шрифты

```css
--font-sans: "Manrope", "Inter", system-ui, sans-serif;      /* body */
--font-display: "Sora", "Manrope", system-ui, sans-serif;    /* headings */
--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Consolas, monospace; /* numbers / service */
```

- **Manrope** — body text, weights 400/500/600/700/800.
- **Sora** — display face for headings, weights 600/700/800.
- **JetBrains Mono** — numbers/prices/service copy (`font-mono` on kWh figures, `$`/₴ prices,
  payback periods, phone-style meta in `PricesSection`/`ContactFormSection`).

**"Sora phantom" is resolved.** The old doc noted Sora was referenced in Tailwind config but
never loaded, so `font-display` silently fell back to Manrope everywhere. That's fixed:
`index.html` now loads it — the font `<link>` is

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">
```

Sora renders on every `h1`/`h2`/`h3` via the base layer (below); DevTools → Network shows the
Sora woff2 request, and computed `font-family` on headings resolves to Sora.

**New gap to know about:** `JetBrains Mono` is **not** in that font link — only Manrope and Sora
are loaded from Google Fonts. `font-mono` (Tailwind utility, generated from `--font-mono`) is
already used across the codebase (price figures, kWh labels), but until JetBrains Mono is added
to the `<link>`, it silently falls back to the stack's next entry — the browser's system
monospace (`ui-monospace` / `SF Mono` / Consolas). Visually acceptable, but not yet the
intended typeface; flag this if picking up font-loading work next.

### Display face on headings

```css
@layer base {
  h1, h2, h3 { font-family: var(--font-display); letter-spacing: -0.02em; }
}
```

Every `h1`–`h3` gets Sora + tightened tracking automatically, system-wide — components don't
need to add `font-display` by hand unless a conflicting utility overrides `font-family` on that
element (a few flagship spots add it explicitly for clarity; both work).

---

## 3. Шкалы (non-Tailwind `:root` tokens)

Declared outside `@theme` because they're consumed by the `.ds-*` component classes, not by
generated Tailwind utilities.

### Radius

| Токен | Value | Назначение |
|---|---|---|
| `--r-sm` | `12px` | Small elements |
| `--r-md` | `18px` | `.ds-input` |
| `--r-lg` | `26px` | `.ds-card`, `.ds-card-light` |
| `--r-pill` | `999px` | Buttons, badges |

### Shadows — `--ds-shadow-*`, deliberately not `--shadow-*`

| Токен | Value | Назначение |
|---|---|---|
| `--ds-shadow-sm` | `0 2px 10px rgba(7,20,15,.06)` | `.ds-card-light` resting |
| `--ds-shadow-md` | `0 14px 40px rgba(7,20,15,.10)` | `.ds-card-light:hover` |
| `--ds-shadow-lg` | `0 30px 70px rgba(7,20,15,.16)` | `.ds-card` resting |
| `--ds-shadow-emerald` | `0 12px 30px rgba(24,165,88,.28)` | `.ds-btn-primary` resting |

**Why the `ds-` prefix:** Tailwind v4 owns its own `--shadow-*` namespace internally to back the
built-in `shadow-md`/`shadow-lg`/`shadow-xl` utilities, which non-flagship sections (Navbar,
still-unmigrated sections) rely on. Defining `--shadow-md` ourselves would silently redefine
those utilities' output everywhere in the app — an invisible, hard-to-diagnose regression. The
`--ds-shadow-*` prefix keeps the design-system scale additive and namespace-safe.

### Spacing / layout

| Токен | Value | Назначение |
|---|---|---|
| `--gap` | `clamp(1rem, 3vw, 2rem)` | Fluid gap scale |
| `--section-pad` | `clamp(1.8rem, 2.6vw + 2.8vh, 5rem)` | `.ds-section` top/bottom padding — this fluid, vh-aware clamp is *how* the "≤ 1 viewport" rule (§8) is enforced, replacing the old fixed `120px` |
| `--maxw` | `1280px` | Container max-width token (matches the `max-w-[1280px]` used by containers) |
| `--title-fs` | `clamp(1.55rem, 1.4vw + 1.6vh + .6rem, 2.7rem)` | Fluid section-title size |

> **`--maxw` is not yet wired up.** Its value (`1280px`) matches the literal
> `max-w-[1280px]` every section container currently uses, but no component reads `var(--maxw)`
> yet — it's reserved for a future pass that replaces the arbitrary value with the token.

---

## 4. Компоненты — `.ds-*` classes

The `.ds-*` classes in `src/index.css` **are** the source of the v2 look for cards, buttons,
inputs, badges, and section chrome. Flagship components apply them directly instead of
reproducing the styling inline; where a one-off variant is needed, components layer Tailwind
utilities *built from the same tokens* on top (never raw hex).

### Buttons

| Class | Look | Notes |
|---|---|---|
| `.ds-btn-primary` | `background: var(--grad-emerald)`, `color: #04130b`, `font-weight: 800`, pill radius, `box-shadow: var(--ds-shadow-emerald)` | Hover: `translateY(-2px)` + `0 16px 40px rgba(24,165,88,.4)`. Active: `translateY(0)`. |
| `.ds-btn-secondary` | transparent bg, `color: var(--color-cloud)`, `border: 1px solid rgba(255,255,255,.35)`, pill | Hover: `bg rgba(255,255,255,.05)`, border `rgba(255,255,255,.5)` |
| `.ds-btn-outline` | transparent bg, `color: var(--color-emerald-deep)`, `border: 1.5px solid var(--color-emerald)`, pill | Hover: `bg rgba(24,165,88,.1)` |
| `.ds-btn-ghost` | transparent bg, `color: currentColor`, `opacity: .85`, `border: 1.5px solid currentColor`, pill | Hover: `opacity: 1` |
| `.ds-btn-sun` | `background: var(--grad-sun)`, `color: #2a1a00`, `font-weight: 800`, pill, `box-shadow: 0 10px 26px rgba(245,158,11,.28)` | Solar-gold CTA variant. Hover: `translateY(-2px)` + `0 16px 36px rgba(245,158,11,.38)`. Dark icon/text inherit from `color`. Used by the header **Окупність** shortcut (override size with `!px-4 !py-3 !text-xs`). |

### Active nav pill

`.ds-nav-active` — `background: var(--grad-emerald)`, `color: #ffffff`, `box-shadow: 0 6px 18px
rgba(24,165,88,.30)`. The active state for the desktop nav pill: emerald gradient fill (same as
`.ds-btn-primary`) with a white label. Apply on top of the pill's own layout utilities
(`px-3.5 py-2 rounded-full …`). The language-switcher active pills use inline `bg-emerald text-white`
(not this class), since they sit on the dark top bar.

### Cards

| Class | Look | Notes |
|---|---|---|
| `.ds-card` (dark) | `background: rgba(13,53,39,.92)`, `border: 1px solid rgba(255,255,255,.08)`, `border-radius: var(--r-lg)` (26px), `padding: 28px`, `box-shadow: var(--ds-shadow-lg)` | Hover: `translateY(-4px)` + `0 28px 80px rgba(0,0,0,.5)` |
| `.ds-card-light` | `background: var(--color-surface)`, `border: 1px solid var(--color-line)`, same radius/padding, `box-shadow: var(--ds-shadow-sm)` | Hover: `translateY(-4px)` + `var(--ds-shadow-md)` |

### Input

`.ds-input` — `border-radius: var(--r-md)` (18px), `border: 1px solid rgba(255,255,255,.08)`,
`background: var(--color-ink)`, `color: #fff`, `padding: 12px 16px`. Focus: `border-color:
var(--color-emerald)` + `box-shadow: 0 0 0 3px rgba(24,165,88,.18)`. Placeholder color:
`var(--color-disabled)`.

### Badge

`.ds-badge` — `border-radius: var(--r-pill)`, `font-weight: 700`, `letter-spacing: .05em`,
`text-transform: uppercase`. Color/background are supplied per-instance by semantic utilities
(e.g. `bg-sun text-ink`), not baked into the class.

### Section chrome

```css
.ds-section         { padding-top: var(--section-pad); padding-bottom: var(--section-pad); }
.ds-section--soft   { background: var(--color-soft); }
.ds-section--dark   { background: var(--grad-dark); color: #fff; }
```

`.ds-section` alone is surface-neutral fluid padding; append `--soft` or `--dark` for the
alternating-surface pattern (see §5). A section on `.ds-section` with neither modifier stays on
the default `surface` (white) background.

### Viewport-fit section — `.ds-fit`

```css
.ds-fit { padding-top: 1.5rem; padding-bottom: 1.5rem; }        /* 24px — mobile */
@media (min-width: 1024px) {
  .ds-fit {
    min-height: calc(100svh - 84px);   /* 80px h-20 header + 1px border + hairline */
    display: flex; align-items: flex-start;
    padding-top: 2rem; padding-bottom: 2rem;   /* 32px — 8-pt grid */
  }
}
```

Opt-in helper for the **"section ≤ 1 viewport"** rule (§8). At **≥lg** it fills the viewport minus
the sticky header and **top-anchors** content with a grid-clean `32px` offset (predictable, unlike
flex centering whose top gap floats with viewport height); below lg it collapses to `24px` padding
and natural stacked height (mobile is allowed to be taller than one screen). Content must still be
authored to fit — pair with vh-aware clamps on the heavy bits (Hero H1
`text-[clamp(2.2rem,1rem+1vw+1.6vh,3.6rem)]`, the energy-monitor's compact `--em-*` vars). **Do
NOT** put `.ds-fit` on large/content-heavy sections that legitimately span 1.5–2 screens. The
container inside must be `w-full` (it becomes the flex item).

### Glass panels

| Class | Look |
|---|---|
| `.glass-panel` (dark) | `background: rgba(13,53,39,.72)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255,255,255,.08)`, `box-shadow: 0 24px 80px rgba(0,0,0,.45)` |
| `.glass-panel-light` | `background: rgba(255,255,255,.8)`, `backdrop-filter: blur(20px)`, `border: 1px solid var(--color-line)`, `box-shadow: 0 24px 80px rgba(7,20,15,.1)` |

### Rule: semantic utilities, never inline hex

Flagship component `className` strings use tokens through Tailwind's generated semantic
utilities — `text-emerald`, `bg-ink`, `border-line`, `text-cloud`, `bg-soft`, etc. — and RGBA
arbitrary values built from the v2 RGB triples (e.g. `bg-[rgba(24,165,88,.15)]`) for opacity
variants the `@theme` block doesn't generate a utility for. **No raw brand hex** (`#18A558`,
`#0A2A1E`, …) appears inline in the 4 migrated files; any hex you find there is either a
non-brand one-off (`text-red-400` error state, `#04130b`/`#2a1a00` button label colors baked
into the `.ds-*` classes themselves) or a leftover from an unmigrated section.

---

## 5. Тема: light-first, три типа поверхности

v2 is **light-first** — the default surface is white/`surface`, not the v1 dark-by-default
theme. Sections alternate between three surface types rather than using one global dark theme:

| Surface | Background | Text | `.ds-section` modifier |
|---|---|---|---|
| `surface` | `#FFFFFF` (`--color-surface`) | `body` / `muted` | none (default) |
| `soft` | `#EEF5F0` (`--color-soft`) | `body` / `muted` | `.ds-section--soft` |
| `dark` | `--grad-dark` (`#11402f → #0a2a1e`) or flat `ink`/`ink-2` | `cloud` / `muted-dark` / white | `.ds-section--dark` (or component-level `bg-ink`) |

### Which flagship uses which

| Section | Surface | Evidence |
|---|---|---|
| Hero | dark | `bg-ink/65` overlay, `bg-ink-2` chip, dark hero background |
| Services | soft / light | `<section id="services" className="ds-section bg-soft border-b border-line …">` |
| Prices | dark | `<section id="prices" className="ds-section bg-ink border-b …">`, tabs on `bg-ink-2` |
| Contact | dark | `bg-gradient-to-b from-ink via-ink-2 to-ink` |

Three of the four flagships are dark (Hero, Prices, Contact) with Services as the light/soft
counterpoint — this is the deliberate alternating rhythm the v2 spec calls for, not an
accident of migration order.

---

## 6. Layout scaffolding (unchanged by v2)

These are Tailwind defaults / pre-existing conventions, not new v2 tokens — kept here for
completeness since components combine them with the tokens above.

### Container

```
max-w-[1280px] mx-auto px-5 md:px-8
```

Still the literal arbitrary value everywhere (see the `--maxw` note in §3 — the 1200px token
isn't wired up yet).

### Breakpoints (Tailwind defaults)

| Класс | Ширина |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### 12-column grids in the flagships

| Раскладка | Колонки |
|---|---|
| Hero | `lg:col-span-6` + `lg:col-span-6` |
| Contacts | `lg:col-span-5` + `lg:col-span-7` |
| Services (bento, asymmetric) | `lg:col-span-2` + `lg:col-span-3` + `lg:col-span-5` |

---

## 7. Motion

Unchanged mechanics from v1, now driven by the v2 tokens where relevant:

| Transition | Duration | Where |
|---|---|---|
| `transform, box-shadow, border-color` | 250ms ease | `.ds-card`, `.ds-card-light` |
| `transform, box-shadow, background` | 200ms `cubic-bezier(.22,1,.36,1)` / ease | `.ds-btn-primary` |
| `border-color, box-shadow` | 200ms ease | `.ds-input` |
| `all` | 200–250ms ease | `.ds-btn-secondary`, `.ds-btn-outline`, `.ds-btn-ghost`, `.ds-btn-sun` |

**Pulse ring** — `.ds-pulse-ring` runs `@keyframes ds-pulse-ring` (`1.8s ease-out infinite`): an
expanding, fading gold `box-shadow` ring (`0 0 0 0 rgba(245,158,11,.5)` → `0 0 0 14px …,0`). Apply
to an `absolute inset-0 rounded-full pointer-events-none` span behind an element to give it the
same "live" pulse as the energy-monitor's ONLINE dot. Used by the AI-consultant FAB.

`prefers-reduced-motion: reduce` collapses all animation/transition durations to `0.01ms` and
disables smooth scroll — defined once in `src/index.css`, applies globally, untouched by v2.
Focus ring (`*:focus-visible`) uses `var(--color-emerald)`, 2px, 2px offset, 4px border-radius.

---

## 8. HARD rule: section ≤ 1 viewport

**Rule:** the content of each main narrative section must fit one laptop screen (~768px window
≈ 650–700px usable height) with no scroll *inside* the section.

**Verification criterion:** at **1366×768** and **1440×900**, the section's top heading AND
its primary CTA must both be visible without in-section scroll.

**Mechanism:** `--section-pad` is a `vh`-aware fluid clamp (`clamp(1.8rem, 2.6vw + 2.8vh, 5rem)`)
rather than a fixed pixel value — this is what replaced the old fixed `.ds-section { padding:
120px 0 }` rule. Media inside sections should be capped via `height: clamp(…, …vh, …); object-fit:
cover`, not a tall fixed `aspect-ratio`.

**Documented exception:** Prices/comparison sections may exceed one viewport by design — a
pricing grid or comparison table is a "read/compare" surface, not a narrative scroll stop. For
`PricesSection`, the fit criterion applies to the tab switcher + the start of the card row (the
decision point, above the fold); the detail below (full card contents, the credit comparison
table) is allowed to extend past one screen.

---

## 9. Dependencies

| Библиотека | Версия | Назначение |
|---|---|---|
| `tailwindcss` | ^4.1.14 | CSS-first конфиг через `@theme` |
| `@tailwindcss/vite` | ^4.1.14 | Vite плагин |
| `lucide-react` | ^0.546.0 | Иконки |
| `motion` | ^12.23.24 | Анимации |
| `react` / `react-dom` | ^19.0.1 | UI фреймворк |
| `vite` | ^6.2.3 | Билд-тул |

---

## 10. Migration status

**On v2 (shipped):** `src/index.css` token layer + `.ds-*` classes (Task 1), Sora font loading
(Task 2), and the 4 flagship landing sections — `HeroSection.tsx`, `ServicesSection.tsx`,
`PricesSection.tsx`, `ContactFormSection.tsx` — fully de-hardcoded to semantic utilities per
§4's "no inline hex" rule.

**Still on v1 (pending):** every other section/page — `PainSolutionSection`, `AdvantagesSection`,
`CasesSection`, `WorkStepsSection`, `GuaranteesSection`, `CalculatorSection`, `ReviewsSection`,
plus `Navbar`, `Footer`, `LeadModal`, `AIConsultantWidget`, `AdminPage`, `BlogPage`,
`BlogDetailPage`, `ShopPage`, `ContactsPage`, and the raw `<body>` classes in `index.html`
(`bg-[#07140F] text-[#D5DDD8] … selection:bg-[#22C55E] selection:text-[#07140F]`). These still
use v1 inline hex (`#22C55E`, `#FBBF24`, `#07140F`, `#10261C`, `#F8FAF9`, `#1A2E23`, `#5A6E62`,
`#E2ECE6`, `#D5DDD8`, `#92A299`, `#647268`, …) and are visually inconsistent with the flagships
until migrated.

**How to migrate a remaining section:** apply the exact-string color migration map in
[`docs/superpowers/plans/2026-07-09-design-system-v2.md`](superpowers/plans/2026-07-09-design-system-v2.md)
(shared reference section near the top of that file) — it maps every v1 hex/RGBA literal to its
v2 utility or RGB triple, one-for-one, plus per-file guidance for dark vs. light sections. The
same plan file's Task 1–6 write-ups show worked examples (Hero/Contact = dark-section map,
Services = light-section map, Prices = both).
