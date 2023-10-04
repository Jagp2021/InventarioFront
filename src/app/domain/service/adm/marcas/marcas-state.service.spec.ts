import { TestBed } from '@angular/core/testing';

import { MarcasStateService } from './marcas-state.service';

describe('MarcasStateService', () => {
  let service: MarcasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
