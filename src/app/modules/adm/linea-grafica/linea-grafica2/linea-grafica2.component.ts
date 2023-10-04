import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-linea-grafica2',
  templateUrl: './linea-grafica2.component.html',
  styleUrls: ['./linea-grafica2.component.scss'],
})
export class LineaGrafica2Component implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];

  frmGenerarReporte: FormGroup = this._formBuilder.group({
    tipoTransaccion: '',
    funcionNegocio: '',
    codigoTransaccion: '',
    nombreTransaccion: '',
    categoriaTransaccion: '',
    estadoTransaccion: '',
    atributoLog: '',
    atributoAlto: '',
    atributoDatos: '',
    formatoSalida: 'pdf',
  });

  frmCrearValorDominio: FormGroup = this._formBuilder.group({
    indice: 0,
    dominio: '',
    sigla: '',
    entidadPciRegistra: 0,
    codigo: null,
    descripcion: '',
    activo: '',
    valorAdministrable: true,
    dominioPadre: null,
    siglaPadre: null,
    entidadPciRegistraPadre: 0,
    orden: 0,
    idPerfilRegistra: 0,
    usoSecuencia: null,
  });

  get frmLista(): FormGroup['controls'] {
    return this.frmCrearValorDominio.controls;
  }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Línea Gráfica' },
      { label: 'Nuevos Cambios' },
    ];
  }

  fnGenerarReporte() {}

  fnCancelar() {}
  fnFiltrar(event: any) {}
  fnLimpiarFormulario() {}
}
