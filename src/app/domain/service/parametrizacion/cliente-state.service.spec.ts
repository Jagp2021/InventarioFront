import { TestBed } from '@angular/core/testing';

import { ClienteStateService } from './cliente-state.service';

describe('ClienteStateService', () => {
  let service: ClienteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
