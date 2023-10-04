import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTransaccionesComponent } from './reporte-transacciones.component';

describe('ReporteTransaccionesComponent', () => {
  let component: ReporteTransaccionesComponent;
  let fixture: ComponentFixture<ReporteTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTransaccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
