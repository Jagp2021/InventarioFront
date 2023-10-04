import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaRestriccionUnidadSubunidadesComponent } from './com-tabla-restriccion-unidad-subunidades.component';

describe('ComTablaRestriccionUnidadSubunidadesComponent', () => {
  let component: ComTablaRestriccionUnidadSubunidadesComponent;
  let fixture: ComponentFixture<ComTablaRestriccionUnidadSubunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaRestriccionUnidadSubunidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaRestriccionUnidadSubunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
