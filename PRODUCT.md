# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Turmas de terceirão (3º ano do ensino médio) e de formatura que querem produtos personalizados com a arte da turma. Quem entra em contato é uma mistura de perfis, sem um que se destaque: alunos da comissão de formatura, pais ou responsáveis, e professores ou a própria escola. Todos fazem o mesmo trabalho: organizar um pedido coletivo para um grupo, com dinheiro de várias pessoas, e precisam de segurança para fechar com uma empresa que conheceram pela internet.

Consequência: o site não pode supor um único perfil. A linguagem é informal e próxima ("a gente", "sem novela"), mas as garantias (NF, CNPJ, seguro de carga, pagamento 50/50) precisam convencer um adulto responsável pela prestação de contas.

## Product Purpose

A Avanti produz personalizados para turmas: canecas, camisetas, moletons e tirantes. O site é uma landing page de uma página só, e o objetivo dela é levar o visitante a chamar no WhatsApp e pedir um orçamento. Toda a venda (atendimento, orçamento, criação da arte, aprovação, pagamento) acontece no WhatsApp, fora do site.

Sucesso significa uma turma chegando ao WhatsApp já confiando na empresa e entendendo que pode ver a arte pronta antes de decidir.

## Positioning

- **A arte é criada de graça e sem compromisso.** A turma descreve como imagina o layout, a Avanti desenha, e o pedido só é fechado com a arte aprovada.
- **Uma arte vale para todos os produtos.** O layout aprovado serve para caneca, camiseta, moletom e tirante, sem cobrar a criação de novo a cada item.
- **Cada arte é feita do zero para a turma**, sem catálogo pronto nem modelo reaproveitado.
- **Pedido mínimo baixo (10 unidades)**, então turmas pequenas também conseguem fechar.
- **Quatro garantias por escrito** que respondem ao medo de comprar personalizado online: empresa regularizada com NF, troca por falha de impressão ou defeito, envio com seguro e reembolso integral em caso de extravio, e pagamento 50% no fechamento e 50% com a mercadoria pronta.

## Operating Context

- **Fluxo de compra (5 passos):** faça seu orçamento (WhatsApp) → atendimento personalizado → criação da arte (grátis) → produção dedicada → entrega em casa via Correios ou transportadora.
- **Canal de conversão:** WhatsApp com mensagem pré-preenchida ("Olá! Quero fazer um orçamento com a Avanti."). O CTA do site é sempre "Faça seu orçamento".
- **Alcance:** envio para todo o Brasil. Sede em Arvorezinha/RS.
- **Contexto de avaliação:** a pessoa costuma comparar com outras lojas de personalizados de formatura antes de fechar, e muitas vezes precisa mostrar a opção para a turma, os pais ou a escola.

## Capabilities and Constraints

- **Escopo confirmado:** o site continua sendo só a landing page. Sem carrinho, checkout, catálogo com preços nem páginas extras.
- **Stack existente:** HTML, CSS e JavaScript puros, sem framework, sem build e sem `npm install`. A página funciona sem JavaScript (sem JS só se perdem o toggle de tema, o menu mobile e a troca dos placeholders). Publicada estaticamente na Vercel a partir da pasta `site/`; `dev-server.js` é só para desenvolvimento local.
- **Configuração editável por quem não programa:** contato, prazos e pagamento ficam em `site/js/config.js`. Campo em branco esconde a frase que depende dele; nenhum colchete aparece para o visitante.
- **Instagram:** a API não informa quais posts estão fixados, então a lista de posts em `site/js/instagram.js` é curada à mão.
- **Terminologia:** "terceirão", "formatura", "turma", "comissão", "arte"/"layout", "orçamento", "tirante" (cordão de crachá).
- **Ainda não decidido / pendente:**
  - Prazo de produção, formas de pagamento e prazo de resposta (vazios em `config.js`).
  - WhatsApp e Instagram próprios da Avanti. Os atuais, da Canecas Sul, são provisórios.
  - Número de produtos enviados (+400 mil vem do briefing e não foi confirmado contra outra fonte).

## Brand Commitments

- **Nome:** Avanti (no rodapé, "Avanti Personalizados"). É uma marca nova, com canais próprios a caminho. A Canecas Sul (@canecasulcanecas) é só a origem provisória do WhatsApp e do Instagram e não é a identidade do site.
- **Logos:** `briefing/LOGO COR PRINCIPAL.png` e `briefing/LOGO COR SECUNDÁRIA.png` (versões web em `site/img/logo.png` e `site/img/logo-alt.png`).
- **Arte de fundo da marca:** padrão de grafite em `briefing/FUNDO.jpg` (`site/img/fundo.jpg`).
- **Voz:** informal, calorosa e direta, em português do Brasil. Fala com "você" e "a gente", com expressões coloquiais ("sem novela", "coloca a mão na massa", "chega de falar com robô"). As garantias usam um tom mais formal e responsável.
- **Sites de referência indicados no briefing** (concorrentes do mesmo segmento, não modelos obrigatórios): catapultapersonalizados.com.br, colthpersonalizados.com.br, tribalismo.com.br, 2dbrindes.com.br.

## Evidence on Hand

- **Dados da empresa:** CNPJ 41.866.783/0001-71. Rua Celeste Fornari, 469, Centro, Arvorezinha/RS, 95995-000.
- **Números públicos confirmados (os do Instagram):** no mercado desde 2018 e mais de 6 mil clientes atendidos. Esses são os que valem. O "+9 anos" e o "+10 mil clientes" do briefing estão desatualizados e não devem ser usados.
- **Número sem confirmação:** +400 mil produtos enviados (só no briefing).
- **Fotos de produtos reais:** `briefing/PRODUTOS/` (camiseta, caneca, moletom).
- **Fotos de turmas reais:** `briefing/FOTOS TURMAS/` (2 fotos).
- **Posts reais do Instagram:** `site/img/instagram/post-1.jpg` a `post-8.jpg`, capturados em 11/09/2026 (os 3 primeiros são os fixados).
- **Textos oficiais do briefing:** `briefing/GARANTIAS.txt`, `briefing/VANTAGEM DA EMPRESA.txt`, `briefing/COMO FUNCIONA A COMPRA.txt`.
- **Não existe ainda:** avaliações do Google ou depoimentos de clientes (a seção foi retirada até chegarem), fotos de tirantes, preços e prazos. Nada disso pode ser inventado.

## Product Principles

1. **Confiança antes do clique.** Quem compra organiza o dinheiro de um grupo inteiro. Garantias, CNPJ, NF e o pagamento 50/50 são argumentos de venda, não letra miúda.
2. **A arte grátis é a promessa central.** Ver o próprio layout antes de pagar é o que diferencia a Avanti; tudo no site deve reforçar que dá para pedir sem compromisso.
3. **Tudo leva ao WhatsApp.** O site não vende, ele prepara a conversa. Cada seção termina perto de um caminho claro para "Faça seu orçamento", sem repetir o botão à exaustão.
4. **Só fatos verdadeiros.** Números, depoimentos, prazos e fotos precisam ser reais e consistentes com os canais públicos. Placeholder visível é melhor do que dado inventado.
5. **Funciona para quem não é da área.** O site é mantido editando um arquivo de configuração e HTML simples, e precisa continuar funcionando sem build e sem JavaScript.

## Accessibility & Inclusion

- Combinações de texto dentro do contraste WCAG AA nos dois temas (claro e escuro).
- Link "Pular para o conteúdo", acordeão de FAQ com `<details>`/`<summary>` nativos e navegação por teclado.
- Uso predominante no celular, com a conversão acontecendo no app do WhatsApp.
