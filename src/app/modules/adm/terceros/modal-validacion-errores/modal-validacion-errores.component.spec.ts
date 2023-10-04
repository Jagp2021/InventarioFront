import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidacionErroresComponent } from './modal-validacion-errores.component';

describe('ModalValidacionErroresComponent', () => {
  let component: ModalValidacionErroresComponent;
  let fixture: ComponentFixture<ModalValidacionErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValidacionErroresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalValidacionErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
