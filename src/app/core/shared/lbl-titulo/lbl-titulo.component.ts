import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lbl-titulo',
  templateUrl: './lbl-titulo.component.html',
  styleUrls: ['./lbl-titulo.component.scss']
})
export class LblTituloComponent implements OnInit {

  @Input() titulo!: String;
  @Input() descripcion!: String;

  constructor() { }

  ngOnInit(): void {
  }

}
