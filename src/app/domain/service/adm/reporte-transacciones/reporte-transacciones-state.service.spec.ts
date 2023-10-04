import { TestBed } from '@angular/core/testing';

import { ReporteTransaccionesStateService } from './reporte-transacciones-state.service';

describe('ReporteTransaccionesStateService', () => {
  let service: ReporteTransaccionesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteTransaccionesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
