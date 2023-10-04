import { TestBed } from '@angular/core/testing';

import { ApiTransversalService } from './api-transversal.service';

describe('ApiTransversalService', () => {
  let service: ApiTransversalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTransversalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
