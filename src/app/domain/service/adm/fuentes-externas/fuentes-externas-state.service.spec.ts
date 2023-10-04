import { TestBed } from '@angular/core/testing';

import { FuentesExternasStateService } from './fuentes-externas-state.service';

describe('FuentesExternasStateService', () => {
  let service: FuentesExternasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuentesExternasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
