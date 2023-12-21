import { Component, OnInit } from '@angular/core';
import { IngresoStateService } from 'src/app/domain/service/procesos/ingreso-state.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {

  constructor(private ingresoService: IngresoStateService) { }

  ngOnInit(): void {
    this.fnConsultaringresos();
  }

  fnConsultaringresos(){
    var result = this.ingresoService.fnListarIngresos({}).then((res => {
      console.log(res);
    }));
  }

  crear(){

  }
}
