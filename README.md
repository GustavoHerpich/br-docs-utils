# br-docs-utils

Biblioteca em TypeScript com utilitários para documentos brasileiros.

A primeira versão da lib é focada em CPF e CNPJ, com suporte a:

- validação
- formatação
- mascaramento
- uso genérico para campos que aceitam CPF ou CNPJ
- CNPJ alfanumérico conforme a Receita Federal

A estrutura também foi pensada para crescer no futuro com outros documentos, como IE, PIS e RG.

## Para que serve

O `br-docs-utils` ajuda a padronizar operações comuns com documentos brasileiros em aplicações frontend e backend, como:

- validar CPF antes de enviar um formulário
- validar CNPJ numérico ou alfanumérico
- formatar documentos para exibição
- mascarar dados sensíveis
- tratar campos que podem receber CPF ou CNPJ no mesmo input

## Instalação

Com `npm`:

```bash
npm install br-docs-utils
```

Com `pnpm`:

```bash
pnpm add br-docs-utils
```

## Como usar

### Exemplo com CPF

```ts
import { formatCPF, isValidCPF, maskCPF } from 'br-docs-utils';

isValidCPF('529.982.247-25');
// true

formatCPF('52998224725');
// 529.982.247-25

maskCPF('52998224725');
// 529.***.***-25
```

### Exemplo com CNPJ

```ts
import { formatCNPJ, isValidCNPJ, maskCNPJ } from 'br-docs-utils';

isValidCNPJ('04.252.011/0001-10');
// true

isValidCNPJ('12.ABC.345/01DE-35');
// true

formatCNPJ('12ABC34501DE35');
// 12.ABC.345/01DE-35

maskCNPJ('12ABC34501DE35');
// 12.***.***/****-35
```

### Exemplo para campo que aceita CPF ou CNPJ

```ts
import {
  cpfCnpjRule,
  formatAndMaskDocument,
  formatDocument,
  getValidDocumentKind,
  isValidDocument,
} from 'br-docs-utils';

isValidDocument('529.982.247-25');
// true

isValidDocument('12.ABC.345/01DE-35');
// true

getValidDocumentKind('12.ABC.345/01DE-35');
// cnpj

formatDocument('52998224725');
// 529.982.247-25

formatAndMaskDocument('12ABC34501DE35');
// 12.***.***/****-35

cpfCnpjRule('123');
// CPF/CNPJ invalido
```

### Importações por módulo

Se você quiser importar apenas o domínio necessário:

```ts
import { formatCPF, isValidCPF } from 'br-docs-utils/documents/cpf';
import { formatCNPJ, isValidCNPJ } from 'br-docs-utils/documents/cnpj';
import { cpfCnpjRule, formatDocument } from 'br-docs-utils/documents';
```

## Funções disponíveis

### CPF

- `stripCPFMask`
- `normalizeCPF`
- `isCPFShape`
- `isValidCPF`
- `formatCPF`
- `maskCPF`
- `cpfRule`

### CNPJ

- `stripCNPJMask`
- `normalizeCNPJ`
- `hasCNPJAlpha`
- `isNumericCNPJ`
- `isAlphanumericCNPJ`
- `isCNPJShape`
- `isValidCNPJ`
- `formatCNPJ`
- `maskCNPJ`
- `cnpjRule`

### Genéricas

- `getDocumentKind`
- `getValidDocumentKind`
- `isValidDocument`
- `formatDocument`
- `maskDocument`
- `formatAndMaskDocument`
- `cpfCnpjRule`
- `documentRule`

## Rodando o projeto localmente

Instalar dependências:

```bash
npm install
```

Executar validação de tipos:

```bash
npm run typecheck
```

Rodar os testes:

```bash
npm test
```

Gerar o build:

```bash
npm run build
```

Gerar o pacote para publicação:

```bash
npm pack
```

## Referências

- Receita Federal: <https://www.gov.br/receitafederal/pt-br/assuntos/empresas-e-negocios>
- Perguntas e respostas sobre CNPJ alfanumérico:
  <https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/cnpj/cnpj-alfanumerico.pdf>

## Observação

O suporte ao CNPJ alfanumérico foi incluído considerando a documentação oficial da Receita Federal e a entrada em vigor prevista para julho de 2026.
