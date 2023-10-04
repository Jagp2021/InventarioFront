import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmReporteTransaccionesComponent } from './frm-reporte-transacciones.component';

describe('FrmReporteTransaccionesComponent', () => {
  let component: FrmReporteTransaccionesComponent;
  let fixture: ComponentFixture<FrmReporteTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmReporteTransaccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmReporteTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
