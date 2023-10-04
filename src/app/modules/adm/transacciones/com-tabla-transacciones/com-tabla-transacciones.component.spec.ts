import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaTransaccionesComponent } from './com-tabla-transacciones.component';

describe('ComTablaTransaccionesComponent', () => {
  let component: ComTablaTransaccionesComponent;
  let fixture: ComponentFixture<ComTablaTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaTransaccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
