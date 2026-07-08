# Design System — SES AI Studio (GURU ENERGY)

## 1. Цвета

### Brand

| Токен | Hex | Назначение |
|---|---|---|
| `--color-brand-green` | `#22C55E` | Основной CTA, акценты, ссылки |
| `--color-brand-hover` | `#16A34A` | Hover-состояние зелёного |
| `--color-brand-dark` | `#15803D` | Тёмный зелёный для текста на светлом |
| `--color-brand-glow` | `rgba(34, 197, 94, 0.35)` | Glow-эффекты, тени |

### Фоны (тёмная тема)

| Токен | Hex | Назначение |
|---|---|---|
| `--color-bg-primary` | `#07140F` | Основной тёмный фон |
| `--color-bg-secondary` | `#0B1F16` | Вторичная поверхность |
| `--color-bg-section` | `#10261C` | Секции, карточки |
| `--color-bg-card` | `rgba(24, 44, 33, 0.92)` | Карточки (`.ds-card`) |
| `--color-bg-glass` | `rgba(42, 63, 49, 0.72)` | Glassmorphism (`.glass-panel`) |

### Фоны (светлая тема)

| Токен | Hex | Назначение |
|---|---|---|
| `--color-light-bg` | `#F8FAF9` | Светлые секции |
| `--color-light-card` | `#FFFFFF` | Белые карточки |
| `--color-light-hover` | `#EEF5F1` | Hover-состояние |

### Текст

| Токен | Hex | Назначение |
|---|---|---|
| `--color-text-primary` | `#FFFFFF` | Основной текст на тёмном |
| `--color-text-secondary` | `#D5DDD8` | Текст body |
| `--color-text-muted` | `#92A299` | Приглушённый текст |
| `--color-text-disabled` | `#647268` | Disabled, placeholder |
| `--color-light-text` | `#1A2E23` | Текст на светлом фоне |
| `--color-light-muted` | `#5A6E62` | Приглушённый на светлом |

### Акценты

| Цвет | Назначение |
|---|---|
| `#FBBF24` | Вторичный акцент (бейджи, звёзды, цены) |
| `#B8860B` | Тёмное золото (метки времени/стоимости) |
| `#F59E0B` | Hover-состояние жёлтого |

### Границы

| Значение | Назначение |
|---|---|
| `rgba(255, 255, 255, 0.08)` | Границы на тёмном фоне |
| `rgba(255, 255, 255, 0.35)` | Вторичные кнопки |
| `rgba(255, 255, 255, 0.5)` | Hover вторичных кнопок |
| `#E2ECE6` | Границы на светлом фоне |

### Семантические паттерны

- **Успех/Актив**: `#22C55E` + `rgba(34,197,94,.1)` фон + `rgba(34,197,94,.2)` граница
- **Внимание**: `#FBBF24` + `rgba(251,191,36,.12)` фон + `rgba(251,191,36,.25)` граница
- **Ошибка**: `red-400` текст + `red-500/10` фон + `red-500/30` граница

---

## 2. Типографика

### Шрифты

```css
--font-sans: "Manrope", "Inter", system-ui, sans-serif;
```

- **Manrope** (основной): 400, 500, 600, 700, 800
- **Inter** (фоллбэк): 300–700
- **Sora** (цифры в Energy Monitor)

### Размеры шрифта

| Класс | Размер | Назначение |
|---|---|---|
| `text-[9px]` | 9px | Микро-бейджи |
| `text-[10px]` | 10px | Метки статистик |
| `text-[11px]` | 11px | Мета-данные |
| `text-xs` | 12px | Лейблы, навигация |
| `text-sm` | 14px | Body, описания |
| `text-base` | 16px | Заголовки карточек |
| `text-lg` | 18px | Заголовки секций |
| `text-xl` | 20px | Подзаголовки |
| `text-2xl` | 24px | Основные заголовки |
| `text-3xl` | 30px | Hero (мобайл) |
| `text-4xl` | 36px | Hero (планшет) |
| `text-5xl` | 48px | Hero (десктоп) |
| `text-6xl` | 60px | Hero (большой десктоп) |

### Насыщенность

| Класс | Вес | Назначение |
|---|---|---|
| `font-normal` | 400 | Body |
| `font-medium` | 500 | Подписи |
| `font-semibold` | 600 | Акцент |
| `font-bold` | 700 | Лейблы, навигация |
| `font-extrabold` | 800 | Заголовки |
| `font-black` | 900 | Hero, цифры |

### Трансформация и интервал

- `uppercase` — бейджи, секции, кнопки
- `tracking-wide` — кнопки, навигация
- `tracking-wider` — метки uppercase
- `tracking-widest` — заголовки секций

---

## 3. Отступы

### Секции

```css
.ds-section { padding-top: 120px; padding-bottom: 120px; }
```

Внутренний: `space-y-[64px]` (основные) или `space-y-[48px]`

### Горизонтальные отступы контейнера

| Класс | Значение |
|---|---|
| `px-5` | 20px (мобайл) |
| `md:px-8` | 32px (десктоп) |

### Gap (наиболее частые)

| Класс | Значение | Назначение |
|---|---|---|
| `gap-12`–`gap-16` | 48–64px | Hero сетка |
| `gap-8` | 32px | Сетки кейсов, формы |
| `gap-6` | 24px | Сетки карточек (3 кол.) |
| `gap-5` | 20px | Сетки услуг, формы |
| `gap-4` | 16px | Двухколоночные |
| `gap-3` | 12px | Элементы сетки |
| `gap-2` | 8px | Инлайн-элементы |
| `gap-1.5` | 6px | Навигация, flex |

---

## 4. Border Radius

| Радиус | Класс | Назначение |
|---|---|---|
| Pill | `rounded-full` | Кнопки, бейджи, пили навигации |
| 32px | `rounded-[32px]` | Модалки, glass-панели |
| 28px | `rounded-[28px]` | Карточки (`.ds-card`) |
| 18px | `rounded-[18px]` | Инпуты (`.ds-input`) |
| 16px | `rounded-2xl` | Контейнеры иконок |
| 14px | `rounded-[14px]` | Теги, пагинация |
| 12px | `rounded-xl` | Малые бейджи |
| 8px | `rounded-lg` | Малые элементы |

---

## 5. Тени

### CSS-определённые

| Тень | Контекст |
|---|---|
| `0 24px 80px rgba(0, 0, 0, 0.45)` | `.glass-panel` |
| `0 24px 80px rgba(26, 46, 35, 0.1)` | `.glass-panel-light` |
| `0 20px 60px rgba(0, 0, 0, 0.35)` | `.ds-card` |
| `0 28px 80px rgba(0, 0, 0, 0.5)` | `.ds-card:hover` |
| `0 12px 30px rgba(34, 197, 94, 0.35)` | `.ds-btn-primary` |
| `0 16px 40px rgba(34, 197, 94, 0.45)` | `.ds-btn-primary:hover` |

### Tailwind inline

| Класс | Назначение |
|---|---|
| `shadow-[0_4px_20px_rgba(26,46,35,.05)]` | Карточки на светлом |
| `shadow-[0_4px_14px_rgba(34,197,94,.3)]` | Зелёные иконки |
| `shadow-[0_4px_14px_rgba(251,191,36,.3)]` | Жёлтые иконки |
| `shadow-[0_10px_35px_rgba(34,197,94,0.45)]` | FAB кнопка AI |
| `shadow-[0_20px_60px_rgba(34,197,94,.15)]` | Популярный пакет |
| `shadow-[0_20px_60px_rgba(251,191,36,.15)]` | Бестселлер пакет |
| `shadow-md` | Активные элементы навигации |
| `shadow-xl` | Карточки, оверлеи |
| `shadow-2xl` | Таблицы, мобильное меню |

---

## 6. Компоненты

### Кнопки

#### `.ds-btn-primary`
```
bg: #22C55E | text: #07140F | font: 800
letter-spacing: 0.02em | padding: 16px 34px | radius: pill
shadow: 0 12px 30px rgba(34, 197, 94, 0.35)
hover: bg #16A34A, translateY(-2px), shadow-更强
active: translateY(0)
```
Оверрайды: `!py-3`, `!px-5`, `!px-7`, `!text-xs`, `!text-sm`, `w-full`

#### `.ds-btn-secondary`
```
bg: transparent | text: #D5DDD8 | font: 700
border: 1px solid rgba(255,255,255,0.35) | radius: pill
hover: bg rgba(255,255,255,.05), border rgba(255,255,255,.5)
```

#### FAB (AI Widget)
```
px-5 py-4 rounded-full
bg-gradient-to-r from-[#22C55E] to-emerald-500
text-[#07140F] font-black text-xs uppercase tracking-wider
shadow-[0_10px_35px_rgba(34,197,94,0.45)]
hover:scale-105 active:scale-95 transition-all
```

### Карточки

#### `.ds-card` (тёмная)
```
bg: rgba(24, 44, 33, 0.92)
border: 1px solid rgba(255,255,255,0.08)
radius: 28px | padding: 32px
shadow: 0 20px 60px rgba(0,0,0,0.35)
hover: translateY(-4px), shadow-更强
```

#### Светлая карточка (inline)
```
bg-gradient-to-br from-white to-[rgba(251,191,36,.13)]
rounded-[28px] border border-[#E2ECE6] p-[28px]
shadow-[0_4px_20px_rgba(26,46,35,.05)]
hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(251,191,36,.14)]
```

### Glass-панели

#### `.glass-panel` (тёмная)
```
bg: rgba(42, 63, 49, 0.72)
backdrop-filter: blur(20px)
border: 1px solid rgba(255,255,255,0.08)
shadow: 0 24px 80px rgba(0,0,0,0.45)
radius: 32px
```

#### `.glass-panel-light` (светлая)
```
bg: rgba(255, 255, 255, 0.8)
backdrop-filter: blur(20px)
border: 1px solid #E2ECE6
shadow: 0 24px 80px rgba(26,46,35,0.1)
radius: 32px
```

### Инпуты

#### `.ds-input` (тёмный)
```
border-radius: 18px
border: 1px solid rgba(255,255,255,0.08)
bg: #07140F | padding: 12px 16px | color: #FFF
focus: border-color #22C55E, outline: none
placeholder: #647268
```

#### Светлый инпут
```
bg-white border border-[#E2ECE6] rounded-[14px]
px-4 py-3.5 text-sm text-[#1A2E23]
placeholder-[#92A299] focus:border-[#22C55E]
```

### Бейджи

#### `.ds-badge`
```
radius: pill | font: 700 | letter-spacing: 0.05em
text-transform: uppercase
```

#### Варианты

| Тип | Классы |
|---|---|
| Зелёный акцент | `bg-[rgba(34,197,94,.1)] text-[#22C55E] border border-[rgba(34,197,94,.2)]` |
| Жёлтый urgency | `bg-[#FBBF24] text-[#07140F]` |
| Amber subtle | `bg-[rgba(251,191,36,.12)] text-[#FBBF24] border border-[rgba(251,191,36,.25)]` |
| Тёмный тег | `bg-[#10261C] text-[#D5DDD8] border border-[rgba(255,255,255,.08)]` |

### Навигация

#### Пили навигации
```
bg-[#F0F5F2] p-1.5 rounded-full border border-[#E2ECE6]
Active: bg-[#22C55E] text-white shadow-md shadow-[rgba(34,197,94,.2)]
```

#### Таб-свитчер
```
inline-flex p-1.5 rounded-full bg-[#10261C]
border border-[rgba(255,255,255,.08)] shadow-inner
Active: bg-[#22C55E] text-[#07140F]
```

### Контейнеры иконок

| Тип | Классы |
|---|---|
| Зелёный | `w-12 h-12 rounded-2xl bg-[#22C55E]` или `bg-[rgba(34,197,94,.15)] text-[#22C55E] shadow-[0_4px_14px_rgba(34,197,94,.3)]` |
| Жёлтый | `w-12 h-12 rounded-2xl bg-[#FBBF24]` или `bg-[rgba(251,191,36,.12)] text-[#FBBF24] shadow-[0_4px_14px_rgba(251,191,36,.3)]` |

Hover: `group-hover:scale-110 group-hover:shadow-[...更强]`

### Ошибки

```
flex items-center gap-2 p-3 rounded-2xl
bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium
```

---

## 7. Breakpoints

| Класс | Ширина | Назначение |
|---|---|---|
| `sm` | 640px | Мелкие правки |
| `md` | 768px | Планшет, 2-колоночные сетки |
| `lg` | 1024px | Десктоп, 12-колоночные сетки |
| `xl` | 1280px | Полный десктоп, навигация |

### Типичные паттерны

```bash
# Сетки
grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
grid-cols-1 lg:grid-cols-12

# Видимость
hidden md:block          # контакт-бар
hidden xl:flex           # десктоп навигация
xl:hidden                # мобильное меню

# Типографика
text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:text-6xl

# Секции
py-16 md:py-24
py-20 md:py-32
```

---

## 8. Анимации

### CSS transitions (из `index.css`)

| Переход | Длительность | Контекст |
|---|---|---|
| `transform, box-shadow, border-color` | 250ms ease | `.ds-card` |
| `all` | 250ms ease | Кнопки |
| `border-color` | 200ms ease | `.ds-input` |

### Tailwind анимации

| Класс | Назначение |
|---|---|
| `animate-pulse` | Live-индикаторы |
| `animate-ping` | Urgency-точка (hero) |
| `animate-bounce` | Иконка успеха |
| `animate-spin` | Загрузка, AI sparkle |
| `animate-in fade-in duration-200` | Модалки, FAQ |
| `animate-in slide-in-from-top-4 duration-200` | Мобильное меню |
| `animate-in slide-in-from-bottom-5 duration-300` | AI чат виджет |

### Hover/Active паттерны

| Класс | Контекст |
|---|---|
| `hover:-translate-y-1` | Светлые карточки |
| `hover:-translate-y-2` | Тёмные карточки (`.ds-card`) |
| `hover:scale-105` | FAB, иконки |
| `hover:scale-110` | Контейнеры иконок |
| `active:scale-95` | Кнопки, FAB |
| `group-hover:scale-105` | Изображения блога/кейсов |

---

## 9. Layout

### Контейнер

```
max-w-[1280px] mx-auto px-5 md:px-8
```

| Вариант | Класс |
|---|---|
| Стандарт | `max-w-[1280px]` |
| Узкий | `max-w-4xl` |
| Средний | `max-w-6xl` |
| Широкий | `max-w-7xl` |

### 12-колоночные сетки

| Раскладка | Колонки |
|---|---|
| Hero | `lg:col-span-6` + `lg:col-span-6` |
| Калькулятор | `lg:col-span-7` + `lg:col-span-5` |
| Контакты | `lg:col-span-5` + `lg:col-span-7` |
| Услуги (асимметрия) | `lg:col-span-2` + `lg:col-span-3` + `lg:col-span-5` |

### Секции

```
.ds-section { padding: 120px 0; }
Inner: space-y-[64px]
```

### Scroll Snap (отзывы)

```
flex overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide
Items: snap-center shrink-0 w-[85vw] md:w-auto
```

---

## 10. Тема

Проект использует **разделение тёмная/светлая по секциям**, а не глобальный toggle:

| Секция | Тема |
|---|---|
| Hero, Боль, Преимущества, Цены, Отзывы, FAQ, Форма, Футер | Тёмная (`#07140F`) |
| Услуги, Этапы, Кейсы, Гарантии, Калькулятор, SEO | Светлая (`#F8FAF9`) |
| Блог (деталь), Политика, Админ | Тёмная (`slate-950`) |

---

## 11. Зависимости

| Библиотека | Версия | Назначение |
|---|---|---|
| `tailwindcss` | ^4.1.14 | CSS-first конфиг через `@theme` |
| `@tailwindcss/vite` | ^4.1.14 | Vite плагин |
| `lucide-react` | ^0.546.0 | Иконки |
| `motion` | ^12.23.24 | Анимации |
| `react` / `react-dom` | ^19.0.1 | UI фреймворк |
| `vite` | ^6.2.3 | Билд-тул |
