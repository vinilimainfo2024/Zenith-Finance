# Zenith Finance — protótipo

O Zenith simplifica o controle financeiro e de estoque para empresas. O protótipo foi desenvolvido para a empresa fictícia Café Aurora e reúne painel de gestão, movimentações e o Steev, assistente de IA que executa tarefas por comandos simples.

## Telas e recursos

- **Visão geral:** resumo financeiro, movimentações e alertas de estoque.
- **Financeiro:** entradas, saídas, fluxo de caixa, categorias e busca de movimentações.
- **Estoque:** catálogo demonstrativo, filtro de reposição e busca de produtos.
- **Relatórios:** desempenho mensal e resumo do Steev.
- **Notas fiscais:** listagem de documentos e preparação ilustrativa de dados fiscais.
- **Steev:** assistente generativo com histórico recente, respostas animadas e leitura em voz alta por uma voz neural masculina brasileira. A síntese roda localmente no navegador com Kokoro; os arquivos do modelo são baixados e armazenados no primeiro uso. As mensagens continuam sendo processadas pelo Ollama local.
- **Aparência:** escolha entre modo claro e escuro em Configurações. A preferência fica salva neste dispositivo.
- **Animações:** entrada suave das telas e cartões, gráficos que se desenham ao abrir e detalhes animados no Steev, com suporte à preferência de movimento reduzido.

Os números, movimentações e produtos do Café Aurora são fictícios. O modelo local não tem pesquisa web conectada, então não deve ser tratado como fonte de informações atuais. O protótipo não se conecta a dispositivos de leitura, não integra à SEFAZ e não emite notas fiscais. Ações que dependem desses serviços são demonstrações.

## Executar

Requer Node.js 18 ou superior e Ollama instalado no Windows. O servidor usa por padrão o modelo `qwen3.5:9b` e uma janela de contexto de 8.192 tokens. Na GPU deste computador (RTX 4070 com 12 GB de VRAM), esse modelo deve caber em memória; a velocidade depende do estado do sistema.

1. Instale o Ollama pelo [site oficial](https://ollama.com/download/windows) e inicie o aplicativo.
2. No PowerShell, baixe o modelo:

   ```powershell
   ollama pull qwen3.5:9b
   ```

   O download ocupa aproximadamente 6,6–7,6 GB.
3. Na pasta do projeto, instale as dependências e inicie o Zenith:

   ```powershell
   npm install
   npm run dev
   ```

   O comando prepara os arquivos locais usados pela voz neural do Steev.

4. Abra http://localhost:3000.

O Ollama serve a API local em `http://127.0.0.1:11434`. Para escolher outro modelo, configure `OLLAMA_MODEL` antes de iniciar o servidor. Para mudar a porta do Zenith, use `PORT`.
