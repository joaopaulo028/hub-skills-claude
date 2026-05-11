const STORAGE_KEY = 'skillflix.progress.v1';
const STATUS = { NONE: 'none', DOING: 'doing', DONE: 'done' };

const state = {
  data: null,
  filtroCategoria: 'todas',
  filtroDificuldade: 'todas',
  busca: '',
  progresso: loadProgress(),
};

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progresso));
}
function getStatus(skillId) {
  return state.progresso[skillId] || STATUS.NONE;
}
function setStatus(skillId, status) {
  if (status === STATUS.NONE) delete state.progresso[skillId];
  else state.progresso[skillId] = status;
  saveProgress();
  render();
}

async function init() {
  const res = await fetch('data/skills.json');
  state.data = await res.json();
  renderFilters();
  render();
  setupSearch();
  setupModal();
}

function setupSearch() {
  document.getElementById('search').addEventListener('input', (e) => {
    state.busca = e.target.value.toLowerCase().trim();
    render();
  });
}

function renderFilters() {
  const container = document.getElementById('filter-chips');
  const categorias = [{ id: 'todas', nome: 'Todas' }, ...state.data.categorias];
  const dificuldades = ['todas', 'iniciante', 'intermediario', 'avancado'];

  container.innerHTML = `
    ${categorias.map(c => `
      <button class="chip ${state.filtroCategoria === c.id ? 'active' : ''}" data-tipo="cat" data-val="${c.id}">
        ${c.nome}
      </button>
    `).join('')}
    <span style="width:1px;background:var(--border);margin:0 4px;"></span>
    ${dificuldades.map(d => `
      <button class="chip ${state.filtroDificuldade === d ? 'active' : ''}" data-tipo="dif" data-val="${d}">
        ${d === 'todas' ? 'Toda dificuldade' : capitalize(d)}
      </button>
    `).join('')}
  `;

  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const tipo = chip.dataset.tipo;
      const val = chip.dataset.val;
      if (tipo === 'cat') state.filtroCategoria = val;
      else state.filtroDificuldade = val;
      renderFilters();
      renderCatalogo();
    });
  });
}

function skillsFiltradas() {
  return state.data.skills.filter(s => {
    if (state.filtroCategoria !== 'todas' && s.categoria !== state.filtroCategoria) return false;
    if (state.filtroDificuldade !== 'todas' && s.dificuldade !== state.filtroDificuldade) return false;
    if (state.busca) {
      const hay = `${s.nome} ${s.titulo} ${s.descricaoCurta} ${s.descricaoLonga}`.toLowerCase();
      if (!hay.includes(state.busca)) return false;
    }
    return true;
  });
}

function render() {
  renderHeroStats();
  renderTrilhas();
  renderCatalogo();
  renderProgresso();
}

function renderHeroStats() {
  const total = state.data.skills.length;
  const dominado = state.data.skills.filter(s => getStatus(s.id) === STATUS.DONE).length;
  const progresso = total > 0 ? Math.round((dominado / total) * 100) : 0;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-dominado').textContent = dominado;
  document.getElementById('stat-progresso').textContent = `${progresso}%`;
}

function renderTrilhas() {
  const container = document.getElementById('trilhas-container');
  container.innerHTML = state.data.trilhas.map((t, i) => `
    <div class="trilha-card" data-trilha="${t.id}">
      <div class="trilha-label">Trilha · 0${i + 1}</div>
      <h3>${t.nome.replace(/^[^\s]+\s/, '')}</h3>
      <p>${t.descricao}</p>
      <div class="trilha-skills-count"><span>${t.skills.length} skills</span></div>
    </div>
  `).join('');
  container.querySelectorAll('.trilha-card').forEach(card => {
    card.addEventListener('click', () => {
      const trilha = state.data.trilhas.find(t => t.id === card.dataset.trilha);
      abrirTrilha(trilha);
    });
  });
}

function abrirTrilha(trilha) {
  state.filtroCategoria = 'todas';
  state.filtroDificuldade = 'todas';
  state.busca = '';
  document.getElementById('search').value = '';
  renderFilters();
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const primeira = trilha.skills[0];
    const skill = state.data.skills.find(s => s.id === primeira);
    if (skill) abrirModal(skill, trilha);
  }, 400);
}

function renderCatalogo() {
  const container = document.getElementById('categorias-container');
  const filtradas = skillsFiltradas();

  if (filtradas.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);padding:24px;">Nenhuma skill encontrada com esses filtros.</p>`;
    return;
  }

  const categoriasComSkills = state.data.categorias
    .map(c => ({ ...c, skills: filtradas.filter(s => s.categoria === c.id) }))
    .filter(c => c.skills.length > 0);

  container.innerHTML = categoriasComSkills.map(c => `
    <div class="categoria">
      <div class="categoria-header">
        <h3 class="categoria-titulo">${c.nome}</h3>
        <span class="categoria-desc">${c.descricao}</span>
      </div>
      <div class="skill-row">
        ${c.skills.map(s => skillCardHTML(s)).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      const skill = state.data.skills.find(s => s.id === card.dataset.skill);
      abrirModal(skill);
    });
  });
}

function skillCardHTML(s) {
  const status = getStatus(s.id);
  return `
    <article class="skill-card" data-skill="${s.id}">
      <div class="skill-card-top">
        <div class="skill-icon">${s.icone}</div>
        <div class="skill-status ${status}" title="${labelStatus(status)}"></div>
      </div>
      <h4>${s.titulo}</h4>
      <span class="skill-nome-tag">/${s.nome}</span>
      <p class="skill-desc">${s.descricaoCurta}</p>
      <div class="skill-meta">
        <div class="skill-meta-item"><span>Nível</span><strong class="diff-${s.dificuldade}">${capitalize(s.dificuldade)}</strong></div>
        <div class="skill-meta-item"><span>Tipo</span><strong>${capitalize(s.tipo)}</strong></div>
      </div>
    </article>
  `;
}

function renderProgresso() {
  const total = state.data.skills.length;
  let none = 0, doing = 0, done = 0;
  state.data.skills.forEach(s => {
    const st = getStatus(s.id);
    if (st === STATUS.DONE) done++;
    else if (st === STATUS.DOING) doing++;
    else none++;
  });
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-fill').style.width = `${pct}%`;
  document.getElementById('count-none').textContent = none;
  document.getElementById('count-doing').textContent = doing;
  document.getElementById('count-done').textContent = done;
}

function setupModal() {
  document.getElementById('modal-close').addEventListener('click', fecharModal);
  document.querySelector('.modal-backdrop').addEventListener('click', fecharModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
}

function abrirModal(skill, trilha = null) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  const status = getStatus(skill.id);

  body.innerHTML = `
    <div class="modal-body">
      <div class="modal-icon">${skill.icone}</div>
      <h2>${skill.titulo}</h2>
      <div class="tag-line">
        <span class="skill-nome-tag">/${skill.nome}</span>
        <span class="diff-${skill.dificuldade}">${capitalize(skill.dificuldade)}</span>
        <span>${capitalize(skill.tipo)}</span>
        ${trilha ? `<span>Trilha · ${trilha.nome.replace(/^[^\s]+\s/, '')}</span>` : ''}
      </div>

      <div class="long-desc">${skill.descricaoLonga}</div>

      <h3>Como usar</h3>
      <p>${skill.comoUsar}</p>

      <h3>Exemplo</h3>
      <pre>${escapeHtml(skill.exemplo)}</pre>

      ${skill.linkMd ? `<p class="doc-link"><a href="${skill.linkMd}" target="_blank">📖 Abrir documentação completa</a></p>` : ''}

      <h3>Progresso</h3>
      <div class="status-buttons">
        <button class="status-btn ${status === STATUS.NONE ? 'active' : ''}" data-status="${STATUS.NONE}">Não iniciado</button>
        <button class="status-btn ${status === STATUS.DOING ? 'active' : ''}" data-status="${STATUS.DOING}">Estudando</button>
        <button class="status-btn ${status === STATUS.DONE ? 'active' : ''}" data-status="${STATUS.DONE}">Dominado</button>
      </div>
    </div>
  `;

  body.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setStatus(skill.id, btn.dataset.status);
      abrirModal(skill, trilha);
    });
  });

  modal.classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('modal').classList.add('hidden');
}

function labelStatus(s) {
  return s === STATUS.DONE ? 'Dominado' : s === STATUS.DOING ? 'Estudando' : 'Não iniciado';
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

init();
