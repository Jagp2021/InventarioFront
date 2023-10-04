import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Observable, delay } from 'rxjs';
import { VALOR_MAXIMO_CARACTERES_CLASIFICADOR } from 'src/app/core/constant/adm/constants';
import {
  NON_WHITE_SPACE_REG_EXP,
  SIN_ESPACIOS_CARACTERES_ESPECIALES,
  SOLO_NUMEROS,
} from 'src/app/core/utils/Patterns';
import { LocalStorageService } from 'src/app/data/local/local-storage.service';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { NivelClasificador } from 'src/app/domain/interface/adm/clasificador/nivelclasificador.interface';
import { ClasificadorStateService } from 'src/app/domain/service/adm/clasificador/clasificador-state.service';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { NivelClasificadorComponent } from '../nivel-clasificador/nivel-clasificador.component';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ADM } from 'src/app/core/constant/adm.constants';

@Component({
  selector: 'app-crear-clasificador',
  templateUrl: './crear-clasificador.component.html',
  styleUrls: ['./crear-clasificador.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CrearClasificadorComponent implements OnInit {
  @Input() listaClasificadoresObservable!: Observable<Clasificador[]>;
  @Input() styleCard = 'shadow-2';
  @Output() emmiter = new EventEmitter<boolean>();
  @ViewChild('dt') dt: Table | undefined;
  tipo!: String;
  idClasificador: number = 0;
  lItemsBreadcrumb: MenuItem[] = [];
  listaClasificadores: any[] = [];
  listaFuncionCatalogo: any[] = [];
  listaNiveles: any[] = [];
  selectedItem: any = null;
  lblBotonGuardar = 'CREAR';
  iconoBotonGuardar = 'pi pi-plus';
  bdeshabilitarAcciones = false;
  bmostrarConfirmacion = false;
  bDeshabilitar = false;
  listaTipoDato: any[] = [];

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private route: ActivatedRoute,
    private _dominioStateService: ListaSeccionStateService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
    private _clasificadorStateService: ClasificadorStateService,
    private router: Router,
    public dialogService: DialogService,
    private _localStorage: LocalStorageService,
    private _utilsService: UtilsService
  ) {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Clasificador' },
    ];
  }

  formClasificador = new FormGroup({
    Id: new FormControl('0', []),
    Nombre: new FormControl('', []),
    Descripcion: new FormControl('', [
      Validators.required,
      Validators.pattern(SIN_ESPACIOS_CARACTERES_ESPECIALES),
      Validators.pattern(NON_WHITE_SPACE_REG_EXP),
      Validators.maxLength(250),
    ]),
    Activo: new FormControl('true', [Validators.required]),
    FuncionCatalogo: new FormControl('', [Validators.required]),
    TopeCaracteres: new FormControl(
      {
        disabled: true,
        value: this._localStorage.getKey(
          VALOR_MAXIMO_CARACTERES_CLASIFICADOR
        ),
      },
      [
        Validators.required,
        Validators.pattern(SOLO_NUMEROS),
        Validators.min(1),
        Validators.max(Number(localStorage.getItem(VALOR_MAXIMO_CARACTERES_CLASIFICADOR))),
      ]
    ),
  });

  formNivelClasificador = new FormGroup({
    array: this._formBuilder.array([]),
  });

  /**
   * Descripción: Consulta los campos del formulario de clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  get formControlsClasificador(): FormGroup['controls'] {
    return this.formClasificador.controls;
  }

  ngOnInit(): void {
    this.consultarTipoDato();
    this._clasificadorStateService.getClasificador();
    this.listaClasificadoresObservable = this._clasificadorStateService.select(
      (e) => e.clasificadores
    );
    this.consultarFuncionCatalogo();
    if (this.config.data !== undefined) {
      this.tipo = this.config.data.tipo;
      this.listaClasificadoresObservable = this.config.data.observable;
      this.deshabilitarControles(this.config.data.data);
    } else {
    }

    if (this.listaClasificadoresObservable !== undefined) {
      this.listaClasificadoresObservable.subscribe({
        next: (resp) => {
          this.listaClasificadores = resp;
          if (this.tipo === undefined) {
            this.route.params.subscribe((params) => {
              const ID_CLASIFICADOR = Number(params['id']);
              this.idClasificador = ID_CLASIFICADOR;
              this.consultarClasificador(ID_CLASIFICADOR);
            });
          }
        },
      });
    } else {
    }
  }

  consultarClasificador(id: number) {
    if (id === 0) {
      this.tipo = 'crear';
    } else {
      if (this.listaClasificadores.length === 0) {
        return;
      }
      this.tipo = 'editar';
      let oClasificador = this.listaClasificadores.filter((e) => e.id === id);
      this.deshabilitarControles(oClasificador[0]);
    }
  }

  /**
   * Descripción: Lista de errores del formulario clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @param nombreCampo
   * @returns
   */
  listaErroresMensajes(nombreCampo: string): string {
    const errors = this.formClasificador.get(nombreCampo)?.errors;

    if (errors?.['required']) return 'Este campo es obligatorio.';
    if (errors?.['minlength']) return 'Debe agregar más caracteres.';
    if (errors?.['maxlength']) return 'No puede superar los 250 caracteres.';
    if (errors?.['min']) return 'Debe ser de mínimo 1';
    if (errors?.['max'])
      return 'Debe ser máximo de ' + VALOR_MAXIMO_CARACTERES_CLASIFICADOR;
    if (errors?.['pattern'] && nombreCampo === 'Descripcion')
      return 'No se permiten espacios ni caracteres especiales.';
    if (errors?.['pattern'] && nombreCampo === 'TopeCaracteres')
      return 'No puede contener caracteres de texto.';

    return '';
  }

  /**
   * Descripción: Consulta los Tipos de Datos
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  consultarTipoDato() {
    let filtroDominio = { Dominio1: 'TIPODATO' };
    this._dominioStateService.consultatTipoDato(filtroDominio);
    this._dominioStateService
      .select((e) => e.tipoDatoDominio)
      .subscribe({
        next: (resp: any[]) => {
          this.listaTipoDato = resp.filter((x) => x.sigla !== 'LOGI');
        },
      });
  }

  /**
   * Descripción: Deshabilitar controles de acuerdo a la acción del formulario
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  deshabilitarControles(datos: any) {
    switch (this.tipo) {
      case 'editar': {
        this.lblBotonGuardar = 'Editar';
        this.iconoBotonGuardar = 'pi pi-save';
        this.cargarInicialClasificador(false, datos);
        break;
      }

      case 'copiar': {
        this.formControlsClasificador['TopeCaracteres'].disable();
        this.formControlsClasificador['FuncionCatalogo'].disable();
        this.formControlsClasificador['Activo'].disable();
        this.bdeshabilitarAcciones = true;
        this.cargarInicialClasificador(true, datos);
        this.iconoBotonGuardar = 'pi pi-save';
        this.lblBotonGuardar = 'Guardar';
        break;
      }
    }
  }

  /**
   * Descripción: Validación de campos del clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @param campo
   * @returns
   */
  campoNoValido(campo: string) {
    return (
      this.formClasificador.get(campo)?.invalid &&
      this.formClasificador.get(campo)?.touched
    );
  }

  /**
   * Descripción: Consulta la lista de funciones de Catálogo
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  consultarFuncionCatalogo() {
    let filtroDominio = { Dominio1: 'FUNCIONCATALOGO' };
    this._dominioStateService.consultatFuncionCatalogo(filtroDominio);
    this._dominioStateService
      .select((e) => e.funcionCatalogoDominio)
      .subscribe({
        next: (resp) => {
          this.listaFuncionCatalogo = resp;
        },
      });
  }

  /**
   * Descripción: Acción guardar general de clasificadores
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  guardar() {
    this.bDeshabilitar = true;
    const niveles = this.cargarValoresNivelesGuardar();
    let model: Clasificador = {
      Id: this.formControlsClasificador['Id'].value,
      Nombre: this.formControlsClasificador['Descripcion'].value
        .toString()
        .substring(0, 50),
      Descripcion: this.formControlsClasificador['Descripcion'].value,
      TopeCaracteres: this.formControlsClasificador['TopeCaracteres'].value,
      Activo:
        this.formControlsClasificador['Activo'].value === 'true' ? true : false,
      FuncionCatalogo:
        this.formControlsClasificador['FuncionCatalogo'].value.sigla,
      NivelesClasificador: niveles,
    };
    switch (this.tipo) {
      case 'crear': {
        this.guardarClasificador(model);
        break;
      }
      case 'editar': {
        this.editarClasificador(model);
        break;
      }

      case 'copiar': {
        this.copiarClasificador(model);
        break;
      }
    }
  }

  /**
   * Descripción: Guardado de un clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  guardarClasificador(model: any) {
    if (
      this.validarExisteClasificador(
        this.formControlsClasificador['Descripcion'].value,
        this.formControlsClasificador['FuncionCatalogo'].value.sigla
      )
    ) {
      this.bDeshabilitar = false;
      return;
    }
    this._clasificadorStateService.saveClasificador(model);
    this._clasificadorStateService
      .select((e) => e.insertar)
      .pipe(delay(500))
      .subscribe({
        next: (resp) => {
          if (resp === undefined) {
            return;
          }
          this._messageService.add({
            severity: resp ? 'success' : 'error',
            summary: resp ? 'Creación correcta' : 'Fallo Creación',
            detail: resp
              ? `Registro exitoso del clasificador ${model.Descripcion}`
              : 'Ocurrió un error en la creación del clasificador. intentelo nuevamente',
          });
          this.emmiter.emit(true);
          setTimeout(() => {
            this.router.navigateByUrl('adm/clasificador');
          }, 1000);
        },
      });
  }

  /**
   * Descripción: Edición del clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 11/03/2023
   */
  editarClasificador(model: Clasificador) {
    if (
      this.validarExisteClasificador(
        this.formControlsClasificador['Descripcion'].value,
        this.formControlsClasificador['FuncionCatalogo'].value.sigla
      )
    ) {
      this.bDeshabilitar = false;
      return;
    }
    this._clasificadorStateService.updateClasificador(model);
    this._clasificadorStateService
      .select((e) => e.editar)
      .pipe(delay(500))
      .subscribe({
        next: (resp) => {
          if (resp === undefined) {
            return;
          }
          if (resp) {
            this._messageService.add({
              severity: resp ? 'success' : 'error',
              summary: resp ? 'Modificación correcta' : 'Fallo Módificación',
              detail: resp
                ? 'Clasificador modificado con exito'
                : 'Ocurrió un error en la modficación del clasificador. intentelo nuevamente',
            });
            setTimeout(() => {
              this.router.navigateByUrl('adm/clasificador');
            }, 1000);
          }
        },
      });
  }

  /**
   * Descripción: Agrega un nivel al clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 11/03/2023
   */
  agregarNivel() {
    let estado = false;
    const ref = this.dialogService.open(NivelClasificadorComponent, {
      header: 'Agregar nivel ',
      width: '55vw',
      data: { niveles: this.listaNiveles },
    });
    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          if (this.tipo == 'crear') {
            this.listaNiveles.push(resp);
          } else {
            resp.idClasificador = this.idClasificador;
            this._clasificadorStateService.saveNivelClasificador(resp);
            this._clasificadorStateService
              .select((e) => e.nivelesClasificadorRow)
              .subscribe({
                next: (response) => {
                  let data = <any>response;
                  if (data.id !== undefined && !estado) {
                    estado = true;
                    this.listaNiveles.push(response);
                    this._clasificadorStateService.resetNiveles();
                  }
                },
              });
          }
        }
      },
    });
  }

  /**
   * Descripción: Agrega un nivel al clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 11/03/2023
   */
  editarNivel(nivel: any, index: any) {
    const ref = this.dialogService.open(NivelClasificadorComponent, {
      header: 'Editar nivel ' + nivel.nombre,
      width: '80%',
      data: { nivel: nivel, index: index, niveles: this.listaNiveles },
    });
    ref.onClose.subscribe({
      next: (resp) => {
        if (resp !== undefined) {
          this.listaNiveles[index] = resp;
          this.calcularConsecutivos(resp);
          if (this.tipo === 'editar') {
            this.listaNiveles.forEach((element) => {
              this._clasificadorStateService.updateNivelClasificador(element);
            });
          }
        }
      },
    });
  }

  /**
   * Descripción: Eliminar un nivel del clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 11/03/2023
   * @param posicion
   * @returns
   */
  eliminarNivel(posicion: number) {
    if (this.tipo === 'editar' && this.listaNiveles.length <= 1) {
      this._messageService.add({
        severity: 'error',
        summary: 'Validación',
        detail:
          'No es posible dejar un clasificador con cero niveles en su estructura. Si no requiere utilizarlo se recomienda inactivarlo',
      });
      return;
    }

    this._confirmationService.confirm({
      message: `¿Esta seguro que desea eliminar el nivel?`,
      header: 'Eliminar nivel',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.tipo === 'editar') {
          this._clasificadorStateService.deleteNivelClasificador(
            this.listaNiveles[posicion]
          );
          this.listaNiveles.splice(posicion, 1);
          this.calcularConsecutivos();
          this.listaNiveles.forEach((element) => {
            this._clasificadorStateService.updateNivelClasificador(element);
          });
        } else {
          this.listaNiveles.splice(posicion, 1);
          this.calcularConsecutivos();
        }
      },
    });
  }

  /**
   * Descripción: Copia de un clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  copiarClasificador(model: any) {
    if (
      this.validarExisteClasificador(
        this.formControlsClasificador['Descripcion'].value,
        this.formControlsClasificador['FuncionCatalogo'].value.sigla
      )
    ) {
      return;
    }

    const datos = this.config.data.data;
    this._confirmationService.confirm({
      message: `¿Esta seguro que desea copiar la información del clasificador: ${datos.descripcion}?`,
      header: 'Copiar Clasificador',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._clasificadorStateService.copyClasificador(model);
        this._clasificadorStateService
          .select((e) => e.copiar)
          .subscribe({
            next: (resp) => {
              if (resp === undefined) {
                return;
              }
              if (resp) {
                this.ref.close({ estado: true, mensaje: model.Descripcion });
              } else {
                this._messageService.add({
                  severity: resp ? 'success' : 'error',
                  summary: resp ? 'Copia Clasificador' : 'Módificación',
                  detail: resp
                    ? `Registro exitoso del clasificador ${model.Descripcion}`
                    : 'Ocurrió un error en la modficación del clasificador. intentelo nuevamente',
                });
              }
            },
          });
      },
      reject: () => {
        this.bDeshabilitar = false;
      },
    });
  }

  /**
   * Descripción: Cancelar la creación de clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   */
  cancelar() {
    switch (this.tipo) {
      case 'crear': {
        this._confirmationService.confirm({
          ...ADM.ACCIONES_CONFIRM.cancel,
          ...ADM.ACCIONES_CONFIRM.buttons_class,
          accept: () => {
            this.selectedItem = null;
            this.formControlsClasificador['Descripcion'].reset();
            this.formControlsClasificador['FuncionCatalogo'].reset();
            this._localStorage.removeKey('VALORES_CLASIFICADOR');
            this.router.navigateByUrl('adm/clasificador');
          },
        });
        break;
      }
      case 'editar': {
        this._confirmationService.confirm({
          ...ADM.ACCIONES_CONFIRM.cancel,
          ...ADM.ACCIONES_CONFIRM.buttons_class,
          accept: () => {
            this.router.navigateByUrl('adm/clasificador');
          },
        });

        break;
      }
      case 'copiar': {
        this._confirmationService.confirm({
          ...ADM.ACCIONES_CONFIRM.cancel,
          ...ADM.ACCIONES_CONFIRM.buttons_class,
          accept: () => {
            this._localStorage.removeKey('VALORES_CLASIFICADOR');
            this.ref.destroy();
          },
        });
        break;
      }
    }
  }

  /**
   * Descripción: Valida la existencia de un clasificador
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @param nombre
   * @param funcionCatalogo
   * @returns
   */
  validarExisteClasificador(nombre: string, funcionCatalogo: string) {
    if (this.listaClasificadores.length === 0) {
      this._clasificadorStateService
        .select((e) => e.clasificadores)
        .subscribe({
          next: (resp) => {
            this.listaClasificadores = resp;
          },
        });
    }

    let lista = this.listaClasificadores.filter(
      (e) =>
        e.descripcion?.toLowerCase().trim() === nombre.toLowerCase().trim() &&
        e.funcionCatalogo?.toLowerCase().trim() ===
          funcionCatalogo.toLowerCase().trim()
    );

    if (lista.length > 0) {
      // Se valida cuando el nombre corresponde al mismo clasificador
      if (this.tipo === 'editar') {
        const id = this.formControlsClasificador['Id'].value;
        const nombre = this.formControlsClasificador['Descripcion'].value;
        if (nombre === lista[0].descripcion && id === lista[0].id) {
          return false;
        }
      }

      this._messageService.add({
        severity: 'error',
        summary: 'Validación',
        detail:
          'Ya existe un clasificador con el mismo nombre para la función de catálogo seleccionada',
      });
      this.bDeshabilitar = false;
    }
    return lista.length > 0;
  }

  /**
   * Descripción: Carga los valores de niveles que se van a guardar
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @returns
   */
  cargarValoresNivelesGuardar(): NivelClasificador[] {
    let niveles: NivelClasificador[] = [];
    for (let index = 0; index < this.listaNiveles.length; index++) {
      const nivel: NivelClasificador = {
        Id: this.listaNiveles[index].id,
        IdClasificador: this.listaNiveles[index].idClasificador,
        Nombre: this.listaNiveles[index].nombre,
        Longitud: this.listaNiveles[index].longitud,
        TipoDato: this.listaNiveles[index].tipoDato,
        Orden: this.listaNiveles[index].orden,
      };

      niveles.push(nivel);
    }
    return niveles;
  }

  /**
   * Descripción: Cargar los valores iniciales del clasificador cuando se va a hacer una edición o copia
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 12/03/2023
   * @param deshabilitar
   */
  cargarInicialClasificador(deshabilitar: boolean, datos: any) {
    setTimeout(() => {
      this.selectedItem = this.listaFuncionCatalogo.filter(
        (e: { sigla: string }) => e.sigla === datos.funcionCatalogo
      )[0];
    }, 100);

    this.formControlsClasificador['Id'].setValue(datos.id);
    this.formControlsClasificador['Descripcion'].setValue(
      this.tipo === 'copiar' ? '' : datos.descripcion
    );
    this.formControlsClasificador['Nombre'].setValue(
      this.tipo === 'copiar' ? '' : datos.nombre
    );
    this.formControlsClasificador['FuncionCatalogo'].setValue(
      this.selectedItem
    );
    if (this.tipo == 'editar') {
      this.formControlsClasificador['FuncionCatalogo'].disable();
    }
    this.formControlsClasificador['TopeCaracteres'].setValue(
      datos.topeCaracteres
    );
    this.listaNiveles = datos.nivelesClasificador;
    this.calcularConsecutivos();
  }

  /**
   * Descripción: Filtros globales de la tablas
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 27/03/2023
   * @param $event
   * @param stringVal
   */
  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  /**
   * Descripción: Actualizar el consecutivo de los niveles de acuerdo a los cambios
   * Autor: Asesoftware - Javier Gonzalez
   * Fecha: 27/03/2023
   */
  calcularConsecutivos(model?: any) {
    let arregloOrdenado: any[] = [];

    if (model !== undefined) {
      arregloOrdenado = this.listaNiveles.sort((p1, p2) => {
        if (p1.orden > p2.orden) {
          return 1;
        }
        if (p1.orden < p2.orden) {
          return -1;
        }
        if (p1.orden === p2.orden && p1.id === model.id) {
          return -1;
        }

        if (p1.orden === p2.orden && p2.id === model.id) {
          return -1;
        }
        return 0;
      });
    } else {
      arregloOrdenado = this.listaNiveles.sort((p1, p2) =>
        p1.orden > p2.orden ? -1 : p1.orden < p2.orden ? 1 : 0
      );
    }

    for (let index = 0; index < arregloOrdenado.length; index++) {
      const element = arregloOrdenado[index];
      const indice = this.listaNiveles.findIndex((e) => {
        return e.id === element.id;
      });
      this.listaNiveles[indice].orden = index + 1;
    }
  }

  asociarTipoDato(codigo: string) {
    var retorno: string = '';
    if (this.listaTipoDato.length == 0) {
      return '';
    }

    var aTipoDato = this.listaTipoDato.filter((e) => e.sigla === codigo);
    if (aTipoDato.length > 0) {
      retorno = aTipoDato[0].descripcion;
    }

    return retorno;
  }

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
