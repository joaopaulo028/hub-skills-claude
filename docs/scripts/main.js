/* =========================================================
   main.js
   Bootstrap da aplicação. Carregado por último — depende de
   todos os outros scripts (state, utils, filters, cards, modal).
========================================================= */

(function init() {
  const data = window.SKILLS_DATA || { skills: [], repositorios: [] };
  state.skills = (data.skills || []).map((s) => ({
    ...s,
    _haystack: `${s.nome} ${s.descricao} ${s.output} ${s.cases}`.toLowerCase(),
  }));
  state.repos = data.repositorios || [];

  bindGlobalUI();
  renderFilters();
  renderRepos();
  renderSkills();
})();

/** Eventos globais: busca, fechar modal por backdrop / botão / ESC. */
function bindGlobalUI() {
  document.getElementById('search').addEventListener('input', (e) => {
    state.query = e.target.value.trim().toLowerCase();
    renderSkills();
    renderFilters();
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.querySelectorAll('[data-close]').forEach((el) =>
    el.addEventListener('click', closeModal)
  );
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal');
    if (modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapFocus(e, modal);
  });
}
