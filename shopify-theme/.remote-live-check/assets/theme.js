(() => {
  'use strict';
  const root = document.documentElement.dataset.rootUrl || '/';
  const currency = document.documentElement.dataset.currency || 'IDR';
  const drawer = document.querySelector('#CartDrawer');
  const content = document.querySelector('[data-cart-content]');
  const toast = document.querySelector('[data-toast]');
  const money = (amount) => new Intl.NumberFormat(document.documentElement.lang || 'id-ID', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount / 100);
  let timer;

  function message(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  async function cartRequest(path = 'cart.js', options = {}) {
    const response = await fetch(`${root}${path}`, { headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) }, ...options });
    if (!response.ok) throw new Error(`Cart request failed: ${response.status}`);
    return response.json();
  }

  function renderCart(cart, open = false) {
    document.querySelectorAll('[data-cart-count]').forEach((el) => { el.textContent = cart.item_count; });
    if (!content) return;
    if (!cart.item_count) {
      content.replaceChildren();
      const empty = document.createElement('div');
      empty.className = 'empty';
      const text = document.createElement('p'); text.textContent = drawer.dataset.cartEmpty;
      const browse = document.createElement('a'); browse.className = 'btn'; browse.href = `${root}collections/all`; browse.textContent = drawer.dataset.cartBrowse;
      empty.append(text, browse);
      content.append(empty);
    } else {
      content.replaceChildren();
      cart.items.forEach((item) => {
        const line = document.createElement('div');
        line.className = 'drawer-line';
        const link = document.createElement('a'); link.href = item.url;
        if (item.image) { const image = document.createElement('img'); image.src = item.image; image.alt = ''; link.append(image); }
        const info = document.createElement('div');
        const title = document.createElement('strong'); title.textContent = item.product_title;
        const variant = document.createElement('small'); variant.textContent = item.variant_title || '';
        const quantity = document.createElement('small'); quantity.textContent = `${item.quantity} × ${money(item.final_price)}`;
        const remove = document.createElement('button'); remove.className = 'remove'; remove.type = 'button'; remove.dataset.removeLine = item.key; remove.textContent = drawer.dataset.cartRemove;
        info.append(title, variant, quantity, remove);
        const total = document.createElement('strong'); total.textContent = money(item.final_line_price);
        line.append(link, info, total); content.append(line);
      });
      const footer = document.createElement('div');
      const totalLine = document.createElement('div'); totalLine.className = 'total-line';
      const subtotalLabel = document.createElement('strong'); subtotalLabel.textContent = drawer.dataset.cartSubtotal;
      const subtotal = document.createElement('strong'); subtotal.textContent = money(cart.total_price);
      totalLine.append(subtotalLabel, subtotal);
      const shipping = document.createElement('p'); shipping.className = 'small muted'; shipping.textContent = drawer.dataset.cartShippingNote;
      const checkout = document.createElement('a'); checkout.className = 'btn full'; checkout.href = `${root}checkout`; checkout.textContent = drawer.dataset.cartCheckout;
      const view = document.createElement('a'); view.className = 'text-link'; view.href = `${root}cart`; view.textContent = drawer.dataset.cartView;
      footer.append(totalLine, shipping, checkout, view); content.append(footer);
    }
    if (open && drawer && !drawer.open) drawer.showModal();
  }

  async function loadCart(open = false) {
    try { renderCart(await cartRequest(), open); }
    catch (_) { message(drawer?.dataset.cartLoadError || 'Keranjang gagal dimuat. Muat ulang halaman dan coba lagi.'); }
  }

  document.addEventListener('click', async (event) => {
    const portfolioArrow = event.target.closest('[data-portfolio-dir]');
    if (portfolioArrow) {
      const strip = portfolioArrow.closest('.portfolio-carousel')?.querySelector('.portfolio-strip');
      if (strip) strip.scrollBy({ left: Number(portfolioArrow.dataset.portfolioDir) * strip.clientWidth * 0.85, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      return;
    }
    const open = event.target.closest('[data-cart-open]');
    if (open) { event.preventDefault(); await loadCart(true); return; }
    if (event.target.closest('[data-cart-close]')) { drawer?.close(); return; }
    const remove = event.target.closest('[data-remove-line]');
    if (remove) {
      try { renderCart(await cartRequest('cart/change.js', { method: 'POST', body: JSON.stringify({ id: remove.dataset.removeLine, quantity: 0 }) })); }
      catch (_) { message(drawer?.dataset.cartRemoveError || 'Produk gagal dihapus. Coba lagi.'); }
      return;
    }
    const add = event.target.closest('[data-add-to-cart]');
    if (add) {
      event.preventDefault(); add.disabled = true;
      try {
        const response = await fetch(`${root}cart/add.js`, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(add.closest('form')) });
        if (!response.ok) throw new Error('Add to cart failed');
        await loadCart(true);
      } catch (_) { message(drawer?.dataset.cartAddError || 'Produk gagal ditambahkan. Periksa pilihan produk dan coba lagi.'); }
      finally { add.disabled = false; }
    }
  });

  document.addEventListener('change', (event) => {
    if (!event.target.matches('[data-variant-select]')) return;
    const option = event.target.selectedOptions[0];
    const price = document.querySelector('[data-product-price]');
    const button = document.querySelector('[data-add-to-cart]');
    if (price && option?.dataset.price) price.textContent = money(Number(option.dataset.price));
    if (button) button.disabled = !option || option.disabled;
  });

  document.querySelectorAll('[data-mobile-menu-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      const menu = document.getElementById(button.getAttribute('aria-controls'));
      menu?.classList.toggle('is-open', !expanded);
    });
  });
  if (drawer) loadCart();
})();
