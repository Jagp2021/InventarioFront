import { TestBed } from '@angular/core/testing';

import { DominioStateService } from './dominio-state.service';

describe('DominioStateService', () => {
  let service: DominioStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DominioStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
