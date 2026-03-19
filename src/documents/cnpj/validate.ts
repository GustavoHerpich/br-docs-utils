import {
  getAlphaNumericCode,
  getMod11CheckDigit,
  isBlank,
  stripCNPJMaskChars,
} from '../../internal/helpers';
import {
  CNPJ_SHAPE_REGEX,
  HAS_ALPHA_REGEX,
  ZEROED_CNPJ_REGEX,
} from '../../internal/regex';
import type {
  CNPJValidationReason,
  CNPJValidationResult,
  DocumentRuleInput,
  DocumentRuleResult,
} from '../shared/types';

const CNPJ_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const;

function createCNPJValidationResult(
  normalized: string,
  isValid: boolean,
  reason: CNPJValidationReason,
): CNPJValidationResult {
  return {
    kind: 'cnpj',
    isValid,
    normalized,
    reason,
  };
}

export function stripCNPJMask(value: string): string {
  return stripCNPJMaskChars(value);
}

export const normalizeCNPJ = stripCNPJMask;

export function hasCNPJAlpha(value: string): boolean {
  return HAS_ALPHA_REGEX.test(stripCNPJMask(value));
}

export function isNumericCNPJ(value: string): boolean {
  const cnpj = stripCNPJMask(value);

  return CNPJ_SHAPE_REGEX.test(cnpj) && !HAS_ALPHA_REGEX.test(cnpj);
}

export function isAlphanumericCNPJ(value: string): boolean {
  const cnpj = stripCNPJMask(value);

  return CNPJ_SHAPE_REGEX.test(cnpj) && HAS_ALPHA_REGEX.test(cnpj);
}

export function isCNPJShape(value: string): boolean {
  return CNPJ_SHAPE_REGEX.test(stripCNPJMask(value));
}

export function validateCNPJ(value: string): CNPJValidationResult {
  const cnpj = stripCNPJMask(value);

  if (cnpj.length === 0) {
    return createCNPJValidationResult(cnpj, false, 'empty');
  }

  if (!CNPJ_SHAPE_REGEX.test(cnpj)) {
    return createCNPJValidationResult(cnpj, false, 'invalid_shape');
  }

  if (ZEROED_CNPJ_REGEX.test(cnpj)) {
    return createCNPJValidationResult(cnpj, false, 'zeroed');
  }

  let sum1 = 0;
  let sum2 = 0;

  for (let index = 0; index < 12; index += 1) {
    const charValue = getAlphaNumericCode(cnpj[index]);

    if (Number.isNaN(charValue)) {
      return createCNPJValidationResult(cnpj, false, 'invalid_shape');
    }

    sum1 += charValue * CNPJ_WEIGHTS[index + 1];
    sum2 += charValue * CNPJ_WEIGHTS[index];
  }

  const digit1 = getMod11CheckDigit(sum1);
  sum2 += digit1 * CNPJ_WEIGHTS[12];

  const digit2 = getMod11CheckDigit(sum2);

  if (cnpj.slice(12) !== `${digit1}${digit2}`) {
    return createCNPJValidationResult(cnpj, false, 'invalid_check_digits');
  }

  return createCNPJValidationResult(cnpj, true, 'valid');
}

export function isValidCNPJ(value: string): boolean {
  return validateCNPJ(value).isValid;
}

export function cnpjRule(
  value: DocumentRuleInput,
  message = 'CNPJ invalido',
): DocumentRuleResult {
  if (isBlank(value)) {
    return true;
  }

  return validateCNPJ(value).isValid || message;
}
