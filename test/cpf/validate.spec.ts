import { describe, expect, it } from 'vitest';

import {
  cpfRule,
  isCPFShape,
  isValidCPF,
  normalizeCPF,
  stripCPFMask,
  validateCPF,
} from '../../src/documents/cpf';

describe('CPF validate', () => {
  it('removes CPF mask without side effects', () => {
    expect(stripCPFMask('529.982.247-25')).toBe('52998224725');
    expect(normalizeCPF('529.982.247-25')).toBe('52998224725');
  });

  it('detects CPF shape', () => {
    expect(isCPFShape('529.982.247-25')).toBe(true);
    expect(isCPFShape('123')).toBe(false);
  });

  it('validates CPF check digits', () => {
    expect(isValidCPF('529.982.247-25')).toBe(true);
    expect(isValidCPF('111.111.111-11')).toBe(false);
  });

  it('returns detailed CPF validation reasons', () => {
    expect(validateCPF('').reason).toBe('empty');
    expect(validateCPF('123').reason).toBe('invalid_shape');
    expect(validateCPF('111.111.111-11').reason).toBe('repeated_digits');
    expect(validateCPF('529.982.247-24').reason).toBe('invalid_check_digits');
    expect(validateCPF('529.982.247-25')).toEqual({
      kind: 'cpf',
      isValid: true,
      normalized: '52998224725',
      reason: 'valid',
    });
  });

  it('returns rule result for forms', () => {
    expect(cpfRule('123')).toBe('CPF invalido');
    expect(cpfRule('')).toBe(true);
  });
});
