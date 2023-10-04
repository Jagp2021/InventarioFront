import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmReporteListasSeleccionComponent } from './frm-reporte-listas-seleccion.component';

describe('FrmReporteListasSeleccionComponent', () => {
  let component: FrmReporteListasSeleccionComponent;
  let fixture: ComponentFixture<FrmReporteListasSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmReporteListasSeleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmReporteListasSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
