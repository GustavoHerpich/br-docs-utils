import { isCPFShape, stripCPFMask } from './validate';

export function formatCPF(value: string): string {
  const cpf = stripCPFMask(value);

  if (!isCPFShape(cpf)) {
    return value;
  }

  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}
