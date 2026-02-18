Sellora AI — Правила проекта для Cursor IDE
Версия 1.0 | Февраль 2026
Проект: Sellora AI — убийца Aidentika (AI-генератор продающих визуалов для WB/Ozon/YM)
Эти правила ОБЯЗАТЕЛЬНЫ для всех ответов Cursor в этом проекте.
1. Общий стиль работы (всегда соблюдай порядок)

Сначала план — всегда начинай ответ с разделаtext### ПЛАН РАБОТЫ
1. ...
2. ...
Затем реализация — код только после плана.
После кода — разделtext### ПРОВЕРКА КОДА
- [ ] TypeScript ошибки
- [ ] ESLint
- [ ] Импорты корректны
- [ ] Безопасность (RLS, auth)
- [ ] Производительность
В конце — краткий список файлов, которые изменились/созданы.

2. Технические требования (строго!)

Язык: TypeScript (strict mode, no any)
Frontend: Next.js 15 App Router + React 19 + Tailwind + shadcn/ui + next-themes (dark/light)
UI: lucide-react иконки, sonner тосты, loading skeletons, optimistic updates
Backend: FastAPI (Python) + Pydantic v2 + Redis + BullMQ
БД: Supabase Postgres + RLS policies + Storage
AI: fal.ai (Flux.1.1), RunPod (ComfyUI), Claude 4 / Groq
Платежи: YooKassa
Бот: aiogram 3.x

3. Структура проекта (никогда не нарушай!)
textsellora-ai/
├── app/                    # Next.js App Router
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/                # route handlers
│   └── layout.tsx
├── components/             # shadcn + custom
├── lib/                    # utils, supabase client
├── hooks/
├── types/                  # все интерфейсы
├── backend/                # FastAPI (отдельный сервис)
│   ├── app/
│   ├── workflows/          # ComfyUI JSON
│   └── main.py
├── supabase/               # migrations, sql
├── .env.example
└── README.md
4. Кодинг-стандарты

Все компоненты — server components по умолчанию, client только где нужно ("use client")
Имена: PascalCase для компонентов, camelCase для всего остального
Комментарии: перед каждой большой функцией/endpoint — 2–3 строки описания
Error handling: try/catch + toast + logging
Security: никогда не expose API-ключи в frontend
Коммиты: пиши понятные названия (feat: digital twin, fix: token balance)

5. Особые требования Sellora AI

Цифровой двойник — всегда используй IP-Adapter + ControlNet + авто-LoRA
Токены — 1 генерация фото = 1 токен, видео = 20–30 токенов
Рефералка — пожизненные 25% + ежедневные 20 токенов
Full Card Kit — минимум 9 слайдов + инфографика + стрелки
UI — делай максимально похоже на app.aidentika.com, но современнее, быстрее и красивее
Мобильная версия — 100% адаптив + PWA
Производительность — очередь генераций, лимиты по токенам, skeletons

6. Перед каждой большой фичей
Всегда спрашивай у меня (пользователя) подтверждение, если фича стоит больше 30 минут работы.
7. Финальные проверки перед Apply

Работает ли на мобильных?
Есть ли loading состояния?
Баланс токенов обновляется корректно?
Реферальные бонусы начисляются?
Нет ли утечек памяти/ключей?


Готово!