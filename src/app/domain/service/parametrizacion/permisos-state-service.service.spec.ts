import { TestBed } from '@angular/core/testing';

import { PermisosStateServiceService } from './permisos-state-service.service';

describe('PermisosStateServiceService', () => {
  let service: PermisosStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
