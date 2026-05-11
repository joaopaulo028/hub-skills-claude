/* =========================================================
   filters.js
   Renderiza chips de filtro e aplica filtros + busca às skills.
========================================================= */

/**
 * Renderiza os chips de filtro com contagens calculadas sobre o
 * universo total de skills (não sobre o resultado filtrado).
 */
function renderFilters() {
  const el = document.getElementById('filters');

  const totalAll = state.skills.length;
  const byStatus = (s) => state.skills.filter((sk) => sk.status === s).length;
  const byType   = (t) => state.skills.filter((sk) => sk.tipo   === t).length;

  const groups = [
    { label: 'Todas',          count: totalAll,              cat: 'all',    val: 'all' },
    { label: 'Instaladas',     count: byStatus('instalada'), cat: 'status', val: 'instalada' },
    { label: 'Quero instalar', count: byStatus('wishlist'),  cat: 'status', val: 'wishlist' },
    { label: 'Nativa',         count: byType('nativa'),      cat: 'type',   val: 'nativa' },
    { label: 'Plugin',         count: byType('plugin'),      cat: 'type',   val: 'plugin' },
    { label: 'Customizada',    count: byType('customizada'), cat: 'type',   val: 'customizada' },
  ];

  el.innerHTML = groups.map((g) => {
    const isActive =
      (g.cat === 'all'    && state.filterType === 'all' && state.filterStatus === 'all') ||
      (g.cat === 'status' && state.filterStatus === g.val) ||
      (g.cat === 'type'   && state.filterType   === g.val);

    return `
      <button class="chip ${isActive ? 'active' : ''}" data-cat="${g.cat}" data-val="${g.val}">
        ${escapeHTML(g.label)}
        <span class="chip-count">${g.count}</span>
      </button>
    `;
  }).join('');

  el.querySelectorAll('.chip').forEach((btn) => {
    btn.addEventListener('click', () => onChipClick(btn.dataset.cat, btn.dataset.val));
  });
}

/** Mantém apenas 1 valor ativo por categoria; clicar no ativo desfaz. */
function onChipClick(cat, val) {
  if (cat === 'all') {
    state.filterType = 'all';
    state.filterStatus = 'all';
  } else if (cat === 'status') {
    state.filterStatus = state.filterStatus === val ? 'all' : val;
  } else if (cat === 'type') {
    state.filterType = state.filterType === val ? 'all' : val;
  }
  renderFilters();
  renderSkills();
}

/**
 * Aplica filtros (tipo + status) e busca textual ao state.skills.
 * Retorna o subconjunto que será renderizado no grid.
 */
function applyFilters() {
  return state.skills.filter((s) => {
    if (state.filterType   !== 'all' && s.tipo   !== state.filterType)   return false;
    if (state.filterStatus !== 'all' && s.status !== state.filterStatus) return false;
    if (state.query) {
      const haystack = `${s.nome} ${s.descricao} ${s.output} ${s.cases}`.toLowerCase();
      if (!haystack.includes(state.query)) return false;
    }
    return true;
  });
}
