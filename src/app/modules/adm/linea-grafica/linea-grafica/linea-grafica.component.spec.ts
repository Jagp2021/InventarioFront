import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaGraficaComponent } from './linea-grafica.component';

describe('LineaGraficaComponent', () => {
  let component: LineaGraficaComponent;
  let fixture: ComponentFixture<LineaGraficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaGraficaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
