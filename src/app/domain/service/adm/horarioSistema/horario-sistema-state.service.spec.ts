import { TestBed } from '@angular/core/testing';

import { HorarioSistemaStateService } from './horario-sistema-state.service';

describe('HorarioSistemaStateService', () => {
  let service: HorarioSistemaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioSistemaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
