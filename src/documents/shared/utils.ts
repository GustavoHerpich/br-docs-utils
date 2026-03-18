import { isBlank } from '../../internal/helpers';
import { formatCNPJ } from '../cnpj/format';
import { maskCNPJ } from '../cnpj/mask';
import { isCNPJShape, isValidCNPJ } from '../cnpj/validate';
import { formatCPF } from '../cpf/format';
import { maskCPF } from '../cpf/mask';
import { isCPFShape, isValidCPF } from '../cpf/validate';
import type {
  DocumentHandler,
  DocumentKind,
  DocumentRuleInput,
  DocumentRuleResult,
} from './types';

const DOCUMENT_HANDLERS: readonly DocumentHandler[] = [
  {
    kind: 'cpf',
    isShape: isCPFShape,
    isValid: isValidCPF,
    format: formatCPF,
    mask: maskCPF,
  },
  {
    kind: 'cnpj',
    isShape: isCNPJShape,
    isValid: isValidCNPJ,
    format: formatCNPJ,
    mask: maskCNPJ,
  },
] as const;

function getHandlerByShape(value: string): DocumentHandler | undefined {
  return DOCUMENT_HANDLERS.find((handler) => handler.isShape(value));
}

function getHandlerByValidity(value: string): DocumentHandler | undefined {
  return DOCUMENT_HANDLERS.find((handler) => handler.isValid(value));
}

export function getDocumentKind(value: string): DocumentKind {
  return getHandlerByShape(value)?.kind ?? 'unknown';
}

export function getValidDocumentKind(value: string): DocumentKind {
  return getHandlerByValidity(value)?.kind ?? 'unknown';
}

export function isValidDocument(value: string): boolean {
  return getHandlerByValidity(value) !== undefined;
}

export function formatDocument(value: string): string {
  const handler = getHandlerByShape(value);

  return handler ? handler.format(value) : value;
}

export function maskDocument(value: string): string {
  const handler = getHandlerByShape(value);

  return handler ? handler.mask(value) : value;
}

export function formatAndMaskDocument(value: string): string {
  const handler = getHandlerByValidity(value);

  return handler ? handler.mask(value) : value;
}

export function cpfCnpjRule(
  value: DocumentRuleInput,
  message = 'CPF/CNPJ invalido',
): DocumentRuleResult {
  if (isBlank(value)) {
    return true;
  }

  return isValidDocument(value) || message;
}

export const documentRule = cpfCnpjRule;
