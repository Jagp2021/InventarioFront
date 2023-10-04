import { TestBed } from '@angular/core/testing';

import { ReporteRelacionesListasStateService } from './reporte-relaciones-listas-state.service';

describe('ReporteRelacionesListasStateService', () => {
  let service: ReporteRelacionesListasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteRelacionesListasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
