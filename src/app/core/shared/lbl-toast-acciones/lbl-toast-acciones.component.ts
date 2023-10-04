import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-lbl-toast-acciones',
  templateUrl: './lbl-toast-acciones.component.html',
  styleUrls: ['./lbl-toast-acciones.component.scss'],
})
export class LblToastAccionesComponent implements OnInit {
  @Input() sKey: string = 'some';
  @Input() sTitulo: string = '';
  @Input() sMensajePrimario: string = '';
  @Input() sMensajeSecundario: string = '';
  @Output() oClick = new EventEmitter();
  public sSeverity!: string;

  constructor(private _messageService: MessageService) {}

  ngOnInit(): void {
    this._messageService.messageObserver.subscribe((keys: any) => {
      if (keys.length > 0) {
        this.sSeverity = keys[0].severity;
      } else {
        this.sSeverity = keys.severity;
      }
    });
  }

  fnRechazarAccion() {
    this._messageService.clear('some');
  }

  fnConfirmarAccion() {
    this.oClick.emit('');
    this._messageService.clear('some');
  }
}
