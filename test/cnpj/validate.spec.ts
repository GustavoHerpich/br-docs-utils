import { describe, expect, it } from 'vitest';

import {
  cnpjRule,
  hasCNPJAlpha,
  isAlphanumericCNPJ,
  isCNPJShape,
  isNumericCNPJ,
  isValidCNPJ,
  normalizeCNPJ,
  stripCNPJMask,
  validateCNPJ,
} from '../../src/documents/cnpj';

describe('CNPJ validate', () => {
  it('removes numeric or alphanumeric CNPJ mask', () => {
    expect(stripCNPJMask('04.252.011/0001-10')).toBe('04252011000110');
    expect(normalizeCNPJ('12.abc.345/01de-35')).toBe('12ABC34501DE35');
  });

  it('detects numeric and alphanumeric variants', () => {
    expect(isNumericCNPJ('04.252.011/0001-10')).toBe(true);
    expect(isAlphanumericCNPJ('12.ABC.345/01DE-35')).toBe(true);
    expect(hasCNPJAlpha('12.ABC.345/01DE-35')).toBe(true);
  });

  it('detects CNPJ shape', () => {
    expect(isCNPJShape('04.252.011/0001-10')).toBe(true);
    expect(isCNPJShape('12.ABC.345/01DE-35')).toBe(true);
    expect(isCNPJShape('12.ABC.345/01D-35')).toBe(false);
  });

  it('validates numeric and alphanumeric CNPJ', () => {
    expect(isValidCNPJ('04.252.011/0001-10')).toBe(true);
    expect(isValidCNPJ('12.ABC.345/01DE-35')).toBe(true);
    expect(isValidCNPJ('12.ABC.345/01DE-36')).toBe(false);
  });

  it('returns detailed CNPJ validation reasons', () => {
    expect(validateCNPJ('').reason).toBe('empty');
    expect(validateCNPJ('12.ABC.345/01D-35').reason).toBe('invalid_shape');
    expect(validateCNPJ('00.000.000/0000-00').reason).toBe('zeroed');
    expect(validateCNPJ('12.ABC.345/01DE-36').reason).toBe('invalid_check_digits');
    expect(validateCNPJ('12.ABC.345/01DE-35')).toEqual({
      kind: 'cnpj',
      isValid: true,
      normalized: '12ABC34501DE35',
      reason: 'valid',
    });
  });

  it('returns rule result for forms', () => {
    expect(cnpjRule('123')).toBe('CNPJ invalido');
    expect(cnpjRule('')).toBe(true);
  });
});
