# 🤝 Guia de Contribuição - PetLifeBook

Obrigado pelo interesse em contribuir para o PetLifeBook! Este documento fornece diretrizes para garantir que as contribuições sejam consistentes e de alta qualidade.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Funcionalidades](#sugerir-funcionalidades)

---

## 📜 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e inclusivo.

### Nossas Promessas

- Usar linguagem acolhedora e inclusiva
- Respeitar pontos de vista e experiências diferentes
- Aceitar críticas construtivas com elegância
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros

---

## 🎯 Como Posso Contribuir?

Existem várias formas de contribuir para o PetLifeBook:

### 💻 Contribuições de Código

- Corrigir bugs reportados
- Implementar novas funcionalidades
- Melhorar a performance
- Refatorar código existente
- Adicionar testes

### 📝 Contribuições de Documentação

- Melhorar o README
- Adicionar tutoriais
- Corrigir erros de digitação
- Traduzir documentação
- Criar guias de uso

### 🎨 Design & UX

- Melhorar a interface do utilizador
- Criar mockups para novas features
- Otimizar a experiência mobile
- Sugerir melhorias de acessibilidade

### 🐛 Testes & QA

- Reportar bugs
- Testar novas funcionalidades
- Escrever testes automatizados
- Validar correções

---

## 🔧 Configuração do Ambiente

### Pré-requisitos

```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### Instalação

1. **Fork o repositório**
   - Visite https://github.com/hubrollbox/petlifebook
   - Clique em "Fork" no canto superior direito

2. **Clone o seu fork**
   ```bash
   git clone https://github.com/SEU_USERNAME/petlifebook.git
   cd petlifebook
   ```

3. **Adicione o repositório original como remote**
   ```bash
   git remote add upstream https://github.com/hubrollbox/petlifebook.git
   ```

4. **Instale as dependências**
   ```bash
   npm install
   ```

5. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o .env com as suas credenciais Supabase
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

---

## 🔄 Processo de Desenvolvimento

### 1. Criar uma Branch

Sempre crie uma branch para o seu trabalho:

```bash
# Para nova funcionalidade
git checkout -b feature/nome-da-funcionalidade

# Para correção de bug
git checkout -b fix/descricao-do-bug

# Para melhorias
git checkout -b improvement/descricao-da-melhoria
```

### 2. Desenvolver

- Faça commits pequenos e frequentes
- Escreva mensagens de commit claras
- Teste as suas alterações

### 3. Sincronizar com o Upstream

Antes de submeter o PR, sincronize com o repositório original:

```bash
git fetch upstream
git rebase upstream/main
```

### 4. Push e Pull Request

```bash
git push origin sua-branch
```

Depois, abra um Pull Request no GitHub.

---

## 📏 Padrões de Código

### TypeScript

- Use TypeScript para todo o código
- Defina tipos explícitos sempre que possível
- Evite `any` - use `unknown` se necessário

```typescript
// ✅ Bom
interface Pet {
  id: string;
  name: string;
  breed: string;
}

function getPet(id: string): Pet | null {
  // ...
}

// ❌ Evitar
function getPet(id: any): any {
  // ...
}
```

### React

- Use componentes funcionais com hooks
- Extraia lógica complexa para custom hooks
- Use memo/useMemo/useCallback apropriadamente

```typescript
// ✅ Bom
const PetCard = ({ pet }: { pet: Pet }) => {
  const handleClick = useCallback(() => {
    // ...
  }, []);

  return <div onClick={handleClick}>...</div>;
};

// ❌ Evitar
const PetCard = (props: any) => {
  return <div onClick={() => handleClick()}>...</div>;
};
```

### CSS/Tailwind

- Use classes do Tailwind sempre que possível
- Evite CSS inline
- Use tokens do design system definidos em `index.css`
- Mantenha consistência visual

```tsx
// ✅ Bom
<Button variant="memorial" size="lg">
  Criar Memorial
</Button>

// ❌ Evitar
<button style={{ backgroundColor: 'purple', padding: '20px' }}>
  Criar Memorial
</button>
```

### Estrutura de Ficheiros

```
src/
  components/        # Componentes reutilizáveis
  pages/            # Páginas/rotas
  hooks/            # Custom hooks
  contexts/         # React contexts
  lib/              # Utilitários
  integrations/     # Integrações externas
```

---

## 🎯 Mensagens de Commit

Use mensagens de commit descritivas seguindo o padrão:

```
tipo(escopo): descrição curta

Descrição mais detalhada (se necessário)

Closes #123
```

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Formatação, espaços em branco
- `refactor`: Refatoração de código
- `test`: Adicionar ou corrigir testes
- `chore`: Tarefas de manutenção

### Exemplos

```bash
feat(pets): adiciona upload de múltiplas fotos

Permite aos utilizadores fazerem upload de várias fotos
simultaneamente na criação do perfil do pet.

Closes #45

---

fix(auth): corrige redirecionamento após login

O utilizador era redirecionado para a página errada
após fazer login com sucesso.

Closes #78
```

---

## 🔍 Processo de Pull Request

### Antes de Submeter

- [ ] O código compila sem erros
- [ ] Todos os testes passam
- [ ] Código está formatado corretamente
- [ ] Documentação foi atualizada (se necessário)
- [ ] Branch está atualizada com main

### Template de PR

```markdown
## Descrição
[Descreva as mudanças realizadas]

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. [Passo a passo para testar]
2. ...

## Screenshots
[Se aplicável]

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Comentei código complexo
- [ ] Atualizei documentação
- [ ] Testes passam localmente
- [ ] PR está linked a uma issue

## Issues Relacionadas
Closes #123
```

### Revisão

- Aguarde revisão de pelo menos um maintainer
- Responda aos comentários educadamente
- Faça as alterações solicitadas
- Após aprovação, o PR será merged

---

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado
2. Tente reproduzir numa instalação limpa
3. Recolha informação sobre o ambiente

### Template de Bug Report

```markdown
**Descrição do Bug**
[Descrição clara e concisa]

**Para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
[O que deveria acontecer]

**Screenshots**
[Se aplicável]

**Ambiente:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Versão: [e.g. 1.0.0]

**Contexto Adicional**
[Qualquer outra informação relevante]
```

---

## 💡 Sugerir Funcionalidades

### Template de Feature Request

```markdown
**A funcionalidade está relacionada a um problema?**
[Descreva o problema]

**Descreva a solução que gostaria**
[Descrição clara da funcionalidade]

**Alternativas consideradas**
[Outras soluções que considerou]

**Contexto adicional**
[Screenshots, mockups, etc.]
```

---

## ❓ Perguntas Frequentes

### Como sincronizo o meu fork?

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Posso trabalhar em várias issues simultaneamente?

Sim, mas crie branches separadas para cada uma.

### Quanto tempo demora a revisão de um PR?

Normalmente entre 2-7 dias. Tenha paciência!

### Posso contribuir mesmo sendo iniciante?

Sim! Procure issues marcadas com `good first issue`.

---

## 📞 Precisa de Ajuda?

- 💬 Discussões: [GitHub Discussions](https://github.com/hubrollbox/petlifebook/discussions)
- 📧 Email: contato@petlifebook.pt
- 🐛 Issues: [GitHub Issues](https://github.com/hubrollbox/petlifebook/issues)

---

## 🙏 Obrigado!

As suas contribuições tornam o PetLifeBook melhor para todos. Cada linha de código, cada sugestão, cada bug reportado faz a diferença.

**Juntos, estamos a eternizar as memórias dos nossos melhores amigos! ❤️🐾**

---

<div align="center">

[⬆ Voltar ao topo](#-guia-de-contribuição---petlifebook)

</div>
