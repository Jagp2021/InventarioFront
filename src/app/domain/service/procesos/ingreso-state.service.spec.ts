import { TestBed } from '@angular/core/testing';

import { IngresoStateService } from './ingreso-state.service';

describe('IngresoStateService', () => {
  let service: IngresoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
