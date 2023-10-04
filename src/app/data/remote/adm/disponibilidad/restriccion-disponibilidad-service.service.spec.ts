import { TestBed } from '@angular/core/testing';

import { RestriccionDisponibilidadServiceService } from './restriccion-disponibilidad-service.service';

describe('RestriccionDisponibilidadServiceService', () => {
  let service: RestriccionDisponibilidadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestriccionDisponibilidadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
