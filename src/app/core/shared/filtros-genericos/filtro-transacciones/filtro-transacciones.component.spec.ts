import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTransaccionesComponent } from './filtro-transacciones.component';

describe('FiltroTransaccionesComponent', () => {
  let component: FiltroTransaccionesComponent;
  let fixture: ComponentFixture<FiltroTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTransaccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
