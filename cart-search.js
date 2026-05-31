(function () {
  // Only inject if the page doesn't already have its own cart/search (shop, care, perfumes, home)
  if (document.getElementById('cart-sidebar')) return;

  // ── CSS ──────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .gs-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.4);
      z-index: 200; opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }
    .gs-overlay.open { opacity: 1; pointer-events: all; }

    /* CART */
    #cart-sidebar {
      position: fixed; top: 0; right: 0; bottom: 0;
      width: 420px; max-width: 100vw;
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(6px);
      z-index: 201;
      transform: translateX(100%);
      transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
      display: flex; flex-direction: column;
      font-family: Arial, sans-serif;
    }
    #cart-sidebar.open { transform: translateX(0); }

    .gs-cart-header {
      padding: 32px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      display: flex; justify-content: space-between; align-items: center;
    }
    .gs-cart-title {
      font-size: 11px; letter-spacing: 0.25em;
      text-transform: uppercase; font-weight: 400;
    }
    .gs-cart-close {
      background: none; border: none; font-size: 20px;
      cursor: pointer; opacity: 0.5; transition: opacity 0.2s;
    }
    .gs-cart-close:hover { opacity: 1; }

    .gs-cart-items {
      flex: 1; overflow-y: auto; padding: 32px;
    }
    .gs-cart-empty {
      text-align: center; padding: 80px 0;
      font-size: 12px; letter-spacing: 0.15em;
      text-transform: uppercase; color: #8A8A8A;
    }
    .gs-cart-item {
      display: grid; grid-template-columns: 80px 1fr auto;
      gap: 16px; align-items: start;
      padding: 20px 0; border-bottom: 1px solid rgba(0,0,0,0.08);
    }
    .gs-cart-item-img {
      width: 80px; aspect-ratio: 3/4; object-fit: cover;
      background: #E8E3DC;
    }
    .gs-item-name {
      font-size: 11px; letter-spacing: 0.12em;
      text-transform: uppercase; margin-bottom: 4px;
    }
    .gs-item-sub {
      font-size: 10px; color: #8A8A8A;
      letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 12px;
    }
    .gs-item-qty { display: flex; align-items: center; gap: 12px; }
    .gs-qty-btn {
      background: none; border: 1px solid rgba(0,0,0,0.2);
      width: 24px; height: 24px; font-size: 14px;
      cursor: pointer; display: flex; align-items: center;
      justify-content: center; transition: all 0.2s;
      color: #171717; font-family: Arial;
    }
    .gs-qty-btn:hover { background: #171717; color: white; border-color: #171717; }
    .gs-qty-num { font-size: 12px; letter-spacing: 0.1em; min-width: 20px; text-align: center; }
    .gs-item-price { font-size: 11px; letter-spacing: 0.15em; }

    .gs-cart-footer {
      padding: 24px 32px;
      border-top: 1px solid rgba(0,0,0,0.08);
    }
    .gs-cart-total {
      display: flex; justify-content: space-between;
      align-items: baseline; margin-bottom: 16px;
    }
    .gs-total-label {
      font-size: 11px; letter-spacing: 0.2em;
      text-transform: uppercase; color: #8A8A8A;
    }
    .gs-total-price { font-size: 13px; letter-spacing: 0.15em; }
    .gs-checkout-btn {
      width: 100%; background: #171717; color: white;
      border: none; padding: 18px;
      font-size: 11px; letter-spacing: 0.25em;
      text-transform: uppercase; cursor: pointer;
      transition: background 0.2s; font-family: Arial;
    }
    .gs-checkout-btn:hover { background: #C8352A; }

    /* SEARCH */
    #search-modal {
      display: none; position: fixed; inset: 0;
      z-index: 200; opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.4,0,0.2,1);
      align-items: flex-start; justify-content: center;
    }
    #search-modal.open { display: flex; opacity: 1; }

    .gs-search-overlay {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(8px);
    }
    .gs-search-container {
      position: relative; z-index: 1;
      width: 100%; max-width: 600px;
      padding: 120px 40px 40px;
      display: flex; flex-direction: column; align-items: center;
    }
    .gs-search-close {
      position: absolute; top: 20px; right: 40px;
      background: none; border: none; color: white;
      font-size: 24px; cursor: pointer;
      opacity: 0.5; transition: opacity 0.2s; z-index: 2;
    }
    .gs-search-close:hover { opacity: 1; }
    .gs-search-input {
      width: 100%; background: transparent; border: none;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      color: white; font-size: 28px; letter-spacing: 0.05em;
      padding: 20px 0; outline: none; font-family: Arial;
    }
    .gs-search-input::placeholder { color: rgba(255,255,255,0.4); }
    .gs-search-input:focus { border-bottom-color: rgba(255,255,255,0.6); }
    .gs-search-hint {
      margin-top: 24px; font-size: 11px; letter-spacing: 0.2em;
      text-transform: uppercase; color: rgba(255,255,255,0.4);
      font-family: Arial;
    }

    /* TOAST */
    #gs-toast {
      position: fixed; bottom: 32px; left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #171717; color: white;
      padding: 14px 24px; font-size: 11px;
      letter-spacing: 0.15em; text-transform: uppercase;
      opacity: 0; transition: all 0.3s;
      pointer-events: none; z-index: 300;
      white-space: nowrap; font-family: Arial;
    }
    #gs-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    @media (max-width: 768px) {
      #cart-sidebar { width: 100vw; }
    }
  `;
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────────────
  const html = `
    <div class="gs-overlay" id="gs-cart-overlay" onclick="toggleCart()"></div>
    <div id="cart-sidebar">
      <div class="gs-cart-header">
        <div class="gs-cart-title">Корзина</div>
        <button class="gs-cart-close" onclick="toggleCart()">✕</button>
      </div>
      <div class="gs-cart-items" id="cart-items">
        <div class="gs-cart-empty">Корзина пуста</div>
      </div>
      <div class="gs-cart-footer">
        <div class="gs-cart-total">
          <span class="gs-total-label">Итого</span>
          <span class="gs-total-price" id="cart-total">0 ₽</span>
        </div>
        <button class="gs-checkout-btn" onclick="checkout()">Оформить заказ →</button>
      </div>
    </div>

    <div id="search-modal">
      <div class="gs-search-overlay" onclick="closeSearch()"></div>
      <div class="gs-search-container">
        <button class="gs-search-close" onclick="closeSearch()">✕</button>
        <input class="gs-search-input" id="search-input" type="text"
               placeholder="Поиск товаров..."
               onkeydown="if(event.key==='Enter') gsSearchSubmit(); if(event.key==='Escape') closeSearch()">
        <div class="gs-search-hint">Нажмите Enter для поиска в каталоге</div>
      </div>
    </div>

    <div id="gs-toast"></div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  // ── CART LOGIC ────────────────────────────────────────────────────────────
  function fmt(p) { return p.toLocaleString('ru-RU') + ' ₽'; }

  function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    document.getElementById('cart-total').textContent = fmt(total);

    const el = document.getElementById('cart-items');
    if (!cart.length) {
      el.innerHTML = '<div class="gs-cart-empty">Корзина пуста</div>';
      return;
    }
    el.innerHTML = cart.map(item => `
      <div class="gs-cart-item">
        <img class="gs-cart-item-img" src="${item.img || ''}" alt="${item.name}"
             onerror="this.style.visibility='hidden'">
        <div>
          <div class="gs-item-name">${item.name}</div>
          <div class="gs-item-sub">${item.sub || ''}</div>
          <div class="gs-item-qty">
            <button class="gs-qty-btn" onclick="gsChangeQty(${item.id}, -1)">−</button>
            <span class="gs-qty-num">${item.qty || 1}</span>
            <button class="gs-qty-btn" onclick="gsChangeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <div class="gs-item-price">${fmt(item.price * (item.qty || 1))}</div>
      </div>
    `).join('');
  }

  window.toggleCart = function () {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('gs-cart-overlay');
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    if (isOpen) updateCart();
  };

  window.gsChangeQty = function (id, delta) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = (item.qty || 1) + delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  };

  window.checkout = function () {
    window.location.href = 'mailto:gazeoline01@gmail.com?subject=Заказ с сайта&body=Здравствуйте! Хочу оформить заказ.';
  };

  // ── SEARCH LOGIC ──────────────────────────────────────────────────────────
  window.openSearch = function () {
    const modal = document.getElementById('search-modal');
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('open'));
    setTimeout(() => document.getElementById('search-input')?.focus(), 100);
  };

  window.closeSearch = function () {
    const modal = document.getElementById('search-modal');
    modal.classList.remove('open');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  };

  window.gsSearchSubmit = function () {
    const q = document.getElementById('search-input')?.value?.trim();
    if (q) window.location.href = `shop.html?q=${encodeURIComponent(q)}`;
    else closeSearch();
  };

  // ── CLOSE ON ESC ──────────────────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const sidebar = document.getElementById('cart-sidebar');
      if (sidebar?.classList.contains('open')) toggleCart();
      closeSearch();
    }
  });

  // ── INIT ──────────────────────────────────────────────────────────────────
  updateCart();

})();
