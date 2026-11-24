# Click Ofertas 🦊💬
### Plataforma Profissional de Automação, Radar de Ofertas e Disparo Inteligente para Grupos de WhatsApp

**Click Ofertas** é um sistema completo e de alta performance desenvolvido para afiliados, influenciadores e gestores de comunidades que desejam automatizar o monitoramento, a conversão de links de afiliados e o disparo em massa segmentado para grupos de WhatsApp com máxima segurança anti-ban e integração nativa com a **Evolution API** e **Google AI Studio Firebase Firestore**.

---

## 🚀 Principais Funcionalidades

### 1. Radar de Ofertas Inteligente & Monitoramento
- **Múltiplos Marketplaces**: Monitoramento unificado de ofertas da Amazon Brasil, Shopee, Mercado Livre, Magazine Luiza e AliExpress.
- **Conversão Automática de Links (Affiliate Cloaker)**: Insere automaticamente suas tags de afiliado (`?tag=...`, IDs de subafiliado e rotas de rastreio) em qualquer link colado na plataforma.
- **Filtros Avançados**: Busque por palavras-chave, cupons ativos, percentual mínimo de desconto e categorias (Eletrônicos, Smartphones, Casa, Games, Moda, etc.).

### 2. Disparador WhatsApp via Evolution API
- **Instância Dedicada**: Configuração completa de endpoint, API Key e nome da instância (`Click-Ofertas`).
- **Dois Modos de Escaneamento de QR Code**:
  - **📷 Câmera Nativa do Celular (`wa.me`)**: Formato universal otimizado para o app de Câmera padrão de smartphones (iPhone/Android) com detecção instantânea do link.
  - **💻 WhatsApp Web / Aparelhos Conectados**: Modo otimizado para pareamento ótico multi-dispositivo Baileys com margem de segurança ISO 4.
- **Código de Pareamento de 8 Dígitos**: Alternativa 100% à prova de falhas para pareamento sem câmera via menu *"Conectar com número de telefone"* do WhatsApp.
- **Zoom em Tela Cheia & Download PNG**: Permite ampliar ou baixar o QR Code em alta resolução para evitar reflexos no monitor.
- **Disparo em Lote com Proteção Anti-Ban**: Envio sequencial seguro com delays ajustáveis entre os grupos para preservar o número remetente.

### 3. Fila & Agendamento Automático
- **Agendador de Campanhas**: Programe o envio de ofertas para horários de pico de engajamento.
- **Robô Piloto Automático**: Disparos autônomos periódicos com base em critérios configurados de desconto mínimo e categorias preferidas.

### 4. Gerenciamento de Grupos WhatsApp
- **Controle de Audiência**: Cadastro de grupos com contagem de participantes, categorias de foco e horário permitido para envios.
- **Ativação Individual**: Ative ou desative grupos com um clique.

### 5. Banco de Dados & Sincronização (Firebase Firestore)
- Persistência em nuvem robusta utilizando o Google AI Studio Firebase Firestore, garantindo segurança, escalabilidade e sincronização em tempo real.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend & Servidor**: Node.js, Express, Evolution API Integration.
- **Banco de Dados**: Google AI Studio Firebase Firestore.
- **Ferramentas de Apoio**: QRCode Generator (`qrcode`), Vite.

---

## 📦 Instalação e Execução Local

1. Clone o repositório ou abra o projeto no ambiente de desenvolvimento.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação na porta `3000`.

---

## ⚙️ Configuração da Evolution API

Para habilitar os disparos reais via WhatsApp:
1. No menu superior, vá em **Afiliados & Bot** ou clique em **Grupos WhatsApp**.
2. Clique em **Gerar QR Code WhatsApp**.
3. Insira a **URL do seu servidor Evolution API** (ex: `http://localhost:8080`), a **API Key** e o **Nome da Instância** (`Click-Ofertas`).
4. Conecte sua sessão utilizando o QR Code ou o Código de 8 Dígitos.

---
*Desenvolvido com alta performance para maximizar conversões de afiliados no WhatsApp.*
