import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmReporteDisponibilidadComponent } from './frm-reporte-disponibilidad.component';

describe('FrmReporteDisponibilidadComponent', () => {
  let component: FrmReporteDisponibilidadComponent;
  let fixture: ComponentFixture<FrmReporteDisponibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmReporteDisponibilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmReporteDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
