import { TestBed } from '@angular/core/testing';

import { PermisosServiceService } from './permisos-service.service';

describe('PermisosServiceService', () => {
  let service: PermisosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
