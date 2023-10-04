import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.scss'],
})
export class FormulariosComponent implements OnInit {
  public checked: boolean = false;
  public ingredient!: string;
  public selectedCities: string[] = [];
  public value: string = '';
  public oDiasSeleccionados: any[] = [];
  public oListaFinesSemana: Array<Date> = [];
  public fechaMinima!: Date;
  public fechaMaxima!: Date;

  frmGenerarReporte: FormGroup = this._formBuilder.group({
    tipoTransaccion: null,
    funcionNegocio: null,
    codigoTransaccion: null,
    nombreTransaccion: null,
    categoriaTransaccion: null,
    estadoTransaccion: null,
    atributoLog: null,
    atributoAlto: null,
    atributoDatos: null,
    formatoSalida: 'pdf',
    hora: null,
    fecha: null,
  });

  aCategorias: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  fnFiltrar(oEvent: any) {
    return ['test', 'test2', 'test3'];
  }
}
