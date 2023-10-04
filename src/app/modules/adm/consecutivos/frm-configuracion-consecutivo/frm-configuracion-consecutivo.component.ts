import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ADM } from 'src/app/core/constant/adm.constants';
import { IConsecutivoTipoDocumento } from 'src/app/domain/interface/adm/consecutivo/consecutivo-tipo-documento.interface';
import { IValoresDominio } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { ConfiguracionConsecutivoStateService } from 'src/app/domain/service/adm/consecutivo/configuracion-consecutivo-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';

@Component({
  selector: 'app-frm-configuracion-consecutivo',
  templateUrl: './frm-configuracion-consecutivo.component.html',
  styleUrls: ['./frm-configuracion-consecutivo.component.scss'],
})
export class FrmConfiguracionConsecutivoComponent implements OnInit {
  public oTipoDocumentoSoporteSeleccionado: IValoresDominio[] = [];
  public sigla: string = '';
  public descripcion: string = '';
  public oListaSecuenciaDocumentoSoporte: IConsecutivoTipoDocumento[] = [];
  public oListaTipoDocumentoSoporte: any[] = [];

  constructor(
    private _confirmationService: ConfirmationService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _configuracionConsecutivoStateService: ConfiguracionConsecutivoStateService,
    private _listaSeleccionState: ListaSeccionStateService,
    private _formBuilder: FormBuilder
  ) {}

  // TODO: PENDIENTE REMOVER ESTO PORQUE VIENE POR SESIÓN
  public stipoDocumentoSoporte: string | null = localStorage.getItem(
    'stipoDocumentoSoporte'
  );

  frmConfiguracionConsecutivo: FormGroup = this._formBuilder.group({
    id: 0,
    tipoDocumentoSoporte: '',
    ultimoValor: 0,
    entidadPci: null,
  });

  get frmControlConfiguracionConsecutivo(): FormGroup['controls'] {
    return this.frmConfiguracionConsecutivo.controls;
  }
  ngOnInit(): void {
    this.oTipoDocumentoSoporteSeleccionado =
      this.config.data.tipoDocumentoSoporte;
    this.sigla = this.config.data.tipoDocumentoSoporte.sigla;
    this.descripcion = this.config.data.tipoDocumentoSoporte.descripcion;

    this.cargaInicial();
  }

  public campoNoValido(campo: string) {
    return (
      this.frmConfiguracionConsecutivo.get(campo)?.invalid &&
      this.frmConfiguracionConsecutivo.get(campo)?.touched
    );
  }

  public listaErroresMensaje(nombreCampo: string): string {
    const errors = this.frmConfiguracionConsecutivo.get(nombreCampo)?.errors;
    if (errors?.['required']) return 'Este campo es obligatorio.';
    return '';
  }

  /**
   * Descripción: Acción de Cancelar los cambios del formulario
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   */
  public cancelar(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this.ref.close();
      },
    });
  }

  /**
   * Descripción: Acción de guardar la secuencia del consecutivo
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 13/04/2023
   */
  public async crearConsecutivo(): Promise<void> {
    let respuesta: any;
    let oDatosConsecutivo: IConsecutivoTipoDocumento = {
      id: 0,
      tipoDocumentoSoporte: this.config.data.tipoDocumentoSoporte.codigo,
      ultimoValor: 0,
      entidadPci: Number(this.stipoDocumentoSoporte),
    };
    let respuestaMensaje = {
      estado: true,
      mensaje:
        'El o las definiciones de los consecutivos fueron guardados con éxito',
    };
    let oDatosValoresDominio: IValoresDominio = {
      ...this.config.data.tipoDocumentoSoporte,
      usoSecuencia: this.frmConfiguracionConsecutivo.value.entidadPci,
    };
    respuesta =
      await this._configuracionConsecutivoStateService.validarActualizacionConsecutivoSecuenciaDocumentoSoporte(
        oDatosConsecutivo
      );

    if (respuesta.estado === true) {
      await this._listaSeleccionState.editarValoresListaSeleccion(
        oDatosValoresDominio
      );
      this.ref.close(true);
      respuesta = respuestaMensaje;
      await this.consultarTipoDocumentoSoporte();
    }
    //this.ref.close(false);
    this._configuracionConsecutivoStateService.mensajeFormularioConsecutivo.emit(
      respuesta
    );
  }
  /**
   * Descripción: Función que consulta un listado de documentos
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 15/04/2023
   */
  public async consultarSecuenciaDocumentoSoporte(): Promise<void> {
    this.oListaSecuenciaDocumentoSoporte = (
      await this._configuracionConsecutivoStateService.consultarSecuenciaDocumentoSoporte(
        {
          tipoDocumentoSoporte: this.config.data.tipoDocumentoSoporte.codigo,
        }
      )
    ).data;
  }

  /**
   * Descripción: Función que consulta la lista de expedidor
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 11/04/2023
   */
  public async consultarTipoDocumentoSoporte(): Promise<void> {
    this.oListaTipoDocumentoSoporte = (
      await this._listaSeleccionState.consultarTipoDocumentoSoporte({
        Dominio: 'TIPODOCUMENTOSOPORTE',
      })
    ).data;
  }

  public async cargaInicial() {
    let datos = this.config.data.tipoDocumentoSoporte;
    this.frmConfiguracionConsecutivo.patchValue({
      entidadPci: datos.usoSecuencia,
    });
  }
}
