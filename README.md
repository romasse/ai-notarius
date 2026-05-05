# Нотариус AI — Персональный инструмент риэлтора

Сайт с четырьмя разделами:
- **Чек-лист** — интерактивный список документов (вторичный/первичный рынок, ипотека, военное время)
- **AI-ассистент** — чат с Claude (проверка документов, договоры, налоги, клиентские объяснения)
- **Инструкция** — метапромт для Claude Projects + пошаговая настройка

---

## Деплой на Vercel (шаг за шагом)

### 1. Создай репозиторий на GitHub

1. Зайди на [github.com](https://github.com) → «New repository»
2. Название: `notary-assistant` (или любое другое)
3. Видимость: **Private** (личный инструмент)
4. Нажми «Create repository»

### 2. Загрузи код в репозиторий

Способ A — через GitHub Desktop (проще):
1. Скачай [GitHub Desktop](https://desktop.github.com/)
2. File → «Add local repository» → выбери папку с кодом
3. Commit → Push

Способ B — через терминал:
```bash
cd notary-assistant
git init
git add .
git commit -m "init"
git remote add origin https://github.com/ТВОЙ_ЛОГИН/notary-assistant.git
git push -u origin main
```

### 3. Подключи к Vercel

1. Зайди на [vercel.com](https://vercel.com) → «Add New Project»
2. Нажми «Import» рядом с репозиторием `notary-assistant`
3. Framework: **Next.js** (определится автоматически)
4. **НЕ нажимай Deploy ещё** — сначала шаг 4

### 4. Добавь API-ключ Anthropic

В настройках деплоя:
1. Нажми «Environment Variables»
2. Добавь переменную:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-xxxxxxx` (твой ключ с [console.anthropic.com](https://console.anthropic.com/))
3. Теперь нажми **Deploy**

### 5. Готово

Vercel даст тебе URL вида `notary-assistant-xxx.vercel.app`.
Сайт работает. AI-ассистент сразу готов к использованию.

---

## Локальный запуск (для тестирования)

```bash
# 1. Установи зависимости
npm install

# 2. Создай .env.local
cp .env.local.example .env.local
# Открой .env.local и вставь свой ANTHROPIC_API_KEY

# 3. Запусти
npm run dev

# Открой http://localhost:3000
```

---

## Структура проекта

```
app/
├── page.tsx              — Главная (дашборд)
├── checklist/page.tsx    — Интерактивный чек-лист
├── assistant/page.tsx    — AI-чат с Claude
├── guide/page.tsx        — Метапромт + инструкция
└── api/chat/route.ts     — API роут (стриминг к Claude)
components/
└── Sidebar.tsx           — Навигация
lib/
└── checklist-data.ts     — Данные чек-листа
```

---

## Обновление контента

- **Добавить документ в чек-лист** → отредактируй `lib/checklist-data.ts`
- **Изменить системный промт** → отредактируй `app/api/chat/route.ts` (константа `SYSTEM`)
- **Добавить раздел** → создай новую страницу в `app/`

После любых изменений: commit → push → Vercel деплоит автоматически.

---

## Стек

- **Next.js 14** (App Router)
- **Tailwind CSS** (стили)
- **Anthropic SDK** (Claude claude-sonnet-4-20250514 со стримингом)
- **Vercel** (хостинг + serverless functions)
