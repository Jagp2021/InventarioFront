export const SOLO_NUMEROS = /^[0-9]+$/;
export const SIN_CARACTERES_ESPECIALES =
  /^[^-`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/;
export const NON_WHITE_SPACE_REG_EXP = new RegExp('\\S');
export const SIN_ESPACIOS_CARACTERES_ESPECIALES = new RegExp(
  /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+$/
);
export const START_WHITE_SPACE = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]/;
export const END_WHITE_SPACE = /[A-Za-zÀ-ÖØ-öø-ÿ0-9]$/;
export const NO_WHITE_SPACES = /^(?! ).*[^ ]$/;
export const NO_ESPECIALES = /^[^-`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/;
export const NO_ESPECIALES_GUION = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/;
export const NO_ESPECIALES_SI_GUION = /^[\w,-]+$/;
