import { isBlank, onlyDigits } from '../../internal/helpers';
import { CPF_SHAPE_REGEX, REPEATED_DIGITS_REGEX } from '../../internal/regex';
import type {
  CPFValidationReason,
  CPFValidationResult,
  DocumentRuleInput,
  DocumentRuleResult,
} from '../shared/types';

function createCPFValidationResult(
  normalized: string,
  isValid: boolean,
  reason: CPFValidationReason,
): CPFValidationResult {
  return {
    kind: 'cpf',
    isValid,
    normalized,
    reason,
  };
}

export function stripCPFMask(value: string): string {
  return onlyDigits(value);
}

export const normalizeCPF = stripCPFMask;

export function isCPFShape(value: string): boolean {
  return CPF_SHAPE_REGEX.test(stripCPFMask(value));
}

export function validateCPF(value: string): CPFValidationResult {
  const cpf = stripCPFMask(value);

  if (cpf.length === 0) {
    return createCPFValidationResult(cpf, false, 'empty');
  }

  if (!CPF_SHAPE_REGEX.test(cpf)) {
    return createCPFValidationResult(cpf, false, 'invalid_shape');
  }

  if (REPEATED_DIGITS_REGEX.test(cpf)) {
    return createCPFValidationResult(cpf, false, 'repeated_digits');
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
    return createCPFValidationResult(cpf, false, 'invalid_check_digits');
  }

  sum = 0;

  for (let index = 0; index < 10; index += 1) {
    sum += Number(cpf[index]) * (11 - index);
  }

  checkDigit = (sum * 10) % 11;

  if (checkDigit === 10) {
    checkDigit = 0;
  }

  if (checkDigit !== Number(cpf[10])) {
    return createCPFValidationResult(cpf, false, 'invalid_check_digits');
  }

  return createCPFValidationResult(cpf, true, 'valid');
}

export function isValidCPF(value: string): boolean {
  return validateCPF(value).isValid;
}

export function cpfRule(
  value: DocumentRuleInput,
  message = 'CPF invalido',
): DocumentRuleResult {
  if (isBlank(value)) {
    return true;
  }

  return validateCPF(value).isValid || message;
}
