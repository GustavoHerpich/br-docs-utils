import { CNPJ_MASK_CHARS_REGEX, NON_DIGITS_REGEX } from './regex';

export function onlyDigits(value: string): string {
  return value.replace(NON_DIGITS_REGEX, '');
}

export function normalizeUppercase(value: string): string {
  return value.trim().toUpperCase();
}

export function stripCNPJMaskChars(value: string): string {
  return normalizeUppercase(value).replace(CNPJ_MASK_CHARS_REGEX, '');
}

export function isBlank(value: string | null | undefined): value is null | undefined | '' {
  return value == null || value.trim().length === 0;
}

export function getMod11CheckDigit(sum: number): number {
  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
}

export function getAlphaNumericCode(value: string): number {
  const code = value.charCodeAt(0);

  return Number.isNaN(code) ? Number.NaN : code - 48;
}
