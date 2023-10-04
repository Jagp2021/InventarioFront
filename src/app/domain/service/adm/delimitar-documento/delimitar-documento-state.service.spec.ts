import { TestBed } from '@angular/core/testing';

import { DelimitarDocumentoStateService } from './delimitar-documento-state.service';

describe('DelimitarDocumentoStateService', () => {
  let service: DelimitarDocumentoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelimitarDocumentoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
