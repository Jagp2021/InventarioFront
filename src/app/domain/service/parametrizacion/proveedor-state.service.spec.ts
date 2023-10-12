import { TestBed } from '@angular/core/testing';

import { ProveedorStateService } from './proveedor-state.service';

describe('ProveedorStateService', () => {
  let service: ProveedorStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
