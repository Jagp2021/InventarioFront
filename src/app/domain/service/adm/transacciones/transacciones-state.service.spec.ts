import { TestBed } from '@angular/core/testing';

import { TransaccionesStateService } from './transacciones-state.service';

describe('TransaccionesStateService', () => {
  let service: TransaccionesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccionesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
