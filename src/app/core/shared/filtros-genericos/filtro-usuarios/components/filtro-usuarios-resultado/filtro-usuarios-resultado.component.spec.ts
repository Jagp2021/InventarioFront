import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroUsuariosResultadoComponent } from './filtro-usuarios-resultado.component';

describe('FiltroUsuariosResultadoComponent', () => {
  let component: FiltroUsuariosResultadoComponent;
  let fixture: ComponentFixture<FiltroUsuariosResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroUsuariosResultadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroUsuariosResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
