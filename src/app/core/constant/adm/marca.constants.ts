export const MARCAS = {
  ESTADOS_VALORES: [
    { id: 'Activo', valor: true },
    { id: 'Inactivo', valor: false },
  ],
  MSG_ELIMINAR_MARCA: 'Se ha eliminado la marca',
  //MSG_ELIMINAR_VALOR_MARCA: 'Se ha eliminado el valor de la marca',
  MSG_GUARDAR: 'Registro exitoso de la marca',
  MSG_GUARDAR_VALOR_MARCA: 'Registro exitoso del valor de la marca',
  MSG_ERROR_VALIDAR_CODIGO: 'El código que intenta registrar ya fue agregado',
  MSG_ERROR_VALIDAR_VALOR:
    'El texto asociado que intenta registrar ya fue agregado',
  MSG_ERROR_VALIDAR_VALOR_MARCA:
    'El código y texto asociado que intenta registrar ya fue agregados',
  MSG_ERROR_VALIDAR_MARCA:
    'El nombre de la marca que intenta registrar ya fue agregado',
  VALOR_MAX_CARECTERES_CODIGO: 10,
  VALOR_MAX_CARECTERES_VALOR: 30,
  VALOR_MAX_CARECTERES_NOMBRE: 250,
  VALOR_MARCA_BOLEANO: [
    {
      id: 0,
      codigo: 'S',
      idMarca: 0,
      valor: 'SI',
      orden: 0,
      activo: true,
      idMarcaNavigation: null,
    },
    {
      id: 0,
      codigo: 'N',
      idMarca: 0,
      valor: 'NO',
      orden: 0,
      activo: true,
      idMarcaNavigation: null,
    },
  ],
  VALOR_BOLEANO: 'LOGI',
};
