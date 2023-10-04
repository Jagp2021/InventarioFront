export const nombreIdSteppers = {
  STEPPER_CREAR_TERCERO: 'step-informacion-basica',
};

export const Terceros = {
  NATURAL: 'NATU',
  JURIDICA: 'JURI',
  CONSORCIO: 'CONS',
  UNION_TEMPORAL: 'UNIO',
  TEXTO_NATURAL: 'Natural',
  TEXTO_JURIDICA: 'Jurídica',
  TEXTO_NATURALES: 'Naturales',
  TEXTO_JURIDICAS: 'Jurídicas',
  CREAR: 'Creación',
  EDITAR: 'Modificar',
  ACCION_CREAR: 'crear',
  ACCION_EDITAR: 'editar',
  TEXTO_AGREGAR: 'Agregar',
  TEXTO_EDITAR: 'Editar',
  VALOR_MAX_CARECTERES_RAZON: 250,
  VALOR_MAX_NIT: 9,
  VALOR_MAX_NIT_EXTRANJETO: 444449999,
  VALOR_MIN_NIT_EXTRANJETO: 444444001,
  SI: 'si',
  NO: 'no',
  ESTADOS_GENERAL: [
    { id: 'Activo', valor: true },
    { id: 'Inactivo', valor: false },
  ],
};

export const TIPOS_DOCUMENTO = {
  NIT: 'NITI',
  DOC_EXTRANJERO: 'DE',
  CED_CIUDADANIA: 'CC',
  CED_EXTRANJERIA: 'CE',
  TAR_IDENTIDAD: 'TI',
  PASAPORTE: 'PA',
  REG_CIVIL: 'RC',
  TAR_EXTRANJERIA: 'TARE',
  SIN_IDENTIFICACION: 'SINI',
};

export const MENSAJE = {
  EXISTE_TERCERO:
    'Ya existe en el sistema un tercero con dicho tipo y número de documento de identificación',
};
