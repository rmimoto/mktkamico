# Manual de Operação Avora: Do Caos ao Sistema

> Criado a partir da operação real da Avora AI.
> Incluso no Claude Academy sem custo adicional.

---

## Por que a maioria não consegue resultado com IA

A maioria usa o Claude como um buscador melhorado: faz uma pergunta, lê a resposta, fecha a janela e esquece. Cada sessão começa do zero. Cada tarefa exige o mesmo esforço. Nenhum progresso acumula.

O problema não é o Claude. É a ausência de sistema.

Quem obtém resultado consistente com IA não é quem tem os melhores prompts — é quem construiu uma operação. Uma operação tem contexto permanente, rotinas que se repetem e progresso que acumula. O framework abaixo organiza isso em três pilares.

---

## O Framework: 3 Pilares

### Pilar 1 — Contexto

**O problema:** o Claude não te conhece. Sem contexto, ele escreve copy genérico, sugere estratégias desalinhadas e precisa ser corrigido toda vez.

**A solução:** um arquivo `CLAUDE.md` na raiz de cada projeto. O Claude lê esse arquivo automaticamente no início de cada sessão.

**Template de CLAUDE.md:**

```
# [Nome do negócio/projeto]

## Sobre o negócio
[2–3 frases descrevendo o que você faz e para quem]

## Público-alvo
[Perfil detalhado: quem é, o que quer, o que teme]

## Tom de voz
- [Diretriz 1]
- [Diretriz 2]
- [Diretriz 3]

## Ferramentas do dia a dia
- [Ferramenta 1] — [para que usa]
- [Ferramenta 2] — [para que usa]

## Tarefas frequentes
- [Tarefa 1]
- [Tarefa 2]

## Instruções de comportamento
- Responda sempre em português do Brasil
- Seja direto. Evite introduções genéricas
- Não repita o que foi dito. Vá direto ao ponto
- [O que evitar]
```

**Regra:** um CLAUDE.md por projeto. Quando mudar de contexto, crie um novo arquivo.

---

### Pilar 2 — Rotinas

**O problema:** tarefas repetitivas consomem energia desproporcionalmente. Escrever o prompt do zero toda vez significa nunca melhorar o resultado.

**A solução:** transformar tarefas frequentes em rotinas — prompts prontos que você dispara com contexto mínimo.

**Como criar uma rotina:**
1. Identifique uma tarefa que você pede ao Claude pelo menos 3 vezes por semana
2. Escreva o prompt ideal para ela
3. Salve em um arquivo `rotinas.md`
4. Na próxima vez, copie, cole e substitua só o que muda

**Biblioteca de rotinas:**

```
## Revisão de copy

"Revise esse texto com base no tom do CLAUDE.md. Aponte 3 melhorias
específicas com justificativa. Não reescreva — só sugira.

[TEXTO AQUI]"

---

## Estruturação de projeto

"Com base nessa ideia, monte uma estrutura com: objetivo, público,
entregas principais e próximos 3 passos. Seja direto.

[IDEIA AQUI]"

---

## Resposta a email difícil

"Preciso responder esse email mantendo o relacionamento mas sendo
claro sobre [ponto principal]. Use o tom do CLAUDE.md.

[EMAIL AQUI]"

---

## Análise de texto do concorrente

"Analise esse texto. O que está funcionando? O que está faltando?
Como eu poderia abordar o mesmo tema com o meu diferencial?

[TEXTO AQUI]"
```

**Regra:** se você pediu a mesma coisa 3 vezes, vira rotina. Se vira rotina, vira sistema.

---

### Pilar 3 — Acúmulo

**O problema:** decisões importantes tomadas em uma sessão somem na próxima.

**A solução:** um arquivo `PROGRESSO.md` dentro de cada projeto.

**Template de PROGRESSO.md:**

```
# Progresso — [Nome do Projeto]

## Sessão [data]

**Decisões tomadas:**
- [Decisão 1]
- [Decisão 2]

**Pendente para próxima sessão:**
- [Item 1]
- [Item 2]

**Contexto importante:**
- [Algo que o Claude precisa saber na próxima vez]
```

**Como usar:**

No início de uma sessão nova:
> "Leia o PROGRESSO.md e me diga onde paramos."

No final:
> "Com base no que fizemos hoje, atualize o PROGRESSO.md."

**Regra:** o acúmulo é o que separa um usuário de IA de um operador de IA. Quem acumula cresce exponencialmente.

---

## Como implementar em 7 dias

**Dia 1 — Contexto**
- Use o /setup para gerar seu CLAUDE.md
- Revise e ajuste o que não ficou exato
- Teste com 3 tarefas do dia

**Dia 2–3 — Rotinas**
- Liste as 5 tarefas que você mais pede ao Claude
- Escreva o prompt ideal para cada uma
- Salve em `rotinas.md`

**Dia 4–5 — Acúmulo**
- Crie um `PROGRESSO.md` no projeto principal
- Ao final do dia, peça ao Claude para registrar o que foi feito
- Faça por 2 dias e veja a diferença

**Dia 6–7 — Refinamento**
- Ajuste o CLAUDE.md com o que descobriu
- Melhore as rotinas que não entregaram exatamente o que queria
- Adicione contexto ao PROGRESSO.md sobre o que funcionou

---

## Checklist de Operação

**Contexto**
- [ ] CLAUDE.md criado com /setup
- [ ] Tom de voz com pelo menos 3 diretrizes específicas
- [ ] Ferramentas do dia a dia listadas
- [ ] Comportamentos a evitar definidos

**Rotinas**
- [ ] rotinas.md criado com pelo menos 3 prompts prontos
- [ ] Rotinas testadas e refinadas
- [ ] Prompts nomeados para fácil busca

**Acúmulo**
- [ ] PROGRESSO.md criado no projeto principal
- [ ] Formato de registro definido
- [ ] Hábito de registrar ao final de cada sessão

---

*Avora AI — Manual de Operação Avora*
*Incluso no Claude Academy sem custo adicional.*