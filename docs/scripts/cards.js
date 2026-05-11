/* =========================================================
   cards.js
   Renderiza os cards de skill e a grid de repositórios base.
========================================================= */

/* Ícones inline (Lucide). Usar SVG no DOM evita dependência externa
   e permite herdar `currentColor` direto do CSS. */
const ICON_DATABASE = `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
  </svg>
`;

const ICON_ARROW_RIGHT = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
`;

/**
 * Renderiza os cards de repositório base (ou mantém o empty-state
 * do HTML quando state.repos está vazio).
 */
function renderRepos() {
  const el = document.getElementById('repos-grid');

  if (!state.repos.length) {
    el.innerHTML = `
      <div class="empty-state">
        <p>Nenhum repositório base cadastrado ainda.</p>
        <p class="empty-hint">Quando você me mandar os links, eu adiciono aqui.</p>
      </div>
    `;
    return;
  }

  el.innerHTML = state.repos.map((r) => `
    <a class="repo-card" href="${escapeHTML(r.link)}" target="_blank" rel="noopener">
      <div class="repo-card-icon">${ICON_DATABASE}</div>
      <div class="repo-card-info">
        <div class="repo-card-name">${escapeHTML(r.nome)}</div>
        <div class="repo-card-desc">${escapeHTML(r.descricao || '')}</div>
      </div>
      <span class="repo-card-arrow">${ICON_ARROW_RIGHT}</span>
    </a>
  `).join('');
}

/**
 * Renderiza o grid de skills aplicando filtros + busca.
 * Atualiza o contador de resultados na seção.
 */
function renderSkills() {
  const grid    = document.getElementById('skills-grid');
  const countEl = document.getElementById('results-count');

  const filtered = applyFilters();
  countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'resultado' : 'resultados'}`;

  if (!filtered.length) {
    grid.innerHTML = `<div class="no-results">Nenhuma skill encontrada com esses filtros.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(skillCard).join('');
  grid.querySelectorAll('.skill-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.id));
  });
}

/** Template HTML de um card individual de skill. */
function skillCard(s) {
  const wishlistClass = s.status === 'wishlist' ? 'is-wishlist' : '';
  const statusIcon    = s.status === 'instalada' ? '✓' : '📌';

  return `
    <button class="skill-card ${wishlistClass}" data-id="${escapeHTML(s.id)}">
      <div class="skill-card-top">
        <span class="badge badge-${escapeHTML(s.tipo)}">${escapeHTML(TYPE_LABEL[s.tipo] || s.tipo)}</span>
        <span class="status-dot status-${escapeHTML(s.status)}">
          ${statusIcon} ${escapeHTML(STATUS_LABEL[s.status] || s.status)}
        </span>
      </div>
      <h3 class="skill-name">${escapeHTML(s.nome)}</h3>
      <p class="skill-desc">${escapeHTML(s.descricao || '')}</p>
      <div class="skill-divider"></div>
      <div class="skill-meta">
        <div class="skill-meta-row">
          <span class="skill-meta-label">Output:</span>
          <span class="skill-meta-value">${escapeHTML(s.output || '—')}</span>
        </div>
        <div class="skill-meta-row">
          <span class="skill-meta-label">Cases:</span>
          <span class="skill-meta-value">${escapeHTML(s.cases || '—')}</span>
        </div>
      </div>
    </button>
  `;
}
