---
title: Guia de Uso do Vault
folder: /
type: reference
tags: [#reference]
related: ["[[HOME]]", "[[MOC — Marketing Intelligence]]"]
source: setup
created: 2026-05-18
updated: 2026-05-18
status: evergreen
insight_level: operational
---

## Comandos disponíveis

| Comando | O que faz |
|---------|-----------|
| `!inbox` | Processa todos os arquivos em `00 Inbox/` |
| `!audit [pasta]` | Lista notas por status, identifica órfãos |
| `!connect [nota]` | Encontra e adiciona links faltantes |
| `!moc [tema]` | Cria ou atualiza MOC para o tema |
| `!promote [nota]` | Eleva status com justificativa obrigatória |
| `!archive [nota]` | Move para `09 Archive` com deprecação |
| `!orphans` | Lista notas sem links de entrada ou saída |
| `!contradictions` | Lista notas marcadas com #contradicts |
| `!health` | Relatório geral do vault |

## Como adicionar conteúdo

**Via Inbox:** Jogue qualquer arquivo em `00 Inbox/` e execute `!inbox`

**Via input direto:** Envie o conteúdo com `--input [texto|caminho|url]`

**Via inbox automático:** Execute `--inbox` para processar tudo pendente

## Taxonomia de tags

**Domínio:** `#concept` `#framework` `#brand` `#research` `#strategy` `#content` `#writing` `#ai`

**Tipo:** `#case-study` `#template` `#reference` `#insight` `#analysis` `#model`

**Marketing:** `#positioning` `#campaign` `#audience` `#channel` `#performance` `#brand-identity` `#copywriting` `#content-strategy` `#market-intelligence` `#growth`

**Status:** `#review` `#high-value` `#needs-connection` `#contradicts`

## Padrão de qualidade por status

| Status | Palavras | Critério |
|--------|----------|----------|
| `seedling` | 50–150 | Ideia capturada |
| `growing` | 150–400 | Estrutura clara, algumas conexões |
| `evergreen` | 300–600 | Completa, bem linkada, citável |
