import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lbl-subtitulo',
  templateUrl: './lbl-subtitulo.component.html',
  styleUrls: ['./lbl-subtitulo.component.scss'],
})
export class LblSubtituloComponent implements OnInit {
  @Input() bEsSubtituloPrincipal: boolean = true;
  @Input() subtitulo: string = 'MHCP';

  constructor() {}

  ngOnInit(): void {}
}
