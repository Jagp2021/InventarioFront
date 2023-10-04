import { TestBed } from '@angular/core/testing';

import { CalendarioPaisService } from './calendario-pais.service';

describe('CalendarioPaisServiceService', () => {
  let service: CalendarioPaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarioPaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
