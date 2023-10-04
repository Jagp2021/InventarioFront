import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCrearCuentaComponent } from './frm-crear-cuenta.component';

describe('FrmCrearCuentaComponent', () => {
  let component: FrmCrearCuentaComponent;
  let fixture: ComponentFixture<FrmCrearCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmCrearCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmCrearCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
