(() => {
  const activateSector = (root, index) => {
    const tabs = [...root.querySelectorAll('.sector-tabs [role="tab"]')];
    const panels = tabs.map(tab => root.querySelector(`#${CSS.escape(tab.getAttribute('aria-controls'))}`));
    if (!tabs.length || panels.some(panel => !panel)) return;

    const selected = Math.max(0, Math.min(index, tabs.length - 1));
    tabs.forEach((tab, i) => {
      const active = i === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
      panels[i].setAttribute('aria-hidden', String(!active));
    });
  };

  document.addEventListener('click', event => {
    const tab = event.target.closest('#BusinessSectors [role="tab"][data-sector]');
    if (!tab) return;
    event.preventDefault();
    activateSector(tab.closest('#BusinessSectors'), Number(tab.dataset.sector));
  });

  document.addEventListener('keydown', event => {
    const tab = event.target.closest('#BusinessSectors [role="tab"][data-sector]');
    if (!tab || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    const root = tab.closest('#BusinessSectors');
    const tabs = [...root.querySelectorAll('.sector-tabs [role="tab"]')];
    const current = tabs.indexOf(tab);
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
      (current + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    event.preventDefault();
    tabs[index].focus();
    activateSector(root, index);
  });

  const init = () => {
    document.querySelectorAll('#BusinessSectors').forEach(root => {
      const tabs = [...root.querySelectorAll('.sector-tabs [role="tab"]')];
      const selected = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
      activateSector(root, selected < 0 ? 0 : selected);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
