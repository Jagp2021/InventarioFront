export const LISTA_SELECCION = {
  ESTADOS_VALORES: [
    { id: 'Activo', valor: true },
    { id: 'Inactivo', valor: false },
  ],
  VALORES_FORMULARIO: {
    codigo: null,
    valorAdministrable: true,
    dominioPadre: null,
    siglaPadre: null,
    entidadPciRegistraPadre: 0,
    usoSecuencia: null,
  },
  ENCABEZADO_LISTA: {
    activo: true,
    administrable: true,
    administrableSolo: false,
    universal: true,
    dominioPadre: null,
  },
  MSG_ELIMINAR: 'Se ha eliminado el valor:',
  MSG_GUARDAR: 'Registro exitoso de la lista:',
  MSG_M2:
    ' se encuentra en los valores de la lista, verifique y registre nuevamente. ',
  MSG_CREADO: 'Se ha modificado el valor: ',
  VALOR_MAX_CARECTERES_SIGLA: 4,
  VALOR_MAX_CARECTERES_DESCRIPCION: 150,
};
