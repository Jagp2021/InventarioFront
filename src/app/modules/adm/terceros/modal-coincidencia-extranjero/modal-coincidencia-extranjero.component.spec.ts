import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoincidenciaExtranjeroComponent } from './modal-coincidencia-extranjero.component';

describe('ModalCoincidenciaExtranjeroComponent', () => {
  let component: ModalCoincidenciaExtranjeroComponent;
  let fixture: ComponentFixture<ModalCoincidenciaExtranjeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCoincidenciaExtranjeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCoincidenciaExtranjeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
