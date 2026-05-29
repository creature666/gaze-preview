# CLAUDE.md — Gaze Project Guide

## 🎯 Project Quick Facts

- **Project:** GAZE — Olfactory brand website prototype
- **Status:** ✅ Live on GitHub Pages
- **Local path:** `/Users/dg/Documents/twozero/gaze-preview/`
- **Live URL:** https://creature666.github.io/gaze-preview/
- **GitHub:** https://github.com/creature666/gaze-preview
- **Local server:** `python3 -m http.server 3456` (port 3456)

---

## 📁 File Structure & Purposes

### Core Pages
- **index.html** (25.5 KB)
  - Main homepage with hero, marquee, new items, about, B2B, where to buy sections
  - Contains 4 products with real images in "Новинки" section
  - All legal links in footer
  - 100vh hero with SVG logo

- **shop.html** (24.9 KB)
  - 11-item catalog with filters, cart, toast notifications
  - Product array with images, categories, prices
  - localStorage for cart persistence
  - Filter buttons: ароматы, свечи, уход, коллаборации, рефилл

### Legal Pages (Full Russian compliance)
- **privacy.html** — ФЗ-152 "О персональных данных"
- **offer.html** — ГК РФ ст. 438 Публичная оферта
- **cookies.html** — Cookie-политика
- **returns.html** — ЗоЗПП ст. 26.1 Возврат и обмен
- **delivery.html** — Доставка (СДЭК, Почта России)
- **payment.html** — Способы оплаты (ЮКасса, СБП, ЮMoney)

### Assets
- **logo.svg** — GAZE wordmark (2.7 KB, inverted in footer with filter:invert(1))
- **images/** — 122 files (98 JPEG hashes + SVG + GIF + WebP)
  - Product images: `*hash*.jpg.jpeg` format
  - Example: `c5c11ab33002019b986e5eed43823790.jpg.jpeg`

### Config & Docs
- **README.md** — Public facing documentation (GitHub)
- **CLAUDE.md** — This file
- **.claude/launch.json** — Dev server config

---

## 🎨 Design System

### Colors (CSS Custom Properties)
```css
--cream: #FFFFFF           /* Main background */
--red: #C8352A             /* Accent (B2B section) */
--black: #0A0A0A           /* Text */
--gray: #8A8A8A            /* Secondary text */
```

### Typography
- **Font:** Arial, sans-serif ONLY (no serifs, no italics)
- **Style:** ALL CAPS
- **Sizes:**
  - Headings: 11–130px, font-weight 700
  - Body: 9–13px, regular weight
  - Letter-spacing: 0.2–0.3em (headers), 0.04–0.15em (body)

### Logo Usage
- **Nav:** height 22px, natural black color
- **Hero:** width clamp(200px, 28vw, 420px)
- **Footer:** height clamp(36px, 5vw, 60px), `filter:invert(1)` on black background

---

## 🛒 Product Data

**11 products in shop.html:**

```javascript
const products = [
  { id: 1, name: "Мыло Angel Dust", sub: "Глицериновое мыло", price: 1100, img: "images/45700513.jpg.jpeg" },
  { id: 2, name: "Набор саше", price: 1400, img: "images/ab7f466a8113592db3ba4f76c8f0cfaa.jpg.jpeg" },
  { id: 3, name: "Troll", sub: "Smelly Tale × Gaze", price: 3000, img: "images/c5c11ab33002019b986e5eed43823790.jpg.jpeg" },
  // ... 8 more products
];
```

**Featured on homepage (index.html) — 4 products from shop:**
1. Troll — `c5c11ab3...` — 3000₽
2. Temple of Boxing — `90c06c34...` — 4400₽
3. Лосьон Red Mercury — `3f641a35...` — 7500₽
4. Кондиционер Red Mercury — `8e1f856d...` — 7500₽

---

## 🔐 Company Info (Required for Legal Pages)

**Operator:** ИП Сидорова Екатерина Владимировна  
**INN:** 860323391263  
**OGRNIP:** 323784700143353  
**Registration date:** 02.05.2023  
**Email:** gazeoline01@gmail.com

---

## 🚀 Local Development Workflow

### 1. Start Server
```bash
cd /Users/dg/Documents/twozero/gaze-preview
python3 -m http.server 3456
```

### 2. Edit Files
- Any file change auto-loads (Cmd+R to refresh browser)
- Check console for JS errors
- Test localStorage (DevTools → Application → Storage)

### 3. Commit & Deploy
```bash
git add .
git commit -m "Description"
git push origin main
# Wait 1-3 min for GitHub Pages to update
```

---

## 💾 localStorage Keys

### cookiesAccepted
- **Key:** `cookiesAccepted`
- **Value:** `'1'` (string)
- **Purpose:** Hide cookie banner after acceptance
- **Code:**
  ```js
  if (localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-banner').classList.add('hidden');
  }
  ```

### cart
- **Key:** `cart`
- **Value:** JSON array of cart items
- **Item structure:**
  ```json
  { "id": 1, "name": "Мыло Angel Dust", "price": 1100, "quantity": 1, "img": "..." }
  ```

---

## 🎯 Common Tasks

### Add a new product to shop
1. Edit `shop.html` → find products array
2. Add new object: `{ id: 12, name: "...", price: 0000, img: "images/...jpeg" }`
3. Commit & push

### Add a new section to homepage
1. Edit `index.html`
2. Add new `<section class="section-name reveal">`
3. CSS automatically in `<style>` block
4. `.reveal` class triggers scroll animation

### Add a new legal page
1. Create `newpage.html` with same template structure (nav, footer, cookie banner)
2. Add link to footer: `<a href="newpage.html">...</a>`
3. Commit & push

### Update company info
- **Locations:** privacy.html, offer.html, footer in index.html + shop.html
- **Email:** footer in all pages + payment.html
- **Tax IDs:** footer in index.html, shop.html, privacy.html, offer.html

### Test images
```bash
# Check if all product images exist
cd /Users/dg/Documents/twozero/gaze-preview
ls images/ | wc -l  # Should show 122 files
```

---

## 🔧 JavaScript Functions

### Shop (shop.html)
- `addToCart(productId)` — Add product to cart
- `removeFromCart(productId)` — Remove from cart
- `updateCartUI()` — Refresh cart display
- `formatPrice(num)` — Format number as "1 234 ₽"

### All Pages
- `acceptCookies()` — Set localStorage, hide banner
- Scroll reveal observer (Intersection Observer API)

---

## 🧪 Testing Checklist

- [ ] All 11 products load with images in shop.html
- [ ] Filters work (click each category)
- [ ] Add to cart → localStorage updates
- [ ] Cart removes items correctly
- [ ] Cookie banner appears once, hidden after click
- [ ] All legal pages load (links in footer)
- [ ] Hero logo loads (SVG)
- [ ] Images load and hover animation works
- [ ] Marquee scrolls continuously
- [ ] Responsive (resize to mobile width)
- [ ] No console errors

---

## 📱 Mobile Responsive

All font sizes use `clamp()`:
```css
.hero-title img { width: clamp(200px, 28vw, 420px); }
.footer-logo img { height: clamp(36px, 5vw, 60px); }
```

Grid adjusts:
- Desktop: full columns
- Tablet: 2 columns
- Mobile: 1 column (media queries not needed, CSS Grid is fluid)

---

## 🐛 Known Limitations / Future Work

- [ ] No real payment integration (ЮКасса API not wired)
- [ ] No email for newsletter (form doesn't send)
- [ ] No user accounts / auth
- [ ] No inventory management
- [ ] No analytics (GA4 not added)
- [ ] No SEO optimization yet
- → Ready for Next.js + Sanity CMS + Vercel production build

---

## 🔄 Git Workflow (GitHub Pages Auto-Deploy)

```bash
# Create local changes
vim index.html

# Stage & commit
git add .
git commit -m "Update hero text"

# Push to main
git push origin main

# GitHub Pages deploys automatically (1-3 min)
# https://creature666.github.io/gaze-preview/ updates
```

**Branch:** main (only branch, direct deploy)  
**Settings:** GitHub Pages enabled for `/` on main  

---

## 📞 Contact & Credentials

**Owner:** Екатерина Владимировна Сидорова  
**Email:** gazeoline01@gmail.com  
**GitHub User:** creature666  
**GitHub Repo:** gaze-preview  

---

## 📚 References

- [ФЗ-152 О персональных данных](https://www.consultant.ru/document/cons_doc_LAW_39987/)
- [ФЗ-149 Об информации](https://www.consultant.ru/document/cons_doc_LAW_19182/)
- [ЗоЗПП О защите прав потребителей](https://www.consultant.ru/document/cons_doc_LAW_305/)
- [ГК РФ](https://www.consultant.ru/document/cons_doc_LAW_5142/)

---

**Last updated:** May 29, 2026  
**By:** Claude (Sonnet 4.6)  
**Status:** ✅ Production-ready, live on GitHub Pages