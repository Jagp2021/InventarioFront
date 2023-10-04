import { TestBed } from '@angular/core/testing';

import { DependenciaAfectacionStateService } from './dependencia-afectacion-state.service';

describe('DependenciaAfectacionStateService', () => {
  let service: DependenciaAfectacionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependenciaAfectacionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
