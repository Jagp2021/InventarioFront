import { TestBed } from '@angular/core/testing';

import { TerceroStateService } from './tercero-state.service';

describe('TerceroStateService', () => {
  let service: TerceroStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerceroStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
