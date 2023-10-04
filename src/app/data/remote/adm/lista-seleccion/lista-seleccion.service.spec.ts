import { TestBed } from '@angular/core/testing';

import { ListaSeleccionService } from './lista-seleccion.service';

describe('ListaSeleccionService', () => {
  let service: ListaSeleccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaSeleccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
