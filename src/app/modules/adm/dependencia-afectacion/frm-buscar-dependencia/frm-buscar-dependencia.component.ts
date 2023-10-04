import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ADM } from 'src/app/core/constant/adm.constants';
import { DEPENDENCIAS } from 'src/app/core/constant/adm/dependencia-afectacion';
import { IDependenciasAfectacion } from 'src/app/domain/interface/adm/dependencia-afectacion/dependencia-afectacion.interface';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';

@Component({
  selector: 'app-frm-buscar-dependencia',
  templateUrl: './frm-buscar-dependencia.component.html',
  styleUrls: ['./frm-buscar-dependencia.component.scss'],
})
export class FrmBuscarDependenciaComponent implements OnInit {
  @Output() oBusquedaDependencias = new EventEmitter<IDependenciasAfectacion>(
    true
  );
  public aFuncionNegocio: IValoresDominio[] = [];
  public aEstadoDependencia: IValoresDominio[] = [];

  frmBuscarDependencia: FormGroup = this._formBuilder.group({
    idEntidadesPci: localStorage.getItem('IdEntidadesPci'),
    funcionDependencia: null,
    codigoDependencia: null,
    descripcion: null,
    estado: null,
    indicaVinculacion: true,
  });

  get frmCuenta(): FormGroup['controls'] {
    return this.frmBuscarDependencia.controls;
  }
  constructor(
    private _formBuilder: FormBuilder,
    private _listaSeccionStateService: ListaSeccionStateService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fnConsultarFuncionNegocio();
    await this.fnConsultarEstadosDependencias();
  }

  /**
   * @description Cargar los tipos de Función de negocio de las Listas de Selección
   * @return {Promise<void>} No retorna datos
   */
  async fnConsultarFuncionNegocio(): Promise<void> {
    this.aFuncionNegocio = (
      await this._listaSeccionStateService.fnConsultarDominio({
        dominio1: DEPENDENCIAS.DOMINIO_FUNCIONCATALOGO,
      })
    ).data[0]?.valoresDominios;

    if (this.aFuncionNegocio.length > 0) {
      this.aFuncionNegocio = this.aFuncionNegocio.filter((keys) => {
        return (
          keys.codigo === DEPENDENCIAS.GASTOS ||
          keys.codigo === DEPENDENCIAS.INGRESOS
        );
      });
    } else {
      throw Error(ADM.PERDIDA_DATA);
    }
  }

  /**
   * @description Cargar los tipos de Función de negocio de las Listas de Selección
   * @return {Promise<void>} No retorna datos
   */
  async fnConsultarEstadosDependencias(): Promise<void> {
    this.aEstadoDependencia = (
      await this._listaSeccionStateService.fnConsultarDominio({
        dominio1: DEPENDENCIAS.DOMINIO_DEPENDENCIA,
      })
    ).data[0]?.valoresDominios;

    if (this.aEstadoDependencia.length > 0) {
    } else {
      throw Error(ADM.PERDIDA_DATA);
    }
  }

  fnLimpiarFormulario() {
    this.frmBuscarDependencia.reset({
      idEntidadesPci: localStorage.getItem('IdEntidadesPci'),
      indicaVinculacion: true,
    });
  }

  fnBuscarDependencia() {
    this.oBusquedaDependencias.emit(this.frmBuscarDependencia.getRawValue());
  }
}
