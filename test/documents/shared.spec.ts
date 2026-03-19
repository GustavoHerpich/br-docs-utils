import { describe, expect, it } from "vitest";

import {
  cpfCnpjRule,
  documentInfo,
  documentRule,
  formatAndMaskDocument,
  formatDocument,
  getDocumentKind,
  getValidDocumentKind,
  isPossibleDocument,
  isValidDocument,
  looksLikeDocument,
  maskDocument,
  normalizeDocument,
  stripDocumentMask,
} from "../../src/documents";

describe("document shared utils", () => {
  it("detects document kind by shape", () => {
    expect(getDocumentKind("52998224725")).toBe("cpf");
    expect(getDocumentKind("12ABC34501DE35")).toBe("cnpj");
    expect(getDocumentKind("123")).toBe("unknown");
  });

  it("detects valid document kind", () => {
    expect(getValidDocumentKind("529.982.247-25")).toBe("cpf");
    expect(getValidDocumentKind("12.ABC.345/01DE-35")).toBe("cnpj");
    expect(getValidDocumentKind("123")).toBe("unknown");
  });

  it("formats, masks and validates documents generically", () => {
    expect(isValidDocument("529.982.247-25")).toBe(true);
    expect(formatDocument("12ABC34501DE35")).toBe("12.ABC.345/01DE-35");
    expect(maskDocument("52998224725")).toBe("529.***.***-25");
    expect(formatAndMaskDocument("12.ABC.345/01DE-35")).toBe(
      "12.***.***/****-35",
    );
  });

  it("normalizes document values generically", () => {
    expect(stripDocumentMask("12.abc.345/01de-35")).toBe("12ABC34501DE35");
    expect(normalizeDocument("529.982.247-25")).toBe("52998224725");
    expect(normalizeDocument("12.ABC.345/01DE-35")).toBe("12ABC34501DE35");
    expect(normalizeDocument("12.345")).toBe("12345");
  });

  it("supports permissive document detection for UI inputs", () => {
    expect(isPossibleDocument("12.345")).toBe(true);
    expect(looksLikeDocument("12ABC345")).toBe(true);
    expect(isPossibleDocument("abc")).toBe(false);
    expect(isPossibleDocument("123456789012345")).toBe(false);
  });

  it("returns aggregated document info", () => {
    expect(documentInfo("12.ABC.345/01DE-35")).toEqual({
      kind: "cnpj",
      isShape: true,
      isValid: true,
      normalized: "12ABC34501DE35",
      formatted: "12.ABC.345/01DE-35",
      masked: "12.***.***/****-35",
    });
  });

  it("exposes reusable generic rules", () => {
    expect(cpfCnpjRule("529.982.247-25")).toBe(true);
    expect(cpfCnpjRule("123")).toBe("CPF/CNPJ inválido.");
    expect(documentRule("")).toBe(true);
  });
});
