import { TestBed } from '@angular/core/testing';

import { ListaSeccionStateService } from './lista-seccion-state.service';

describe('ListaSeccionStateService', () => {
  let service: ListaSeccionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaSeccionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
