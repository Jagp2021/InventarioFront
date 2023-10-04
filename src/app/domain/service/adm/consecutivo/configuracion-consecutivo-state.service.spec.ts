import { TestBed } from '@angular/core/testing';

import { ConfiguracionConsecutivoStateService } from './configuracion-consecutivo-state.service';

describe('ConfiguracionConsecutivoStateService', () => {
  let service: ConfiguracionConsecutivoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionConsecutivoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
