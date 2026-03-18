import { describe, expect, it } from 'vitest';

import { formatCPF, maskCPF } from '../../src/documents/cpf';

describe('CPF format', () => {
  it('formats CPF values', () => {
    expect(formatCPF('52998224725')).toBe('529.982.247-25');
  });

  it('masks CPF values', () => {
    expect(maskCPF('52998224725')).toBe('529.***.***-25');
  });
});
