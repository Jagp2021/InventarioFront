import { TestBed } from '@angular/core/testing';

import { FuentesExternasService } from './fuentes-externas.service';

describe('FuentesExternasService', () => {
  let service: FuentesExternasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuentesExternasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
