import { TestBed } from '@angular/core/testing';

import { HorarioSistemaService } from './horario-sistema.service';

describe('HorarioSistemaService', () => {
  let service: HorarioSistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioSistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
