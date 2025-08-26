
# 🏍️ Amigos dos Motoboys

**Sua rede de apoio na estrada**

Uma aplicação web desenvolvida para conectar motoboys e entregadores a pontos de apoio estratégicos, oferecendo serviços essenciais como banho, descanso, alimentação e muito mais.

## 📋 Sobre o Projeto

O "Amigos dos Motoboys" é uma plataforma que visa melhorar a qualidade de vida dos profissionais de entrega, proporcionando:

- 🗺️ **Mapa interativo** com pontos de apoio próximos
- 🚿 **Agendamento de serviços** (banho, massagem, etc.)
- ⭐ **Sistema de pontuação e recompensas**
- 🌤️ **Informações meteorológicas** em tempo real
- 📱 **Interface responsiva** para dispositivos móveis
- 🔔 **Sistema de notificações**
- 📊 **Estatísticas de entregas**
- 📲 **PWA (Progressive Web App)** - Instalável como app nativo

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - [Next.js 15.5.0](https://nextjs.org/) - Framework React
  - [React 19.1.0](https://reactjs.org/) - Biblioteca JavaScript
  - [TypeScript 5](https://www.typescriptlang.org/) - Tipagem estática
  - [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS
  - [Lucide React](https://lucide.dev/) - Ícones

- **Mapas:**
  - [Leaflet 1.9.4](https://leafletjs.com/) - Biblioteca de mapas
  - [React Leaflet 5.0.0](https://react-leaflet.js.org/) - Integração React

- **PWA:**
  - Web App Manifest - Configuração de instalação
  - Service Worker - Funcionalidade offline
  - Meta tags otimizadas para mobile

- **Ferramentas de Desenvolvimento:**
  - [ESLint](https://eslint.org/) - Linter JavaScript/TypeScript
  - [Turbopack](https://turbo.build/pack) - Bundler de alta performance

## 🏗️ Funcionalidades

### 🔐 Autenticação
- Sistema de login e cadastro
- Perfis de usuário personalizados
- Informações do veículo e dados pessoais

### 🗺️ Mapa Interativo
- Visualização de pontos de apoio próximos
- Filtros por tipo de serviço
- Informações detalhadas de cada ponto
- Navegação GPS integrada

### 🏪 Pontos de Apoio
- **Ponto Vila** - Av. Princesa Isabel, 123
- **Ponto Perequê** - Av. Pedro Paula de Moraes, 456
- **Ponto Barra Velha** - Estrada da Barra Velha, 789
- **Ponto Praia Grande Premium** - Av. Força Expedicionária Brasileira, 1254

### 🛠️ Serviços Disponíveis
- 🚿 **Banho** - Chuveiros limpos e aquecidos
- 📶 **Wi-Fi** - Internet gratuita
- 💧 **Água** - Hidratação gratuita
- 🛡️ **Protetor solar** - Proteção UV
- ☂️ **Capa de chuva** - Proteção contra intempéries
- 💆 **Massagem** - Relaxamento muscular
- 🍽️ **Microondas** - Aquecimento de alimentos
- 🔋 **Carregamento** - Recarga de dispositivos
- 🍕 **Lanche** - Alimentação rápida

### 🎯 Sistema de Gamificação
- Pontuação por uso dos serviços
- Níveis de usuário (Bronze, Prata, Ouro)
- Créditos para serviços gratuitos
- Recompensas e benefícios exclusivos

### 📊 Dashboard
- Estatísticas de entregas
- Histórico de agendamentos
- Relatórios de performance
- Acompanhamento de metas

## 📲 PWA - Progressive Web App

A aplicação é configurada como PWA, oferecendo:

### ✨ Recursos PWA
- **Instalação nativa**: Pode ser instalada como app no dispositivo
- **Funcionalidade offline**: Funciona mesmo sem conexão
- **Ícone na tela inicial**: Acesso rápido como app nativo
- **Tela cheia**: Experiência imersiva sem barra do navegador
- **Notificações push**: Alertas importantes mesmo com app fechado

### 📱 Como Instalar

**No Android:**
1. Abra o app no Chrome
2. Toque no menu (3 pontos)
3. Selecione "Adicionar à tela inicial"
4. Confirme a instalação

**No iOS:**
1. Abra o app no Safari
2. Toque no ícone de compartilhamento
3. Selecione "Adicionar à Tela de Início"
4. Confirme a instalação

**No Desktop:**
1. Abra o app no Chrome/Edge
2. Clique no ícone de instalação na barra de endereços
3. Confirme a instalação

### 🔧 Configurações PWA
- **Manifest**: `/public/manifest.json`
- **Service Worker**: `/public/sw.js`
- **Ícones**: Múltiplos tamanhos para diferentes dispositivos
- **Tema**: Cor personalizada (#04042c)

## 📱 Responsividade Mobile

### 🎯 Design Mobile-First
- Interface otimizada para telas pequenas
- Navegação por gestos touch
- Botões e elementos com tamanho adequado para dedos
- Layout adaptativo para diferentes orientações

### 📐 Breakpoints Responsivos
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 🔧 Otimizações Mobile
- Viewport configurado para dispositivos móveis
- Prevenção de zoom indesejado
- Otimização de performance para conexões lentas
- Imagens responsivas e otimizadas
- Gestos de navegação intuitivos

## 🧪 Contas de Teste

Para testar a aplicação, utilize uma das seguintes contas:

- **Email:** marcos@email.com | **Senha:** qualquer senha
- **Email:** joao@email.com | **Senha:** qualquer senha  
- **Email:** juliana@email.com | **Senha:** qualquer senha

## 📱 Estrutura do Projeto

## 🎨 Design e UX

- Interface moderna e intuitiva
- Design responsivo para mobile-first
- Cores personalizadas (#04042c para elementos principais)
- Ícones consistentes e acessíveis
- Feedback visual com toasts e animações

## 🌟 Próximas Funcionalidades

- [ ] Integração com APIs de mapas reais (Google Maps/OpenStreetMap)
- [ ] Sistema de avaliações e comentários
- [ ] Chat entre usuários
- [ ] Notificações push
- [ ] Programa de fidelidade expandido
- [ ] Integração com sistemas de pagamento
- [ ] API backend completa
- [ ] Aplicativo mobile nativo

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Projeto:** Amigos dos Motoboys
- **Versão:** 0.1.0
- **Localização:** Ilhabela - SP

---

**Desenvolvido com ❤️ para a comunidade de motoboys e entregadores**