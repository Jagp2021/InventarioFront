import { TestBed } from '@angular/core/testing';

import { CuentasBancariasStateService } from './cuentas-bancarias-state.service';

describe('CuentasBancariasStateService', () => {
  let service: CuentasBancariasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentasBancariasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
