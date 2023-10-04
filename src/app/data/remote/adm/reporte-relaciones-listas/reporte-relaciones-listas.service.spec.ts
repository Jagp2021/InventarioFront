import { TestBed } from '@angular/core/testing';

import { ReporteRelacionesListasService } from './reporte-relaciones-listas.service';

describe('ReporteRelacionesListasService', () => {
  let service: ReporteRelacionesListasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteRelacionesListasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
