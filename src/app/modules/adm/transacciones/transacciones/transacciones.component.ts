import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { VALOR_MAXIMO_CARACTERES_CLASIFICADOR, VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR } from 'src/app/core/constant/adm/constants';
import { TRANSACCIONES } from 'src/app/core/constant/adm/transacciones.constants';
import { IParametrosSistema } from 'src/app/domain/interface/adm/parametros-sistema/parametros-sistema.interface';
import { ListaSeccionStateService } from 'src/app/domain/service/adm/lista-seleccion/lista-seccion-state.service';
import { ParametroSistemaDomainService } from 'src/app/domain/service/adm/parametro-sistema/parametro-sistema-domain.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
})
export class TransaccionesComponent implements OnInit {
  public lItemsBreadcrumb: MenuItem[] = [];

  constructor(private router: Router,
              private _dominioService: ListaSeccionStateService,
              private _parametroSistemaService: ParametroSistemaDomainService) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Transacciones' },
      { label: 'Identificación' },
    ];
    this.cargarListas();
    this.fnCargarParametrosSistema();
  }

  crearTransaccion(){
    this.router.navigate(['adm/transacciones/detalleTransaccion','0','0'])
  }

  cargarListas() {
    this._dominioService.consultarAltoReqSeguridad({dominio1: TRANSACCIONES.NOMBRE_LISTA_ALTO_REQ_SEGURIDAD});
    this._dominioService.consultarCategoria({dominio1: TRANSACCIONES.NOMBRE_LISTA_CATEGORIA});
    this._dominioService.consultarTipoTransaccion({dominio1: TRANSACCIONES.NOMBRE_LISTA_TIPO_TRANSACCION});
    this._dominioService.consultarFuncionNegocio({dominio1: TRANSACCIONES.NOMBRE_LISTA_FUNCION_NEGOCIO});
  }

  async fnCargarParametrosSistema(){
    const valorMaxCarga = <IParametrosSistema[]>(await this._parametroSistemaService.fnConsultarParametroSistema({
       parametro: TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MAX_CARGA_MASIVA
    })).data;
    localStorage.setItem(TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MAX_CARGA_MASIVA,(valorMaxCarga[0].valor as string));
    const valorMinCarga = <IParametrosSistema[]>(await this._parametroSistemaService.fnConsultarParametroSistema({
      parametro: TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MIN_CARGA_MASIVA
    })).data;
    localStorage.setItem(TRANSACCIONES.CARGA_MASIVA.CANTIDAD_MIN_CARGA_MASIVA,(valorMinCarga[0].valor as string));
  
    const valorMaxRegistro = <IParametrosSistema[]>(await this._parametroSistemaService.fnConsultarParametroSistema({
      parametro: TRANSACCIONES.REGISTRO_MASIVO.CANTIDAD_MAX_REGISTRO_MASIVO
   })).data;
   localStorage.setItem(TRANSACCIONES.REGISTRO_MASIVO.CANTIDAD_MAX_REGISTRO_MASIVO,(valorMaxCarga[0].valor as string));
   const valorMinRegistro = <IParametrosSistema[]>(await this._parametroSistemaService.fnConsultarParametroSistema({
     parametro: TRANSACCIONES.REGISTRO_MASIVO.CANTIDAD_MIN_REGISTRO_MASIVO
   })).data;
   localStorage.setItem(TRANSACCIONES.REGISTRO_MASIVO.CANTIDAD_MIN_REGISTRO_MASIVO,(valorMinCarga[0].valor as string));
  }



}
