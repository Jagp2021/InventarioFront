import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVentaComponent } from './modal-venta.component';

describe('ModalVentaComponent', () => {
  let component: ModalVentaComponent;
  let fixture: ComponentFixture<ModalVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
