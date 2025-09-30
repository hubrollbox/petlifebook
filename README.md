# 🐾 PetLifeBook

**Site oficial:** [petlifebook.pt](https://petlifebook.pt)

[![Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4)](https://lovable.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**PetLifeBook** é um projeto **open source** que permite documentar e partilhar a vida dos animais de estimação. Cada animal tem a sua própria timeline individual, e após a partida, a timeline pode ser partilhada num espaço coletivo chamado **"céu"**, onde cada pet aparece como uma estrela.

## 🌟 Visão do Projeto

O objetivo do PetLifeBook é criar uma experiência emocional e interativa, incentivando a utilização frequente e o envolvimento da comunidade. Um lugar onde as memórias dos nossos companheiros de quatro patas vivem para sempre.

> *"Este é um projeto de todos, para eternizar a vida dos nossos animais de estimação."*

---

## ✨ Funcionalidades Principais

### Plataforma Base
- 📸 **Timeline individual** do animal, com fotos, vídeos e marcos de vida
- ⭐ **Céu coletivo de estrelas**, representando os pets da comunidade
- 🔒 **Autenticação segura** com sistema de perfis de utilizador
- 📱 **Design responsivo** totalmente adaptado para mobile

### Planos Disponíveis

#### 🆓 Plano Gratuito
- Acesso básico à estrela e foto do pet
- Linha do tempo limitada
- 1 pet por conta
- Partilha básica nas redes sociais

#### 👑 Plano Premium
- Timeline expandida e ilimitada
- Uploads ilimitados de fotos e vídeos
- Múltiplos pets por conta
- História detalhada e marcos especiais
- Certificado de memorial personalizado
- Apoio prioritário

### Funcionalidades Futuras
- 💬 Interações sociais: likes, comentários, feed global
- 🎮 Gamificação: constelações, badges, aniversários
- 🎥 Vídeos tributo automáticos
- 📖 Livro de memórias físico

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI reutilizáveis

### Backend & Infraestrutura
- **Supabase** - Backend as a Service
  - PostgreSQL - Base de dados relacional
  - Authentication - Sistema de autenticação
  - Storage - Armazenamento de ficheiros
  - Row Level Security (RLS) - Segurança dos dados

### Bibliotecas Principais
- `react-router-dom` - Navegação SPA
- `@tanstack/react-query` - Gestão de estado do servidor
- `lucide-react` - Ícones
- `zod` - Validação de schemas
- `react-hook-form` - Gestão de formulários

---

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+ ([instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm ou yarn
- Conta Supabase (para backend)

### Instalação Local

```bash
# 1. Clone o repositório
git clone https://github.com/hubrollbox/petlifebook.git
cd petlifebook

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
# Copie o ficheiro .env.example e configure com as suas credenciais Supabase
cp .env.example .env

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Configuração do Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute as migrations SQL localizadas em `supabase/migrations/`
3. Configure as credenciais no ficheiro `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
   ```

---

## 📁 Estrutura do Projeto

```
petlifebook/
├── src/
│   ├── assets/          # Imagens e recursos estáticos
│   │   └── pets/        # Fotos de exemplo dos pets
│   ├── components/      # Componentes React reutilizáveis
│   │   ├── ui/         # Componentes shadcn/ui
│   │   ├── Navigation.tsx
│   │   ├── PetCard.tsx
│   │   └── StarrySky.tsx
│   ├── contexts/        # React Contexts
│   │   └── AuthContext.tsx
│   ├── hooks/           # Custom React Hooks
│   ├── integrations/    # Integrações externas
│   │   └── supabase/   # Cliente e tipos Supabase
│   ├── pages/           # Páginas da aplicação
│   │   ├── Home.tsx
│   │   ├── Auth.tsx
│   │   ├── CreateProfile.tsx
│   │   ├── PetProfile.tsx
│   │   └── Plans.tsx
│   ├── lib/            # Utilitários
│   ├── App.tsx         # Componente raiz
│   └── main.tsx        # Entry point
├── supabase/
│   └── migrations/     # Migrations da base de dados
├── public/             # Ficheiros públicos
└── README.md
```

---

## 🗺️ Roadmap

### ✅ Fase 1 - Concluída
- [x] Timeline individual básica
- [x] Céu visual com estrelas clicáveis
- [x] Sistema de autenticação
- [x] Upload de fotos
- [x] Planos gratuito e premium

### 🚧 Fase 2 - Em Desenvolvimento
- [ ] Interações sociais (likes, comentários)
- [ ] Sistema de notificações
- [ ] Partilha avançada nas redes sociais

### 📋 Fase 3 - Planeada
- [ ] Feed global com destaques
- [ ] Perfis premium avançados
- [ ] Integração com serviços de memorial físico

### 🔮 Fase 4 - Futuro
- [ ] Gamificação: constelações, badges
- [ ] Lembretes de aniversários
- [ ] Vídeos tributo automáticos
- [ ] App mobile nativa

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Este é um projeto open source feito com amor pela comunidade.

### Processo de Contribuição

1. **Fork** o repositório
2. Crie uma **branch** para a sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit** as suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um **Pull Request**

### Diretrizes

- Siga os padrões de código existentes
- Escreva mensagens de commit claras e descritivas
- Documente novas funcionalidades
- Teste as suas alterações antes de submeter
- Seja respeitoso e construtivo nos comentários

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes completos.

---

## 🐛 Reportar Bugs

Encontrou um bug? Ajude-nos a melhorar!

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/hubrollbox/petlifebook/issues)
2. Se não, crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Informação do ambiente (browser, OS, etc.)

---

## 💖 Apoiar o Projeto

Este projeto é mantido por voluntários e depende de doações para continuar a crescer.

### Formas de Apoiar

- ⭐ Dê uma estrela no GitHub
- 🐛 Reporte bugs e sugira melhorias
- 💻 Contribua com código
- 📢 Partilhe o projeto nas redes sociais
- 💰 Faça uma doação

**Doações:** As doações são feitas por transferência bancária para sustentar o desenvolvimento contínuo e ações pontuais de associações de animais.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE) - consulte o arquivo LICENSE para mais detalhes.

Isso significa que você pode:
- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

Com as condições:
- 📋 Incluir a licença e copyright
- 🚫 Sem garantia

---

## 📞 Contacto & Comunidade

- **Website:** [petlifebook.pt](https://petlifebook.pt)
- **GitHub:** [github.com/hubrollbox/petlifebook](https://github.com/hubrollbox/petlifebook)
- **Email:** [contato@petlifebook.pt](mailto:contato@petlifebook.pt)

### Redes Sociais
- 📘 Facebook: [PetLifeBook](https://facebook.com/petlifebook)
- 📸 Instagram: [@petlifebook](https://instagram.com/petlifebook)
- 🐦 Twitter: [@petlifebook](https://twitter.com/petlifebook)

---

## 🙏 Agradecimentos

Obrigado a todos que contribuíram para tornar o PetLifeBook realidade:

- Todos os contribuidores do projeto
- Comunidade open source
- Associações de proteção animal
- E especialmente aos nossos pets, que nos inspiram todos os dias ❤️

---

## 🔗 Links Úteis

- [Documentação do Projeto](https://docs.petlifebook.pt) *(em breve)*
- [Lovable Platform](https://lovable.dev)
- [Supabase Docs](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

<div align="center">

**Feito com ❤️ para todos os pets que iluminam as nossas vidas**

[⬆ Voltar ao topo](#-petlifebook)

</div>
