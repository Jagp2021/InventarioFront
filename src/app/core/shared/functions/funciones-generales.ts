export function convertirDatos(params: any) {}
export function convertirFecha(fecha: any) {
  if (fecha === null || fecha === '') {
    return '';
  } else {
    let fechaConvertir = new Date(
      fecha.getTime() - fecha.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
    return fechaConvertir;
  }
}

export function convertirFechaHora(fecha: any) {
  if (fecha === null || fecha === '') {
    return '';
  } else {
    let hora = fecha?.toLocaleTimeString('en-US', {
      hour12: false,
    });
    return hora;
  }
}
