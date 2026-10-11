(() => {
  const init = () => {
    const root = document.querySelector('#ShopCatalog');
    if (!root || root.dataset.ready) return;
    root.dataset.ready = 'true';

    const items = [...root.querySelectorAll('[data-catalog-item]')];
    const tabs = [...root.querySelectorAll('[data-catalog-category]')];
    const search = root.querySelector('[data-catalog-search]');
    const sort = root.querySelector('[data-catalog-sort]');
    const count = root.querySelector('[data-catalog-count]');
    const empty = root.querySelector('[data-catalog-empty]');
    let category = 'all';

    const render = () => {
      const query = (search?.value || '').trim().toLocaleLowerCase();
      const visible = items.filter(item => {
        const categoryMatch = category === 'all' || item.dataset.type.toLocaleLowerCase() === category.toLocaleLowerCase();
        const searchMatch = (item.dataset.search || '').toLocaleLowerCase().includes(query);
        item.hidden = !(categoryMatch && searchMatch);
        return !item.hidden;
      });
      const mode = sort?.value || 'featured';
      visible.sort((a, b) => mode === 'low' ? Number(a.dataset.price) - Number(b.dataset.price) :
        mode === 'high' ? Number(b.dataset.price) - Number(a.dataset.price) :
        mode === 'name' ? a.dataset.title.localeCompare(b.dataset.title) : 0);
      visible.forEach(item => item.parentElement.appendChild(item));
      if (count) count.textContent = `${visible.length} produk${query ? ' ditemukan' : ''}`;
      if (empty) empty.hidden = visible.length > 0;
    };

    tabs.forEach(tab => tab.addEventListener('click', () => {
      category = tab.dataset.catalogCategory;
      tabs.forEach(item => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      render();
    }));
    search?.addEventListener('input', render);
    sort?.addEventListener('change', render);
    render();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
