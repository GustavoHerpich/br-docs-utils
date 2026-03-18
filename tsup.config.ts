import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'documents/index': 'src/documents/index.ts',
    'documents/cpf/index': 'src/documents/cpf/index.ts',
    'documents/cnpj/index': 'src/documents/cnpj/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2022',
  treeshake: true,
});
