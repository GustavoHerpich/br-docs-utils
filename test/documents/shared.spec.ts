import { describe, expect, it } from "vitest";

import {
  cpfCnpjRule,
  documentRule,
  formatAndMaskDocument,
  formatDocument,
  getDocumentKind,
  getValidDocumentKind,
  isValidDocument,
  maskDocument,
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

  it("exposes reusable generic rules", () => {
    expect(cpfCnpjRule("529.982.247-25")).toBe(true);
    expect(cpfCnpjRule("123")).toBe("CPF/CNPJ invalido");
    expect(documentRule("")).toBe(true);
  });
});
