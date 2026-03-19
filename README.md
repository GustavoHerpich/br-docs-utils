# br-docs-utils

Biblioteca em TypeScript com utilitários para documentos brasileiros.

A primeira versão da lib é focada em CPF e CNPJ, com suporte a:

- validação
- validação com motivo de falha
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
- normalizar CPF ou CNPJ para salvar no banco
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
import { formatCPF, isValidCPF, maskCPF, validateCPF } from "br-docs-utils";

isValidCPF("529.982.247-25");
// true

formatCPF("52998224725");
// 529.982.247-25

maskCPF("52998224725");
// 529.***.***-25

validateCPF("111.111.111-11");
// {
//   kind: 'cpf',
//   isValid: false,
//   normalized: '11111111111',
//   reason: 'repeated_digits'
// }
```

### Exemplo com CNPJ

```ts
import { formatCNPJ, isValidCNPJ, maskCNPJ, validateCNPJ } from "br-docs-utils";

isValidCNPJ("04.252.011/0001-10");
// true

isValidCNPJ("12.ABC.345/01DE-35");
// true

formatCNPJ("12ABC34501DE35");
// 12.ABC.345/01DE-35

maskCNPJ("12ABC34501DE35");
// 12.***.***/****-35

validateCNPJ("12.ABC.345/01DE-36");
// {
//   kind: 'cnpj',
//   isValid: false,
//   normalized: '12ABC34501DE36',
//   reason: 'invalid_check_digits'
// }
```

### Exemplo para campo que aceita CPF ou CNPJ

```ts
import {
  cpfCnpjRule,
  documentInfo,
  formatAndMaskDocument,
  formatDocument,
  getValidDocumentKind,
  isPossibleDocument,
  isValidDocument,
  normalizeDocument,
} from "br-docs-utils";

isValidDocument("529.982.247-25");
// true

isValidDocument("12.ABC.345/01DE-35");
// true

getValidDocumentKind("12.ABC.345/01DE-35");
// cnpj

normalizeDocument("12.ABC.345/01DE-35");
// 12ABC34501DE35

formatDocument("52998224725");
// 529.982.247-25

formatAndMaskDocument("12ABC34501DE35");
// 12.***.***/****-35

isPossibleDocument("12.345");
// true

cpfCnpjRule("123");
// CPF/CNPJ invalido

documentInfo("12.ABC.345/01DE-35");
// {
//   kind: 'cnpj',
//   isShape: true,
//   isValid: true,
//   normalized: '12ABC34501DE35',
//   formatted: '12.ABC.345/01DE-35',
//   masked: '12.***.***/****-35'
// }
```

### Fluxo de UI para CNPJ alfanumérico

Para campos híbridos de formulário, um fluxo comum é:

1. usar `isPossibleDocument` enquanto o usuário ainda está digitando
2. usar `normalizeDocument` antes de salvar ou comparar valores
3. usar `documentInfo` para decidir exibição, máscara e validação final
4. usar `validateCNPJ` quando você precisar mostrar o motivo exato da falha

### Importações por módulo

Se você quiser importar apenas o domínio necessário:

```ts
import {
  formatCPF,
  isValidCPF,
  validateCPF,
} from "br-docs-utils/documents/cpf";
import {
  formatCNPJ,
  isValidCNPJ,
  validateCNPJ,
} from "br-docs-utils/documents/cnpj";
import {
  cpfCnpjRule,
  documentInfo,
  formatDocument,
  isPossibleDocument,
  normalizeDocument,
} from "br-docs-utils/documents";
```

## Funções disponíveis

### CPF

- `stripCPFMask`
- `normalizeCPF`
- `isCPFShape`
- `isValidCPF`
- `validateCPF`
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
- `validateCNPJ`
- `formatCNPJ`
- `maskCNPJ`
- `cnpjRule`

### Genéricas

- `stripDocumentMask`
- `normalizeDocument`
- `getDocumentKind`
- `getValidDocumentKind`
- `isPossibleDocument`
- `looksLikeDocument`
- `isValidDocument`
- `formatDocument`
- `maskDocument`
- `formatAndMaskDocument`
- `documentInfo`
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
