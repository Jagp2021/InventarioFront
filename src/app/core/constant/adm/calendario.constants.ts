export const CALENDARIO = {
  PENULTIMO_DIA_LABORAL: 'PDLA',
  PRIMER_DIA_LABORAL: 'PDHE',
  FIN_SEMANA: 'FISE',
  FESTIVO: 'FES',
  MSG_PENULTIMO_DIA_LABORAL:
    'Existe en el calendario una fecha ya definida para el “Penúltimo día laboral del año”, solo se permite una fecha para este tipo de día',
  MSG_PRIMER_DIA_LABORAL:
    'Existe en el calendario una fecha ya definida para el “Primer día hábil del año para las entidades financieras”, solo se permite una fecha para este tipo de día',
  MSG_DICIEMBRE:
    'La fecha para el “Penúltimo día laboral del año”, debe ser un día del mes de diciembre',
  MSG_ENERO:
    'La fecha para el “Primer día hábil del año para las entidades financieras”, debe ser un día del mes de enero',
  MSG_PRIMER_ULTIMO:
    'La fecha para el “Primer día hábil del año para las entidades financieras” y “Penúltimo día laboral del año” no deben estar en el calendario definidas como tipo de día “Dia no hábil para entidades Financieras” ni como “Dia no Laboral”',
  MSG_FESTIVOS:
    'La fecha para “Dia no hábil para entidades Financieras” y “Dia no Laboral” no deben estar en el calendario definidas como tipo de día “Primer día hábil del año para las entidades financieras” ni  “Penúltimo día laboral del año”',
  MSG_FESTIVOS_FIN_SEMANA:
    'La fecha para “Festivos” y ”Fin de semana” deben estar en el calendario definidas como “Dia no hábil para entidades Financieras” y “Dia no Laboral”',
  MSG_EXISTE_FECHA: 'La fecha que desea adicionar ya hace parte del calendario',
  MSG_ANIO_NO_COINCIDE: 'El año de la fecha no coincide con el año fiscal',
};
