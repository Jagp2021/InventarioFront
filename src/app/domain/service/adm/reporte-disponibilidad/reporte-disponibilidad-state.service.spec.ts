import { TestBed } from '@angular/core/testing';

import { ReporteDisponibilidadStateService } from './reporte-disponibilidad-state.service';

describe('ReporteDisponibilidadStateService', () => {
  let service: ReporteDisponibilidadStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteDisponibilidadStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
