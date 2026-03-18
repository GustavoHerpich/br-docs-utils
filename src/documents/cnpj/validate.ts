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
import type { DocumentRuleInput, DocumentRuleResult } from '../shared/types';

const CNPJ_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const;

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

export function isValidCNPJ(value: string): boolean {
  const cnpj = stripCNPJMask(value);

  if (!CNPJ_SHAPE_REGEX.test(cnpj) || ZEROED_CNPJ_REGEX.test(cnpj)) {
    return false;
  }

  let sum1 = 0;
  let sum2 = 0;

  for (let index = 0; index < 12; index += 1) {
    const charValue = getAlphaNumericCode(cnpj[index]);

    if (Number.isNaN(charValue)) {
      return false;
    }

    sum1 += charValue * CNPJ_WEIGHTS[index + 1];
    sum2 += charValue * CNPJ_WEIGHTS[index];
  }

  const digit1 = getMod11CheckDigit(sum1);
  sum2 += digit1 * CNPJ_WEIGHTS[12];

  const digit2 = getMod11CheckDigit(sum2);

  return cnpj.slice(12) === `${digit1}${digit2}`;
}

export function cnpjRule(
  value: DocumentRuleInput,
  message = 'CNPJ invalido',
): DocumentRuleResult {
  if (isBlank(value)) {
    return true;
  }

  return isValidCNPJ(value) || message;
}
