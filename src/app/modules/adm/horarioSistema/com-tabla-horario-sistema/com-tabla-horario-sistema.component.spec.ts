import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaHorarioSistemaComponent } from './com-tabla-horario-sistema.component';

describe('ComTablaHorarioSistemaComponent', () => {
  let component: ComTablaHorarioSistemaComponent;
  let fixture: ComponentFixture<ComTablaHorarioSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaHorarioSistemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaHorarioSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
