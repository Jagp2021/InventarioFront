import { TestBed } from '@angular/core/testing';

import { ReporteListasSeleccionService } from './reporte-listas-seleccion.service';

describe('ReporteListasSeleccionService', () => {
  let service: ReporteListasSeleccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteListasSeleccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
