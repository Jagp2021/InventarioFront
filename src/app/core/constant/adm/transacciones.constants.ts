export const TRANSACCIONES = {
  ESTADOS_VALORES: [
    { estado: 'Activo', valor: true },
    { estado: 'Inactivo', valor: false },
  ],
  MENSAJES: {
    MAX_REGISTRO_MIN_MASIVO: `El valor ingresado en el campo “Cantidad Máxima Registro masivo” debe ser mayor al definido en el parámetro “Mínimo registro masivo”`,
    MAX_REGISTRO_MAX_MASIVO: `El valor ingresado en el campo “Cantidad Máxima registro masivo” debe ser menor que el valor parametrizado “Máximo registro masivo”`,
    MAX_CARGAL_MIN_MASIVO: `El valor ingresado en el campo “Cantidad Máxima Carga en línea” debe ser mayor al definido en el parámetro “Mínimo carga masiva”`,
    MAX_CARGAL_MAX_MASIVO: `Cantidad Máxima Carga en línea o “Cantidad Máxima Carga en asíncrona” es mayor que el valor parametrizado en “Máximo carga masiva`,
    MAX_CARGAA_VAL_CARGAL: `El valor ingresado en el campo “Cantidad Máxima Carga” debe ser mayor que el valor ingresado en el campo “Cantidad Máxima Carga en línea”`,
    NO_LOG_NO_REQUERIMIENTO: `No puede seleccionar "Alto Requerimiento de Seguridad" sin habilitar "Generar Log de Auditoría"`,
    NO_REQUERIMIENTO_NO_DATOS: `No puede seleccionar "Datos Administrativos" sin habilitar "Alto Requerimiento de Seguridad"`,
    NO_CONTABILIZA_NO_AUTO: `No puede seleccionar "Contabiliza Automáticamente" sin habilitar "Contabiliza"`,
    CONTABILIZA_NO_ADMIN: `El estado de contabiliza y contabiliza automáticamente solo poder ser modificado por el Administrador funcional del sistema o su delegado, verifique y registre nuevamente.`,
    CATEGORIA_INACTIVA: `El estado de la categoría se encuentra inactivo, verifique y registre nuevamente`,
    VALOR_DUPLICADO: `ya se encuentra registrado, verifique y registre nuevamente`,
  },
  REGISTRO_MASIVO: {
    CANTIDAD_MAX_REGISTRO_MASIVO: 'CANTIDAD_MAX_REGISTRO_MASIVO',
    CANTIDAD_MIN_REGISTRO_MASIVO: 'CANTIDAD_MIN_REGISTRO_MASIVO',
  },
  CARGA_MASIVA: {
    CANTIDAD_MAX_CARGA_MASIVA: 'CANTIDAD_MAX_CARGA_MASIVA',
    CANTIDAD_MIN_CARGA_MASIVA: 'CANTIDAD_MIN_CARGA_MASIVA',
  },
  NOMBRE_LISTA_CATEGORIA : 'CATEGORIA',
  NOMBRE_LISTA_TIPO_TRANSACCION : 'TIPOTRANSACCION',
  NOMBRE_LISTA_FUNCION_NEGOCIO: 'FUNCIONNEGOCIO',
  NOMBRE_LISTA_ALTO_REQ_SEGURIDAD: 'REQUERIMIENTOSEGURIDAD',
  VALOR_ALTO_REQ_SEGURIDAD_DEFECTO: 'FOTO',
  TITULOS : {
    CREAR: 'Crear Transacciones',
    EDITAR: 'Modificar Transacciones',
    DESCRIPCION_CREAR: 'Permite crear las transacciones del sistema y definir sus parámetros',
    DESCRIPCION_EDITAR: 'Permite modificar las transacciones del sistema'
  },
  ESTADO_PENDIENTE_TRANSACCION : 'PEND',
  ESTADO_ACTUALIZADO_TRANSACCION: 'ACT'
};
