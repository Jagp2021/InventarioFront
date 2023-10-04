import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {
  public aNumDocsFiltrados: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.aNumDocsFiltrados = ['10986754356', '10986435456', '10986216789'];
  }

  fnFiltrarNumDoc(oEvent: any) {
    this.aNumDocsFiltrados = ['10986754356'];
  }
}
