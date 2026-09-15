/* =========================================================
   AVANTI — carrossel de posts fixados do Instagram
   Biblioteca: Swiper 11 (MIT), em vendor/swiper/

   IMPORTANTE, leia antes de mexer:
   A API do Instagram NÃO informa quais posts estão fixados.
   Não existe campo "is_pinned" no Graph API — dá para buscar as
   mídias mais recentes, mas "fixado" é uma marcação que só existe
   dentro do app. Ou seja: a seleção dos posts fixados é manual,
   em qualquer solução que você use.

   Por isso a lista abaixo é a fonte da verdade. Para trocar um post:
   1. Abra o post no Instagram pelo navegador e copie a URL
      (ex.: https://www.instagram.com/p/C1a2B3c4D5e/)
   2. Salve a imagem quadrada em site/img/instagram/
   3. Edite a entrada aqui embaixo.
   ========================================================= */

window.AVANTI_INSTAGRAM = {

  /* ---------------------------------------------------------
     Posts reais de @canecasulcanecas, capturados em 11/09/2026.

     Os 3 PRIMEIROS são os fixados. Como a API não marca posts
     fixados, dá para identificá-los pela grade: eles aparecem no
     topo mesmo tendo shortcode mais antigo que todos os outros.
     Do 4 ao 8 são os mais recentes, em ordem.

     As imagens são as próprias fotos dos posts, recortadas em
     quadrado 640x640. Se você fixar outro post no Instagram,
     atualize aqui: troque a imagem em site/img/instagram/ e o
     `url` correspondente.
     --------------------------------------------------------- */
  posts: [
    // --- fixados ---
    // `etiqueta` é a legenda curta colada embaixo da foto: só dados que aparecem no post
    { img: 'img/instagram/post-1.jpg', url: 'https://www.instagram.com/p/DYQZYpVjUvG/', etiqueta: 'CEDUP 25/27 · caneca e tirante', alt: 'Caneca térmica preta do curso Técnico em Agropecuária do CEDUP, turma 25/27, com tirante verde' },
    { img: 'img/instagram/post-2.jpg', url: 'https://www.instagram.com/p/DUEPqyOkYi9/', etiqueta: 'Ter After 2026 · moletom', alt: 'Moletom off-white de formatura com arte "Ter After 2026" em grafite azul e o nome Duda' },
    { img: 'img/instagram/post-3.jpg', url: 'https://www.instagram.com/p/DJUq75KxoRh/', etiqueta: 'Terceirão · caneca, camiseta e tirante', alt: 'Caneca térmica preta com frase de terceirão, ao lado de camiseta e tirante personalizados' },
    // --- mais recentes ---
    { img: 'img/instagram/post-4.jpg', url: 'https://www.instagram.com/p/DdJ4LbSkfEJ/', etiqueta: 'Terceirão 2026 · caneca', alt: 'Caneca térmica preta com arte Terceirão 2026 em vermelho' },
    { img: 'img/instagram/post-6.jpg', url: 'https://www.instagram.com/p/Dcg129blpFw/', etiqueta: 'Terceirão 303 · caneca', alt: 'Caneca térmica branca com arte Terceirão 303 em azul' },
    { img: 'img/instagram/post-7.jpg', url: 'https://www.instagram.com/p/DcOwN0jke86/', etiqueta: 'Técnico em Enfermagem · camiseta', alt: 'Camiseta preta de Técnico em Enfermagem com ilustrações e o nome Lilian' },
    { img: 'img/instagram/post-8.jpg', url: 'https://www.instagram.com/p/Dbq9ereFk-N/', etiqueta: 'Terceirão 2026 · caneca e tirantes', alt: 'Caneca térmica preta Terceirão 2026 em vinho, com tirantes assinados' }
  ],

  /* ---------------------------------------------------------
     OPCIONAL — feed automático.
     Se um dia você quiser que a seção puxe os posts MAIS RECENTES
     sozinha (não os fixados, veja a nota lá em cima), coloque aqui
     a URL de um feed JSON.

     Não dá para chamar a API do Instagram direto daqui: o token
     ficaria visível no código-fonte para qualquer visitante. O
     caminho seguro é um serviço que guarda o token e devolve JSON
     público (o Behold.so tem plano gratuito e faz isso), ou uma
     função serverless sua.

     Deixe vazio para usar só a lista curada acima.
     --------------------------------------------------------- */
  feedUrl: '',

  /* Quantos posts exibir quando o feed automático estiver ligado. */
  feedLimite: 8
};

(function () {
  'use strict';

  var dados = window.AVANTI_INSTAGRAM || {};
  var cfg = window.AVANTI || {};
  var secao = document.getElementById('instagram');
  if (!secao) return;

  var wrapper = secao.querySelector('.swiper-wrapper');
  var perfil = cfg.instagram
    ? 'https://instagram.com/' + String(cfg.instagram).replace(/^@/, '')
    : '';

  /* ---------- monta um slide ---------- */
  function criarSlide(post) {
    var destino = post.url || perfil;

    // o slide e o link são elementos separados de propósito: o módulo a11y do
    // Swiper escreve o próprio aria-label no slide ("1 / 8"), e se o link fosse
    // o mesmo elemento ele perderia a descrição do post
    var slide = document.createElement('div');
    slide.className = 'swiper-slide';

    var el = document.createElement(destino ? 'a' : 'div');
    el.className = 'ig-card';
    slide.appendChild(el);

    if (destino) {
      el.href = destino;
      el.target = '_blank';
      el.rel = 'noopener';
      el.setAttribute('aria-label', post.url
        ? 'Abrir no Instagram: ' + (post.alt || 'publicação da Avanti')
        : 'Ver mais no Instagram da Avanti');
    } else {
      el.classList.add('ig-card--sem-link');
    }

    var img = document.createElement('img');
    img.src = post.img;
    img.alt = post.alt || '';
    img.loading = 'lazy';
    img.width = 640;
    img.height = 640;
    el.appendChild(img);

    if (post.etiqueta) {
      var etiqueta = document.createElement('span');
      etiqueta.className = 'ig-card__etiqueta';
      etiqueta.textContent = post.etiqueta;
      el.appendChild(etiqueta);
    }

    return slide;
  }

  /* ---------- os slides já vêm no HTML (funciona sem JS);
       aqui só ajustamos os links quando há perfil configurado ---------- */
  function ajustarLinksExistentes() {
    var slides = wrapper.querySelectorAll('.ig-card');
    Array.prototype.forEach.call(slides, function (slide, i) {
      var post = dados.posts && dados.posts[i];
      var destino = (post && post.url) || perfil;

      if (destino) {
        slide.href = destino;
        slide.target = '_blank';
        slide.rel = 'noopener';
        // só prometa "abrir a publicação" quando houver URL de post de verdade;
        // caindo no perfil, o rótulo tem que dizer isso
        slide.setAttribute('aria-label', (post && post.url)
          ? 'Abrir no Instagram: ' + (slide.querySelector('img').alt || 'publicação da Avanti')
          : 'Ver mais no Instagram da Avanti');
        slide.classList.remove('ig-card--sem-link');
      } else {
        // sem @ configurado e sem URL do post: melhor não ter link nenhum
        // do que um href="#" que joga o visitante para o topo da página
        slide.removeAttribute('href');
        slide.removeAttribute('target');
        slide.classList.add('ig-card--sem-link');
      }
    });
  }

  /* ---------- feed automático (opcional, desligado por padrão) ---------- */
  function tentarFeed() {
    if (!dados.feedUrl) return Promise.resolve(false);

    return fetch(dados.feedUrl, { mode: 'cors' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (json) {
        // aceita tanto um array direto quanto { posts: [...] } ou { data: [...] }
        var lista = Array.isArray(json) ? json : (json.posts || json.data || []);
        if (!lista.length) throw new Error('feed vazio');

        var normalizados = lista.slice(0, dados.feedLimite || 8).map(function (p) {
          return {
            img: p.mediaUrl || p.media_url || p.thumbnailUrl || p.thumbnail_url || p.img,
            url: p.permalink || p.url || '',
            alt: (p.caption || p.alt || 'Publicação da Avanti no Instagram').slice(0, 160)
          };
        }).filter(function (p) { return !!p.img; });

        if (!normalizados.length) throw new Error('nenhuma imagem utilizável no feed');

        wrapper.innerHTML = '';
        normalizados.forEach(function (p) { wrapper.appendChild(criarSlide(p)); });
        return true;
      })
      .catch(function (erro) {
        // qualquer falha mantém a lista curada que já está no HTML
        console.warn('[Avanti] feed do Instagram indisponível, usando a lista curada:', erro.message);
        return false;
      });
  }

  /* ---------- Swiper ---------- */
  function iniciarSwiper() {
    if (typeof Swiper === 'undefined') return; // sem a lib, vira um grid rolável

    var semMovimento = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    new Swiper(secao.querySelector('.ig-swiper'), {
      slidesPerView: 1.25,
      spaceBetween: 14,
      grabCursor: true,
      loop: true,
      keyboard: { enabled: true },
      a11y: {
        prevSlideMessage: 'Post anterior',
        nextSlideMessage: 'Próximo post',
        paginationBulletMessage: 'Ir para o post {{index}}'
      },
      autoplay: semMovimento ? false : {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        prevEl: secao.querySelector('.ig-nav--prev'),
        nextEl: secao.querySelector('.ig-nav--next')
      },
      pagination: {
        el: secao.querySelector('.ig-pagination'),
        clickable: true
      },
      // a faixa ocupa só parte do muro no desktop: conta pela largura dela
      breakpointsBase: 'container',
      breakpoints: {
        480: { slidesPerView: 2.2, spaceBetween: 16 },
        760: { slidesPerView: 3.2, spaceBetween: 18 },
        1100: { slidesPerView: 4.2, spaceBetween: 18 }
      }
    });
  }

  ajustarLinksExistentes();
  tentarFeed().then(iniciarSwiper);
})();
