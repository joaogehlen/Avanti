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
Todo campo deixado em branco (`''`) **esconde a frase inteira** que depende dele, para o
visitante nunca ver um `[COLCHETE]`. O número de WhatsApp e o @ do Instagram também
já vêm escritos no HTML, então a página continua completa mesmo sem JavaScript.

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

Os três últimos ainda estão vazios. Enquanto estiverem assim, estas frases ficam fora
da página: "A produção leva X dias úteis…" e "Aceitamos X." no FAQ, e "respondemos em X"
no fechamento. Basta preencher o campo para a frase aparecer.

Enquanto `instagram` estiver em branco, o link do Instagram no rodapé fica **escondido**
em vez de virar um link morto.

### Textos → `site/index.html`

Estão todos direto no HTML, em português, sem template. É só procurar e editar.

**A seção "Avaliações do Google" está fora da página por enquanto**, a pedido. Com o
novo visual os estilos antigos dela saíram do CSS. Quando houver depoimentos reais, ela
volta como mais um cartaz do muro (`.cartaz` com uma `.tarja` de título), entre
"Como funciona" e o Instagram.

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

O perfil configurado é **@canecasulcanecas**. Os 7 cards são posts reais, capturados
em 11/09/2026: os **3 primeiros são os fixados**, os outros 4 são os mais recentes. O
post-5 (moletom corporativo da GB Metalúrgica) saiu por não ser do público de formatura.
A lista em `instagram.js` e os slides do HTML precisam ficar na mesma ordem.

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

Tudo sai de variáveis CSS no topo do arquivo. O visual é um **muro de lambe-lambe**:
cada seção é um cartaz de papel colado numa grade de 12 colunas.

| | Escuro (muro à noite) | Claro (muro de dia) |
|---|---|---|
| Muro | `#141216` | `#BFBAB0` |
| Texto no muro | `#ECE9E2` / `#A9A4AF` | `#131115` / `#3B3840` |
| Papel dos cartazes | `#F1EEE6` | `#F1EEE6` |
| Tinta | `#121014` | `#121014` |
| Roxo de ação | `#A509FA` | `#A509FA` |

O `#A509FA` é o roxo do escorrido do logo e aparece **só em ação**: botões de
orçamento, links de WhatsApp e o anel de foco. Não use roxo como decoração.
Todas as combinações de texto passam no contraste WCAG AA.

Tipografia: **League Gothic** (letra condensada de cartaz de gráfica) nos títulos,
tarjas e botões; **Archivo** no texto corrido. As duas vêm do Google Fonts.

Peças principais no CSS:
- `.cartaz`: o papel colado, com grão e sombra
- `.tarja`: o título impresso numa faixa preta
- `.tira`: o botão roxo levemente torto
- `.etiqueta`: a legenda colada sobre as fotos
- `.rasgo-esq` / `.rasgo-topo`: a borda rasgada, só onde um cartaz sobrepõe outro

### Imagens → `site/img/`

Já otimizadas para web a partir dos originais em `briefing/`. Para trocar alguma, mantenha
o mesmo nome de arquivo e o site continua funcionando.

---

## Decisões de design que valem saber

- **O banner de grafite é um cartaz impresso, igual nos dois temas.** O `fundo.jpg`
  aparece sem véu por cima na abertura e no fechamento. O que muda com o tema é o muro
  em volta dos cartazes, não os cartazes.
- **"Uma arte. O kit inteiro."** Os botões Kit / Moletom / Caneca / Tirante dão zoom na
  mesma foto real (`moletom.jpg`), onde a arte da arara aparece nos três produtos. Sem
  JavaScript os botões somem e a foto aparece inteira.
- **Nenhum cartaz fica escondido esperando animação.** Uma revelação "colando" os
  cartazes na rolagem foi testada e removida: em alguns navegadores ela não disparava e
  metade da página ficava preta. O movimento que sobrou é pequeno e nunca esconde
  conteúdo (a tira roxa endireitando no hover, o zoom do kit, o carrossel).
- **O WhatsApp flutuante só existe em telas menores.** Ele some enquanto a abertura ou
  o fechamento estão na tela, porque os dois já têm o botão.
- **O tema segue a preferência do sistema na primeira visita** e depois guarda a
  escolha da pessoa no `localStorage`. Um script inline no `<head>` aplica o tema
  (salvo ou do sistema) antes do primeiro paint, para não piscar.
- **O logo troca com o tema**: `logo.png` (colorido) no muro escuro, `logo-alt.png`
  (preto) no claro.
- **O FAQ usa `<details>`/`<summary>` nativos** — acordeão acessível, funciona com
  teclado e sem JavaScript.
- **A página inteira funciona sem JavaScript.** Sem JS você perde o toggle de tema,
  o menu mobile, o zoom do kit e o carrossel animado, mas todo o conteúdo e todos os
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

- [ ] `prazoProducao`, `formasPagamento` e `prazoResposta` em `js/config.js`
- [ ] Com o domínio definido, trocar o `og:image` do `index.html` por uma URL absoluta
  (ex.: `https://seudominio.com.br/img/moletom.jpg`), senão a prévia do link no WhatsApp
  sai sem imagem

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
- Desde 2018 · +6 mil clientes atendidos (os números da bio do Instagram, que são os
  que valem; "+9 anos", "+10 mil" e "+400 mil" do briefing saíram do site)
- WhatsApp (51) 99926-8517 — confirmado na bio do @canecasulcanecas

## Pendências

Nada disso impede o site de ir ao ar, mas vale resolver:

1. **Prazos e pagamento** — `prazoProducao`, `formasPagamento` e `prazoResposta`
   em `site/js/config.js`.
2. **Avaliações do Google** — a seção saiu da página por enquanto. Quando tiver
   depoimentos reais, ela volta como um cartaz novo.
3. **`og:image` absoluto** — depende do domínio final (ver checklist acima).
4. **Canais próprios da Avanti** — o WhatsApp e o Instagram atuais são da Canecas Sul e
   são provisórios. Quando a Avanti tiver os dela, troque em `config.js` e nos textos
   fixos do `index.html` (número e @).
