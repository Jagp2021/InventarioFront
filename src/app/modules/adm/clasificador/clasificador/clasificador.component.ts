import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { VALOR_MAXIMO_CARACTERES_CLASIFICADOR, VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR } from 'src/app/core/constant/adm/constants';
import { Clasificador } from 'src/app/domain/interface/adm/clasificador/clasificador.interface';
import { IParametrosSistema } from 'src/app/domain/interface/adm/parametros-sistema/parametros-sistema.interface';
import { ClasificadorStateService } from 'src/app/domain/service/adm/clasificador/clasificador-state.service';
import { ParametroSistemaDomainService } from 'src/app/domain/service/adm/parametro-sistema/parametro-sistema-domain.service';

@Component({
  selector: 'app-clasificador',
  templateUrl: './clasificador.component.html',
  styleUrls: ['./clasificador.component.scss'],
})
export class ClasificadorComponent implements OnInit {
  lItemsBreadcrumb: MenuItem[] = [];
  public lista$!: Observable<Clasificador[]>;
  constructor(
    private _clasificadorStateService: ClasificadorStateService,
    private _parametroSistemaService: ParametroSistemaDomainService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.lItemsBreadcrumb = [
      { label: 'Administración' },
      { label: 'Parametrización' },
      { label: 'Clasificador' },
    ];
    this._clasificadorStateService.getClasificador();
    this.lista$ = this._clasificadorStateService.select(
      (e) => e.clasificadores
    );
    this.fnCargarParametrosSistema();
  }

  consultar() {
    this._clasificadorStateService.getClasificador();
    this.lista$ = this._clasificadorStateService.select(
      (e) => e.clasificadores
    );
  }

  agregarFila() {
    this._router.navigate(['adm/clasificador/detalleClasificador', 0]);
  }

  async fnCargarParametrosSistema(){
    const valor = <IParametrosSistema[]>(await this._parametroSistemaService.fnConsultarParametroSistema({
       parametro: VALOR_MAXIMO_CARACTERES_CLASIFICADOR
    })).data;
    localStorage.setItem(VALOR_MAXIMO_CARACTERES_CLASIFICADOR,(valor[0].valor as string));
    const valor2 = <IParametrosSistema[]>(await this._parametroSistemaService.fnConsultarParametroSistema({
      parametro: VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR
    })).data;
    localStorage.setItem(VALOR_MAXIMO_CARACTERES_NIVEL_CLASIFICADOR,(valor2[0].valor as string));
  }
}
