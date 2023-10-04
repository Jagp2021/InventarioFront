import { Component, OnInit } from '@angular/core';
import {
  IFormPosicionesFG,
  IFormTransaccionesFG,
  IFormUsuariosFG,
} from 'src/app/core/shared/filtros-genericos/interfaces/filtros-genericos.interface';

@Component({
  selector: 'app-filtros-genericos',
  templateUrl: './filtros-genericos.component.html',
  styleUrls: ['./filtros-genericos.component.scss'],
})
export class FiltrosGenericosComponent implements OnInit {
  public bAbrirFiltroTransacciones: boolean = false;
  public oCamposFormularioTransacciones: IFormUsuariosFG[] = [];
  public aTransacciones: any[] = [];

  /** */
  public bAbrirFiltroUsuario: boolean = false;
  public oCamposFormularioUsuarios: IFormUsuariosFG[] = [];
  public aUsuarios: any[] = [];

  /** */
  public bAbrirFiltroPosiciones: boolean = false;
  public oCamposFormularioPosiciones: IFormPosicionesFG[] = [
    {
      funcionCatalogo: 'INST',
      idCatalogo: null,
      codigoEntidadPci: null,
      descripcion: null,
    },
  ];
  public aPosiciones: any[] = [];

  /** */
  public bAbrirFiltroPerfil: boolean = false;
  public oCamposFormularioPerfiles: IFormTransaccionesFG[] = [];
  public aPerfiles: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  fnAbrirFiltroPosiciones() {
    this.bAbrirFiltroPosiciones = true;
  }

  fnObtenerCierreFiltroPosiciones(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroPerfil = bCerrarFiltro;
  }

  fnObtenerDataFiltroPosiciones(aPerfiles: any): void {
    this.aPerfiles = aPerfiles;
  }

  fnAbrirFiltroTransacciones() {
    this.bAbrirFiltroTransacciones = true;
  }

  fnObtenerCierreFiltroTransacciones(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroTransacciones = bCerrarFiltro;
  }

  fnObtenerDataFiltroTransacciones(aTransacciones: any): void {
    this.aTransacciones = aTransacciones;
  }

  fnAbrirFiltroUsuario() {
    this.bAbrirFiltroUsuario = true;
  }

  fnObtenerCierreFiltroUsuario(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroUsuario = bCerrarFiltro;
  }

  fnObtenerDataFiltroUsuario(aUsuarios: any): void {
    this.aUsuarios = aUsuarios;
  }

  fnAbrirFiltroPerfil() {
    this.bAbrirFiltroPerfil = true;
  }

  fnObtenerCierreFiltroPerfil(bCerrarFiltro: boolean): void {
    this.bAbrirFiltroPerfil = bCerrarFiltro;
  }

  fnObtenerDataFiltroPerfil(aPerfiles: any): void {
    this.aPerfiles = aPerfiles;
  }
}
