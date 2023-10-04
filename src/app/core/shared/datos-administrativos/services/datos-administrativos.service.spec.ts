import { TestBed } from '@angular/core/testing';

import { DatosAdministrativosService } from './datos-administrativos.service';

describe('DatosAdministrativosService', () => {
  let service: DatosAdministrativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosAdministrativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
