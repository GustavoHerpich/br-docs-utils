import { isBlank, onlyDigits } from '../../internal/helpers';
import { CPF_SHAPE_REGEX, REPEATED_DIGITS_REGEX } from '../../internal/regex';
import type { DocumentRuleInput, DocumentRuleResult } from '../shared/types';

export function stripCPFMask(value: string): string {
  return onlyDigits(value);
}

export const normalizeCPF = stripCPFMask;

export function isCPFShape(value: string): boolean {
  return CPF_SHAPE_REGEX.test(stripCPFMask(value));
}

export function isValidCPF(value: string): boolean {
  const cpf = stripCPFMask(value);

  if (!CPF_SHAPE_REGEX.test(cpf) || REPEATED_DIGITS_REGEX.test(cpf)) {
    return false;
  }

  let sum = 0;

  for (let index = 0; index < 9; index += 1) {
    sum += Number(cpf[index]) * (10 - index);
  }

  let checkDigit = (sum * 10) % 11;

  if (checkDigit === 10) {
    checkDigit = 0;
  }

  if (checkDigit !== Number(cpf[9])) {
    return false;
  }

  sum = 0;

  for (let index = 0; index < 10; index += 1) {
    sum += Number(cpf[index]) * (11 - index);
  }

  checkDigit = (sum * 10) % 11;

  if (checkDigit === 10) {
    checkDigit = 0;
  }

  return checkDigit === Number(cpf[10]);
}

export function cpfRule(
  value: DocumentRuleInput,
  message = 'CPF invalido',
): DocumentRuleResult {
  if (isBlank(value)) {
    return true;
  }

  return isValidCPF(value) || message;
}
