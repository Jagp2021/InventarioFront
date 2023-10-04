import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestriccionDisponibilidadComponent } from './restriccion-disponibilidad.component';

describe('RestriccionDisponibilidadComponent', () => {
  let component: RestriccionDisponibilidadComponent;
  let fixture: ComponentFixture<RestriccionDisponibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestriccionDisponibilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestriccionDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
