import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaRestriccionHorarioComponent } from './com-tabla-restriccion-horario.component';

describe('ComTablaRestriccionHorarioComponent', () => {
  let component: ComTablaRestriccionHorarioComponent;
  let fixture: ComponentFixture<ComTablaRestriccionHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaRestriccionHorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaRestriccionHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
