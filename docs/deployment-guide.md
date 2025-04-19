# Guia de Implantação - FarmaTreinamento

Este documento fornece instruções detalhadas para implantar o aplicativo FarmaTreinamento em diferentes ambientes.

## Requisitos

- Node.js 18.x ou superior
- npm ou pnpm
- Acesso a um serviço de hospedagem (Vercel, GitHub Pages, Netlify, etc.)
- Domínio personalizado (opcional)

## Opções de Implantação

### 1. Implantação na Vercel (Recomendado)

A Vercel é otimizada para aplicativos Next.js e oferece a maneira mais simples de implantar.

#### Passos:

1. Crie uma conta na [Vercel](https://vercel.com)
2. Instale a CLI da Vercel:
   ```bash
   npm install -g vercel
   ```
3. Faça login na sua conta:
   ```bash
   vercel login
   ```
4. Na pasta raiz do projeto, execute:
   ```bash
   vercel
   ```
5. Siga as instruções na tela para configurar o projeto
6. Para implantações subsequentes, use:
   ```bash
   vercel --prod
   ```

### 2. Implantação no GitHub Pages

#### Passos:

1. Crie um repositório no GitHub
2. Adicione o repositório remoto ao seu projeto:
   ```bash
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   ```
3. Instale o pacote gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
4. Adicione os seguintes scripts ao seu package.json:
   ```json
   "scripts": {
     "build": "next build && next export",
     "export": "next export",
     "deploy": "next build && next export && touch out/.nojekyll && gh-pages -d out -t true"
   }
   ```
5. Execute o comando de implantação:
   ```bash
   npm run deploy
   ```
6. Configure o GitHub Pages nas configurações do repositório para usar a branch gh-pages

### 3. Implantação em Servidor Próprio

#### Passos:

1. Construa o aplicativo:
   ```bash
   npm run build
   ```
2. O resultado da construção estará na pasta `.next`
3. Transfira os arquivos para seu servidor usando FTP ou SSH
4. Configure seu servidor web (Nginx, Apache) para servir o aplicativo Next.js

#### Exemplo de configuração Nginx:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_API_URL=https://sua-api.com
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
DATABASE_URL=sua-url-de-banco-de-dados
JWT_SECRET=seu-segredo-jwt
```

Para a Vercel, configure estas variáveis no painel de controle do projeto.

## Conectando um Domínio Personalizado

### Na Vercel:

1. Acesse o painel do projeto
2. Vá para "Settings" > "Domains"
3. Adicione seu domínio personalizado
4. Siga as instruções para configurar os registros DNS

### No GitHub Pages:

1. Adicione um arquivo CNAME à pasta `public` com seu domínio:
   ```
   seu-dominio.com
   ```
2. Configure os registros DNS do seu domínio para apontar para os servidores do GitHub Pages

## Atualizações e Manutenção

Para atualizar o aplicativo implantado:

1. Faça as alterações necessárias no código
2. Execute os testes para garantir que tudo funciona corretamente:
   ```bash
   npm test
   ```
3. Implante novamente usando o método escolhido acima

## Solução de Problemas

### Problemas comuns:

1. **Erro 404 em rotas dinâmicas**: Certifique-se de que está usando o método correto de exportação para seu tipo de hospedagem.

2. **Falha na construção**: Verifique os logs de construção para identificar erros específicos.

3. **Problemas de CORS**: Configure corretamente os cabeçalhos CORS se estiver usando uma API separada.

4. **Problemas de cache**: Adicione um parâmetro de versão às suas implantações para evitar problemas de cache.

Para suporte adicional, consulte a documentação oficial do Next.js ou entre em contato com o suporte do seu provedor de hospedagem.
