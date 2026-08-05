# Especificação: Sistema MKT

## Objetivo
Centralizar em um único sistema todas as demandas do time de marketing — da estratégia à publicação — eliminando etapas manuais de repasse e publicação. O principal ganho é a automação do ciclo: Claude gera estratégia e briefing → time executa → gestor aprova → Claude agenda e publica nas redes sociais, sem intervenção da social media.

## Usuários
- **Coordenadora de MKT**: revisa estratégias e briefings gerados pelo Claude, aprova ou solicita ajustes, distribui solicitações externas.
- **Designer**: recebe briefings via kanban, produz artes, sobe os arquivos no Google Drive e registra o link no card.
- **Gestor**: aprova o conteúdo final antes da publicação ser agendada.
- **Claude (agente IA)**: gera estratégia, análise de mercado, briefings de arte e roteiros via Claude Cowork; preenche cards no kanban; agenda e publica nas redes sociais após aprovação.
- **Colaboradores de outras áreas**: fazem solicitações externas via formulário e acompanham status.

## Requisitos indispensáveis

### 1. Kanban de redes sociais (evolução do existente)
- Cards preenchidos automaticamente com briefing e roteiro gerados pelo Claude Cowork.
- Colunas mínimas: Estratégia → Em produção → Aguardando aprovação → Agendado → Publicado.
- Designer adiciona link do Google Drive com a arte no card.
- Gestor aprova o card dentro do sistema.
- Após aprovação, Claude agenda a publicação na data/hora definida no card.
- Publicação efetiva via API nas redes: Instagram, TikTok, Facebook.

### 2. Kanban de solicitações externas (novo)
- Formulário de entrada para colaboradores de outras áreas pedindo: adesivos, apresentações, convites, lâminas comerciais, cartas, tags.
- Formulário coleta: tipo de material, descrição, solicitante, área, prazo desejado.
- Coordenadora recebe a solicitação e distribui para o responsável.
- Prazo definido pela coordenadora conforme complexidade do pedido.
- Acompanhamento de status visível para o solicitante.

### 3. Dashboard de análise de redes sociais (novo)
- Dados puxados diretamente das APIs do Instagram, TikTok e Facebook (sem ferramenta intermediária).
- Métricas exibidas por conta: seguidores, curtidas, comentários, salvamentos, reposts, compartilhamentos, alcance, visualizações.
- Visão de crescimento e engajamento ao longo do tempo (gráficos comparativos por período).

### 4. Portal de colaboradores (sem alterações)
- Mantém o que já existe: centrais com links e recursos para consulta dos colaboradores.

## Fora de escopo
- Pinterest e Threads (previstos para fase posterior).
- Armazenamento próprio de arquivos — arquivos continuam no Google Drive.
- Publicação manual pelo sistema (o fluxo é sempre aprovação → agendamento automático via Claude).
- CRM ou gestão de clientes externos.

## Restrições
- Stack atual: Firebase (Auth + Firestore) + HTML/JS (`pipeline-mkt.html`). A evolução deve manter essa base.
- Arquivos de arte armazenados no Google Drive; o sistema registra apenas o link.
- Integração Claude Cowork → kanban: mecanismo técnico ainda a definir (não há webhook ou API documentada disponível no momento da especificação).
- APIs de publicação social requerem contas de desenvolvedor aprovadas (Meta, TikTok for Business).

## Casos extremos
- **Claude Cowork não gera o briefing automaticamente**: card criado sem briefing; coordenadora preenche manualmente.
- **Designer não sobe link no Drive**: card não pode avançar para "Aguardando aprovação" sem o campo de link preenchido.
- **Gestor rejeita após aprovação parcial**: card volta para "Em produção" com comentário de ajuste visível no histórico.
- **API de publicação falha no horário agendado**: sistema notifica a coordenadora e tenta novamente após intervalo (retry); se falhar 3 vezes, marca como "Falha na publicação" e exige intervenção manual.
- **Solicitação externa sem prazo viável**: coordenadora pode recusar ou renegociar o prazo diretamente no sistema antes de aceitar.
- **Token de API da rede social expirado**: sistema alerta o administrador antes de tentar publicar.
- **Volume alto de solicitações externas simultâneas**: kanban externo sem limite de cards, mas coordenadora define prioridade manualmente.

## Definição de concluído

- [ ] Um card criado pelo Claude Cowork aparece no kanban de redes sociais com briefing e roteiro preenchidos, sem ação manual da coordenadora além da revisão.
- [ ] Um post aprovado pelo gestor é publicado no Instagram, TikTok e Facebook na data e hora definidas no card, sem que ninguém da equipe precise acessar as plataformas.
- [ ] Um colaborador externo preenche o formulário, a coordenadora vê a solicitação no kanban externo e altera o status — o solicitante consegue ver a atualização.
- [ ] O dashboard exibe, para pelo menos uma conta conectada, seguidores, curtidas, alcance e visualizações dos últimos 30 dias com dados vindos diretamente da API (verificável comparando com os dados nativos da rede).
- [ ] O portal de colaboradores continua funcionando exatamente como antes.

## Perguntas em aberto
- **Integração Claude Cowork → kanban**: qual mecanismo técnico será usado para o Claude preencher cards automaticamente? (webhook, polling, chamada manual via botão na interface?)
- **Aprovação de API Meta e TikTok for Business**: as contas já têm acesso de desenvolvedor aprovado, ou isso precisa ser solicitado antes do desenvolvimento?
- **Quem configura a data/hora de publicação no card**: é o Claude que sugere com base na estratégia, ou a coordenadora define manualmente?
