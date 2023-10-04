import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ADM } from 'src/app/core/constant/adm.constants';
import { UtilsService } from 'src/app/core/services/utils.service';
import { IFormPosicionesFG } from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';
import { IRestriccionEntidadPci } from 'src/app/domain/interface/adm/disponibilidad/restriccion-entidad-pci.interface';
import { IRestriccionSistema } from 'src/app/domain/interface/adm/disponibilidad/restriccion-sistema.interface';

@Component({
  selector: 'app-com-tabla-restriccion-unidad-subunidades',
  templateUrl: './com-tabla-restriccion-unidad-subunidades.component.html',
  styleUrls: ['./com-tabla-restriccion-unidad-subunidades.component.scss'],
})
export class ComTablaRestriccionUnidadSubunidadesComponent
  implements OnInit, OnChanges
{
  @Input() oRestriccionDisponibilidadId: IRestriccionSistema[] = [];
  @Output() bAmbitoSeleccionadoPgn = new EventEmitter<boolean>();
  @Output() bAmbitoSeleccionadoNoPgn = new EventEmitter<boolean>();
  @Output() oListaUnidadPgnEmitter = new EventEmitter<
    IRestriccionEntidadPci[]
  >();
  @Output() oListaUnidadNoPgnEmitter = new EventEmitter<
    IRestriccionEntidadPci[]
  >();
  public oUnidadesSubunidades: IRestriccionEntidadPci[] = [];
  public oListaUnidadPgn: IRestriccionEntidadPci[] = [];
  public oListaUnidadNoPgn: IRestriccionEntidadPci[] = [];
  public oListaUnidadPgnEnviar: IRestriccionEntidadPci[] = [];
  public oListaUnidadNoPgnEnviar: IRestriccionEntidadPci[] = [];
  public oEntidadesConvertirPgn: IRestriccionEntidadPci[] = [];
  public oEntidadesConvertirNoPgn: IRestriccionEntidadPci[] = [];
  public oListaUnidadPgnEmit: IRestriccionEntidadPci[] = [];
  public oListaUnidadNoPgnEmit: IRestriccionEntidadPci[] = [];
  public nIdRestriccion: number = 0;
  public sValorCheck: any = null;
  public sValorCheckNoPgn: any = null;

  public aPosicionesPgn: any[] = [];
  public bAbrirFiltroPosicionPgn: boolean = false;
  public aNombreMostrarPosicionPgn: any[] = [];

  public aPosicionesNoPgn: any[] = [];
  public bAbrirFiltroPosicionNoPgn: boolean = false;
  public aNombreMostrarPosicionNoPgn: any[] = [];

  public oCamposFormularioPGN: IFormPosicionesFG[] = [
    {
      funcionCatalogo: 'INST',
      idCatalogo: 1,
      codigoEntidadPci: null,
      descripcion: null,
    },
  ];
  public oCamposFormularioNoPGN: IFormPosicionesFG[] = [
    {
      funcionCatalogo: 'INST',
      idCatalogo: 2,
      codigoEntidadPci: null,
      descripcion: null,
    },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _utilsService: UtilsService
  ) {}

  formAmbitoPgn: FormGroup = this._formBuilder.group({
    restringir: false,
    noRestringir: false,
    posicion: [],
  });
  formAmbitoNoPgn: FormGroup = this._formBuilder.group({
    restringir: false,
    noRestringir: false,
    posicion: [],
  });

  ngOnInit(): void {}
  ngOnChanges(cambio: SimpleChanges) {
    let respuesta =
      cambio['oRestriccionDisponibilidadId'].currentValue[
        'restriccionesEntidadPci'
      ];
    let restringir = false;
    let noRestringir = false;
    if (respuesta != undefined) {
      respuesta.forEach((usuario: any) => {
        if (
          usuario.valorEntidadPci.valorAmbitoEntidadPci.descripcion === ADM.PGN
        ) {
          this.oListaUnidadPgn.push(usuario);
          if (usuario.restringir === true) {
            restringir = true;
            noRestringir = false;
            this.sValorCheck = restringir;
          } else if (usuario.restringir === false) {
            restringir = false;
            noRestringir = true;
            this.sValorCheck = restringir;
          }
          this.formAmbitoPgn.patchValue({
            restringir: restringir,
            noRestringir: noRestringir,
          });
        } else if (
          usuario.valorEntidadPci.valorAmbitoEntidadPci.descripcion ===
          ADM.NO_PGN
        ) {
          this.oListaUnidadNoPgn.push(usuario);
          if (usuario.restringir === true) {
            restringir = true;
            noRestringir = false;
            this.sValorCheckNoPgn = restringir;
          } else if (usuario.restringir === false) {
            restringir = false;
            noRestringir = true;
            this.sValorCheckNoPgn = noRestringir;
          }
          this.formAmbitoNoPgn.patchValue({
            restringir: restringir,
            noRestringir: noRestringir,
          });
        }
      });
      this.oUnidadesSubunidades = respuesta;
      this.oListaUnidadPgnEmit = this.oListaUnidadPgn;
      this.oListaUnidadNoPgnEmit = this.oListaUnidadNoPgn;
      this.nIdRestriccion =
        cambio['oRestriccionDisponibilidadId'].currentValue.id;
      this.bAmbitoSeleccionadoPgn.emit(this.sValorCheck);
      this.bAmbitoSeleccionadoNoPgn.emit(this.sValorCheckNoPgn);
      this.oListaUnidadPgnEmitter.emit(this.oListaUnidadPgn);
      this.oListaUnidadNoPgnEmitter.emit(this.oListaUnidadNoPgn);
    }
  }

  // public buscarCatalogoPgn() {
  //   // this.oListaUnidadPgn.push(unidades);
  //   // const oListaUnidades = this.oListaUnidadPgn.concat(this.oListaUnidadNoPgn);
  //   // this.oListaUnidadEmitter.emit(oListaUnidades);
  //   // console.log(oListaUnidades);
  // }

  // public buscarCatalogoNoPgn() {
  //   // this.oListaUnidadNoPgn.push(this.aPosicionesPgn);
  //   // const oListaUnidades = this.oListaUnidadPgn.concat(this.oListaUnidadNoPgn);
  //   // this.oListaUnidadEmitter.emit(oListaUnidades);
  // }

  /**
   *
   * @param oRestriccionUnidadPgn
   * @param nIndice
   */
  public async eliminarRestriccionUnidadPgnFiltro(
    oRestriccionUnidadPgn: IRestriccionEntidadPci,
    nIndice: number
  ) {
    this.aPosicionesPgn.splice(nIndice, 1);
    this.oListaUnidadPgnEnviar.splice(nIndice, 1);

    const oEntidadesPgn = this.oListaUnidadPgn.concat(
      this.oListaUnidadPgnEnviar
    );

    this.oListaUnidadPgnEmitter.emit(oEntidadesPgn);
  }

  /**
   *
   * @param oRestriccionUnidadPgn
   * @param nIndice
   */
  public async eliminarRestriccionUnidadPgn(
    oRestriccionUnidadPgn: IRestriccionEntidadPci,
    nIndice: number
  ) {
    this.oListaUnidadPgn.splice(nIndice, 1);

    const oEntidadesPgn = this.oListaUnidadPgn.concat(
      this.oListaUnidadPgnEnviar
    );

    this.oListaUnidadPgnEmitter.emit(oEntidadesPgn);
  }

  /**
   *
   * @param oRestriccionUnidadNoPgn
   * @param nIndice
   */
  public async eliminarRestriccionUnidadNoPgnFiltro(
    oRestriccionUnidadNoPgn: IRestriccionEntidadPci,
    nIndice: number
  ) {
    this.aPosicionesNoPgn.splice(nIndice, 1);
    this.oListaUnidadNoPgnEnviar.splice(nIndice, 1);

    const oEntidadesNoPgn = this.oListaUnidadNoPgn.concat(
      this.oListaUnidadPgnEnviar
    );

    this.oListaUnidadNoPgnEmitter.emit(oEntidadesNoPgn);
  }

  public async eliminarRestriccionUnidadNoPgn(
    oRestriccionUnidadNoPgn: IRestriccionEntidadPci,
    nIndice: number
  ) {
    this.oListaUnidadNoPgn.splice(nIndice, 1);

    const oEntidadesNoPgn = this.oListaUnidadNoPgn.concat(
      this.oListaUnidadNoPgnEnviar
    );

    this.oListaUnidadNoPgnEmitter.emit(oEntidadesNoPgn);
  }

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico pgn
   * @return {void} No retorna datos
   */
  fnAbrirFiltroTransaccionPosicionPgn(): void {
    this.bAbrirFiltroPosicionPgn = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico pgn
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroPosicionPgn(bCerrarFiltroPosicionPgn: boolean): void {
    this.bAbrirFiltroPosicionPgn = bCerrarFiltroPosicionPgn;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico pgn
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroPosicionPgn(aPosicionesPgn: any): void {
    this.oListaUnidadPgnEnviar = [];
    let oListaUnidadPgnAgregar: IRestriccionEntidadPci[] = [];
    this.aNombreMostrarPosicionPgn = [{ nombre: '' }];

    this.aPosicionesPgn = aPosicionesPgn;
    this.aNombreMostrarPosicionPgn[0].nombre =
      aPosicionesPgn[0].data?.codigo + ' - ' + aPosicionesPgn[0].data?.nombre;

    this.aPosicionesPgn.forEach((valorAgregar: any) => {
      let bIgual = false;
      this.oListaUnidadPgn.forEach((valorExistente: any) => {
        if (valorAgregar.data.id === valorExistente.idEntidadPci) bIgual = true;
      });
      if (!bIgual) {
        let entidadAgregar: IRestriccionEntidadPci = {
          id: 0,
          idEntidadPci: valorAgregar.data.id,
          idRestriccion: this.nIdRestriccion,
          activo: true,
          tipoAmbito: valorAgregar.data.valorAmbitoEntidad.sigla,
          uso: 'SALD',
          restringir: this.sValorCheck,
        };
        oListaUnidadPgnAgregar.push(valorAgregar);
        this.oListaUnidadPgnEnviar.push(entidadAgregar);
      }
      this.aPosicionesPgn = oListaUnidadPgnAgregar;
    });
    console.log(this.oListaUnidadPgnEnviar);

    this.oListaUnidadPgnEmit = this.oListaUnidadPgn.concat(
      this.oListaUnidadPgnEnviar
    );

    this.oListaUnidadPgnEmitter.emit(this.oListaUnidadPgnEmit);
  }

  /**
   * @description Envía el parámetro para abrir el Filtro Genérico no pgn
   * @return {void} No retorna datos
   */
  fnAbrirFiltroTransaccionPosicionNoPgn(): void {
    this.bAbrirFiltroPosicionNoPgn = true;
  }

  /**
   * @description Envía el parámetro para cerrar el Filtro Genérico no pgn
   * @return {void} No retorna datos
   */
  fnObtenerCierreFiltroPosicionNoPgn(
    bCerrarFiltroPosicionNoPgn: boolean
  ): void {
    this.bAbrirFiltroPosicionNoPgn = bCerrarFiltroPosicionNoPgn;
  }

  /**
   * @description Captura la data enviada por el Filtro Genérico no pgn
   * @return {void} No retorna datos
   */
  fnObtenerDataFiltroPosicionNoPgn(aPosicionesNoPgn: any): void {
    this.oListaUnidadNoPgnEnviar = [];
    let oListaUnidadNoPgnAgregar: IRestriccionEntidadPci[] = [];
    this.aNombreMostrarPosicionNoPgn = [{ nombre: '' }];

    this.aPosicionesNoPgn = aPosicionesNoPgn;
    this.aNombreMostrarPosicionNoPgn[0].nombre =
      aPosicionesNoPgn[0].data?.codigo +
      ' - ' +
      aPosicionesNoPgn[0].data?.nombre;

    this.aPosicionesNoPgn.forEach((valorAgregar: any) => {
      let bIgual = false;
      this.oListaUnidadNoPgn.forEach((valorExistente: any) => {
        if (valorAgregar.data.id === valorExistente.idEntidadPci) bIgual = true;
      });
      if (!bIgual) {
        let entidadAgregar: IRestriccionEntidadPci = {
          id: 0,
          idEntidadPci: valorAgregar.data.id,
          idRestriccion: this.nIdRestriccion,
          activo: true,
          tipoAmbito: valorAgregar.data.valorAmbitoEntidad.sigla,
          uso: 'NPGN',
          restringir: this.sValorCheckNoPgn,
        };
        oListaUnidadNoPgnAgregar.push(valorAgregar);
        this.oListaUnidadNoPgnEnviar.push(entidadAgregar);
      }
      this.aPosicionesNoPgn = oListaUnidadNoPgnAgregar;
    });

    this.oListaUnidadNoPgnEmit = this.oListaUnidadNoPgn.concat(
      this.oListaUnidadNoPgnEnviar
    );
    console.log(this.oListaUnidadNoPgnEnviar);

    this.oListaUnidadNoPgnEmitter.emit(this.oListaUnidadNoPgnEmit);
  }

  /**
   * @description metodo que permite validar el check seleccionado en el ambito para las entidades pgn
   * @param sTipo tipo de ambito
   */
  checkSeleccionadoPgn(sTipo: string) {
    const oFormulario = this.formAmbitoPgn.value;
    if (oFormulario.restringir && sTipo === 'restringir') {
      this.formAmbitoPgn.patchValue({
        restringir: true,
        noRestringir: false,
      });
      this.sValorCheck = true;
      this.cambiarAmbito(this.sValorCheck);
      this.bAmbitoSeleccionadoPgn.emit(true);
    } else if (oFormulario.noRestringir && sTipo === 'noRestringir') {
      this.formAmbitoPgn.patchValue({
        restringir: false,
        noRestringir: true,
      });
      this.sValorCheck = false;
      this.cambiarAmbito(this.sValorCheck);
      this.bAmbitoSeleccionadoPgn.emit(true);
    } else if (
      oFormulario.restringir === false &&
      oFormulario.noRestringir === false
    ) {
      this.sValorCheck = null;
      this.bAmbitoSeleccionadoPgn.emit(false);
    }
  }

  /**
   * @description metodo que permite validar el check seleccionado en el ambito para las entidades noPgn
   * @param sTipo tipo de ambito
   */
  checkSeleccionadoNoPgn(sTipo: string) {
    const oFormulario = this.formAmbitoNoPgn.value;
    if (oFormulario.restringir && sTipo === 'restringir') {
      this.formAmbitoNoPgn.patchValue({
        restringir: true,
        noRestringir: false,
      });
      this.sValorCheckNoPgn = true;
      this.cambiarAmbitoNoPgn(this.sValorCheckNoPgn);
      this.bAmbitoSeleccionadoNoPgn.emit(true);
    } else if (oFormulario.noRestringir && sTipo === 'noRestringir') {
      this.formAmbitoNoPgn.patchValue({
        restringir: false,
        noRestringir: true,
      });
      this.sValorCheckNoPgn = false;
      this.cambiarAmbitoNoPgn(this.sValorCheckNoPgn);
      this.bAmbitoSeleccionadoNoPgn.emit(true);
    } else if (
      oFormulario.restringir === false &&
      oFormulario.noRestringir === false
    ) {
      this.sValorCheckNoPgn = null;
      this.bAmbitoSeleccionadoNoPgn.emit(false);
    }
  }

  /**
   *
   * @param sValor
   */
  cambiarAmbito(sValor: boolean) {
    this.oEntidadesConvertirPgn = [];
    if (sValor != null) {
      this.oListaUnidadPgnEmit.forEach((sValor: any) => {
        const entidades: IRestriccionEntidadPci = {
          ...sValor,
          restringir: this.sValorCheck,
        };
        this.oEntidadesConvertirPgn.push(entidades);
      });
    }

    this.oListaUnidadPgnEmitter.emit(this.oEntidadesConvertirPgn);
  }

  /**
   *
   * @param sValor
   */
  cambiarAmbitoNoPgn(sValor: boolean) {
    this.oEntidadesConvertirNoPgn = [];
    if (sValor != null) {
      this.oListaUnidadNoPgnEmit.forEach((sValor: any) => {
        const entidades: IRestriccionEntidadPci = {
          ...sValor,
          restringir: this.sValorCheckNoPgn,
        };
        this.oEntidadesConvertirNoPgn.push(entidades);
      });
    }

    this.oListaUnidadNoPgnEmitter.emit(this.oEntidadesConvertirNoPgn);
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
