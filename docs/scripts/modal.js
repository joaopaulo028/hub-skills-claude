/* =========================================================
   modal.js
   Abre/fecha o modal de detalhes da skill.
========================================================= */

let lastFocusedEl = null;

/** Abre o modal preenchido com os detalhes da skill `id`. */
function openModal(id) {
  const s = state.skills.find((x) => x.id === id);
  if (!s) return;

  lastFocusedEl = document.activeElement;

  const body = document.getElementById('modal-body');
  const statusIcon = s.status === 'instalada' ? '✓' : '📌';
  const totalSubskills = (s.subskills?.length || 0) + (s.subskillsMore || 0);

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

    ${totalSubskills ? `
      <div class="modal-section">
        <p class="modal-section-label">Inclui (${totalSubskills})</p>
        <ul class="modal-subskills">
          ${(s.subskills || []).map((sk) => `<li>${escapeHTML(sk)}</li>`).join('')}
          ${s.subskillsMore ? `<li class="subskill-more">+${s.subskillsMore} outras</li>` : ''}
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
  document.body.classList.add('no-scroll');
  document.getElementById('modal-close').focus();
}

/** Fecha o modal, libera o scroll do body e devolve o foco. */
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal.classList.contains('hidden')) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
    lastFocusedEl.focus();
    lastFocusedEl = null;
  }
}

/** Focus trap: Tab/Shift+Tab ciclam apenas entre elementos focáveis dentro do modal. */
function trapFocus(e, modal) {
  const focusables = modal.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last  = focusables[focusables.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
