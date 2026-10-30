const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

const pages = {
  'Financeiro': `
    <section class="welcome-row screen-welcome"><div><div class="eyebrow">CAIXA E RESULTADOS</div><h1>Financeiro <span class="wave">✦</span></h1><p>Veja de onde vem e para onde vai o dinheiro do Café Aurora.</p></div><div class="welcome-actions"><button class="button button-outline" data-action="Período atualizado para este mês.">◷ Este mês　⌄</button><button class="button button-primary" data-action="Movimentação demonstrativa pronta para cadastro.">＋ Nova movimentação</button></div></section>
    <section class="metrics-grid"><article class="metric-card"><div class="metric-heading">Entradas do mês <span class="metric-icon mint">↗</span></div><div class="metric-number">R$ 48.290<span>,00</span></div><div class="metric-foot"><span class="trend positive">↗ 12,8%</span><span>vs. mês anterior</span></div></article><article class="metric-card"><div class="metric-heading">Saídas do mês <span class="metric-icon peach">↘</span></div><div class="metric-number">R$ 31.740<span>,00</span></div><div class="metric-foot"><span class="trend positive">↘ 4,2%</span><span>vs. mês anterior</span></div></article><article class="metric-card"><div class="metric-heading">Saldo disponível <span class="metric-icon blue">◉</span></div><div class="metric-number">R$ 22.480<span>,00</span></div><div class="metric-foot"><span>Atualizado há poucos minutos</span></div></article><article class="metric-card"><div class="metric-heading">Contas a pagar <span class="metric-icon lilac">◷</span></div><div class="metric-number">R$ 3.860<span>,00</span></div><div class="metric-foot"><span class="stock-attention">3 contas</span><span>nos próximos 7 dias</span></div></article></section>
    <section class="secondary-columns"><article class="panel"><div class="panel-header"><div><h2>Entradas e saídas</h2><p>Fluxo de caixa dos últimos 6 meses</p></div><button class="select-button" data-action="Período do gráfico alterado.">Últimos 6 meses　⌄</button></div><div class="finance-bars">${[['Mai',61,43],['Jun',73,48],['Jul',66,51],['Ago',81,57],['Set',77,54],['Out',92,66]].map(([m,a,b])=>`<div><span><i style="height:${a}%"></i><i style="height:${b}%"></i></span><small>${m}</small></div>`).join('')}</div><div class="chart-legend"><span><i class="legend-dot revenue"></i>Entradas</span><span><i class="legend-dot expense"></i>Saídas</span></div></article><article class="panel"><div class="panel-header"><div><h2>Despesas por categoria</h2><p>Distribuição no mês</p></div></div><div class="category-breakdown"><div><span><i style="background:#f39200"></i>Compras e estoque</span><b>R$ 14.280</b><div class="break-track"><i style="width:72%;background:#f39200"></i></div></div><div><span><i style="background:#244b78"></i>Equipe</span><b>R$ 9.800</b><div class="break-track"><i style="width:51%;background:#244b78"></i></div></div><div><span><i style="background:#8a73cb"></i>Contas fixas</span><b>R$ 4.210</b><div class="break-track"><i style="width:28%;background:#8a73cb"></i></div></div><div><span><i style="background:#52aa89"></i>Outros</span><b>R$ 3.450</b><div class="break-track"><i style="width:20%;background:#52aa89"></i></div></div></div></article></section>
    <section class="panel page-table-panel"><div class="panel-header"><div><h2>Movimentações</h2><p>Entradas e saídas registradas no sistema</p></div><div class="table-tools"><input class="table-search" data-search placeholder="⌕  Buscar movimentação..."/><button class="select-button" data-action="Filtro de movimentações aplicado.">Todos　⌄</button></div></div>${transactionTable()}</section>`,
  'Estoque': `
    <section class="welcome-row screen-welcome"><div><div class="eyebrow">PRODUTOS E REPOSIÇÃO</div><h1>Estoque <span class="wave">✦</span></h1><p>Acompanhe quantidades, entradas e itens que precisam de reposição.</p></div><div class="welcome-actions"><button class="button button-outline" data-action="Leitor de código de barras pronto para conectar um dispositivo.">▥ Leitor de código</button><button class="button button-primary" data-action="Cadastro demonstrativo de produto iniciado.">＋ Adicionar produto</button></div></section>
    <section class="metrics-grid"><article class="metric-card"><div class="metric-heading">Produtos cadastrados</div><div class="metric-number">128 <small>itens</small></div><div class="metric-foot">em 8 categorias</div></article><article class="metric-card"><div class="metric-heading">Unidades em estoque</div><div class="metric-number">1.284 <small>un.</small></div><div class="metric-foot"><span class="trend positive">↗ 3,4%</span><span>esta semana</span></div></article><article class="metric-card"><div class="metric-heading">Estoque baixo</div><div class="metric-number">6 <small>itens</small></div><div class="metric-foot"><span class="stock-attention">● Reposição recomendada</span></div></article><article class="metric-card"><div class="metric-heading">Valor em produtos</div><div class="metric-number">R$ 18.420<span>,00</span></div><div class="metric-foot">custo estimado</div></article></section>
    <section class="panel inventory-panel"><div class="panel-header inventory-toolbar"><div><h2>Produtos</h2><p>Estoque atual e quantidade mínima de cada item</p></div><div class="table-tools"><input class="table-search" data-search placeholder="⌕  Buscar produto..."/><button class="select-button filter-button active" data-filter="Todos">Todos</button><button class="select-button filter-button" data-filter="Baixo">Estoque baixo</button></div></div><div class="table-scroll"><table class="inventory-table"><thead><tr><th>PRODUTO</th><th>CATEGORIA</th><th>SKU</th><th>EM ESTOQUE</th><th>MÍNIMO</th><th>STATUS</th><th></th></tr></thead><tbody>
      ${[['Grãos especiais','Café','00128','4','20','Baixo','☕'],['Leite integral 1L','Bebidas','00462','8','24','Baixo','🥛'],['Copo descartável 200ml','Embalagens','00803','12','30','Baixo','▤'],['Cappuccino da Casa','Bebidas','00041','86','30','Disponível','☕'],['Chocolate em pó 500g','Insumos','00092','17','12','Disponível','▧'],['Xarope de baunilha','Insumos','00102','23','10','Disponível','◉'],['Guardanapo kraft','Embalagens','00314','16','35','Baixo','▤'],['Açúcar mascavo','Insumos','00361','42','15','Disponível','◈']].map(([name,cat,sku,qty,min,status,emoji])=>`<tr data-stock="${status==='Baixo'?'Baixo':'Ok'}"><td><span class="product-cell"><i>${emoji}</i><b>${name}</b></span></td><td>${cat}</td><td>${sku}</td><td class="${status==='Baixo'?'stock-attention':''}">${qty} un.</td><td>${min} un.</td><td><span class="status ${status==='Baixo'?'pending':'paid'}">● ${status==='Baixo'?'Repor':'Disponível'}</span></td><td><button class="row-more" data-action="Detalhes de ${name}.">···</button></td></tr>`).join('')}
    </tbody></table></div></section>`,
  'Relatórios': `
    <section class="welcome-row screen-welcome"><div><div class="eyebrow">ANÁLISES DO NEGÓCIO</div><h1>Relatórios <span class="wave">✦</span></h1><p>Transforme os registros da empresa em decisões mais claras.</p></div><div class="welcome-actions"><button class="button button-outline" data-action="Período do relatório alterado.">Outubro de 2026　⌄</button><button class="button button-primary" data-action="Relatório demonstrativo preparado para exportação.">↓ Exportar relatório</button></div></section>
    <section class="metrics-grid"><article class="metric-card"><div class="metric-heading">Faturamento no período</div><div class="metric-number">R$ 48.290<span>,00</span></div><div class="metric-foot"><span class="trend positive">↗ 12,8%</span><span>sobre setembro</span></div></article><article class="metric-card"><div class="metric-heading">Lucro líquido estimado</div><div class="metric-number">R$ 16.550<span>,00</span></div><div class="metric-foot"><span class="trend positive">↗ 18,6%</span><span>sobre setembro</span></div></article><article class="metric-card"><div class="metric-heading">Margem líquida</div><div class="metric-number">34,3<small>%</small></div><div class="metric-foot">sobre as vendas</div></article><article class="metric-card"><div class="metric-heading">Ticket médio</div><div class="metric-number">R$ 42<span>,70</span></div><div class="metric-foot">1.131 vendas no mês</div></article></section>
    <section class="secondary-columns report-columns"><article class="panel report-chart"><div class="panel-header"><div><h2>Desempenho mensal</h2><p>Receita, despesas e lucro líquido</p></div><span class="report-tag">Últimos 6 meses</span></div><div class="report-bars">${[['Mai',52,49,18],['Jun',63,55,25],['Jul',59,51,24],['Ago',72,60,31],['Set',70,57,32],['Out',89,66,43]].map(([m,a,b,c])=>`<div class="report-month"><div class="report-columns"><i class="rb-revenue" style="height:${a}%"></i><i class="rb-expense" style="height:${b}%"></i><i class="rb-profit" style="height:${c}%"></i></div><small>${m}</small></div>`).join('')}</div><div class="chart-legend"><span><i class="legend-dot revenue"></i>Receita</span><span><i class="legend-dot expense"></i>Despesas</span><span><i class="legend-dot profit-dot"></i>Lucro</span></div></article><article class="panel"><div class="panel-header"><div><h2>Resumo do Steev</h2><p>Leitura rápida do período</p></div><span class="steev-mini"><span>✳</span></span></div><div class="report-summary"><div><i class="summary-check">↗</i><span><b>Receita em alta</b><small>O faturamento cresceu 12,8% comparado a setembro.</small></span></div><div><i class="summary-check">✓</i><span><b>Custos sob controle</b><small>As despesas caíram 4,2% no período.</small></span></div><div><i class="summary-warn">!</i><span><b>Estoque pede atenção</b><small>6 produtos estão abaixo do nível mínimo.</small></span></div></div><button class="text-link report-assistant" data-chat-focus>Perguntar ao Steev sobre os resultados →</button></article></section>
    <section class="panel page-table-panel"><div class="panel-header"><div><h2>Relatórios disponíveis</h2><p>Escolha um resumo para consultar ou exportar</p></div></div><div class="report-list">${[['Resumo financeiro','Entradas, despesas e lucro do período','▥'],['Desempenho de produtos','Vendas e giro de estoque','▤'],['Movimentações fiscais','Documentos fiscais registrados','▧']].map(([t,d,i])=>`<div><i>${i}</i><span><b>${t}</b><small>${d}</small></span><button data-action="Relatório ${t.toLowerCase()} preparado para exportação.">Ver relatório　→</button></div>`).join('')}</div></section>`,
  'Notas fiscais': `
    <section class="welcome-row screen-welcome"><div><div class="eyebrow">DOCUMENTOS FISCAIS</div><h1>Notas fiscais <span class="wave">✦</span></h1><p>Organize documentos e prepare informações fiscais com apoio do Steev.</p></div><div class="welcome-actions"><button class="button button-outline" data-action="Importação de XML demonstrativa iniciada.">↑ Importar XML</button><button class="button button-primary" data-action="Assistente fiscal aberto. Revise os dados antes de emitir em um sistema autorizado.">＋ Preparar nota fiscal</button></div></section>
    <div class="fiscal-notice"><span>✦</span><div><b>O Steev pode ajudar na preparação</b><p>Confira os dados com seu contador e emita o documento em um sistema fiscal autorizado. Este protótipo não transmite documentos à SEFAZ.</p></div><button data-chat-focus>Conversar com Steev →</button></div>
    <section class="metrics-grid"><article class="metric-card"><div class="metric-heading">Documentos no mês</div><div class="metric-number">86 <small>NF-e</small></div><div class="metric-foot">78 emitidas · 8 recebidas</div></article><article class="metric-card"><div class="metric-heading">Total de vendas documentadas</div><div class="metric-number">R$ 42.180<span>,00</span></div><div class="metric-foot">no período atual</div></article><article class="metric-card"><div class="metric-heading">Rascunhos para revisar</div><div class="metric-number">2 <small>notas</small></div><div class="metric-foot"><span class="stock-attention">● Aguardando conferência</span></div></article><article class="metric-card"><div class="metric-heading">Documentos recebidos</div><div class="metric-number">14 <small>XML</small></div><div class="metric-foot">8 já conciliados</div></article></section>
    <section class="panel page-table-panel"><div class="panel-header"><div><h2>Documentos recentes</h2><p>Notas fiscais do Café Aurora</p></div><div class="table-tools"><input class="table-search" data-search placeholder="⌕  Buscar documento..."/><button class="select-button" data-action="Filtro de documentos aplicado.">Todos os status　⌄</button></div></div><div class="table-scroll"><table><thead><tr><th>DOCUMENTO</th><th>TIPO</th><th>EMITENTE / DESTINATÁRIO</th><th>DATA</th><th>VALOR</th><th>STATUS</th><th></th></tr></thead><tbody>${[['NF-e · 004821','Entrada','Fornecedor Café Brasil','28 out, 09:18','R$ 1.250,00','Importada'],['NFC-e · 002841','Saída','Consumidor final','28 out, 10:42','R$ 284,50','Autorizada'],['NF-e · 004817','Entrada','Laticínios Aurora','27 out, 14:08','R$ 892,00','Conferida'],['Rascunho · 000043','Saída','Empresa Exemplo Ltda.','27 out, 11:30','R$ 640,00','Rascunho'],['NF-e · 004809','Entrada','Embalagens do Sul','26 out, 16:12','R$ 520,00','Importada']].map(([doc,type,who,date,val,status])=>`<tr><td><b>${doc}</b></td><td>${type}</td><td>${who}</td><td>${date}</td><td>${val}</td><td><span class="status ${status==='Rascunho'?'pending':'paid'}">● ${status}</span></td><td><button class="row-more" data-action="Visualização demonstrativa de ${doc}.">···</button></td></tr>`).join('')}</tbody></table></div></section>`
};
pages['Configurações'] = `
  <section class="welcome-row screen-welcome"><div><div class="eyebrow">PREFERÊNCIAS DO WORKSPACE</div><h1>Configurações <span class="wave">✦</span></h1><p>Personalize a aparência do Zenith Finance para o seu ambiente.</p></div></section>
  <section class="panel settings-panel"><div class="settings-heading"><span class="settings-icon">◐</span><div><h2>Aparência</h2><p>Escolha como o Zenith Finance aparece neste dispositivo.</p></div></div><div class="theme-choices" role="group" aria-label="Tema do sistema"><button class="theme-choice" type="button" data-theme-choice="light" aria-pressed="false"><span class="theme-preview theme-preview-light"><i></i><i></i><i></i></span><span><b>Modo claro</b><small>Fundo claro e visual leve</small></span><i class="theme-check">✓</i></button><button class="theme-choice" type="button" data-theme-choice="dark" aria-pressed="false"><span class="theme-preview theme-preview-dark"><i></i><i></i><i></i></span><span><b>Modo escuro</b><small>Confortável em ambientes com pouca luz</small></span><i class="theme-check">✓</i></button></div><p class="settings-note">A preferência é salva neste dispositivo e aplicada nas próximas visitas.</p></section>`;

const initialTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
function applyTheme(theme) {
  const normalized = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = normalized;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', normalized === 'dark' ? '#0d1928' : '#122641');
  try { localStorage.setItem('zenith-theme', normalized); } catch { /* armazenamento local indisponível */ }
  document.querySelectorAll('[data-theme-choice]').forEach((button) => {
    const selected = button.dataset.themeChoice === normalized;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
applyTheme(initialTheme);

function transactionTable() {
  return `<div class="table-scroll"><table><thead><tr><th>DESCRIÇÃO</th><th>CATEGORIA</th><th>DATA</th><th>VALOR</th><th>STATUS</th></tr></thead><tbody>${[['Venda balcão','Vendas','Hoje, 10:42','+ R$ 284,50','Concluído'],['Fornecedor Café Brasil','Estoque','Hoje, 09:18','− R$ 1.250,00','Pago'],['Venda delivery','Vendas','Ontem, 18:36','+ R$ 96,00','Concluído'],['Conta de energia','Contas','Ontem, 15:20','− R$ 438,70','Pendente'],['Venda balcão','Vendas','Ontem, 13:02','+ R$ 412,00','Concluído'],['Internet empresarial','Contas','27 out, 09:50','− R$ 129,90','Pago']].map(([desc,cat,date,val,status])=>`<tr><td><b>${desc}</b></td><td>${cat}</td><td>${date}</td><td class="${val.startsWith('+')?'amount-in':'amount-out'}">${val}</td><td><span class="status ${status==='Pendente'?'pending':'paid'}">● ${status}</span></td></tr>`).join('')}</tbody></table></div>`;
}

const overview = document.querySelector('#overview-content');
const secondary = document.querySelector('#secondary-content');
const pageSubtitle = document.querySelector('.welcome-row > div > p');
function setPage(page) {
  document.querySelectorAll('.nav-item[data-page]').forEach((nav) => nav.classList.toggle('active', nav.dataset.page === page));
  document.querySelector('#breadcrumb-current').textContent = page;
  if (page === 'Visão geral') {
    overview.hidden = false;
    secondary.hidden = true;
    document.querySelector('#page-title').innerHTML = 'Bom dia, Marina <span class="wave">✦</span>';
    return;
  }
  const content = pages[page] || `<section class="welcome-row screen-welcome"><div><div class="eyebrow">PREFERÊNCIAS DO WORKSPACE</div><h1>${page} <span class="wave">✦</span></h1><p>Gerencie as preferências do espaço de trabalho Café Aurora.</p></div></section><section class="panel page-table-panel"><h2>Configurações da empresa</h2><p>Empresa, equipe e preferências do sistema.</p><button class="button button-outline" data-action="Preferências demonstrativas da empresa.">Editar configurações</button></section>`;
  secondary.innerHTML = content;
  applyTheme(document.documentElement.dataset.theme);
  overview.hidden = true;
  secondary.hidden = false;
  const heading = secondary.querySelector('h1');
  document.querySelector('#page-title').innerHTML = heading ? heading.innerHTML : `${page} <span class="wave">✦</span>`;
  secondary.scrollIntoView({ block: 'start' });
}

document.addEventListener('click', (event) => {
  const themeChoice = event.target.closest('[data-theme-choice]');
  if (themeChoice) {
    applyTheme(themeChoice.dataset.themeChoice);
    showToast(themeChoice.dataset.themeChoice === 'dark' ? 'Modo escuro ativado.' : 'Modo claro ativado.');
  }
  const pageButton = event.target.closest('[data-page]');
  if (pageButton) setPage(pageButton.dataset.page);
  const action = event.target.closest('[data-action]');
  if (action) showToast(action.dataset.action);
  if (event.target.closest('[data-chat-focus]')) openSteev();
  const prompt = event.target.closest('[data-prompt]');
  if (prompt) { if (voiceEnabled) window.SteevVoice?.unlockPlayback(); askSteev(prompt.dataset.prompt); }
  const filter = event.target.closest('[data-filter]');
  if (filter) {
    document.querySelectorAll('[data-filter]').forEach((button) => button.classList.toggle('active', button === filter));
    document.querySelectorAll('[data-stock]').forEach((row) => { row.hidden = filter.dataset.filter === 'Baixo' && row.dataset.stock !== 'Baixo'; });
  }
  if (event.target.closest('[data-close-tray]')) closeSteev();
  if (event.target.closest('#steev-launcher')) openSteev();
});

document.addEventListener('input', (event) => {
  if (!event.target.matches('[data-search]')) return;
  const query = event.target.value.trim().toLocaleLowerCase('pt-BR');
  event.target.closest('.panel').querySelectorAll('tbody tr').forEach((row) => { row.hidden = !row.textContent.toLocaleLowerCase('pt-BR').includes(query); });
});

document.querySelector('#period-button').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.querySelector('span').textContent = button.querySelector('span').textContent === 'Este mês' ? 'Últimos 30 dias' : 'Este mês';
  showToast(`Período atualizado: ${button.querySelector('span').textContent}.`);
});
document.querySelector('#chart-period').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.firstChild.textContent = button.firstChild.textContent.trim() === 'Últimos 6 meses' ? 'Últimos 12 meses ' : 'Últimos 6 meses ';
  showToast(`Gráfico ajustado para ${button.firstChild.textContent.trim().toLowerCase()}.`);
});
document.querySelector('#add-entry').addEventListener('click', () => showToast('Nova movimentação: formulário demonstrativo em preparação.'));

const tray = document.querySelector('#steev-tray');
const launcher = document.querySelector('#steev-launcher');
function openSteev() {
  tray.hidden = false;
  tray.setAttribute('aria-hidden', 'false');
  launcher.classList.add('is-open');
  document.querySelector('#chat-input').focus({ preventScroll: true });
}
function closeSteev() {
  tray.hidden = true;
  tray.setAttribute('aria-hidden', 'true');
  launcher.classList.remove('is-open');
}
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !tray.hidden) closeSteev(); });

let voiceEnabled = true;
let typingTimer;
let activeUtterance;
let speechRequestId = 0;
let isReplying = false;
const chatHistory = [];
const voiceStatus = document.createElement('span');
voiceStatus.id = 'voice-status';
voiceStatus.className = 'voice-status';
voiceStatus.textContent = 'Voz IA local · prepara no primeiro uso';
const footnote = document.querySelector('.tray-footnote');
const oldVoiceHint = [...footnote.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.includes('As respostas serão lidas em voz alta.'));
oldVoiceHint?.replaceWith(' ', voiceStatus, ' ');

async function refreshSteevStatus() {
  const status = document.querySelector('#steev-status');
  const privacy = document.querySelector('#privacy-note');
  try {
    const response = await fetch('/api/status');
    const data = await response.json();
    status.dataset.ready = String(data.available && data.modelReady);
    const message = !data.available ? 'Abra o Ollama para iniciar' : data.modelReady ? `Ollama local · ${data.model}` : `Baixe ${data.model}`;
    const indicator = status.querySelector('i');
    status.textContent = message;
    if (indicator) status.prepend(indicator);
    privacy.textContent = data.available ? 'Conversa processada localmente' : 'Aguardando conexão local';
  } catch {
    status.dataset.ready = 'false';
    const indicator = status.querySelector('i');
    status.textContent = 'Servidor indisponível';
    if (indicator) status.prepend(indicator);
    privacy.textContent = 'Sem conexão com o servidor';
  }
}
refreshSteevStatus();
setInterval(refreshSteevStatus, 15_000);
function setSpeaking(speaking) { document.querySelector('.tray-persona')?.classList.toggle('speaking', speaking); }
function stopSpeaking() {
  speechRequestId += 1;
  window.SteevVoice?.stop();
  window.speechSynthesis?.cancel();
  clearInterval(typingTimer);
  setSpeaking(false);
  const voiceStatus = document.querySelector('#voice-status');
  if (voiceStatus) voiceStatus.textContent = 'Leitura pausada';
  document.querySelector('#stop-speaking').hidden = true;
}
function cleanSpeechText(text) {
  return text
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[\w-]*\s*/g, '').replace(/```/g, ''))
    .replace(/\[([^\]]+)\]\((?:https?:\/\/)?[^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/^\s{0,3}#{1,6}\s*/gm, '')
    .replace(/^\s*>+\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\|/g, ', ')
    .replace(/\*{1,3}|_{1,3}|~{2}/g, '')
    .replace(/R\$\s*([\d.,]+)/gi, '$1 reais')
    .replace(/\$\s*([\d.,]+)/g, '$1 dólares')
    .replace(/%/g, ' por cento')
    .replace(/["“”'‘’`#@&*_$()[\]{}<>]/g, ' ')
    .replace(/!{2,}/g, '.')
    .replace(/\s+([,.;:?!])/g, '$1')
    .replace(/([,.;:?!])(?:\s*[,.;:?!])+/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{2,}/g, '. ')
    .trim();
}
function choosePortugueseVoice(voices) {
  const portuguese = voices.filter((voice) => voice.lang.toLowerCase().startsWith('pt-br'));
  const candidates = portuguese.length ? portuguese : voices.filter((voice) => voice.lang.toLowerCase().startsWith('pt'));
  const masculine = candidates.filter((voice) => /\b(?:daniel|ant[oô]nio|male|masculin[oa])\b/i.test(voice.name));
  return masculine.find((voice) => /natural|neural|online/i.test(voice.name))
    || masculine[0]
    || candidates.find((voice) => /natural|neural|online/i.test(voice.name))
    || candidates.find((voice) => /google|microsoft/i.test(voice.name))
    || candidates[0]
    || null;
}
async function speak(text) {
  if (!voiceEnabled) return;
  const spokenText = cleanSpeechText(text);
  if (!spokenText) return;
  const requestId = ++speechRequestId;
  window.speechSynthesis?.cancel();
  const voiceStatus = document.querySelector('#voice-status');
  const stopButton = document.querySelector('#stop-speaking');
  const updateStatus = (message) => {
    if (requestId === speechRequestId && voiceStatus) voiceStatus.textContent = message;
  };
  updateStatus('Preparando voz neural local…');
  stopButton.hidden = false;
  try {
    const usedNeuralVoice = await window.SteevVoice?.speak(spokenText, {
      onStatus: updateStatus,
      onStart: () => { if (requestId === speechRequestId) { setSpeaking(true); stopButton.hidden = false; updateStatus('Steev falando · voz neural masculina'); } },
      onEnd: () => { if (requestId === speechRequestId) { setSpeaking(false); stopButton.hidden = true; updateStatus('Voz neural local · português brasileiro'); } }
    });
    if (requestId !== speechRequestId) return;
    if (usedNeuralVoice) return;
  } catch {
    if (requestId !== speechRequestId) return;
    updateStatus('Usando voz local do sistema');
  }
  if (!('speechSynthesis' in window)) {
    if (requestId === speechRequestId) { setSpeaking(false); stopButton.hidden = true; updateStatus('Áudio indisponível neste navegador'); }
    return;
  }
  let voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, 800);
      window.speechSynthesis.addEventListener('voiceschanged', () => { clearTimeout(timeout); resolve(); }, { once: true });
    });
    if (requestId !== speechRequestId || !voiceEnabled) return;
    voices = window.speechSynthesis.getVoices();
  }
  if (requestId !== speechRequestId || !voiceEnabled) return;
  activeUtterance = new SpeechSynthesisUtterance(spokenText);
  activeUtterance.lang = 'pt-BR';
  activeUtterance.rate = 0.92;
  activeUtterance.pitch = 0.9;
  activeUtterance.voice = choosePortugueseVoice(voices);
  activeUtterance.onstart = () => { setSpeaking(true); stopButton.hidden = false; updateStatus('Steev falando · voz do sistema'); };
  activeUtterance.onend = () => { setSpeaking(false); stopButton.hidden = true; updateStatus('Voz neural local · português brasileiro'); };
  activeUtterance.onerror = () => { setSpeaking(false); stopButton.hidden = true; updateStatus('Não foi possível reproduzir a voz'); };
  window.speechSynthesis.speak(activeUtterance);
}
document.querySelector('#voice-toggle').addEventListener('click', (event) => {
  voiceEnabled = !voiceEnabled;
  event.currentTarget.classList.toggle('voice-off', !voiceEnabled);
  event.currentTarget.title = voiceEnabled ? 'Leitura em voz alta ativada' : 'Leitura em voz alta desativada';
  event.currentTarget.setAttribute('aria-label', voiceEnabled ? 'Desativar leitura em voz alta' : 'Ativar leitura em voz alta');
  if (!voiceEnabled) stopSpeaking();
  else showToast('Leitura em voz alta ativada.');
});
document.querySelector('#stop-speaking').addEventListener('click', stopSpeaking);

function addMessage(text, role, animate = false, onComplete = null) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  const messages = document.querySelector('#chat-messages');
  messages.appendChild(bubble);
  if (!animate) { bubble.textContent = text; onComplete?.(bubble); }
  else {
    let i = 0;
    clearInterval(typingTimer);
    typingTimer = setInterval(() => {
      bubble.textContent = text.slice(0, i += 3);
      messages.scrollTop = messages.scrollHeight;
      if (i >= text.length) { clearInterval(typingTimer); bubble.textContent = text; onComplete?.(bubble); }
    }, 18);
  }
  bubble.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  return bubble;
}
function appendCitationLinks(bubble, citations = []) {
  const unique = [...new Map(citations.map((item) => [item.url, item])).values()].slice(0, 5);
  if (!unique.length) return;
  const sources = document.createElement('div');
  sources.className = 'citation-links';
  const label = document.createElement('span');
  label.textContent = 'Fontes: ';
  sources.append(label);
  unique.forEach((citation, index) => {
    if (index) sources.append(document.createTextNode(' · '));
    const link = document.createElement('a');
    link.href = citation.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = citation.title;
    sources.append(link);
  });
  bubble.append(sources);
}
async function askSteev(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  if (isReplying) { showToast('O Steev está terminando a resposta. Já pode mandar a próxima pergunta.'); return; }
  isReplying = true;
  openSteev();
  addMessage(cleanQuestion, 'user');
  document.querySelector('#chat-input').value = '';
  chatHistory.push({ role: 'user', content: cleanQuestion });
  const pending = addMessage('Estou pensando...', 'assistant');
  pending.classList.add('thinking-bubble');
  const sendButton = document.querySelector('.tray-send');
  sendButton.disabled = true;
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory.slice(-12) })
    });
    const result = await response.json().catch(() => ({}));
    pending.remove();
    if (!response.ok) {
      addMessage(result.error || 'Não consegui buscar uma resposta agora. Tente novamente.', 'assistant');
      chatHistory.pop();
      return;
    }
    const answer = result.answer;
    chatHistory.push({ role: 'assistant', content: answer });
    if (chatHistory.length > 12) chatHistory.splice(0, chatHistory.length - 12);
    addMessage(answer, 'assistant', true, (bubble) => appendCitationLinks(bubble, result.citations));
    speak(answer);
  } catch {
    pending.remove();
    addMessage('Não consegui conectar ao servidor. Verifique se o Zenith Finance está em execução e tente de novo.', 'assistant');
    chatHistory.pop();
  } finally {
    isReplying = false;
    sendButton.disabled = false;
    document.querySelector('#chat-input').focus({ preventScroll: true });
  }
}
document.querySelector('#chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (voiceEnabled) window.SteevVoice?.unlockPlayback();
  askSteev(document.querySelector('#chat-input').value);
});
