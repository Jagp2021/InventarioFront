import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaListaSeleccionComponent } from './com-tabla-lista-seleccion.component';

describe('ComTablaListaSeleccionComponent', () => {
  let component: ComTablaListaSeleccionComponent;
  let fixture: ComponentFixture<ComTablaListaSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaListaSeleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaListaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
