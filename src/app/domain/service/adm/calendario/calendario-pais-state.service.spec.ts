import { TestBed } from '@angular/core/testing';

import { CalendarioPaisStateService } from './calendario-pais-state.service';

describe('CalendarioPaisStateService', () => {
  let service: CalendarioPaisStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarioPaisStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
