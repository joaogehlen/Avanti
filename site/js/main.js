/* =========================================================
   AVANTI — comportamento da página
   ========================================================= */
(function () {
  'use strict';

  var cfg = window.AVANTI || {};
  var root = document.documentElement;

  /* ---------- tema claro / escuro ---------- */
  var STORAGE_KEY = 'avanti-theme';
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#FAF8FF' : '#0B0916');
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  // se a pessoa nunca escolheu, segue a preferência do sistema
  try {
    if (!localStorage.getItem(STORAGE_KEY) &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches) {
      root.dataset.theme = 'light';
    }
  } catch (e) {}

  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'light' ? 'dark' : 'light');
    });
  }

  /* ---------- links de WhatsApp ---------- */
  if (cfg.whatsapp) {
    var href = 'https://wa.me/' + String(cfg.whatsapp).replace(/\D/g, '');
    if (cfg.whatsappMensagem) href += '?text=' + encodeURIComponent(cfg.whatsappMensagem);
    Array.prototype.forEach.call(document.querySelectorAll('a[data-wa]'), function (a) {
      a.href = href;
      a.rel = 'noopener';
      a.target = '_blank';
    });
  }

  /* ---------- Instagram (rodapé + botão da seção) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('a[data-instagram]'), function (ig) {
    if (cfg.instagram) {
      ig.href = 'https://instagram.com/' + String(cfg.instagram).replace(/^@/, '');
      ig.rel = 'noopener';
      ig.target = '_blank';
    } else {
      ig.hidden = true; // sem @ definido, some em vez de virar link morto
    }
  });

  /* ---------- placeholders de texto ---------- */
  var textos = {
    whatsappDisplay: cfg.whatsappDisplay,
    instagramDisplay: cfg.instagram ? '@' + String(cfg.instagram).replace(/^@/, '') : '',
    prazoProducao: cfg.prazoProducao,
    formasPagamento: cfg.formasPagamento,
    prazoResposta: cfg.prazoResposta
  };
  Array.prototype.forEach.call(document.querySelectorAll('[data-cfg]'), function (el) {
    var valor = textos[el.dataset.cfg];
    if (valor) el.textContent = valor;
  });

  /* ---------- menu mobile ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu-mobile');

  function closeMenu() {
    if (!menu || !menuBtn) return;
    menu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menu');
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var aberto = menuBtn.getAttribute('aria-expanded') === 'true';
      if (aberto) {
        closeMenu();
      } else {
        menu.hidden = false;
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Fechar menu');
      }
    });

    // fecha ao clicar em qualquer link do menu
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // volta ao estado normal se a janela crescer
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080) closeMenu();
    });
  }

  /* ---------- ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = String(new Date().getFullYear());

})();
