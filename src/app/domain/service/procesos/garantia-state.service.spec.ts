import { TestBed } from '@angular/core/testing';

import { GarantiaStateService } from './garantia-state.service';

describe('GarantiaStateService', () => {
  let service: GarantiaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarantiaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
