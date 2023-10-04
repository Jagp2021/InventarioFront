import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ConfirmEventType,
  ConfirmationService,
  MenuItem,
  Message,
  MessageService,
} from 'primeng/api';
import { ADM } from 'src/app/core/constant/adm.constants';
import { IBandera } from 'src/app/core/interface/message-service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ReporteTransaccionesStateService } from 'src/app/domain/service/adm/reporte-transacciones/reporte-transacciones-state.service';

@Component({
  selector: 'app-linea-grafica',
  templateUrl: './linea-grafica.component.html',
  styleUrls: ['./linea-grafica.component.scss'],
})
export class LineaGraficaComponent implements OnInit {
  public sValorBuscar: string = '';
  public aDatoSelected: any[] = [];

  public first: number = 0;
  public rows: number = 10;

  public items: MenuItem[] = [];
  public sCargarElemento: string = '';
  public bCargarTablas: boolean = false;

  // public aTipoTransaccion: any[] = []; //TODO: interface de tipo de transacción
  // public aFuncionNegocio: any[] = []; //TODO: interface de función negocio y de dónde sale
  // public aCategorias: any[] = []; //TODO: interface de función categorías
  // public aEstados: any[] = [];
  // public aAtributos: any[] = [];
  // public bMostrarLoading = false;
  // public displayModal: boolean = false;

  // public rangeDates!: Date[];
  // public sTituloDinamico: string = '';

  // frmCrearValorDominio: FormGroup = this._formBuilder.group({
  //   indice: 0,
  //   dominio: '',
  //   sigla: '',
  //   entidadPciRegistra: 0,
  //   codigo: null,
  //   descripcion: '',
  //   activo: '',
  //   valorAdministrable: true,
  //   dominioPadre: null,
  //   siglaPadre: null,
  //   entidadPciRegistraPadre: 0,
  //   orden: 0,
  //   idPerfilRegistra: 0,
  //   usoSecuencia: null,
  // });

  // get frmLista(): FormGroup['controls'] {
  //   return this.frmCrearValorDominio.controls;
  // }

  // public messages!: Message[];

  // formGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _reporteTransacciones: ReporteTransaccionesStateService,
    private _confirmationService: ConfirmationService,
    private _utilsService: UtilsService,
    private _sanitizar: DomSanitizer,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._utilsService.fnCambiarIdiomaCalendario();

    this.items = [
      {
        label: 'Tablas',
        items: [
          {
            label: 'Tabla general',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
          {
            label: 'Tabla Freeze',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
          {
            label: 'Tabla sin paginador',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
          {
            label: 'Tabla paginador back',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
          {
            label: 'Tabla scroll',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
          {
            label: 'Tabla con sidebar',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
          {
            label: 'Tabla desplegable',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
          {
            label: 'Tabla múltiple',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
          {
            label: 'Tabla edición on',
            command: (e) => {
              this.sCargarElemento = 'tablas';
            },
          },
        ],
      },
      {
        label: 'Navegadores',
        items: [
          {
            label: 'Step',
            command: (e) => {
              this.sCargarElemento = 'navegador';
            },
          },
          {
            label: 'Treeview',
            command: (e) => {
              this.sCargarElemento = 'navegador';
            },
          },
          {
            label: 'Tabview',
            command: (e) => {
              this.sCargarElemento = 'navegador';
            },
          },
          {
            label: 'Accordeon',
            command: (e) => {
              this.sCargarElemento = 'navegador';
            },
          },
          {
            label: 'Picklist',
            command: (e) => {
              this.sCargarElemento = 'navegador';
            },
          },
        ],
      },
      {
        label: 'Notificadores',
        items: [
          {
            label: 'Toast',
            command: (e) => {
              this.sCargarElemento = 'notificador';
            },
          },
          {
            label: 'Toast personalizado',
            command: (e) => {
              this.sCargarElemento = 'notificador';
            },
          },
          {
            label: 'Banderas',
            command: (e) => {
              this.sCargarElemento = 'notificador';
            },
          },
          {
            label: 'Evento del sistema',
            command: (e) => {
              this.sCargarElemento = 'notificador';
            },
          },
          {
            label: 'Loading',
            command: (e) => {
              this.sCargarElemento = 'notificador';
            },
          },
        ],
      },
      {
        label: 'Botones',
        items: [
          {
            label: 'Énfasis',
            command: (e) => {
              this.sCargarElemento = 'botones';
            },
          },
          {
            label: 'Outlined',
            command: (e) => {
              this.sCargarElemento = 'botones';
            },
          },
          {
            label: 'Acciones masivas',
            command: (e) => {
              this.sCargarElemento = 'botones';
            },
          },
        ],
      },
      {
        label: 'Filtros genéricos',
        items: [
          {
            label: 'Filtro terceros',
            command: (e) => {
              this.sCargarElemento = 'filtrogen';
            },
          },
          {
            label: 'Filtro cuentas',
            command: (e) => {
              this.sCargarElemento = 'filtrogen';
            },
          },
          {
            label: 'Filtro posiciones',
            command: (e) => {
              this.sCargarElemento = 'filtrogen';
            },
          },
          {
            label: 'Filtro transacciones',
            command: (e) => {
              this.sCargarElemento = 'filtrogen';
            },
          },
          {
            label: 'Filtro usuarios',
            command: (e) => {
              this.sCargarElemento = 'filtrogen';
            },
          },
          {
            label: 'Filtro perfiles',
            command: (e) => {
              this.sCargarElemento = 'filtrogen';
            },
          },
        ],
      },
      {
        label: 'Filtros',
        items: [
          {
            label: 'Sencillo',
            command: (e) => {
              this.sCargarElemento = 'filtros';
            },
          },
          {
            label: 'Búsqueda extra',
            command: (e) => {
              this.sCargarElemento = 'filtros';
            },
          },
          {
            label: 'Atributo desplegable',
            command: (e) => {
              this.sCargarElemento = 'filtros';
            },
          },
          {
            label: 'Autocomplete',
            command: (e) => {
              this.sCargarElemento = 'filtros';
            },
          },
        ],
      },
      {
        label: 'Modales',
        items: [
          {
            label: 'Modal',
            command: (e) => {
              this.sCargarElemento = 'modal';
            },
          },
          {
            label: 'Confirmación',
            command: (e) => {
              this.sCargarElemento = 'modal';
            },
          },
        ],
      },
      {
        label: 'Otros',
        items: [
          {
            label: 'Miga de pan',
            command: (e) => {
              this.sCargarElemento = 'otros';
            },
          },
          {
            label: 'Datos énfasis',
            command: (e) => {
              this.sCargarElemento = 'otros';
            },
          },
          {
            label: 'Ítem descriptivo',
            command: (e) => {
              this.sCargarElemento = 'otros';
            },
          },
          {
            label: 'Rango de fecha',
            command: (e) => {
              this.sCargarElemento = 'otros';
            },
          },
          {
            label: 'Iconos',
            command: (e) => {
              this.sCargarElemento = 'otros';
            },
          },
          {
            label: 'Plantilla correo',
            command: (e) => {
              this.sCargarElemento = 'otros';
            },
          },
          {
            label: 'Plantilla Código Base',
            command: (e) => {
              this.sCargarElemento = 'otros';
            },
          },
        ],
      },
      {
        label: 'Formularios',
        items: [
          {
            label: 'Lista Dropdown',
            command: (e) => {
              this.sCargarElemento = 'forms';
            },
          },
          {
            label: 'Multiselección',
            command: (e) => {
              this.sCargarElemento = 'forms';
            },
          },
          {
            label: 'Multidata',
            command: (e) => {
              this.sCargarElemento = 'forms';
            },
          },
          {
            label: 'Radios, checks y switch',
            command: (e) => {
              this.sCargarElemento = 'forms';
            },
          },
          {
            label: 'Caja de texto',
            command: (e) => {
              this.sCargarElemento = 'forms';
            },
          },
          {
            label: 'Calendario',
            command: (e) => {
              this.sCargarElemento = 'forms';
            },
          },
          {
            label: 'Múltiples fechas',
            command: (e) => {
              this.sCargarElemento = 'forms';
            },
          },
          {
            label: 'Hora',
            command: (e) => {
              this.sCargarElemento = 'forms';
            },
          },
        ],
      },
    ];

    // this.formGroup = new FormGroup({
    //   selectedCategory: new FormControl(),
    // });

    // this.messages = [
    //   {
    //     severity: 'success',
    //     summary: 'Registro exitoso',
    //     detail:
    //       'Se ha registrado de forma <br>  /nbs exitosa la transacción TRA001',
    //   },
    // ];
  }

  onPageChange(oEvent: any) {}

  // fnCargarTablas() {
  //   this.bCargarTablas = true;
  // }

  // fnConfirm1() {
  //   this._confirmationService.confirm({
  //     key: 'loading',
  //     accept: () => {
  //       this._messageService.add({
  //         severity: 'info',
  //         summary: 'Confirmed',
  //         detail: 'You have accepted',
  //       });
  //     },
  //     reject: (type: ConfirmEventType) => {
  //       switch (type) {
  //         case ConfirmEventType.REJECT:
  //           this._messageService.add({
  //             severity: 'error',
  //             summary: 'Rejected',
  //             detail: 'You have rejected',
  //           });
  //           break;
  //         case ConfirmEventType.CANCEL:
  //           this._messageService.add({
  //             severity: 'warn',
  //             summary: 'Cancelled',
  //             detail: 'You have cancelled',
  //           });
  //           break;
  //       }
  //     },
  //   });
  // }

  // fnCerrarBandera() {
  //   this._messageService.clear();
  //   this.aBandera = {};
  // }

  // fnLimpiarFormulario() {}

  // fnLanzarToastPersonalizado() {
  //   this._messageService.addAll([
  //     {
  //       key: 'gfg',
  //       severity: 'success',
  //       summary: 'Hey Geek, are you sure?',
  //       life: 100000,
  //     },
  //   ]);
  // }

  // onReject() {}
  // onConfirm() {}

  // fnCancelar() {
  //   this._confirmationService.confirm({
  //     ...ADM.ACCIONES_CONFIRM.cancel,
  //     ...ADM.ACCIONES_CONFIRM.buttons_class,
  //     accept: () => {
  //       this._utilsService.fnMostrarMensaje({
  //         severity: 'success',
  //         summary: 'Mensaje Éxito',
  //         detail: 'Mensaje de prueba Toast',
  //       });
  //     },
  //   });
  // }

  // fnGenerarReporte() {
  //   this.displayModal = true;
  // }

  // fnCerrarModal() {
  //   this.sTituloDinamico = 'MODAL CON DATOS';
  //   this._confirmationService.confirm({
  //     ...ADM.ACCIONES_CONFIRM.cancel,
  //     ...ADM.ACCIONES_CONFIRM.buttons_class,
  //     accept: () => {
  //       this.displayModal = false;
  //       this._utilsService.fnMostrarMensaje({
  //         severity: 'info',
  //         summary: 'Mensaje Éxito',
  //         detail: 'Mensaje de prueba Toast',
  //       });
  //     },
  //   });
  // }

  // fnValidarCampoValor(sCampo: string): string {
  //   const errors = this.frmLista[sCampo]?.errors;

  //   if (errors?.['required']) return 'Este campo es obligatorio.';
  //   if (errors?.['minlength']) return 'Debe agregar más caracteres.';
  //   if (errors?.['maxlength'])
  //     return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
  //   if (errors?.['pattern'])
  //     return 'No se permiten espacios ni caracteres especiales.';
  //   if (errors?.['listaRegistrada'])
  //     return 'Ya se encuentra registrado como lista, verifique y registre nuevamente.';

  //   return '';
  // }

  // fnListarErrorFormValor(sCampo: string): string {
  //   const errors = this.frmLista[sCampo]?.errors;

  //   if (errors?.['required']) return 'Este campo es obligatorio.';
  //   if (errors?.['minlength']) return 'Debe agregar más caracteres.';
  //   if (errors?.['maxlength'])
  //     return `No puede superar los ${errors?.['maxlength'].requiredLength} caracteres.`;
  //   if (errors?.['pattern'])
  //     return 'No se permiten espacios ni caracteres especiales.';
  //   if (errors?.['listaRegistrada'])
  //     return 'Ya se encuentra registrado como lista, verifique y registre nuevamente.';

  //   return '';
  // }
}
