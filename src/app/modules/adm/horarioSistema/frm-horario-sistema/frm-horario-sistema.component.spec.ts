import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmHorarioSistemaComponent } from './frm-horario-sistema.component';

describe('FrmHorarioSistemaComponent', () => {
  let component: FrmHorarioSistemaComponent;
  let fixture: ComponentFixture<FrmHorarioSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmHorarioSistemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmHorarioSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
