/* =========================================================
   state.js
   Estado global da aplicação e constantes de tradução.
   Carregado primeiro — outros scripts dependem destas globais.
========================================================= */

const TYPE_LABEL = {
  nativa: 'Nativa',
  plugin: 'Plugin',
  customizada: 'Customizada',
};

const STATUS_LABEL = {
  instalada: 'Instalada',
  wishlist: 'Quero instalar',
};

const state = {
  skills: [],
  repos: [],
  filterType: 'all',     // all | nativa | plugin | customizada
  filterStatus: 'all',   // all | instalada | wishlist
  query: '',
};
