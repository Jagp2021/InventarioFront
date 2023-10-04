import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaRestriccionTransaccionComponent } from './com-tabla-restriccion-transaccion.component';

describe('ComTablaRestriccionTransaccionComponent', () => {
  let component: ComTablaRestriccionTransaccionComponent;
  let fixture: ComponentFixture<ComTablaRestriccionTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaRestriccionTransaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaRestriccionTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
