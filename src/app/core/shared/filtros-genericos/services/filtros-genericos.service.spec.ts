import { TestBed } from '@angular/core/testing';

import { FiltrosGenericosService } from './filtros-genericos.service';

describe('FiltrosGenericosService', () => {
  let service: FiltrosGenericosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrosGenericosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
