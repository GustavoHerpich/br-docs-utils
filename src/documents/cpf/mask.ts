import { isCPFShape, stripCPFMask } from './validate';

export function maskCPF(value: string): string {
  const cpf = stripCPFMask(value);

  if (!isCPFShape(cpf)) {
    return value;
  }

  return `${cpf.slice(0, 3)}.***.***-${cpf.slice(9)}`;
}
