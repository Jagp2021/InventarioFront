import { TestBed } from '@angular/core/testing';

import { ConfiguracionConsecutivoService } from './configuracion-consecutivo.service';

describe('ConfiguracionConsecutivoService', () => {
  let service: ConfiguracionConsecutivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionConsecutivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
