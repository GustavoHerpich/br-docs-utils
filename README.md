# br-docs-utils

Public TypeScript utility library focused on Brazilian documents.

The first module is dedicated to CPF and CNPJ, including official support for
the alphanumeric CNPJ model scheduled by Receita Federal for July 2026.

## Goals

- Public package ready for npm or pnpm
- Small and tree-shakeable entry points
- Clear split by domain and responsibility
- Strong typing with pure functions
- Shared internals isolated from public exports
- Official support for numeric and alphanumeric CNPJ

## Suggested structure

```text
src/
  documents/
    cpf/
      format.ts
      index.ts
      mask.ts
      validate.ts
    cnpj/
      format.ts
      index.ts
      mask.ts
      validate.ts
    shared/
      types.ts
      utils.ts
    index.ts
  internal/
    helpers.ts
    regex.ts
  index.ts
test/
  cpf/
    format.spec.ts
    validate.spec.ts
  cnpj/
    format.spec.ts
    validate.spec.ts
  documents/
    shared.spec.ts
```

## Install

```bash
npm install br-docs-utils
```

```bash
pnpm add br-docs-utils
```

## Usage

```ts
import {
  cpfCnpjRule,
  formatCNPJ,
  formatCPF,
  formatDocument,
  isValidCNPJ,
  isValidCPF,
  maskCNPJ,
  maskCPF,
} from 'br-docs-utils';

isValidCPF('529.982.247-25');
isValidCNPJ('12.ABC.345/01DE-35');

formatCPF('52998224725');
formatCNPJ('12ABC34501DE35');

maskCPF('52998224725');
maskCNPJ('12ABC34501DE35');

formatDocument('12ABC34501DE35');
cpfCnpjRule('12ABC34501DE35');
```

## Granular imports

```ts
import { formatCPF, isValidCPF } from 'br-docs-utils/documents/cpf';
import { formatCNPJ, isValidCNPJ } from 'br-docs-utils/documents/cnpj';
import { cpfCnpjRule, formatDocument } from 'br-docs-utils/documents';
```

## Public API

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

### Generic documents

- `getDocumentKind`
- `getValidDocumentKind`
- `isValidDocument`
- `formatDocument`
- `maskDocument`
- `formatAndMaskDocument`
- `cpfCnpjRule`
- `documentRule`

## Design notes

- Functions are pure and have no side effects
- Regex usage is intentionally small and centralized
- Shared document helpers were designed to scale for IE, PIS, RG and future domains
- Root exports stay ergonomic, while subpath imports remain tree-shakeable

## References

- Receita Federal: <https://www.gov.br/receitafederal/pt-br/assuntos/empresas-e-negocios>
- Perguntas e respostas do CNPJ alfanumerico:
  <https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/cnpj/cnpj-alfanumerico.pdf>

## Local scripts

```bash
npm run build
npm run test
npm run typecheck
```
