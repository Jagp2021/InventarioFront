import { TestBed } from '@angular/core/testing';

import { RelacionesListasStateService } from './relaciones-listas-state.service';

describe('RelacionesListasStateService', () => {
  let service: RelacionesListasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionesListasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
