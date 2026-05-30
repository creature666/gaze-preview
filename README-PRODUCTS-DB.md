# GAZE Product Database

## Overview

Two product database files have been created from the shop.html product listing:

- **products-database.json** (12 KB) - Complete structured data with metadata
- **products-database.csv** (6.8 KB) - Tab-separated values for spreadsheet import

## What's Included

### All 11 Products with:
- Product ID, name, category, subcategory
- Price in RUB
- Primary and secondary image URLs
- Full product descriptions
- Details list (specifications, features)
- Aromatic notes/tags
- SKU when available
- Category tags (Коллаб, Рефилл)

### JSON File Structure
```json
{
  "metadata": { ... },
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "category": "уход",
      "price": 1100,
      "images": { "primary": "...", "secondary": "..." },
      "description": "...",
      "details": [...],
      "notes": [...],
      "tags": [...]
    }
  ],
  "price_statistics": { ... },
  "category_breakdown": { ... },
  "collections": { ... }
}
```

### CSV Columns
ID, Name, Category, Subcategory, Price, SKU, Primary Image, Secondary Image, Description, Details, Notes, Tags

## Product Categories

| Category | Count | Price Range | Products |
|----------|-------|------------|----------|
| **Уход** (Care) | 7 | 1100-3500 ₽ | Soaps, lotions, shampoos, conditioners, sachets |
| **Свеча** (Candle) | 1 | 4400 ₽ | Temple of Boxing (limited collab) |
| **Коллаборации** (Collabs) | 1 | 3000 ₽ | Troll (Smelly Tale × Gaze) |
| **Рефилл** (Refill) | 2 | 7500 ₽ | Professional 5L bottles |

## Price Statistics

- **Min:** 1100 ₽ (Мыло Angel Dust)
- **Max:** 7500 ₽ (Refill products)
- **Average:** 3718 ₽
- **Median:** 3250 ₽
- **Total Inventory Value:** 40,900 ₽

## Series & Collections

### Red Mercury Series
- Шампунь Red Mercury (3000 ₽)
- Жидкое мыло Red Mercury (3000 ₽)
- Кондиционер Red Mercury (3500 ₽)
- Лосьон Red Mercury Refill (7500 ₽)
- Кондиционер Red Mercury Refill (7500 ₽)

### Oyster Series
- Жидкое мыло Oyster (3000 ₽)
- Лосьон Oyster (3500 ₽)

### Limited Edition / Collaborations
- Troll (Smelly Tale × Gaze) - SKU 300
- Свеча Temple of Boxing (Gaze × Backyard) - SKU 560

### Featured on Homepage
1. Troll
2. Свеча Temple of Boxing
3. Лосьон Red Mercury (Refill)
4. Кондиционер Red Mercury (Refill)

## Image URLs

All images are stored locally in `images/` directory with hash-based filenames:
- Format: `{hash}.jpg.jpeg` (primary image)
- Format: `{hash}.jpg_1.jpeg` (secondary/hover image)

Example:
- `images/45700513.jpg.jpeg` - Мыло Angel Dust
- `images/c5c11ab33002019b986e5eed43823790.jpg.jpeg` - Troll

## Usage

### Import to Excel/Sheets
1. Open `products-database.csv`
2. File → Import as spreadsheet
3. Use for inventory management, pricing, catalog planning

### Import to Database
```javascript
// Node.js / JavaScript
const products = require('./products-database.json');
products.products.forEach(product => {
  // Add to database
});
```

### API Integration
```json
GET /api/products
Response: {
  "data": [...products from JSON],
  "total": 11,
  "currency": "RUB"
}
```

## Notes

- All prices in Russian Rubles (₽)
- Category names in Russian
- Product names and descriptions in Russian
- 2 SKUs available (limited editions only)
- All products have dual images (main + hover variant)
- Descriptions range from 30-100 words each
- Professional B2B refill sizes available (5L bottles)

## Export Information

- **Generated:** May 30, 2026
- **Source:** shop.html PRODUCTS array
- **Total Records:** 11
- **Format:** JSON + CSV
- **Encoding:** UTF-8

---

For questions or updates, refer to the main shop.html file which is the source of truth.
