export type DocumentKind = 'cpf' | 'cnpj' | 'unknown';

export type KnownDocumentKind = Exclude<DocumentKind, 'unknown'>;

export type DocumentRuleInput = string | null | undefined;

export type DocumentRuleResult = true | string;

export type ValidationReason = 'valid' | 'empty' | 'invalid_shape' | 'invalid_check_digits';

export type CPFValidationReason = ValidationReason | 'repeated_digits';

export type CNPJValidationReason = ValidationReason | 'zeroed';

export interface ValidationResult<TKind extends KnownDocumentKind, TReason extends string> {
  readonly kind: TKind;
  readonly isValid: boolean;
  readonly normalized: string;
  readonly reason: TReason;
}

export type CPFValidationResult = ValidationResult<'cpf', CPFValidationReason>;

export type CNPJValidationResult = ValidationResult<'cnpj', CNPJValidationReason>;

export interface DocumentInfo {
  readonly kind: DocumentKind;
  readonly isShape: boolean;
  readonly isValid: boolean;
  readonly normalized: string;
  readonly formatted: string;
  readonly masked: string;
}

export interface DocumentHandler {
  readonly kind: KnownDocumentKind;
  readonly isShape: (value: string) => boolean;
  readonly isValid: (value: string) => boolean;
  readonly format: (value: string) => string;
  readonly mask: (value: string) => string;
}
