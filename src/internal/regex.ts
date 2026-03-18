export const NON_DIGITS_REGEX = /\D+/g;
export const CNPJ_MASK_CHARS_REGEX = /[.\-/\s]+/g;
export const HAS_ALPHA_REGEX = /[A-Z]/;
export const CPF_SHAPE_REGEX = /^\d{11}$/;
export const CNPJ_SHAPE_REGEX = /^[A-Z0-9]{12}\d{2}$/;
export const REPEATED_DIGITS_REGEX = /^(\d)\1+$/;
export const ZEROED_CNPJ_REGEX = /^0{14}$/;
