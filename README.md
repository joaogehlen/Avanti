# Site da Avanti

Landing page de uma página só para a Avanti — personalizados (canecas, camisetas,
moletons e tirantes) para turmas de terceirão e formatura.

HTML, CSS e JavaScript puros. Sem framework, sem build, sem `npm install`.

---

## Como rodar

Precisa só do [Node.js](https://nodejs.org) instalado.

```bash
npm start
```

Depois abra **http://localhost:5173**

Se preferir sem o npm, é o mesmo:

```bash
node dev-server.js
```

Para usar outra porta:

```bash
PORT=8080 node dev-server.js
```

Parar: `Ctrl+C` na janela do terminal.

> O `dev-server.js` é um servidor estático de ~50 linhas, escrito só com o que já
> vem no Node. Ele existe porque abrir o `index.html` direto pelo Explorer
> (`file://`) faz o navegador bloquear alguns recursos. Fica **fora** da pasta
> `site/` de propósito: assim ele não vai junto para produção.

---

## Onde mexer

### Contato, prazos e formas de pagamento → `site/js/config.js`

Esse é o único arquivo que você precisa editar para o site entrar no ar de verdade.
Todo campo deixado em branco (`''`) mantém o placeholder entre colchetes visível na
página, de propósito, para não passar batido.

```js
window.AVANTI = {
  whatsapp: '5551999268517',         // confirmado na bio do @canecasulcanecas
  whatsappDisplay: '(51) 99926-8517',
  whatsappMensagem: 'Olá! Quero fazer um orçamento com a Avanti.',
  instagram: 'canecasulcanecas',     // sem o @
  prazoProducao: '',                 // ex: '10 a 15'
  formasPagamento: '',               // ex: 'Pix, boleto e cartão em até 12x'
  prazoResposta: ''                  // ex: 'até 1 hora útil'
};
```

Os três últimos ainda estão vazios e aparecem como `[COLCHETES]` na página.

Enquanto `instagram` estiver em branco, o link do Instagram no rodapé fica **escondido**
em vez de virar um link morto.

### Textos → `site/index.html`

Estão todos direto no HTML, em português, sem template. É só procurar e editar.

Ainda faltam as **avaliações do Google**: procure por
`[COLE AQUI UMA AVALIAÇÃO REAL DO GOOGLE` (3 ocorrências) e substitua pelo texto real,
junto com `[NOME]` e `[TURMA / ESCOLA / CIDADE]`.

### Posts do Instagram → `site/js/instagram.js`

**Leia isto antes:** a API do Instagram **não informa quais posts estão fixados**.
Não existe campo `is_pinned` no Graph API. Dá para buscar as mídias *mais recentes*,
mas "fixado" é uma marcação que só existe dentro do app. Ou seja, a seleção dos
posts fixados é manual em qualquer solução, inclusive nos widgets pagos.

Por isso a lista no topo de `instagram.js` é a fonte da verdade. Para trocar um post:

1. Abra o post no Instagram pelo navegador e copie a URL
   (ex.: `https://www.instagram.com/p/C1a2B3c4D5e/`)
2. Salve a imagem quadrada em `site/img/instagram/`
3. Edite a entrada correspondente:

```js
{ img: 'img/instagram/post-1.jpg', url: 'https://www.instagram.com/p/C1a2B3c4D5e/', alt: '...' }
```

O perfil configurado é **@canecasulcanecas**. Os 8 cards são posts reais, capturados
em 11/09/2026: os **3 primeiros são os fixados**, do 4 ao 8 são os mais recentes.

Como a API não marca posts fixados, eles foram identificados pela grade do perfil:
aparecem no topo mesmo tendo shortcode mais antigo que todos os outros, o que só
acontece com post fixado. Se você fixar outro post, atualize a imagem em
`site/img/instagram/` e o `url` correspondente.

Quando o `instagram` do `config.js` está em branco **e** os `url` também, os cards
ficam sem link nenhum, em vez de virarem `href="#"` e jogarem o visitante para o
topo da página.

**Feed automático (opcional).** O campo `feedUrl` aceita a URL de um feed JSON com
os posts mais recentes. Não dá para chamar a API do Instagram direto do navegador:
o token ficaria visível no código-fonte para qualquer visitante. O caminho seguro é
um serviço que guarda o token e devolve JSON público (o Behold.so tem plano
gratuito) ou uma função serverless sua. Qualquer falha no feed mantém a lista
curada. Esse caminho está implementado mas **não foi testado contra um endpoint
real**, porque não há conta configurada.

A biblioteca do carrossel é o [Swiper 11](https://swiperjs.com) (MIT), baixada em
`site/vendor/swiper/`. Não depende de CDN e funciona offline.

### Cores, espaçamentos e tipografia → `site/css/styles.css`

Tudo sai de variáveis CSS no topo do arquivo. A paleta veio da própria marca:

| | Escuro | Claro |
|---|---|---|
| Fundo | `#0B0916` | `#FAF8FF` |
| Roxo (botões) | `#A509FA` | `#8E05D6` |
| Roxo (texto/links) | `#C081FF` | `#7A00BC` |

O `#A509FA` é o roxo do dripping do logo e o `#0B0916` é o fundo do padrão de grafite.
Todas as combinações de texto passam no contraste WCAG AA.

Tipografia: **Space Grotesk** nos títulos, **Manrope** no corpo, via Google Fonts.

### Imagens → `site/img/`

Já otimizadas para web a partir dos originais em `briefing/`. Para trocar alguma, mantenha
o mesmo nome de arquivo e o site continua funcionando.

---

## Decisões de design que valem saber

- **O hero e o bloco final ficam escuros nos dois temas.** Eles usam o `fundo.jpg`,
  que é a arte de grafite da própria Avanti — clarear embaçaria o padrão. O resto
  da página troca normalmente. Isso é a classe `.brand-dark` no CSS.
- **O tema segue a preferência do sistema na primeira visita** e depois guarda a
  escolha da pessoa no `localStorage`. Um script inline no `<head>` aplica o tema
  antes do primeiro paint, para não piscar branco.
- **O logo troca com o tema**: `logo.png` (colorido) no escuro, `logo-alt.png`
  (preto) no claro.
- **O FAQ usa `<details>`/`<summary>` nativos** — acordeão acessível, funciona com
  teclado e sem JavaScript.
- **A página inteira funciona sem JavaScript.** Sem JS você perde o toggle de tema,
  o menu mobile e a substituição dos placeholders, mas todo o conteúdo e todos os
  links de WhatsApp continuam valendo.

---

## Publicar na Vercel

O `vercel.json` na raiz já traz tudo configurado (`outputDirectory: "site"`, URLs
limpas, cabeçalhos de cache e segurança). Não há build: é HTML estático.

**Pelo painel, uma vez só:**

1. Entre em [vercel.com/new](https://vercel.com/new) e faça login **com o GitHub**
   (a mesma conta `joaogehlen`)
2. Em *Import Git Repository*, escolha **joaogehlen/Avanti**.
   Se o repositório não aparecer, clique em *Adjust GitHub App Permissions* e dê
   acesso a ele
3. Não mexa em nada na tela de configuração: o `vercel.json` já define framework,
   pasta de saída e cabeçalhos
4. **Deploy**

Em cerca de um minuto o site sai em `https://avanti-<algo>.vercel.app`. A partir daí,
**todo `git push` para a `main` republica sozinho** — não precisa voltar no painel.

**Domínio próprio:** no projeto, *Settings → Domains → Add*. A Vercel mostra o
registro DNS para criar onde o domínio está registrado (Registro.br, GoDaddy etc.).
O certificado HTTPS é emitido automaticamente.

**Pela linha de comando**, se preferir:

```bash
npx vercel --prod
```

Ele pede login no primeiro uso e faz o deploy direto da pasta, sem passar pelo Git.

### Outras hospedagens

- **Netlify / Cloudflare Pages** — aponte o repositório com "publish directory" =
  `site` e comando de build vazio.
- **Hospedagem tradicional (cPanel, FTP)** — copie o conteúdo de `site/` para o
  `public_html`.
- **GitHub Pages** — publique a pasta `site/` como raiz do Pages.

### Antes de publicar, confira

- [ ] Avaliações reais do Google no lugar dos `[COLCHETES]` (`index.html`)
- [ ] `prazoProducao`, `formasPagamento` e `prazoResposta` em `js/config.js`
- [ ] Números batendo com o Instagram (ver "Pendências" no fim deste arquivo)

---

## Estrutura

```
Avanti/
├── vercel.json            ← config do deploy (outputDirectory, cache, headers)
├── dev-server.js          ← servidor local (NÃO vai pro ar)
├── site/                  ← o site em si (é isso que vai pro ar)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/config.js       ← contato, prazos, Instagram
│   ├── js/main.js         ← tema, menu mobile, placeholders
│   ├── js/instagram.js    ← posts fixados + carrossel
│   ├── img/               ← imagens otimizadas
│   ├── img/instagram/     ← recortes quadrados dos posts
│   └── vendor/swiper/     ← Swiper 11 (MIT)
├── briefing/              ← material original (fotos, logos, textos)
├── Main.dc.html           ← artboard desktop do canvas de design
├── Mobile.dc.html         ← artboard celular do canvas de design
├── canvas.json            ← layout do canvas
├── site-avanti.html       ← canvas de design publicado
├── package.json
└── README.md
```

---

## Dados da empresa no site

- CNPJ 41.866.783/0001-71
- Rua Celeste Fornari, 469 · Centro · Arvorezinha/RS · 95995-000
- +9 anos de experiência · +10 mil clientes · +400 mil produtos enviados
- WhatsApp (51) 99926-8517 — confirmado na bio do @canecasulcanecas

## Pendências

Nada disso impede o site de ir ao ar, mas vale resolver:

1. **Avaliações do Google** — três `[COLCHETES]` no `index.html` esperando texto real.
2. **Prazos e pagamento** — `prazoProducao`, `formasPagamento` e `prazoResposta`
   em `site/js/config.js`.
3. **Números divergentes entre o site e o Instagram.** A bio do @canecasulcanecas diz
   "+ de 6mil clientes atendidos" e "Referência desde 2018"; o site diz "+10 mil
   clientes" e "+9 anos" (números que vieram do briefing). São dados públicos em dois
   canais, então convém alinhar.
4. **Marca x perfil** — o site é Avanti e o Instagram é @canecasulcanecas. Faz sentido
   internamente, mas quem clica cai num perfil com outro nome.
