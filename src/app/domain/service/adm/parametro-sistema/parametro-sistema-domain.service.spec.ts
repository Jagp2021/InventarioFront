import { TestBed } from '@angular/core/testing';

import { ParametroSistemaDomainService } from './parametro-sistema-domain.service';

describe('ParametroSistemaDomainService', () => {
  let service: ParametroSistemaDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametroSistemaDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
