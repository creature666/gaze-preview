# GAZE — Ольфакторное бюро

Статический HTML прототип сайта для нишевого бренда ароматов и объектов интерьера из Санкт-Петербурга.

🌐 **Live:** https://creature666.github.io/gaze-preview/  
📁 **Локально:** `/Users/dg/Documents/twozero/gaze-preview/`

---

## 🚀 Быстрый старт

```bash
git clone https://github.com/creature666/gaze-preview.git
cd gaze-preview
python3 -m http.server 3456
# → http://localhost:3456
```

> ⚠️ Обязательно запускать через HTTP-сервер — `nav.html` загружается через `fetch()` и не работает при открытии через `file://`

---

## 🏗 Архитектура

Чистый статик без фреймворков: HTML + CSS + Vanilla JS. Готов к деплою или миграции на Next.js + Sanity CMS.

### Ключевые файлы

```
gaze-preview/
├── index.html          ← Главная (hero, новинки, footer)
├── shop.html           ← Каталог (27 товаров, фильтры, корзина, поиск, модалки)
├── care.html           ← Категория: Уход
├── perfumes.html       ← Категория: Парфюмы
├── home.html           ← Категория: Интерьер
├── where.html          ← Где купить (6 городов)
├── b2b.html            ← B2B партнёрство
├── collab.html         ← Коллаборации
│
├── nav.html            ← ⚡ Единый nav (загружается на всех страницах через fetch)
├── cart-search.js      ← ⚡ Глобальная корзина + поиск (на страницах без каталога)
├── editmode.js         ← 🛠 Dev-инструмент: inline редактирование текстов
│
├── privacy.html        ← Политика конфиденциальности (ФЗ-152)
├── offer.html          ← Публичная оферта (ГК РФ ст. 438)
├── cookies.html        ← Cookie-политика
├── returns.html        ← Возврат и обмен (ЗоЗПП ст. 26.1)
├── delivery.html       ← Доставка (СДЭК, Почта России)
├── payment.html        ← Оплата (ЮКасса, СБП, ЮMoney)
│
├── logo.svg            ← GAZE wordmark
└── images/             ← Фото товаров + hero-фоны
```

---

## 🧭 Навигация и общие компоненты

### nav.html — единый источник истины
Все 14 страниц загружают nav через `fetch('./nav.html')`. Менять nav нужно **только в одном месте**.

```
Лого (абсолютно слева) | Ссылки (по центру) | 🔍 🛒 (абсолютно справа)
```

- Desktop: поиск + корзина справа, ссылки по центру
- Mobile: гамбургер + иконки справа

### cart-search.js — глобальная корзина и поиск
Подключён на страницах без каталога (index, where, b2b, collab, legal). Самовыключается на shop/care/perfumes/home (у них своя нативная реализация).

- **Корзина**: sidebar с LocalStorage, qty +/−, оформление через mailto
- **Поиск**: модалка → Enter → редирект на `shop.html?q=запрос` с автооткрытием

### editmode.js — inline редактор (dev)
Кнопка **✏ Edit** в правом нижнем углу на всех страницах. Клик → все текстовые блоки становятся `contenteditable`. Изменения видны только в браузере, не сохраняются.

---

## 🎨 Дизайн-система

| | |
|---|---|
| **Фон** | `#FFFFFF` |
| **Текст** | `#171717` |
| **Акцент** | `#C8352A` (красный, B2B секция) |
| **Серый** | `#8A8A8A` |
| **Шрифт** | Arial, sans-serif — ТОЛЬКО. Без засечек, без курсива. |
| **Стиль** | ВСЕ CAPS, letter-spacing 0.2–0.3em |

**Nav:** `height: 71px`, `rgba(23,23,23,0.75)` + `backdrop-filter: blur(9px)`  
**Footer:** чёрный (`#171717`) на всех страницах, кроме главной (там белый)  
**Логотип в nav:** `height: 44px`, `filter: invert(1)`  
**Логотип в footer:** `height: clamp(36px, 5vw, 60px)`, `filter: invert(1)`

---

## 📦 Каталог товаров

27 товаров в `PRODUCTS` массиве (дублируется в shop / care / perfumes / home).

**Категории:** `уход` · `свеча` · `парфюм` · `диффузор` · `рефилл` · `коллаборации` · `саше`

Товары без реальных фото используют `images/placeholder.jpg.jpeg` (SVG-плейсхолдер с логотипом). Все `<img>` имеют `onerror="this.style.visibility='hidden'"` как fallback.

---

## 🛒 Корзина и localStorage

```js
// Структура корзины
localStorage.cart = JSON.stringify([
  { id: 1, name: "Мыло Angel Dust", price: 1100, qty: 2, img: "images/..." }
])

// Cookie-consent
localStorage.cookiesAccepted = "1"
```

Корзина работает на всех страницах. На каталоговых страницах — нативный sidebar. На остальных — `cart-search.js`.

---

## 🏛 Правовая база

**Оператор ПД:** ИП Сидорова Екатерина Владимировна  
**ИНН:** 860323391263 · **ОГРНИП:** 323784700143353 · **Рег.:** 02.05.2023  
**Email:** gazeoline01@gmail.com

Все 6 правовых страниц содержат footer и cookie-banner.

---

## 📐 Страницы категорий (care / perfumes / home)

Каждая — отдельный clone shop.html с:
- Hero `height: calc(67vh - 71px)` с фото-фоном + тёмный оверлей + белый текст
- Отфильтрованными товарами (`'уход'` / `'парфюм'` / `['свеча','диффузор','саше']`)
- Полным cart sidebar + search modal + product modal

---

## 🚢 Деплой

```bash
git add .
git commit -m "описание изменений"
git push origin main
# GitHub Pages обновится за 1–3 мин
```

**Ветка:** `main` → GitHub Pages напрямую  
**Тег безопасности:** `v5-rollback-safety` (точка отката)

---

## ⚠️ Известные ограничения

- [ ] ~16 товаров показывают placeholder вместо реальных фото
- [ ] Кнопка "Оформить заказ" → `mailto:` (нет интеграции ЮКасса)
- [ ] Ссылки VK и MAX в footer — `href="#"` (заглушки)
- [ ] `editmode.js` активен на продакшне (dev-инструмент)
- [ ] Нет SEO (meta description, Open Graph, sitemap)
- [ ] `PRODUCTS` массив дублируется в 4 файлах — при изменении менять везде

---

## 🔮 Следующие шаги

- [ ] Реальные ссылки на соцсети
- [ ] Добавить фото к оставшимся товарам
- [ ] Интеграция ЮКасса
- [ ] Вынести `PRODUCTS` в отдельный `products.js`
- [ ] SEO (meta, Open Graph, schema.org)
- [ ] Аналитика (GA4)
- [ ] Миграция на Next.js + Sanity CMS + Vercel

---

**Версия:** v6 · **Дата:** май 2026 · **Статус:** ✅ Live
