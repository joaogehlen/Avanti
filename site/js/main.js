/* =========================================================
   AVANTI — comportamento da página
   ========================================================= */
(function () {
  'use strict';

  var cfg = window.AVANTI || {};
  var root = document.documentElement;

  /* ---------- tema claro / escuro ----------
     o <head> já aplicou a escolha salva ou a do sistema antes do paint */
  var STORAGE_KEY = 'avanti-theme';
  var COR_TEMA = { dark: '#141216', light: '#BFBAB0' };

  function atualizarCorTema() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', COR_TEMA[root.dataset.theme] || COR_TEMA.dark);
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    atualizarCorTema();
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  atualizarCorTema();
  Array.prototype.forEach.call(document.querySelectorAll('[data-tema-toggle]'), function (botao) {
    botao.addEventListener('click', function () {
      setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
    });
  });

  /* ---------- links de WhatsApp ---------- */
  if (cfg.whatsapp) {
    var href = 'https://wa.me/' + String(cfg.whatsapp).replace(/\D/g, '');
    if (cfg.whatsappMensagem) href += '?text=' + encodeURIComponent(cfg.whatsappMensagem);
    Array.prototype.forEach.call(document.querySelectorAll('a[data-wa]'), function (a) {
      a.href = href;
    });
  }

  /* ---------- Instagram ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('a[data-instagram]'), function (ig) {
    if (cfg.instagram) {
      ig.href = 'https://instagram.com/' + String(cfg.instagram).replace(/^@/, '');
    } else {
      ig.hidden = true; // sem @ definido, some em vez de virar link morto
    }
  });

  /* ---------- textos vindos do config ----------
     o HTML já traz o valor atual; aqui só trocamos quando o config tem outro.
     Frases marcadas com data-cfg-frase ficam escondidas enquanto o campo
     estiver vazio, para nunca mostrar um [COLCHETE] para o visitante. */
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
  Array.prototype.forEach.call(document.querySelectorAll('[data-cfg-frase]'), function (frase) {
    var campos = frase.querySelectorAll('[data-cfg]');
    var completa = Array.prototype.every.call(campos, function (el) {
      return !!textos[el.dataset.cfg];
    });
    frase.hidden = !completa;
  });

  /* ---------- menu mobile ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu-mobile');

  function fecharMenu() {
    if (!menu || !menuBtn) return;
    menu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menu');
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      if (menuBtn.getAttribute('aria-expanded') === 'true') {
        fecharMenu();
      } else {
        menu.hidden = false;
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Fechar menu');
      }
    });

    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', fecharMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        fecharMenu();
        menuBtn.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) fecharMenu();
    });
  }

  /* ---------- uma arte, o kit inteiro ----------
     sem JS o controle fica escondido e a foto aparece inteira */
  var kitFoto = document.querySelector('.kit__foto');
  var kitControle = document.querySelector('.kit__controle');
  var kitLegenda = document.querySelector('[data-kit-legenda]');
  var LEGENDAS = {
    kit: 'A mesma arte da arara no moletom, na caneca e no tirante da turma.',
    moletom: 'No moletom: arte grande nas costas e o nome de cada um na frente.',
    caneca: 'Na caneca térmica: a arte da turma e o nome de cada formando.',
    tirante: 'No tirante: impressão colorida no cordão inteiro, combinando com a caneca.'
  };

  if (kitFoto && kitControle) {
    kitControle.hidden = false;
    var botoes = kitControle.querySelectorAll('[data-kit-foco]');
    Array.prototype.forEach.call(botoes, function (botao) {
      botao.addEventListener('click', function () {
        var foco = botao.getAttribute('data-kit-foco');
        kitFoto.setAttribute('data-foco', foco);
        Array.prototype.forEach.call(botoes, function (b) {
          b.setAttribute('aria-pressed', b === botao ? 'true' : 'false');
        });
        if (kitLegenda) kitLegenda.textContent = LEGENDAS[foco] || LEGENDAS.kit;
      });
    });
  }

  /* ---------- WhatsApp flutuante ----------
     some enquanto a abertura ou o fechamento (que já têm o botão) estão na tela */
  var flutuante = document.querySelector('.zap-flutuante');
  var comBotao = document.querySelectorAll('[data-abertura], #orcamento');
  if (flutuante && comBotao.length && 'IntersectionObserver' in window) {
    var visiveis = new Set();
    var observadorBotao = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) visiveis.add(entrada.target);
        else visiveis.delete(entrada.target);
      });
      flutuante.classList.toggle('is-oculto', visiveis.size > 0);
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(comBotao, function (el) { observadorBotao.observe(el); });
  }

  /* ---------- ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = String(new Date().getFullYear());

})();
