import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCrearTransaccionesComponent } from './frm-crear-transacciones.component';

describe('FrmCrearTransaccionesComponent', () => {
  let component: FrmCrearTransaccionesComponent;
  let fixture: ComponentFixture<FrmCrearTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmCrearTransaccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmCrearTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
