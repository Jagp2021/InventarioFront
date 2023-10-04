import { TestBed } from '@angular/core/testing';

import { ReporteTransaccionesService } from './reporte-transacciones.service';

describe('ReporteTransaccionesService', () => {
  let service: ReporteTransaccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteTransaccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
