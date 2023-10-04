import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DependenciaAfectacionStateService } from 'src/app/domain/service/adm/dependencia-afectacion/dependencia-afectacion-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';

import { ADM } from 'src/app/core/constant/adm.constants';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { DEPENDENCIAS } from 'src/app/core/constant/adm/dependencia-afectacion';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IDependenciasAfectacion } from 'src/app/domain/interface/adm/dependencia-afectacion/dependencia-afectacion.interface';
import {
  NO_ESPECIALES,
  NO_ESPECIALES_SI_GUION,
  NO_WHITE_SPACES,
} from 'src/app/core/utils/Patterns';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';

@Component({
  selector: 'app-frm-crear-dependencia',
  templateUrl: './frm-crear-dependencia.component.html',
  styleUrls: ['./frm-crear-dependencia.component.scss'],
})
export class FrmCrearDependenciaComponent implements OnInit {
  public aFuncionNegocio: IValoresDominio[] = [];
  public sTipo!: string;
  public aEstados: any[] = [];

  frmCrearDependencia: FormGroup = this._formBuilder.group({
    idEntidadesPci: Number(localStorage.getItem('IdEntidadesPci')),
    funcionCatalogo: [null, [Validators.required]],
    codigo: [
      null,
      [
        Validators.required,
        Validators.pattern(NO_WHITE_SPACES),
        Validators.pattern(NO_ESPECIALES_SI_GUION),
      ],
    ],
    estado1: [{ value: true, disabled: true }],
    estado: 'REGI',
    descripcion: [
      null,
      [
        Validators.required,
        Validators.pattern(NO_WHITE_SPACES),
        Validators.pattern(NO_ESPECIALES),
      ],
    ],
    id: null,
  });

  get frmCrear(): FormGroup['controls'] {
    return this.frmCrearDependencia.controls;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _dependenciaAfectacionState: DependenciaAfectacionStateService,
    private _listaSeccionStateService: ListaSeccionStateService,
    private _utilsService: UtilsService,
    private _oConfig: DynamicDialogConfig,
    public oRef: DynamicDialogRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.sTipo = this._oConfig.data.sTipo;
    this.aEstados = [
      { name: 'Gestionada', key: 'GEST' },
      { name: 'Inactiva', key: 'INAC' },
    ];

    await this.fnConsultarFuncionNegocio();

    if (this._oConfig.data.sTipo === DEPENDENCIAS.TIPO_EDITAR) {
      this.fnCargarInformacionDependencia();
    }
  }

  fnCargarInformacionDependencia() {
    const oData: IDependenciasAfectacion = this._oConfig.data.oDependencia;

    this.frmCrearDependencia.patchValue({
      idEntidadesPci: Number(oData.idEntidadesPci),
      funcionCatalogo: oData.funcionDependencia,
      codigo: oData.codigoDependencia,
      estado: oData.estadoDependencia,
      descripcion: oData.descripcionDependencia,
    });

    this.frmCrear['funcionCatalogo'].disable();
    this.frmCrear['codigo'].disable();
    this.frmCrear['descripcion'].disable();
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
   * @description Cerrar la modal
   * @return {void} No retorna datos
   */
  fnCerrarModal(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      header: 'Cancelar Operación',
      accept: async () => {
        this.frmCrearDependencia.reset({
          idEntidadesPci: Number(localStorage.getItem('IdEntidadesPci')),
          estado: true,
        });
        this.oRef.close(true);
      },
    });
  }

  async fnCrearDependencia(): Promise<void> {
    let oResultado: IRespuestaApi;

    if (this._oConfig.data.sTipo === DEPENDENCIAS.TIPO_CREAR) {
      oResultado =
        await this._dependenciaAfectacionState.fnGuardarDependeciaAfectacion(
          this.frmCrearDependencia.getRawValue()
        );
    } else {
      oResultado =
        await this._dependenciaAfectacionState.fnActualizarDependeciaAfectacion(
          this.frmCrearDependencia.getRawValue()
        );
    }

    const sValidarMsg =
      oResultado.codigo === ADM.ESTADO_HTTP_200 && oResultado.estado
        ? 'creado'
        : 'fallido';

    this._utilsService.fnMostrarMensaje({
      severity: ADM.ACCIONES_TOAST.toastTipo[sValidarMsg],
      summary: ADM.ACCIONES_TOAST.toastMensaje[sValidarMsg],
      detail: oResultado.mensaje,
    });

    this.oRef.close(true);
  }

  /**
   * @description Validar de forma general los campos del formulario
   * @param {string} sCampo Campo del formulario a validar
   * @return {boolean | undefined} Retorna un booleano o indefinido al realizar la validación
   */
  fnValidarCampo(sCampo: string): boolean | undefined {
    return this.frmCrear[sCampo]?.invalid && this.frmCrear[sCampo]?.touched;
  }

  /**
   * @description Obtener los posibles errores el formulario
   * @param {string} sCampo Recibe el campo del formulario a validar
   * @return {string} Retorna el mensaje de error para el formulario
   */
  fnListarErrorForm(sCampo: string): string {
    const errors = this.frmCrear[sCampo]?.errors;
    if (errors?.['required']) return DEPENDENCIAS.MSG_FORM.REQUIRED;
    if (errors?.['pattern']) return DEPENDENCIAS.MSG_FORM.PATTERN;

    return '';
  }
}
