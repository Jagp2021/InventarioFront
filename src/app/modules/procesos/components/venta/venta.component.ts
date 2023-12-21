import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { VentaStateService } from 'src/app/domain/service/procesos/venta-state.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  constructor(private ventaService: VentaStateService) { }

  ngOnInit(): void {
    this.fnConsultarVentas();
  }

  fnConsultarVentas(){
    this.ventaService.fnListarVentas({}).then((res => {
      console.log(res);
    }));
  }

  crear(){

  }
}
