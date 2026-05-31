(function () {
  // Selectors for all editable text blocks
  const SELECTORS = [
    'h1', 'h2', 'h3', 'p', 'li',
    '.product-name', '.product-sub', '.product-price',
    '.description-text', '.section-title', '.section-link',
    '.b2b-title', '.b2b-text', '.b2b-partner',
    '.city-name', '.city-locations li',
    '.collab-name', '.page-title', '.where-title',
    '.footer-copy', '.footer-note', '.marquee-item',
    '.hero-cta', '.b2b-cta'
  ].join(',');

  let active = false;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #editmode-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      background: #171717;
      color: white;
      border: none;
      padding: 10px 22px;
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      cursor: pointer;
      font-family: Arial, sans-serif;
      transition: background 0.2s;
    }
    #editmode-btn:hover { background: #333; }
    #editmode-btn.active { background: #C8352A; }

    body.editmode [contenteditable="true"] {
      outline: 1px dashed rgba(200, 53, 42, 0.4);
      cursor: text;
      min-width: 4px;
    }
    body.editmode [contenteditable="true"]:hover {
      outline: 1px solid rgba(200, 53, 42, 0.7);
      background: rgba(200, 53, 42, 0.04);
    }
    body.editmode [contenteditable="true"]:focus {
      outline: 1px solid #C8352A;
      background: rgba(200, 53, 42, 0.06);
    }

    #editmode-hint {
      position: fixed;
      bottom: 24px;
      right: 108px;
      z-index: 9999;
      font-family: Arial, sans-serif;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      background: #171717;
      padding: 10px 16px;
      display: none;
    }
    #editmode-hint.visible { display: block; }
  `;
  document.head.appendChild(style);

  // Create button
  const btn = document.createElement('button');
  btn.id = 'editmode-btn';
  btn.textContent = '✏ Edit';
  document.body.appendChild(btn);

  // Create hint
  const hint = document.createElement('div');
  hint.id = 'editmode-hint';
  hint.textContent = 'Кликни на любой блок';
  document.body.appendChild(hint);

  function enable() {
    active = true;
    document.body.classList.add('editmode');
    btn.classList.add('active');
    btn.textContent = '✓ Готово';
    hint.classList.add('visible');

    document.querySelectorAll(SELECTORS).forEach(el => {
      // Don't make nav links editable (could break navigation)
      if (el.closest('nav') || el.closest('#nav-container')) return;
      el.contentEditable = 'true';
    });
  }

  function disable() {
    active = false;
    document.body.classList.remove('editmode');
    btn.classList.remove('active');
    btn.textContent = '✏ Edit';
    hint.classList.remove('visible');

    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
      el.contentEditable = 'false';
    });
  }

  btn.addEventListener('click', () => {
    active ? disable() : enable();
  });

  // Esc to exit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && active) disable();
  });
})();
