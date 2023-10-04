import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCrearListaSeleccionComponent } from './frm-crear-lista-seleccion.component';

describe('FrmCrearListaSeleccionComponent', () => {
  let component: FrmCrearListaSeleccionComponent;
  let fixture: ComponentFixture<FrmCrearListaSeleccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmCrearListaSeleccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmCrearListaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
