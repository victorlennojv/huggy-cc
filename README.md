# Huggy CC

Este projeto implementa uma interface moderna e responsiva para gerenciamento de contatos.

## Arquitetura

O projeto segue uma arquitetura modular. A estrutura do projeto é organizada da seguinte forma:

```
├── assets/          # Arquivos estáticos e estilos (SCSS)
├── components/      # Componentes Vue reutilizáveis/Presentationals
├── composables/     # Composables Vue para lógica reutilizável
├── layouts/         # Layouts da aplicação
├── pages/          # Páginas da aplicação/Containers (roteamento automático)
├── public/         # Arquivos públicos estáticos
├── server/         # API routes e middleware do servidor
├── services/       # Serviços e integrações com APIs
├── types/          # Definições de tipos TypeScript
└── utils/          # Funções utilitárias
```

### Tecnologias Principais

- **Nuxt.js 3**: Framework Vue.js para aplicações universais
- **Vue 3**: Framework JavaScript progressivo
- **TypeScript**: Superset JavaScript com tipagem estática
- **SCSS**: Pré-processador CSS
- **Vitest**: Framework de testes

## Como Executar

### Pré-requisitos

- Node.js
- npm

### Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd huggy-cc
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
ACCESS_TOKEN=seu_token_aqui
```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build

## Testes

O projeto utiliza Vitest para testes unitários.

### Executando os Testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 📦 Módulos Nuxt Utilizados

- `@nuxt/eslint`: Configuração do ESLint
- `@nuxt/image`: Otimização de imagens
- `@nuxt/test-utils`: Utilitários para testes
- `@nuxt/icon`: Sistema de ícones
