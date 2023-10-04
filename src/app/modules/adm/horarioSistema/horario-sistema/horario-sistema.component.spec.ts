import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioSistemaComponent } from './horario-sistema.component';

describe('HorarioSistemaComponent', () => {
  let component: HorarioSistemaComponent;
  let fixture: ComponentFixture<HorarioSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioSistemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
