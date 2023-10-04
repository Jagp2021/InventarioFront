import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSeleccionComponent } from './lista-seleccion.component';

describe('ListaSeleccionComponent', () => {
  let component: ListaSeleccionComponent;
  let fixture: ComponentFixture<ListaSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSeleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
