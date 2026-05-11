/* =========================================================
   utils.js
   Helpers usados por vários módulos.
========================================================= */

/**
 * Escapa caracteres HTML para evitar XSS ao injetar conteúdo dinâmico.
 * Use sempre antes de inserir valores do skills.js no DOM via innerHTML.
 */
function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
