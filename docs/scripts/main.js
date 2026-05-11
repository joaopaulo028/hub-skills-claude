/* =========================================================
   main.js
   Bootstrap da aplicação. Carregado por último — depende de
   todos os outros scripts (state, utils, filters, cards, modal).
========================================================= */

(function init() {
  // Carrega dados (window.SKILLS_DATA vem do data/skills.js)
  const data = window.SKILLS_DATA || { skills: [], repositorios: [] };
  state.skills = data.skills || [];
  state.repos  = data.repositorios || [];

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
    if (e.key === 'Escape') closeModal();
  });
}
