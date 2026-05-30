# GAZE — Ольфакторное бюро

Статический HTML прототип сайта для нишевого бренда ароматов и объектов интерьера из Санкт-Петербурга.

🌐 **Live:** https://creature666.github.io/gaze-preview/

---

## 📦 Что это

- **HTML/CSS/JS** статический прототип (готов к production или миграции на Next.js)
- **11 товаров** в каталоге с фотографиями
- **6 правовых документов** на русском (ФЗ-152, ГК РФ, ЗоЗПП)
- **Фильтры, корзина, cookie-согласие** — JS без frameworks
- **Дизайн:** чистый минимализм, Arial CAPS, чёрный nav везде

---

## 🚀 Быстрый старт

### Запустить локально

```bash
cd gaze-preview
python3 -m http.server 3456
# Открыть http://localhost:3456
```

### Структура файлов

- `index.html` — главная (hero с фото Red Mercury, новинки, footer белый)
- `shop.html` — каталог (11 товаров + фильтры + корзина)
- `b2b.html` — B2B страница
- `collab.html` — коллаборации
- `where.html` — где купить
- `images/` — товарные фото + `mercury background.png` (hero фон)
- Правовые: `privacy.html`, `offer.html`, `cookies.html`, `delivery.html`, `payment.html`, `returns.html`

### Деплой

```bash
git add .
git commit -m "Your message"
git push origin main
# GitHub Pages обновит за 1-3 минуты
```

---

## 🎨 Дизайн-система

| Элемент | Значение |
|---------|----------|
| Фон | `#FFFFFF` (белый) |
| Текст | `#0A0A0A` (чёрный) |
| Акцент | `#C8352A` (красный, B2B) |
| Шрифт | Arial, sans-serif |
| Стиль | ВСЕ CAPS, no serifs, no italics |

**Nav:** высота 106px, чёрный фон, лого слева, ссылки по центру  
**Footer:** чёрный на всех страницах, белый только на главной  
Логотип: `logo.svg` (GAZE wordmark)

---

## 📋 Страницы

### Главная (index.html)
1. **Hero** — фото Red Mercury на фоне, текст описания слева по центру
2. **Marquee** — бегущая строка категорий
3. **Новинки** — 4 товара с фото (чёрный фон)
4. **Footer** — белый, соцсети + реквизиты + правовые ссылки

### Каталог (shop.html)
- 11 товаров с фотографиями
- Фильтры по категориям
- Корзина с localStorage
- Toast-уведомления

### Правовые документы
- **privacy.html** — Политика конфиденциальности (ФЗ-152)
- **offer.html** — Публичная оферта (ГК РФ)
- **cookies.html** — Cookie-политика
- **returns.html** — Возврат и обмен (ЗоЗПП)
- **delivery.html** — Доставка (СДЭК, Почта России)
- **payment.html** — Способы оплаты (ЮКасса, СБП, ЮMoney)

---

## 🛒 Товары в каталоге

| # | Название | Цена |
|---|----------|------|
| 1 | Мыло Angel Dust | 1 100₽ |
| 2 | Набор саше | 1 400₽ |
| 3 | Troll (Smelly Tale × Gaze) | 3 000₽ |
| 4 | Шампунь Red Mercury | 3 000₽ |
| 5 | Жидкое мыло Oyster | 3 000₽ |
| 6 | Жидкое мыло Red Mercury | 3 000₽ |
| 7 | Кондиционер Red Mercury 500мл | 3 500₽ |
| 8 | Лосьон Oyster | 3 500₽ |
| 9 | Свеча Temple of Boxing | 4 400₽ |
| 10 | Лосьон Red Mercury (рефилл 5л) | 7 500₽ |
| 11 | Кондиционер Red Mercury (рефилл 5л) | 7 500₽ |

---

## 🔒 Правовая информация

**Оператор:** ИП Сидорова Екатерина Владимировна  
**ИНН:** 860323391263  
**ОГРНИП:** 323784700143353  
**Дата регистрации:** 02.05.2023  
**Email:** gazeoline01@gmail.com

---

## 🔧 Технические детали

- **Язык:** HTML5, CSS3, Vanilla JS (no frameworks)
- **Сервер:** Python http.server (порт 3456)
- **Деплой:** GitHub Pages (ветка main)
- **Версия:** v5

### JavaScript
- `acceptCookies()` — согласие в localStorage
- `addToCart()` — корзина
- Edit mode — drag-and-drop редактор позиций (кнопка ✏️ Edit в nav на главной)
- Scroll reveal анимации (.reveal)

### localStorage
- `cookiesAccepted` — согласие на cookies
- `cart` — товары в корзине (JSON)

---

## 🚀 Следующие шаги

- [ ] Реальные ссылки на соцсети (Telegram, VK, MAX)
- [ ] Интеграция ЮКасса (API)
- [ ] Backend для заказов
- [ ] Миграция на Next.js + Sanity CMS
- [ ] SEO (sitemap, meta, schema.org)
- [ ] Analytics (GA4)

---

**Версия:** v5 · **Дата:** май 2026 · **Статус:** ✅ Live на GitHub Pages
