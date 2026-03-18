import { describe, expect, it } from 'vitest';

import { formatCNPJ, maskCNPJ } from '../../src/documents/cnpj';

describe('CNPJ format', () => {
  it('formats numeric and alphanumeric CNPJ values', () => {
    expect(formatCNPJ('04252011000110')).toBe('04.252.011/0001-10');
    expect(formatCNPJ('12abc34501de35')).toBe('12.ABC.345/01DE-35');
  });

  it('masks numeric and alphanumeric CNPJ values', () => {
    expect(maskCNPJ('04252011000110')).toBe('04.***.***/****-10');
    expect(maskCNPJ('12ABC34501DE35')).toBe('12.***.***/****-35');
  });
});
