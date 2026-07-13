# Онбординг: установка проекта и работа по GitHub Flow

Инструкция для нового участника — как поднять `ses-ai-studio` с нуля и настроить среду
для работы по нашему процессу. Правила процесса целиком — в [CONTRIBUTING.md](../CONTRIBUTING.md)
(источник истины); документация по коду и архитектуре — в [CLAUDE.md](../CLAUDE.md).

## 1. Что нужно заранее

- **Git**
- **Node.js 20 LTS** (или новее) + npm
- (рекомендуется) **GitHub CLI** `gh` — чтобы создавать и мержить PR из терминала

## 2. Установить проект с нуля

> ⚠️ Если у тебя уже есть старая локальная копия — **не обновляй её**: историю `master`
> переписывали, старые ветки разошлись. Переименуй/удали старую папку и склонируй заново.

```bash
git clone https://github.com/AnDrey1902/ses-ai-studio.git
cd ses-ai-studio
npm install
```

На Windows, если `npm install` падает на нативных пакетах (lightningcss / rollup):

```bash
npm install --include=optional
```

(Опционально) для живого ИИ-виджета создай файл `.env.local` в корне:

```
GEMINI_API_KEY=твой_ключ
```

Без ключа приложение работает — ИИ-консультант отдаёт запасные ответы (см. [CLAUDE.md](../CLAUDE.md)).

Запуск:

```bash
npm run dev      # http://localhost:3000 (Express + Vite)
npm run build    # прод-сборка (client → dist/, server → dist/server.cjs)
npm start        # запустить прод-сборку (нужен NODE_ENV=production)
```

Автоматических тестов нет; единственная проверка — `npm run build` (гейт процесса).
`npm run lint` (tsc) может быть сломан — ориентируйся на сборку.

## 3. Настроить Git под наш процесс

```bash
git config user.name  "Имя Фамилия"
git config user.email "твой_email@users.noreply.github.com"
```

(Рекомендуется) GitHub CLI:

```bash
gh auth login    # GitHub.com → HTTPS → Login with a web browser
```

**Быстрые команды.** Открой [CONTRIBUTING.md](../CONTRIBUTING.md) → раздел
**«Быстрый режим (git-алиасы)»** и скопируй блок `[alias]` в свой глобальный `~/.gitconfig`.
После этого доступны `git start` / `git save` / `git ship` / `git land` / `git sync`.

## 4. Правила работы (коротко — полностью в CONTRIBUTING.md)

- `master` **защищён**: напрямую не пушим, только через Pull Request. Даже как владелец репо — работай через PR.
- **Одна задача/сессия = одна ветка = один PR.** Не плоди отдельный PR на каждую мелочь.
- Коммиты **на английском**, Conventional Commits (`feat` / `fix` / `docs` / `chore`).
- **Merge — вручную после ревью.** Чужие PR не мержим без согласования.
- Цикл: `git start feature/x` → работа + `git save "…"` → `git ship "…"` → ревью →
  `git land` (или кнопка *Merge* на GitHub) → `git sync`.

**[CONTRIBUTING.md](../CONTRIBUTING.md) — источник истины по процессу. Прочитай целиком.**

## 5. Для агентных сред (Claude Code / OpenCode / прочие)

- **Claude Code** читает [CLAUDE.md](../CLAUDE.md) — там продублирован жёсткий регламент GitHub Flow.
- **OpenCode** читает `AGENTS.md`. Учти: текущий `AGENTS.md` в репозитории — обобщённый
  шаблон и **не содержит правил GitHub Flow этого проекта**. Чтобы твой OpenCode их соблюдал,
  добавь в свой `AGENTS.md` короткий блок «Git workflow» со ссылкой на
  [CONTRIBUTING.md](../CONTRIBUTING.md) как на источник истины (по аналогии с `CLAUDE.md`).
- Любой ассистент **открывает PR, но не мержит** — слияние остаётся ручным действием человека.
