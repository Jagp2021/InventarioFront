import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGarantiaComponent } from './modal-garantia.component';

describe('ModalGarantiaComponent', () => {
  let component: ModalGarantiaComponent;
  let fixture: ComponentFixture<ModalGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGarantiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
