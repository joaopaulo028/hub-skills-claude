/* =========================================================
   modal.js
   Abre/fecha o modal de detalhes da skill.
========================================================= */

/** Abre o modal preenchido com os detalhes da skill `id`. */
function openModal(id) {
  const s = state.skills.find((x) => x.id === id);
  if (!s) return;

  const body = document.getElementById('modal-body');
  const statusIcon = s.status === 'instalada' ? '✓' : '📌';

  body.innerHTML = `
    <div class="modal-header">
      <span class="badge badge-${escapeHTML(s.tipo)}">${escapeHTML(TYPE_LABEL[s.tipo] || s.tipo)}</span>
      <span class="status-dot status-${escapeHTML(s.status)}">
        ${statusIcon} ${escapeHTML(STATUS_LABEL[s.status] || s.status)}
      </span>
    </div>
    <h2 class="modal-title">${escapeHTML(s.nome)}</h2>
    <p class="modal-source">
      ${escapeHTML(s.fonte || '')}${s.versao ? ` · v${escapeHTML(s.versao)}` : ''}
    </p>

    <div class="modal-section">
      <p>${escapeHTML(s.descricao || '')}</p>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">Output</p>
      <p>${escapeHTML(s.output || '—')}</p>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">Cases</p>
      <p>${escapeHTML(s.cases || '—')}</p>
    </div>

    ${s.comoUsar ? `
      <div class="modal-section">
        <p class="modal-section-label">Como usar</p>
        <code class="modal-code">${escapeHTML(s.comoUsar)}</code>
      </div>
    ` : ''}

    ${s.subskills && s.subskills.length ? `
      <div class="modal-section">
        <p class="modal-section-label">Inclui (${s.subskills.length})</p>
        <ul class="modal-subskills">
          ${s.subskills.map((sk) => `<li>${escapeHTML(sk)}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    ${s.linkRepo ? `
      <div class="modal-section">
        <p class="modal-section-label">Repositório</p>
        <a class="modal-link" href="${escapeHTML(s.linkRepo)}" target="_blank" rel="noopener">${escapeHTML(s.linkRepo)}</a>
      </div>
    ` : ''}
  `;

  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/** Fecha o modal e libera o scroll do body. */
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
