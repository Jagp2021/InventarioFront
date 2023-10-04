import { TestBed } from '@angular/core/testing';

import { DelimitarDocumentoService } from './delimitar-documento.service';

describe('DelimitarDocumentoService', () => {
  let service: DelimitarDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelimitarDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
