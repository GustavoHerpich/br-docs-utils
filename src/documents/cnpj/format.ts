import { isCNPJShape, stripCNPJMask } from './validate';

export function formatCNPJ(value: string): string {
  const cnpj = stripCNPJMask(value);

  if (!isCNPJShape(cnpj)) {
    return value;
  }

  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
}
