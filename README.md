## Teste Prático | Software Engineer - Frontend - Next.js | MySide

## Iniciando o projeto

- Para iniciar o projeto, garanta que você possui uma versão atualizada do [npm](https://www.npmjs.com/). Após isso, instale as dependências rodando no terminal o seguinte comando:

  ```
  npm install
  ```

- Com esse passo finalizado, existem mais alguns scripts disponíveis para você:

  Iniciar em modo de desenvolvimento:

  ```
  npm run dev
  ```

  Iniciar o modo de build para testar a integridade do projeto:

  ```
  npm run build
  ```

  Iniciar em modo de produção (é necessário utilizar o comando npm run build antes):

  ```
  npm run start
  ```

  Iniciar o modo Lint para validar a formatação do código do projeto:

  ```
  npm run lint
  ```

## Iniciando os testes

- Com esse passo você poderá verificar os testes dos componentes e das páginas da aplicação.

  Alteração da variavel de ambiente:

  ```
  Vá até o arquivo .env e altere a váriavel de ambiente NEXT_PUBLIC_API_MOCKING para enabled.
  Isso irá ativar a simulação (mocks) das requisições.

  -> NEXT_PUBLIC_API_MOCKING=enabled
  ```

  Iniciando em modo de teste:

  ```
  npm run test
  ```

- O deploy do projeto foi feito na Vercel e você pode verificá-lo no seguinte link:

### -> **[Teste Prático | Software Engineer - Frontend - Next.js](https://practical-test-myside.vercel.app/home)**
