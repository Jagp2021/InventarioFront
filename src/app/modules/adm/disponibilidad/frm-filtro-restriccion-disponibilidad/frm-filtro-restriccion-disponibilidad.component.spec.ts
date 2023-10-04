import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmFiltroRestriccionDisponibilidadComponent } from './frm-filtro-restriccion-disponibilidad.component';

describe('FrmFiltroRestriccionDisponibilidadComponent', () => {
  let component: FrmFiltroRestriccionDisponibilidadComponent;
  let fixture: ComponentFixture<FrmFiltroRestriccionDisponibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmFiltroRestriccionDisponibilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmFiltroRestriccionDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
