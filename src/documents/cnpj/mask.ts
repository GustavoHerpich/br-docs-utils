import { isCNPJShape, stripCNPJMask } from './validate';

export function maskCNPJ(value: string): string {
  const cnpj = stripCNPJMask(value);

  if (!isCNPJShape(cnpj)) {
    return value;
  }

  return `${cnpj.slice(0, 2)}.***.***/****-${cnpj.slice(12)}`;
}
