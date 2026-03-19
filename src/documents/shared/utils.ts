import { isBlank, stripCNPJMaskChars } from "../../internal/helpers";
import { formatCNPJ } from "../cnpj/format";
import { maskCNPJ } from "../cnpj/mask";
import { isCNPJShape, isValidCNPJ, normalizeCNPJ } from "../cnpj/validate";
import { formatCPF } from "../cpf/format";
import { maskCPF } from "../cpf/mask";
import { isCPFShape, isValidCPF, normalizeCPF } from "../cpf/validate";
import type {
  DocumentHandler,
  DocumentInfo,
  DocumentKind,
  DocumentRuleInput,
  DocumentRuleResult,
} from "./types";

const DOCUMENT_PARTIAL_INPUT_REGEX = /^[A-Za-z0-9./\-\s]+$/;
const DOCUMENT_NORMALIZED_CONTENT_REGEX = /^[A-Z0-9]+$/;
const HAS_DIGIT_REGEX = /\d/;

const DOCUMENT_HANDLERS: readonly DocumentHandler[] = [
  {
    kind: "cpf",
    isShape: isCPFShape,
    isValid: isValidCPF,
    format: formatCPF,
    mask: maskCPF,
  },
  {
    kind: "cnpj",
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

export function stripDocumentMask(value: string): string {
  if (isBlank(value)) {
    return "";
  }

  return stripCNPJMaskChars(value);
}

export function normalizeDocument(value: string): string {
  if (isBlank(value)) {
    return "";
  }

  const kind = getDocumentKind(value);

  if (kind === "cpf") {
    return normalizeCPF(value);
  }

  if (kind === "cnpj") {
    return normalizeCNPJ(value);
  }

  return stripDocumentMask(value);
}

export function getDocumentKind(value: string): DocumentKind {
  return getHandlerByShape(value)?.kind ?? "unknown";
}

export function getValidDocumentKind(value: string): DocumentKind {
  return getHandlerByValidity(value)?.kind ?? "unknown";
}

export function isValidDocument(value: string): boolean {
  return getHandlerByValidity(value) !== undefined;
}

export function isPossibleDocument(value: string): boolean {
  if (isBlank(value)) {
    return false;
  }

  if (getDocumentKind(value) !== "unknown") {
    return true;
  }

  if (!DOCUMENT_PARTIAL_INPUT_REGEX.test(value)) {
    return false;
  }

  const normalized = stripDocumentMask(value);

  if (normalized.length === 0 || normalized.length > 14) {
    return false;
  }

  if (!HAS_DIGIT_REGEX.test(normalized)) {
    return false;
  }

  return DOCUMENT_NORMALIZED_CONTENT_REGEX.test(normalized);
}

export const looksLikeDocument = isPossibleDocument;

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

export function documentInfo(value: string): DocumentInfo {
  const kind = getDocumentKind(value);
  const isValid = isValidDocument(value);

  return {
    kind,
    isShape: kind !== "unknown",
    isValid,
    normalized: normalizeDocument(value),
    formatted: formatDocument(value),
    masked: isValid ? formatAndMaskDocument(value) : value,
  };
}

export function cpfCnpjRule(
  value: DocumentRuleInput,
  message = "CPF/CNPJ inválido.",
): DocumentRuleResult {
  if (isBlank(value)) {
    return true;
  }

  return isValidDocument(value) || message;
}

export const documentRule = cpfCnpjRule;
