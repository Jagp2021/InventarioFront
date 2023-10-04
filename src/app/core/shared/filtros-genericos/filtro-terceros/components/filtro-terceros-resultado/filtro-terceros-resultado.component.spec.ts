import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTercerosResultadoComponent } from './filtro-terceros-resultado.component';

describe('FiltroTercerosResultadoComponent', () => {
  let component: FiltroTercerosResultadoComponent;
  let fixture: ComponentFixture<FiltroTercerosResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTercerosResultadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroTercerosResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
