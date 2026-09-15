---
name: Avanti
description: Muro de lambe-lambe em grade rígida, onde cada seção é um cartaz de papel impresso em tinta preta e o roxo só aparece para agir.
colors:
  acao: "#A509FA"
  acao-forte: "#8406C9"
  acao-tinta: "#FFFFFF"
  papel: "#F1EEE6"
  papel-velho: "#E7E1D3"
  tinta: "#121014"
  tinta-2: "#3A363F"
  tinta-3: "#58535E"
  linha-papel: "rgba(18, 16, 20, 0.16)"
  muro-noite: "#141216"
  muro-noite-2: "#1E1C22"
  muro-noite-fg: "#ECE9E2"
  muro-noite-fg-2: "#A9A4AF"
  muro-noite-linha: "rgba(236, 233, 226, 0.14)"
  muro-dia: "#BFBAB0"
  muro-dia-2: "#B0AA9F"
  muro-dia-fg: "#131115"
  muro-dia-fg-2: "#3B3840"
  muro-dia-linha: "rgba(19, 17, 21, 0.2)"
typography:
  display:
    fontFamily: "'League Gothic', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.3rem, 6vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.004em"
  headline:
    fontFamily: "'League Gothic', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.4rem, 4.4vw, 3.9rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.005em"
  title:
    fontFamily: "'League Gothic', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.9rem, 2.4vw, 2.3rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "0.005em"
  label-acao:
    fontFamily: "'League Gothic', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.75rem, 2.4vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  body-destaque:
    fontFamily: "'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 88"
rounded:
  none: "0px"
spacing:
  cola: "clamp(10px, 1.3vw, 16px)"
  lateral: "clamp(16px, 3.2vw, 40px)"
  secao: "clamp(56px, 8vw, 112px)"
  cartaz: "clamp(26px, 3vw, 40px)"
  largura: "1320px"
  topo: "76px"
components:
  tira:
    backgroundColor: "{colors.acao}"
    textColor: "{colors.acao-tinta}"
    typography: "{typography.label-acao}"
    rounded: "{rounded.none}"
    padding: "0.3em 0.95em 0.18em"
    height: "60px"
  tira-hover:
    backgroundColor: "{colors.acao-forte}"
    textColor: "{colors.acao-tinta}"
  tira-pequena:
    backgroundColor: "{colors.acao}"
    textColor: "{colors.acao-tinta}"
    rounded: "{rounded.none}"
    padding: "0.24em 0.7em 0.12em"
    height: "46px"
  cartaz:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "{spacing.cartaz}"
  cartaz-velho:
    backgroundColor: "{colors.papel-velho}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "{spacing.cartaz}"
  cartaz-tinta:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
    rounded: "{rounded.none}"
  tarja:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: "0.14em 0.32em 0.02em"
  tarja-pequena:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0.14em 0.32em 0.02em"
  tarja-papel:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
  etiqueta:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.4rem 0.65rem 0.35rem"
  kit-controle-botao:
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "0.3em 0.8em 0.16em"
    height: "48px"
  kit-controle-botao-ativo:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
  ig-card:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.none}"
    padding: "8px 8px 12px"
  botao-icone:
    rounded: "{rounded.none}"
    size: "44px"
---

# Design System: Avanti

## Overview

**Creative North Star: "O Muro de Lambe-Lambe"**

A página é um muro de concreto com cartazes colados em grade rígida. Cada seção é um cartaz de papel offset quase branco, impresso em tinta preta, com um recado só. Os títulos saem em letra de tipo de madeira condensada, sempre em caixa alta e sempre dentro de uma tarja preta. O padrão de grafite da Avanti não é fundo de página: entra como mais um cartaz impresso colado na parede. O clima é de rua e de gráfica, autêntico sem ser bagunçado e sem virar brincadeira infantil.

A densidade é de parede cheia: cartazes grandes, com a borda de um encostando ou passando por cima da do outro, separados por uma "cola" estreita de muro aparente. A ordem vem da grade de 12 colunas. O que parece colado à mão (sobreposição, borda rasgada, tira levemente torta) acontece sempre dentro dessa grade, nunca fora dela.

O mundo recusa explicitamente o template de SaaS escuro que o site substituiu: rótulo pequeno, título, parágrafo e grade de cards iguais com cantos arredondados. O roxo da marca deixou de ser atmosfera; agora é tinta de ação.

**Key Characteristics:**
- Muro (fundo com grão) muda com o tema; cartazes nunca mudam.
- Papel quente, tinta preta e um único roxo reservado para ação.
- League Gothic em caixa alta para tudo que é "impresso"; Archivo para leitura.
- Cantos retos em todo papel. Não existe raio de borda.
- Grade de 12 colunas com cartazes sobrepostos e bordas rasgadas só na sobreposição.
- Movimento pequeno que nunca esconde conteúdo.

## Colors

Três materiais e uma tinta de ação: o muro, o papel, a tinta preta e o roxo.

### Primary
- **Roxo Spray** (acao): a tinta de ação. Aparece só na tira "Faça seu orçamento", no botão flutuante do WhatsApp, no sublinhado do link de dúvida no WhatsApp, no anel de foco (`:focus-visible`) e na seleção de texto. O escorrido roxo do logo e o roxo do cartaz de grafite são arte impressa, não interface.
- **Roxo Spray Carregado** (acao-forte): estado de hover da tira e do botão flutuante.
- **Branco de Tira** (acao-tinta): texto e ícone sobre o roxo.

### Neutral
- **Papel Offset** (papel): fundo de todo cartaz, da etiqueta e do card do Instagram, sempre com grão de papel por cima. Também é o texto da tarja preta.
- **Papel Velho** (papel-velho): variante de cartaz mais amarelada, usada para quebrar a sequência de papéis iguais (cartaz "Sem novela.").
- **Tinta Preta** (tinta): texto principal nos cartazes, fundo das tarjas, do cartaz de tinta (faixa de prova) e das fotos antes de carregar; filetes grossos de 3px que abrem listas.
- **Tinta Gasta** (tinta-2): parágrafos e descrições dentro dos cartazes.
- **Tinta Clara** (tinta-3): notas, legendas do kit e rodapés de cartaz.
- **Filete de Papel** (linha-papel): divisórias finas de 1px entre itens dentro do cartaz.

### Muro (tema)
Os tokens de muro existem em duas versões, trocadas por `data-theme` no `<html>`. Na CSS as duas usam os mesmos nomes (`--muro`, `--muro-2`, `--muro-fg`, `--muro-fg-2`, `--muro-linha`).
- **Muro à Noite** (muro-noite, tema escuro, padrão): concreto quase preto com grão. Texto do muro em muro-noite-fg; navegação e rodapé secundários em muro-noite-fg-2.
- **Muro de Dia** (muro-dia, tema claro): concreto cinza quente com grão. Texto em muro-dia-fg; secundário em muro-dia-fg-2.
- **muro-2** existe nos dois temas como tom de apoio do muro; hoje não tem uso visível na página.

### Named Rules
**The Roxo É Ação Rule.** O roxo só pinta o que leva ao WhatsApp, além do foco e da seleção. Título, fundo, ícone decorativo, borda de cartaz ou destaque de texto em roxo quebram o mundo.

**The Tema Só No Muro Rule.** Trocar o tema muda apenas o muro, o cabeçalho, o rodapé e os controles colados direto nele (paginação, setas, ícones). Papel, tinta, tarja, etiqueta e fotos ficam idênticos nos dois temas.

## Typography

**Display Font:** League Gothic (com Arial Narrow, sans-serif)
**Body Font:** Archivo, eixos de largura 62–125 e peso 400–800 (com system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** tipo de madeira condensado de cartaz de rua contra um grotesco de gráfica, sóbrio e legível. League Gothic grita o recado; Archivo explica e dá as garantias com tom responsável.

### Hierarchy
- **Display** (400, clamp(3.3rem, 6vw, 5.5rem), 0.92, caixa alta): só o h1 da abertura e o título do fechamento (clamp(3rem, 5.4vw, 5rem)), impressos direto no papel, sem tarja.
- **Headline** (400, clamp(2.4rem, 4.4vw, 3.9rem), 0.98, caixa alta): o h2 de cada cartaz, sempre dentro da tarja preta.
- **Title** (400, clamp(1.9rem, 2.4vw, 2.3rem), 0.98, caixa alta): tarja pequena dos produtos e do cartaz "Sem novela.". Termos das listas de garantias e vantagens usam o mesmo corpo de cartaz (1.9rem a 2.5rem), sem tarja.
- **Label de ação** (400, clamp(1.75rem, 2.4vw, 2.1rem), 1, 0.02em, caixa alta): texto da tira roxa; também a faixa de prova e os botões do kit (~1.6rem a 2rem).
- **Body destaque** (400, clamp(1.0625rem, 1.3vw, 1.1875rem), 1.55): parágrafo de apoio de cada cartaz, até 52ch.
- **Body** (400, 1rem, 1.55): texto corrido, passos do processo e respostas do FAQ (até 56–64ch).
- **Body sm** (400–700, 0.9375rem, 1.55): descrições de produto e garantia, navegação (600), notas (600).
- **Label** (700, 0.8125rem, 0.01em, largura 88%): etiqueta de tiragem nas fotos e no card do Instagram. Os títulos dos passos usam Archivo 800 com largura 92%.

### Named Rules
**The Caixa Alta É Impressão Rule.** Tudo em League Gothic é caixa alta e peso 400. League Gothic não aparece em minúscula nem em texto corrido.

**The Tarja Única Rule.** Todo título de seção é a mesma tarja preta com texto em papel. Não existe outro estilo de título de seção, nem rótulo pequeno acima dele.

## Layout

O muro é uma grade de 12 colunas (`repeat(12, minmax(0, 1fr))`) dentro de uma largura máxima de 1320px com lateral de clamp(16px, 3.2vw, 40px). O espaço entre cartazes é a cola, clamp(10px, 1.3vw, 16px). Seções são separadas por clamp(56px, 8vw, 112px) de muro aparente. O cabeçalho é fixo no topo (76px; 68px até 1023px) e pintado com o próprio muro.

A composição é por sobreposição: um cartaz de foto ou banner ocupa ~7 colunas e um cartaz de texto ocupa as ~6 seguintes, começando uma coluna antes para passar por cima (abertura, kit), ou recua com margem negativa (produtos, vantagens). A faixa de prova e a tira roxa do processo também são coladas por cima da borda de outro cartaz. Os produtos formam um muro assimétrico (moletom grande em 5 colunas e 2 linhas, canecas e camisetas menores, tirantes em 6 colunas), nunca uma grade de cards iguais. Garantias e processo são cartazes largos (12 e 9 colunas) com listas internas.

Pontos de quebra: até 1023px a navegação vira menu, o botão flutuante do WhatsApp aparece e os cartazes empilham em 12 colunas cheias. A sobreposição continua: o cartaz de texto sobe com margem negativa (-40px a -80px) por cima da foto anterior, recuado 12px de cada lado. Os banners de grafite passam a usar uma impressão única maior (`background-size: max(760px, 130%) auto` na abertura, `max(760px, 110%) auto` no fechamento) no lugar de `cover`, para os logos lerem no celular. Até 639px canecas e camisetas também empilham, garantias viram uma coluna, a tira da abertura ocupa a largura toda e o recuo cai para 8px.

Os cartazes de texto usam padding interno de clamp(26px, 3vw, 40px) (até 56px nos cartazes maiores); os cartazes de produto usam 12px em volta da foto.

## Elevation & Depth

A profundidade é física: papel colado numa parede. Não há camadas de interface nem vidro. Cada cartaz leva uma sombra curta de contato mais uma sombra longa e difusa, como papel que descolou um pouco do muro. A ordem de sobreposição é fixa por `z-index` (o cartaz que cola por cima fica em 2 ou 3). O grão de ruído do muro e do papel dá textura sem imagem externa.

### Shadow Vocabulary
- **Cartaz colado** (`box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16), 0 18px 30px -18px rgba(0, 0, 0, 0.55)`): todo cartaz e todo card do Instagram.
- **Tira** (`box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 14px 22px -12px rgba(0, 0, 0, 0.6)`): tira roxa de ação; variante mais longa (`0 14px 24px -12px rgba(0, 0, 0, 0.7)`) no botão flutuante.
- **Etiqueta** (`box-shadow: 0 8px 14px -10px rgba(0, 0, 0, 0.7)`): etiqueta de tiragem sobre a foto.

### Named Rules
**The Sombra É Papel Rule.** Sombra só existe em coisa colada (cartaz, tira, etiqueta, card). Botões de contorno, navegação e controles do muro não têm sombra.

## Shapes

Todo papel tem canto reto: raio 0 em cartaz, tarja, tira, etiqueta, botões e até nos marcadores da paginação do carrossel. O único recorte irregular é a borda rasgada: uma máscara SVG irregular de 14px, esticada pela borda inteira, pinta um pedaço de papel para fora do cartaz. Ela aparece à esquerda (`rasgo-esq`) ou no topo (`rasgo-topo`) do cartaz que passa por cima de outro. A tira de ação e o botão flutuante ficam levemente tortos (-1° a -3°), como fita colada à mão. Os marcadores da faixa de prova são pequenos losangos cinzas antes de cada item. Filetes de 3px em tinta abrem listas; filetes de 1px separam itens.

**The Rasgo Só Na Sobreposição Rule.** A borda rasgada marca onde um cartaz cobre outro. Cartaz solto no muro fica com a borda limpa.

## Components

### Tira de ação (botão primário)
Fita roxa colada torta; o único roxo "de verdade" da página.
- **Shape:** canto reto (0px), girada -1.6deg (a pequena, -1deg).
- **Primary:** fundo acao, texto acao-tinta em League Gothic caixa alta, altura mínima 60px, ícone do WhatsApp à esquerda. Sempre com o texto "Faça seu orçamento".
- **Hover / Focus:** endireita (rotate 0, sobe 1px) em 0.35s cubic-bezier(0.16, 1, 0.3, 1) e escurece para acao-forte; ao pressionar desce 1px. Foco com contorno de 3px em tinta (em papel no cabeçalho do tema escuro), deslocado 4px.
- **Pequena:** 46px, 1.5rem, usada no cabeçalho do desktop.
- **Botão flutuante:** quadrado de 58px em acao, girado -3deg, fixo no canto inferior direito até 1023px; some enquanto a abertura ou o fechamento estão na tela.

### Links
- **Link de ação:** Archivo 700 em tinta com sublinhado roxo de 3px deslocado 6px; no hover o sublinhado encosta (3px). Só para WhatsApp.
- **Link de tinta:** mesmo desenho com sublinhado em tinta de 2px, para o Instagram.

### Cartaz
O componente do mundo: um recado por cartaz.
- **Corner Style:** reto (0px).
- **Background:** papel com grão; variantes papel-velho, tinta (texto em papel) e banner (impressão única do grafite sobre #0B0916) e foto (imagem em `object-fit: cover`).
- **Shadow Strategy:** Cartaz colado (ver Elevation & Depth).
- **Border:** nenhuma; borda rasgada opcional na sobreposição.
- **Internal Padding:** clamp(26px, 3vw, 40px) a clamp(30px, 4vw, 56px).

### Tarja
Faixa preta de título, igual em todo cartaz. League Gothic caixa alta em papel sobre tinta, padding 0.14em 0.32em 0.02em, com `box-decoration-break: clone` para cada linha quebrada ganhar a própria faixa. Variantes: pequena (produtos) e papel (inversa).

### Etiqueta de tiragem
Tira de papel colada no canto inferior esquerdo de cada foto (14px da borda), Archivo 700 a 0.8125rem com largura 88%, trazendo só dados reais da foto ("Terceirão 2026 · moletom, caneca e tirante"). No card do Instagram a mesma voz vira uma linha abaixo da imagem, cortada com reticências.

### Controle do kit (interação-assinatura)
Botões de contorno Kit / Moletom / Caneca / Tirante que aproximam a mesma foto real em cada produto.
- **Style:** League Gothic 1.6rem caixa alta, contorno de 2px em tinta, fundo transparente, canto reto, altura 48px.
- **State:** hover com véu de tinta a 8%; ativo (`aria-pressed="true"`) invertido para tinta com texto em papel. A foto faz zoom e desloca em 0.9s cubic-bezier(0.16, 1, 0.3, 1) e a legenda (`aria-live`) troca de texto. Sem JavaScript o controle fica escondido e a foto aparece inteira.

### Card do Instagram
Polaroide de papel com 8px de margem, foto quadrada e etiqueta embaixo, sombra de cartaz. No hover sobe 4px e gira -0.8deg. Vive num carrossel Swiper (1.25 a 4.2 slides por vista, 14–18px de espaço); sem a biblioteca, vira uma faixa rolável com scroll-snap. A paginação são traços de 4px em muro-fg-2 (ativo em muro-fg), e as setas usam o botão de ícone.

### Navigation
- **Cabeçalho:** logo à esquerda (colorido no escuro, preto no claro), links Archivo 600 a 0.9375rem em muro-fg-2 que viram muro-fg no hover, botão de ícone de tema e tira pequena.
- **Botão de ícone:** quadrado de 44px com contorno de 2px em muro-linha, que vira muro-fg no hover.
- **Mobile (até 1023px):** botão de menu abre uma lista de links de 52px com filetes de muro-linha, o seletor de tema com rótulo e a tira de orçamento no fim. Esc fecha e devolve o foco.

### FAQ
Acordeão nativo `<details>` dentro de um cartaz. Pergunta em Archivo 700 1.125rem, altura mínima 64px; o indicador é uma cruz de dois traços de 3px em tinta, e o traço vertical deita ao abrir (0.3s). Filete de papel entre perguntas.

## Do's and Don'ts

### Do:
- **Do** colocar todo conteúdo novo dentro de um cartaz de papel (papel, canto reto, sombra de cartaz) sobre o muro.
- **Do** abrir cada cartaz de seção com a tarja preta em League Gothic caixa alta.
- **Do** posicionar cartazes na grade de 12 colunas e sobrepor pelo menos um par por seção, com a borda rasgada no cartaz de cima.
- **Do** usar a tira roxa torta, com o texto "Faça seu orçamento", como o único botão de conversão.
- **Do** colar uma etiqueta de tiragem com dados reais em cada foto de produto ou turma.
- **Do** manter o movimento pequeno e opcional: endireitar a tira, zoom do kit, card que sobe no hover, sempre anulado por `prefers-reduced-motion`.
- **Do** mudar só os tokens de muro ao mexer em tema.

### Don't:
- **Don't** usar roxo fora de ação (tira, WhatsApp, foco, seleção): nada de título, fundo, ícone ou borda roxos.
- **Don't** arredondar cantos de papel, botão ou card.
- **Don't** montar grade de cards iguais ou o padrão rótulo pequeno + título + parágrafo do template SaaS escuro.
- **Don't** esconder conteúdo atrás de animação de entrada ou revelação na rolagem; todo cartaz é visível sem JavaScript e sem evento de scroll.
- **Don't** mudar cor de papel, tinta ou cartaz entre os temas.
- **Don't** colocar borda rasgada em cartaz que não cobre outro.
- **Don't** escrever League Gothic em minúscula ou em texto corrido.
- **Don't** inventar números, depoimentos, prazos ou dados de etiqueta; placeholder escondido é melhor que dado falso.
