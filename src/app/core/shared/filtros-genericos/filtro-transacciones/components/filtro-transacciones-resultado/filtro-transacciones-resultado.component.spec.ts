import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTransaccionesResultadoComponent } from './filtro-transacciones-resultado.component';

describe('FiltroTransaccionesResultadoComponent', () => {
  let component: FiltroTransaccionesResultadoComponent;
  let fixture: ComponentFixture<FiltroTransaccionesResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTransaccionesResultadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroTransaccionesResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
