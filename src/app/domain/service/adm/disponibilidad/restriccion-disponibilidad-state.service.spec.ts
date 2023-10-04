import { TestBed } from '@angular/core/testing';

import { RestriccionDisponibilidadStateService } from './restriccion-disponibilidad-state.service';

describe('RestriccionDisponibilidadStateService', () => {
  let service: RestriccionDisponibilidadStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestriccionDisponibilidadStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
