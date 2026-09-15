---
target: site/index.html
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\joao.gehlen\\Desktop\\Avanti\\site\\index.html"
target_fingerprint: "sha256:bf49eb32430b82e205375916180e07985fca6bb8ca9da74497c296e992049245"
target_path: "C:\\Users\\joao.gehlen\\Desktop\\Avanti\\site\\index.html"
timestamp: 2026-09-15T11-36-39Z
slug: site-index-html
---
Method: dual-agent (A: afb214f5fb0947ff2 · B: aef263f512797894d)

# Crítica de design: site/index.html

## Nota de saúde do design

| # | Heurística | Nota | Principal problema |
|---|---|---|---|
| 1 | Visibilidade do estado do sistema | 3 | Menu não indica a seção atual; WhatsApp abre em nova aba sem aviso |
| 2 | Correspondência com o mundo real | 3 | Vocabulário certo, mas garantias em linguagem de contrato |
| 3 | Controle e liberdade | 3 | FAQ nativo, Esc fecha o menu mobile |
| 4 | Consistência e padrões | 2 | Números contradizem o Instagram; WhatsApp em 5 formatos visuais |
| 5 | Prevenção de erros | 2 | Dados desatualizados, placeholders e Instagram de outra marca no ar |
| 6 | Reconhecer em vez de lembrar | 3 | Prazo e pagamento não aparecem |
| 7 | Flexibilidade e eficiência | n/a | Página de conversão única |
| 8 | Estética e minimalismo | 2 | Mensagens repetidas 3–4x; duas galerias e duas faixas de números |
| 9 | Recuperação de erros | 2 | WhatsApp é o único canal; sem JS aparece [CONFIRMAR NÚMERO] |
| 10 | Ajuda e documentação | n/a | FAQ cumpre o papel dentro do conteúdo |
| Total | | 18/32 | Aceitável (56%) |

## Veredito de especificidade

Template escuro e roxo de SaaS com fotos da Avanti coladas. O que é da marca: fotos reais de turmas, posts do Instagram, gírias, CNPJ. O fundo de grafite fica sob véu de 62–90% (styles.css:280-284) e só no hero e no CTA final; o logo escorrido não influencia forma nem tipografia; a promessa "uma arte para todos os produtos / veja antes de pagar" nunca é mostrada visualmente.

Sinais de template/IA: faixa de anúncio com ✦; selo em pílula + brilho radial roxo no hero; `<em>` colorido no título duas vezes; selo flutuante "+400 mil" + faixa de 3 números; sete seções com rótulo em maiúsculas + título + parágrafo; grade de 6 vantagens com ícone de linha; garantias 01–04 seguidas de passos 01–05; Space Grotesk + Manrope; cantos de 20px, botões em pílula e sombra roxa brilhante em tudo.

Detector: CLI 15 ocorrências (exit 2), navegador 77. Verdadeiros: dark-glow ×4 (.btn--primary, styles.css:176), hero-eyebrow-chip (.pill), radial-spotlight-glow (.hero__glow), overused-font (Space Grotesk), gpt-thin-border-wide-shadow (.badge-stat). Majoritariamente falsos positivos: tiny-text (títulos de rodapé 11,5px; topbar mobile 11,5px é real), cramped-padding (.stats/.stat), clipped-overflow-container (body/hero). Navegador: ~71 ai-color-palette (roxo neon sobre escuro), muitos duplicados em SVG por cor herdada, mas o padrão é real.

## Pontos fortes

1. Provas reais e específicas: fotos de turmas e posts com escolas nomeadas, subaproveitados.
2. Texto do hero diz o diferencial com clareza ("Você só paga depois de aprovar").
3. Engenharia para manutenção leiga: FAQ nativo, skip link, funciona sem JS, config num arquivo, contraste AA no escuro.

## Problemas prioritários

- [P0] Números desatualizados em destaque: "9 anos personalizando formaturas" (index.html:102), "+9 anos"/"+10 mil" (:137-138), "+400 mil" não confirmado 2x (:129, :139). Correção: "desde 2018", "+6 mil clientes", remover +400 mil, consolidar selo e faixa. Comando: /impeccable clarify
- [P1] Placeholders no momento da decisão e canais de outra marca: [PRAZO DE PRODUÇÃO]/[FORMAS DE PAGAMENTO] no FAQ (:418, :422), [PRAZO DE RESPOSTA] no fim (:447), [CONFIRMAR NÚMERO]/[@INSTAGRAM] sem JS, seção Instagram leva a @canecasulcanecas, post-5 corporativo. Correção: esconder frase quando campo vazio, número estático no HTML, ocultar Instagram até perfil próprio, remover post-5. Comando: /impeccable harden
- [P1] Estrutura de template esconde a história do produto. Correção: seção-assinatura com a mesma arte em caneca/camiseta/moletom/tirante; grafite e escorrido estruturais; variar layouts; nova fonte de títulos e paleta. Comando: reformulação (novo visual) ou /impeccable shape
- [P2] Garantias pesadas (1.699px no mobile) e final sem botão principal. Correção: promessa curta + frase simples, sem 01–04; botão "Faça seu orçamento" no fim com "NF · 50% só com o pedido pronto · CNPJ". Comando: /impeccable distill
- [P2] Mobile: topbar 90px + header = 163px antes do conteúdo; tema, ícone WhatsApp e botão flutuante competem; flutuante cobre a nota do hero; ~15 telas; links de rodapé 19px. Comando: /impeccable adapt

## Personas

- Jordan: sem preço nem prazo (FAQ responde com colchete); duas numerações parecem uma; card Tirantes com a caneca em destaque.
- Riley: sem JS mostra [CONFIRMAR NÚMERO]; og:image relativo (index.html:14) → prévia sem imagem no WhatsApp; possível piscada de tema (head só aplica tema salvo); 1024px cai no hambúrguer.
- Casey: 163px de cromo; toggle de tema na zona do polegar; bolinhas do carrossel 7px; ~2.850px de garantias+passos. Positivo: CTA do hero largura total acima da dobra.
- Pai/professor: sem pagamento nem prazo para repassar; CNPJ longe das garantias; Instagram com outra marca e outros números.

## Observações menores

- moletom.jpg repetido (hero e galeria); caneca.jpg repetido (produtos e galeria).
- Passo 1 é enchimento.
- "contribuindo para o desenvolvimento do país" quebra a voz.
- Pesos 500/600 da Space Grotesk carregados sem uso.
- Links "Produtos" do rodapé apontam todos para #produtos.

## Perguntas

1. Sem logo e fotos, o que ainda diria "Avanti" e "terceirão"?
2. Por que a página nunca mostra uma arte real ao lado do produto?
3. Uma linha honesta de números convence mais que uma faixa grande?
4. E se o grafite fosse a estrutura da página?
