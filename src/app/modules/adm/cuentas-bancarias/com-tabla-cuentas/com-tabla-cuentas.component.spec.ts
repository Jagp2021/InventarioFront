import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaCuentasComponent } from './com-tabla-cuentas.component';

describe('ComTablaCuentasComponent', () => {
  let component: ComTablaCuentasComponent;
  let fixture: ComponentFixture<ComTablaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
