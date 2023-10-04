import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { IMarca } from 'src/app/domain/interface/adm/marcas/marca.interface';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { MarcasStateService } from 'src/app/domain/service/adm/marcas/marcas-state.service';
import { DialogService } from 'primeng/dynamicdialog';
import { IValoresMarca } from 'src/app/domain/interface/adm/marcas/valores-marca.interface';
import { IRespuestaApi } from 'src/app/core/interface/respuesta-api.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ADM } from 'src/app/core/constant/adm.constants';
import { NO_ESPECIALES, NO_WHITE_SPACES } from 'src/app/core/utils/Patterns';
import { MARCAS } from 'src/app/core/constant/adm/marca.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IEstadoGeneral } from 'src/app/domain/interface/adm/lista-seleccion/lista-seleccion.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-frm-marcas-crear',
  templateUrl: './frm-marcas-crear.component.html',
  styleUrls: ['./frm-marcas-crear.component.scss'],
})
export class FrmMarcasCrearComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  public listaTipoDato: any[] = [];
  public listaFuncionCatalogo: any[] = [];
  public lItemsBreadcrumb: MenuItem[] = [];
  public lblBotonGuardar = 'Crear';
  public selectedItem: any = null;
  public selectedItem2: any = null;
  public bDisplayModal: boolean = false;
  public bDisplayModalCaracteristica: boolean = false;
  public oListaValoresMarca!: IValoresMarca;
  public sAccion: string = ADM.ACCION_CREAR;
  public sAccionModal: string = ADM.ACCION_CREAR;
  public sListaSeleccion: string = '';
  public oValoresMarca: any = [];
  public oCopiaValoresMarca: any = [];
  public bEditando: boolean = false;
  public respuesta: any = [];
  public oDataMarca: any = [];
  public oValorMarca: IMarca = {};
  public oListaMarcas: IMarca[] = [];
  public oEstado: IEstadoGeneral[] = MARCAS.ESTADOS_VALORES;
  private accion$!: Subscription;
  private listaMarcas$!: Subscription;
  public bDefinicionCaracteristicas: boolean = false;
  public bValorDominio: boolean = false;

  constructor(
    private _listaSeleccionState: ListaSeccionStateService,
    private _marcasStateService: MarcasStateService,
    private _confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _utilsService: UtilsService
  ) {}
  formMarca = new FormGroup({
    id: new FormControl('0', []),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(MARCAS.VALOR_MAX_CARECTERES_NOMBRE),
      Validators.pattern(NO_ESPECIALES),
      Validators.pattern(NO_WHITE_SPACES),
    ]),
    activo: new FormControl(true, [Validators.required]),
    funcionCatalogo: new FormControl('', [Validators.required]),
    tipoDato: new FormControl('', [Validators.required]),
    caracteristicaUso: new FormControl(),
  });

  formValoresPosiblesMarcas: FormGroup = this._formBuilder.group({
    id: 0,
    codigo: [
      '',
      [
        Validators.required,
        Validators.maxLength(MARCAS.VALOR_MAX_CARECTERES_CODIGO),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
    ],
    idMarca: 0,
    valor: [
      '',
      [
        Validators.required,
        Validators.maxLength(MARCAS.VALOR_MAX_CARECTERES_VALOR),
        Validators.pattern(NO_ESPECIALES),
        Validators.pattern(NO_WHITE_SPACES),
      ],
    ],
    activo: [true, [Validators.required]],
    orden: 0,
  });

  /**
   * Descripción: Consulta los campos del formulario de marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  get formControlsMarca(): FormGroup['controls'] {
    return this.formMarca.controls;
  }

  /**
   * Descripción: Consulta los campos del formulario de ValoresPosiblesMarcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 14/03/2023
   */
  get formControlsValoresPosiblesMarcas(): FormGroup['controls'] {
    return this.formValoresPosiblesMarcas.controls;
  }

  ngOnInit(): void {
    this.listaMarcas$ = this._marcasStateService
      .select((e) => e.marcas)
      .subscribe({
        next: (e) => {
          this.oListaMarcas = e;
        },
      });
    this.consultarListaTipoDato();
    this.consultarFuncionCatalogo();
    this.accion$ = this._route.params.subscribe(({ id }) => {
      this.sAccion =
        id === '' || id === undefined ? ADM.ACCION_CREAR : ADM.ACCION_EDITAR;
      this.lblBotonGuardar = id === '' || id === undefined ? 'Crear' : 'Editar';
      let marca: IMarca = {
        nombre: id,
      };
      if (this.sAccion === ADM.ACCION_EDITAR) {
        this.obtenerMarca(marca);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.accion$) this.accion$.unsubscribe();
    if (this.listaMarcas$) this.listaMarcas$.unsubscribe();
  }
  /**
   * Descripción: Lista de errores del formulario Marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 14/03/2023
   * @param nombreCampo
   * @returns
   */
  listaErroresMensajes(nombreCampo: string): string {
    const errors =
      this.formMarca.get(nombreCampo)?.errors ||
      this.formControlsValoresPosiblesMarcas[nombreCampo]?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    // if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength'] && nombreCampo === 'valor')
      return 'Debe ser máximo de ' + MARCAS.VALOR_MAX_CARECTERES_VALOR;
    if (errors?.['maxlength'] && nombreCampo === 'codigo')
      return 'Debe ser máximo de ' + MARCAS.VALOR_MAX_CARECTERES_CODIGO;
    if (errors?.['maxlength'] && nombreCampo === 'nombre')
      return 'Debe ser máximo de ' + MARCAS.VALOR_MAX_CARECTERES_NOMBRE;
    if (
      (errors?.['pattern'] && nombreCampo === 'nombre') ||
      (errors?.['pattern'] && nombreCampo === 'valor') ||
      (errors?.['pattern'] && nombreCampo === 'codigo')
    )
      return 'No se permiten espacios ni caracteres especiales.';
    // if (errors?.['pattern'] && nombreCampo === 'TopeCaracteres')
    //   return 'No puede contener caracteres de texto.';

    return '';
  }

  /**
   * Descripción: Validación de campos del Marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   * @param campo
   * @returns
   */
  campoNoValido(campo: string) {
    return (
      (this.formMarca.get(campo)?.invalid &&
        this.formMarca.get(campo)?.touched) ||
      (this.formControlsValoresPosiblesMarcas[campo]?.invalid &&
        this.formControlsValoresPosiblesMarcas[campo]?.touched)
    );
  }

  /**
   * Descripción: Acción de Cancelar los cambios del formulario valores de marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  cerrarModal() {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this.bDisplayModal = false;
        this.formValoresPosiblesMarcas.reset({
          idMarca: '',
          valor: '',
          activo: '',
          orden: 0,
          id: 0,
        });
      },
    });
  }

  /**
   * Descripción: Acción de Cancelar los cambios del formulario definir caracteristicas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  cerrarModalCaracteristicas() {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this.bDisplayModalCaracteristica = false;
      },
    });
  }

  /**
   * Descripción: Acción de Cancelar los cambios y redirigir a la interfaz de marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  cancelarProceso(): void {
    this._confirmationService.confirm({
      ...ADM.ACCIONES_CONFIRM.cancel,
      ...ADM.ACCIONES_CONFIRM.buttons_class,
      accept: () => {
        this._router.navigateByUrl('adm/marcasFuncion');
      },
    });
  }

  /**
   * Descripción: Agrega los valores de la marca si el dominio es booleano
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public valorDominio(valor: any) {
    if (valor.value.sigla === MARCAS.VALOR_BOLEANO) {
      this.oCopiaValoresMarca = JSON.parse(JSON.stringify(this.oValoresMarca));
      this.oValoresMarca = MARCAS.VALOR_MARCA_BOLEANO;
      this.bValorDominio = true;
    } else {
      this.oValoresMarca = this.oCopiaValoresMarca;
      this.bValorDominio = false;
    }
  }

  /**
   * Descripción: Servicio que consulta la lista de dominio para tipos de datos
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   */
  public consultarListaTipoDato(): void {
    let filtroDominio = { Dominio1: 'TIPODATO' };
    this._listaSeleccionState.consultarListaTipoDato(filtroDominio);
    this._listaSeleccionState
      .select((resp) => resp.oListaTipoDato)
      .subscribe({
        next: (resp) => {
          this.listaTipoDato = resp;
        },
      });
  }

  /**
   * Descripción: Servicio que consulta la lista de función de catálogo
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 10/03/2023
   */
  public consultarFuncionCatalogo(): void {
    let filtroDominio = { Dominio1: 'FUNCIONCATALOGO' };
    this._listaSeleccionState.consultatFuncionCatalogo(filtroDominio);
    this._listaSeleccionState
      .select((e) => e.funcionCatalogoDominio)
      .subscribe({
        next: (resp) => {
          this.listaFuncionCatalogo = resp;
        },
      });
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  /**
   * Descripción: Acción obtener una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public async obtenerMarca(sValorMarca?: any) {
    let respuesta = await this._marcasStateService.obtenerMarca<IRespuestaApi>(
      sValorMarca
    );
    this.respuesta = respuesta.data[0];
    this.oValoresMarca = respuesta.data[0].valoresMarcas;
    this.oDataMarca = respuesta.data[0];
    this.obtenerValoresMarca();
    this.cargarDatosMarca(this.respuesta);
  }

  /**
   * Descripción: Acción que me permite cargar la informacion del formulario de marcas
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public cargarDatosMarca(respuesta: any): void {
    this.selectedItem = this.listaFuncionCatalogo.filter(
      (e) => e.sigla === respuesta.funcionCatalogo
    )[0];
    this.selectedItem2 = this.listaTipoDato.filter(
      (e) => e.sigla === respuesta.tipoDato
    )[0];
    if (this.selectedItem != undefined && this.selectedItem2 != undefined) {
      this.formControlsMarca['id'].setValue(respuesta.id);
      this.formControlsMarca['nombre'].setValue(respuesta.nombre);
      this.formControlsMarca['activo'].setValue(respuesta.activo);
      this.formControlsMarca['funcionCatalogo'].setValue(this.selectedItem);
      this.formControlsMarca['tipoDato'].setValue(this.selectedItem2);
      this.formControlsMarca['caracteristicaUso'].setValue(
        respuesta.caracteristicaUso
      );
      this.bValorDominio =
        this.selectedItem2.codigo === MARCAS.VALOR_BOLEANO ? true : false;
    }
  }

  /**
   * Descripción: Acción que me permite abrir el modal de valores marca y cargar los valores del formulario
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public modalValoresMarca(sTipoAccion: string, oValorMarca?: IValoresMarca) {
    if (this.sAccion === ADM.ACCION_EDITAR) {
      this.formValoresPosiblesMarcas.patchValue({
        ...oValorMarca,
      });
      this.sAccionModal = ADM.ACCION_EDITAR;
    } else {
      this.sAccionModal = ADM.ACCION_CREAR;
    }
    this.bDisplayModal = true;
  }

  /**
   * Descripción: Acción que permite editar los valores de una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public async editarValoresMarca() {
    this.oValorMarca = {
      ...this.formValoresPosiblesMarcas.value,
      activo:
        this.formValoresPosiblesMarcas.value.activo === 'true' ? true : false,
    };
    this.respuesta =
      await this._marcasStateService.editarValorMarca<IRespuestaApi>(
        this.oValorMarca
      );
    this.obtenerValoresMarca();
    this.bDisplayModal = false;
  }

  /**
   * Descripción: Acción que permite cargar los valores de una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public async obtenerValoresMarca() {
    let valoresMarca: IValoresMarca = {
      idMarca: this.oDataMarca.id,
    };
    this.respuesta =
      await this._marcasStateService.obtenerValoresMarca<IRespuestaApi>(
        valoresMarca
      );
    this.oValoresMarca = this.respuesta.data;
  }

  /**
   * Descripción: Acción que permite guardar los valores de una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public async guardarValorMarca() {
    let mensaje: string;
    let valoresMarcas: any = this.formValoresPosiblesMarcas.value;
    let datos: IValoresMarca = {
      ...valoresMarcas,
      idMarca: 0,
    };
    const bExisteCodigo = this.validarValorMarca(valoresMarcas.codigo);
    const bExisteValor = this.validarValorMarca(valoresMarcas.valor);

    bExisteCodigo === true
      ? (mensaje = MARCAS.MSG_ERROR_VALIDAR_CODIGO)
      : (mensaje = MARCAS.MSG_ERROR_VALIDAR_VALOR);
    if (bExisteCodigo || bExisteValor) {
      this._utilsService.fnMostrarMensaje({
        severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
        summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
        detail: mensaje,
      });
    } else {
      if (this.sAccion === ADM.ACCION_CREAR) {
        this.oValoresMarca.push(datos);
        this.bDisplayModal = false;
        this.limpiarFormularioValoresMarca();
      } else if (this.sAccion === ADM.ACCION_EDITAR) {
        if (this.formValoresPosiblesMarcas.value.id > 0) {
          this.editarValoresMarca();
        } else {
          this.crearValorMarca();
        }
      }
    }
  }

  public marca(oMarca: any) {
    let marca: any = oMarca;
    let datos: IMarca = {
      id: marca.id,
      nombre: marca.nombre,
      activo: marca.activo,
      funcionCatalogo: this.formControlsMarca['funcionCatalogo'].value.sigla,
      tipoDato: this.formControlsMarca['tipoDato'].value.sigla,
      caracteristicaUso: marca.caracteristicaUso,
      tipoMarca: 'ADIC',
      valoresMarcas: this.oValoresMarca,
    };
    return datos;
  }

  /**
   * Descripción: Acción que permite validar si una marca ya existe
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public validarMarca(marca: any): boolean {
    let bExisteData = false;
    if (this.sAccion === ADM.ACCION_CREAR) {
      bExisteData = this.oListaMarcas.some((valor: any) => {
        return valor.nombre === marca.nombre;
      });
    } else {
      bExisteData = this.oListaMarcas.some((valor: any) => {
        if (
          valor.nombre === this.formMarca.value.nombre &&
          this.sAccion === ADM.ACCION_EDITAR
        ) {
          return false;
        }
        return false;
      });
    }
    return bExisteData;
  }

  /**
   * Descripción: Acción que permite validar los valores de una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public validarValorMarca(valoresMarcas: string): boolean {
    let bExisteData = false;
    if (this.sAccion === ADM.ACCION_CREAR) {
      bExisteData = this.oValoresMarca.some((valor: any) => {
        return valor.valor === valoresMarcas || valor.codigo === valoresMarcas;
      });
    } else {
      bExisteData = this.oValoresMarca.some((valor: any) => {
        if (
          valor.valor === valoresMarcas ||
          (valor.codigo === valoresMarcas && this.sAccion === ADM.ACCION_EDITAR)
        ) {
          return false;
        }
        return false;
      });
    }

    return bExisteData;
  }

  /**
   * Descripción: Acción que permite crear los valores de una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public async crearValorMarca() {
    let valoresMarca: IValoresMarca = {
      ...this.formValoresPosiblesMarcas.value,
      idMarca: 0,
    };

    this.respuesta =
      await this._marcasStateService.crearValorMarca<IRespuestaApi>(
        valoresMarca
      );

    if (this.respuesta.estado) {
      this.oValoresMarca.push(this.respuesta.data);
      this.limpiarFormularioValoresMarca();
      this.bDisplayModal = false;
    }
    this.obtenerValoresMarca();
  }

  /**
   * Descripción: Acción que permite eliminar los valores de una marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public eliminarValoresMarca(nIndice: number, oValorMarca?: any) {
    let valorMarca: IValoresMarca = {
      ...oValorMarca,
    };
    if (this.sAccion === ADM.ACCION_CREAR) {
      this.oValoresMarca.splice(nIndice, 1);
    } else if (this.sAccion === ADM.ACCION_EDITAR) {
      this.respuesta =
        this._marcasStateService.eliminarValorMarca<IRespuestaApi>(valorMarca);
      this.oValoresMarca.splice(nIndice, 1);
    }
  }

  /**
   * Descripción: Acción que permite guardar los datos de la marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public async guardarDatosMarca(sAccionCaracteristica: string) {
    let oMarca = this.marca(this.formMarca.value);
    const bValidarMarca = this.validarMarca(oMarca);
    let respuesta: any;

    if (this.sAccion === ADM.ACCION_CREAR) {
      if (bValidarMarca) {
        await this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: MARCAS.MSG_ERROR_VALIDAR_MARCA.concat(' '),
        });
      } else {
        respuesta = await this._marcasStateService.crearMarca<IRespuestaApi>(
          oMarca
        );
        //this.crearEditarMarca(this.sAccion);
        await this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.creado,
          summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
          detail: respuesta.mensaje,
        });
        //this._marcasStateService.mensajeFormularioMarca.emit(true);
        setTimeout(() => {
          this._router.navigateByUrl('adm/marcasFuncion');
        }, 2000);
      }
    } else {
      if (bValidarMarca) {
        await this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.fallido,
          summary: ADM.ACCIONES_TOAST.toastMensaje.fallido,
          detail: MARCAS.MSG_ERROR_VALIDAR_MARCA.concat(' '),
        });
      } else {
        respuesta = await this._marcasStateService.editarMarca<IRespuestaApi>(
          oMarca
        );

        if (this.bDefinicionCaracteristicas === true) {
          this.bDisplayModalCaracteristica = false;
          let caracteristica =
            this.formMarca.value.caracteristicaUso == true
              ? 'Heredable'
              : 'Suceptible';
          respuesta = {
            mensaje: `La Marca ${this.formMarca.value.nombre} perteneciente a la función de catálogo ${this.selectedItem.descripcion} fue definida correctamente con la característica ${caracteristica}`,
          };
        }
        await this._utilsService.fnMostrarMensaje({
          severity: ADM.ACCIONES_TOAST.toastTipo.creado,
          summary: ADM.ACCIONES_TOAST.toastMensaje.creado,
          detail: respuesta.mensaje,
        });
        setTimeout(() => {
          if (sAccionCaracteristica === '') {
            this._router.navigateByUrl('adm/marcasFuncion');
          }
        }, 2000);
        //this._marcasStateService.mensajeFormularioMarca.emit(true);
      }
    }
  }

  /**
   * Descripción: Acción que permite limpiar el formulario de valores marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public limpiarFormularioValoresMarca(): void {
    this.formValoresPosiblesMarcas.reset({
      idMarca: '',
      valor: '',
      activo: '',
      orden: 0,
      id: 0,
    });
  }

  /**
   * Descripción: Acción que permite abrir el modal de caracteristicas de4 uso de la marca
   * Autor: Asesoftware - Danilo Narvaez
   * Fecha: 12/03/2023
   */
  public modalDefinirCaracteristicas(sTipoAccion: string) {
    this.oDataMarca.caracteristicaUso = this.formMarca.value.caracteristicaUso;
    this.bDisplayModalCaracteristica = true;
    if (sTipoAccion === ADM.ACCION_EDITAR) {
      this.cargarDatosMarca(this.oDataMarca);
      this.bDefinicionCaracteristicas = true;
    }
  }

  /**
   * @description Configura el hover del table para mostrar u ocultar los botones de acción
   * @param {any} e Evento disparado del table
   * @param {number} nIndice Número del indice para mostrar en el Row
   * @param {boolean} bMostrar Determina si se muestra u oculta la acción
   * @return {void} No retorna datos
   */
  fnMostrarOcultarBotones(
    oEvento: any,
    nIndice: number,
    bMostrar: boolean,
    sId?: string
  ): void {
    this._utilsService.fnMostrarOcultarBotonesPrimario(
      oEvento,
      nIndice,
      bMostrar,
      sId
    );
  }
}
