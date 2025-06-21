This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel
# Water Manager - Sistema de Gestão Hídrica

Sistema de gestão hídrica para edificações com autenticação Firebase e Next.js.

## Configuração

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Projeto Firebase configurado com Authentication ativado

### Instalação

1. Clone o repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd water-manager
```

2. Instale as dependências

```bash
npm install
# ou
yarn
```

3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto baseado no arquivo `.env.local.example` e preencha com suas credenciais do Firebase.

4. Obtenha as credenciais do Firebase Admin SDK

- Acesse o Console do Firebase
- Vá para Configurações do Projeto > Contas de Serviço
- Gere uma nova chave privada e baixe o arquivo JSON
- Adicione as credenciais ao seu arquivo `.env.local`

### Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

### Construção para Produção

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

## Estrutura do Projeto

- `/src/app`: Páginas do aplicativo (Next.js App Router)
- `/src/components`: Componentes reutilizáveis
- `/src/contexts`: Contextos React, incluindo o AuthContext
- `/src/lib`: Utilitários, incluindo configuração do Firebase
- `/src/middleware.ts`: Middleware para proteção de rotas

## Sistema de Autenticação

O sistema utiliza Firebase Authentication com:

- Login/Cadastro com email e senha
- Proteção de rotas via middleware do Next.js
- Sessão persistente via cookies HTTP-only
- Recuperação de senha

## Licença

MIT
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
