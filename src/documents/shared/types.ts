export type DocumentKind = 'cpf' | 'cnpj' | 'unknown';

export type KnownDocumentKind = Exclude<DocumentKind, 'unknown'>;

export type DocumentRuleInput = string | null | undefined;

export type DocumentRuleResult = true | string;

export interface DocumentHandler {
  readonly kind: KnownDocumentKind;
  readonly isShape: (value: string) => boolean;
  readonly isValid: (value: string) => boolean;
  readonly format: (value: string) => string;
  readonly mask: (value: string) => string;
}
