import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteListasSeleccionComponent } from './reporte-listas-seleccion.component';

describe('ReporteListasSeleccionComponent', () => {
  let component: ReporteListasSeleccionComponent;
  let fixture: ComponentFixture<ReporteListasSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteListasSeleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteListasSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
