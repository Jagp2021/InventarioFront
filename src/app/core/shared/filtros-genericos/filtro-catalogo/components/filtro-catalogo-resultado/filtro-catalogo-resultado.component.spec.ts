import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCatalogoResultadoComponent } from './filtro-catalogo-resultado.component';

describe('FiltroCatalogoResultadoComponent', () => {
  let component: FiltroCatalogoResultadoComponent;
  let fixture: ComponentFixture<FiltroCatalogoResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroCatalogoResultadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroCatalogoResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
