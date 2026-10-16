/* =========================================================
   AVANTI — muro pintável (WebGL, three.js r160)

   A arte de grafite da marca vira uma parede que o visitante
   pinta: por onde o cursor ou o dedo passa sai um jato de
   spray que acende a tinta, e o rastro vai secando devagar.
   Sem ninguém por perto, uma lata invisível pinta sozinha.

   É enfeite, não conteúdo: se faltar WebGL, se a biblioteca
   não carregar ou se a pessoa pedir menos movimento, o banner
   continua sendo a imagem estática com a passada de spray em
   CSS. Nada aqui esconde texto, foto ou link.
   ========================================================= */
(function () {
  'use strict';

  var banner = document.querySelector('.abertura__banner');
  if (!banner) return;

  var semMovimento = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (semMovimento) return;

  function temWebGL() {
    try {
      var teste = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (teste.getContext('webgl2') || teste.getContext('webgl')));
    } catch (e) {
      return false;
    }
  }
  if (!temWebGL()) return;

  // a biblioteca só entra depois da página pronta: o conteúdo nunca espera por ela
  function agendar(fn) {
    if (document.readyState === 'complete') setTimeout(fn, 400);
    else window.addEventListener('load', function () { setTimeout(fn, 400); });
  }

  agendar(function () {
    import('../vendor/three/three.module.min.js')
      .then(function (THREE) { montar(THREE); })
      .catch(function (erro) {
        console.warn('[Avanti] muro em WebGL indisponivel, seguindo com a imagem:', erro && erro.message);
      });
  });

  function montar(THREE) {
    var largura = banner.clientWidth;
    var altura = banner.clientHeight;
    if (!largura || !altura) return;

    var renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(largura, altura, false);
    var tela = renderer.domElement;
    tela.className = 'muro3d';
    tela.setAttribute('aria-hidden', 'true');

    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    var quad = new THREE.PlaneGeometry(2, 2);

    /* ---------- a tinta: dois alvos que se revezam ---------- */
    var LADO = 512;
    var opcoes = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false
    };
    var alvoA = new THREE.WebGLRenderTarget(LADO, LADO, opcoes);
    var alvoB = new THREE.WebGLRenderTarget(LADO, LADO, opcoes);

    var vertex = [
      'varying vec2 vUv;',
      'void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }'
    ].join('\n');

    var cenaTinta = new THREE.Scene();
    var matTinta = new THREE.ShaderMaterial({
      uniforms: {
        tAnterior: { value: alvoB.texture },
        uDe: { value: new THREE.Vector2(0.5, 0.5) },
        uPara: { value: new THREE.Vector2(0.5, 0.5) },
        uRaio: { value: 0.085 },
        uForca: { value: 0.0 },
        uSeca: { value: 0.986 },
        uProporcao: { value: largura / altura },
        uTempo: { value: 0.0 }
      },
      vertexShader: vertex,
      fragmentShader: [
        'precision highp float;',
        'varying vec2 vUv;',
        'uniform sampler2D tAnterior;',
        'uniform vec2 uDe, uPara;',
        'uniform float uRaio, uForca, uSeca, uProporcao, uTempo;',
        'float ruido(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }',
        'float distTraco(vec2 p, vec2 a, vec2 b){',
        '  vec2 k = vec2(uProporcao, 1.0);',
        '  p *= k; a *= k; b *= k;',
        '  vec2 ab = b - a; vec2 ap = p - a;',
        '  float t = clamp(dot(ap, ab) / max(dot(ab, ab), 1e-5), 0.0, 1.0);',
        '  return length(ap - ab * t);',
        '}',
        'void main(){',
        '  float tinta = texture2D(tAnterior, vUv).r * uSeca;',
        '  float d = distTraco(vUv, uDe, uPara);',
        '  float jato = exp(-pow(d / uRaio, 2.2)) * uForca;',
        '  float g = ruido(floor(vUv * 420.0) + floor(uTempo * 36.0));',
        '  jato *= 0.45 + 0.75 * g;',
        '  gl_FragColor = vec4(clamp(max(tinta, jato), 0.0, 1.0), 0.0, 0.0, 1.0);',
        '}'
      ].join('\n')
    });
    cenaTinta.add(new THREE.Mesh(quad, matTinta));

    /* ---------- o muro: arte da marca + tinta fresca ---------- */
    var precisaAjustar = true;
    var cena = new THREE.Scene();
    var arte = new THREE.TextureLoader().load('img/fundo.jpg', function () { precisaAjustar = true; });
    arte.wrapS = THREE.ClampToEdgeWrapping;
    arte.wrapT = THREE.ClampToEdgeWrapping;
    if ('colorSpace' in arte) arte.colorSpace = THREE.SRGBColorSpace;

    var matMuro = new THREE.ShaderMaterial({
      uniforms: {
        tArte: { value: arte },
        tTinta: { value: alvoA.texture },
        uEscala: { value: new THREE.Vector2(1, 1) },
        uTempo: { value: 0.0 }
      },
      vertexShader: vertex,
      fragmentShader: [
        'precision highp float;',
        'varying vec2 vUv;',
        'uniform sampler2D tArte, tTinta;',
        'uniform vec2 uEscala;',
        'uniform float uTempo;',
        'float ruido(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }',
        'void main(){',
        '  vec2 uv = (vUv - 0.5) * uEscala + 0.5;',
        '  vec3 arte = texture2D(tArte, clamp(uv, 0.001, 0.999)).rgb;',
        '  float m = texture2D(tTinta, vUv).r;',
        '  vec3 seca = arte * 0.86;',
        '  vec3 fresca = arte * 1.75 + vec3(0.30, 0.04, 0.52) * 0.55;',
        '  vec3 cor = mix(seca, fresca, smoothstep(0.03, 0.55, m));',
        '  float g = ruido(floor(vUv * 520.0) + floor(uTempo * 30.0));',
        '  cor += vec3(0.35, 0.10, 0.62) * smoothstep(0.02, 0.22, m) * (1.0 - smoothstep(0.25, 0.7, m)) * g * 0.5;',
        '  gl_FragColor = vec4(cor, 1.0);',
        '}'
      ].join('\n')
    });
    cena.add(new THREE.Mesh(quad, matMuro));

    // a arte cobre o cartaz sem distorcer, como background-size: cover
    function ajustarCobertura() {
      var imagem = arte.image;
      if (!imagem || !imagem.width) return;
      var propTela = largura / altura;
      var propArte = imagem.width / imagem.height;
      if (propTela > propArte) matMuro.uniforms.uEscala.value.set(1, propArte / propTela);
      else matMuro.uniforms.uEscala.value.set(propTela / propArte, 1);
    }

    /* ---------- a lata: o visitante ou o piloto automático ---------- */
    var ponto = new THREE.Vector2(0.5, 0.5);
    var anterior = new THREE.Vector2(0.5, 0.5);
    var pintando = false;
    var ultimoToque = -99;
    var relogio = 0;

    function mover(evento) {
      var r = banner.getBoundingClientRect();
      var x = (evento.clientX - r.left) / r.width;
      var y = 1 - (evento.clientY - r.top) / r.height;
      if (x < -0.1 || x > 1.1 || y < -0.1 || y > 1.1) return;
      ponto.set(x, y);
      pintando = true;
      ultimoToque = relogio;
    }
    banner.addEventListener('pointermove', mover, { passive: true });
    banner.addEventListener('pointerdown', mover, { passive: true });
    banner.addEventListener('pointerleave', function () { pintando = false; }, { passive: true });

    // sem ninguém pintando, a lata assume: rajadas curtas, em caminhos diferentes
    function pilotoAutomatico(t) {
      var ciclo = 6.5;
      var fase = (t % ciclo) / ciclo;
      if (fase > 0.42) return null; // a maior parte do tempo o muro descansa
      var p = fase / 0.42;
      var volta = Math.floor(t / ciclo);
      var inclina = (volta % 2 === 0) ? 1 : -1;
      var base = 0.22 + 0.2 * ((volta % 3) / 2);
      return {
        x: -0.1 + 1.2 * p,
        y: base + inclina * 0.26 * Math.sin(p * Math.PI) + 0.08 * Math.sin(p * 9.0),
        forca: Math.sin(p * Math.PI) * 0.95
      };
    }

    /* ---------- laço ---------- */
    var rodando = true;
    var pedido = null;
    var ultimo = performance.now();

    function passo(agora) {
      pedido = null;
      if (!rodando) return;
      var dt = Math.min((agora - ultimo) / 1000, 0.05);
      ultimo = agora;
      relogio += dt;

      var forca = 0;
      if (pintando && relogio - ultimoToque < 0.25) {
        forca = 0.95;
      } else {
        pintando = false;
        var auto = pilotoAutomatico(relogio);
        if (auto) {
          anterior.copy(ponto);
          ponto.set(auto.x, auto.y);
          forca = auto.forca;
        }
      }

      matTinta.uniforms.uDe.value.copy(anterior);
      matTinta.uniforms.uPara.value.copy(ponto);
      matTinta.uniforms.uForca.value = forca;
      matTinta.uniforms.uTempo.value = relogio;
      matTinta.uniforms.tAnterior.value = alvoB.texture;
      anterior.copy(ponto);

      renderer.setRenderTarget(alvoA);
      renderer.render(cenaTinta, camera);
      renderer.setRenderTarget(null);

      var troca = alvoA;
      alvoA = alvoB;
      alvoB = troca;
      matMuro.uniforms.tTinta.value = alvoB.texture;
      matMuro.uniforms.uTempo.value = relogio;

      renderer.render(cena, camera);

      if (precisaAjustar) {
        ajustarCobertura();
        precisaAjustar = false;
      }
      pedido = requestAnimationFrame(passo);
    }

    document.addEventListener('visibilitychange', function () {
      rodando = !document.hidden;
      if (rodando && !pedido) {
        ultimo = performance.now();
        pedido = requestAnimationFrame(passo);
      }
    });

    /* ---------- encaixe e redimensionamento ---------- */
    banner.appendChild(tela);
    document.documentElement.classList.add('js-muro3d');
    ajustarCobertura();
    pedido = requestAnimationFrame(passo);

    var espera;
    function ajustar() {
      largura = banner.clientWidth;
      altura = banner.clientHeight;
      if (!largura || !altura) return;
      renderer.setSize(largura, altura, false);
      matTinta.uniforms.uProporcao.value = largura / altura;
      ajustarCobertura();
    }
    function agendarAjuste() {
      clearTimeout(espera);
      espera = setTimeout(ajustar, 150);
    }
    if ('ResizeObserver' in window) new ResizeObserver(agendarAjuste).observe(banner);
    else window.addEventListener('resize', agendarAjuste);
  }
})();
