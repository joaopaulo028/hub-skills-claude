/* =========================================================
   cards.js
   Renderiza os cards de skill e a grid de repositórios base.
========================================================= */

/**
 * Renderiza os 4 cards de repositório (ou mantém o empty-state
 * quando não há nenhum repositório cadastrado em SKILLS_DATA.repositorios).
 */
function renderRepos() {
  const el = document.getElementById('repos-grid');
  if (!state.repos.length) return; // o empty-state vem do HTML

  el.innerHTML = state.repos.map((r) => `
    <a class="repo-card" href="${escapeHTML(r.link)}" target="_blank" rel="noopener">
      <div class="repo-card-icon">${escapeHTML(r.icone || '📦')}</div>
      <div class="repo-card-info">
        <div class="repo-card-name">${escapeHTML(r.nome)}</div>
        <div class="repo-card-desc">${escapeHTML(r.descricao || '')}</div>
      </div>
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
