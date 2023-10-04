import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaGrafica2Component } from './linea-grafica2.component';

describe('LineaGrafica2Component', () => {
  let component: LineaGrafica2Component;
  let fixture: ComponentFixture<LineaGrafica2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaGrafica2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaGrafica2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
