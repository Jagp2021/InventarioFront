import { TestBed } from '@angular/core/testing';

import { RelacionesListasService } from './relaciones-listas.service';

describe('RelacionesListasService', () => {
  let service: RelacionesListasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionesListasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
