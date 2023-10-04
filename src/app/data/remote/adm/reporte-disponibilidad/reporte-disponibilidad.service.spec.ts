import { TestBed } from '@angular/core/testing';

import { ReporteDisponibilidadService } from './reporte-disponibilidad.service';

describe('ReporteDisponibilidadService', () => {
  let service: ReporteDisponibilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteDisponibilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
