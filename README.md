# validador_boleto_api

> API feita em Node.js, que recebe como entrada uma linha digitável ou um código de barras de um boleto e caso o mesmo seja válido, retorna o código de barras, valor e data de vencimento do boleto se tiver.

> A API aceita como entrada boletos do tipo arrecadação ou bancários, com ou sem máscara.

> O projeto foi executado usando o YARN 1.22.11 e Node.js 14.16.0.

## Scripts disponíveis

> Executar no diretório raiz do projeto:

### `yarn install`

Instala as dependências do projeto.
### `yarn dev`

Executa a API em modo de desenvolvimento.

### `yarn test`

Executa os testes em modo de monitoramento, que faz reexecutar sempre que acontece modificações.

> Usar a mesma versão do Node.js se encontrar problemas de execução, para isso basta utilizar a ferramenta nvm ([Node Version Manager](https://github.com/nvm-sh/nvm)).
