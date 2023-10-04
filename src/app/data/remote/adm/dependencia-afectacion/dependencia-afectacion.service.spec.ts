import { TestBed } from '@angular/core/testing';

import { DependenciaAfectacionService } from './dependencia-afectacion.service';

describe('DependenciaAfectacionService', () => {
  let service: DependenciaAfectacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependenciaAfectacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
