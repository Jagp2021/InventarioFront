import { TestBed } from '@angular/core/testing';

import { ApiTransversalStateService } from './api-transversal-state.service';

describe('ApiTransversalService', () => {
  let service: ApiTransversalStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTransversalStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
