import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaRestriccionFechasComponent } from './com-tabla-restriccion-fechas.component';

describe('ComTablaRestriccionFechasComponent', () => {
  let component: ComTablaRestriccionFechasComponent;
  let fixture: ComponentFixture<ComTablaRestriccionFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaRestriccionFechasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaRestriccionFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
