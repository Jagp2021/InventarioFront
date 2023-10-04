import { TestBed } from '@angular/core/testing';

import { ReporteListasSeleccionStateService } from './reporte-listas-seleccion-state.service';

describe('ReporteListasSeleccionStateService', () => {
  let service: ReporteListasSeleccionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteListasSeleccionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
