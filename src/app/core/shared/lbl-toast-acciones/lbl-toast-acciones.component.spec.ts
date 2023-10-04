import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LblToastAccionesComponent } from './lbl-toast-acciones.component';

describe('LblToastAccionesComponent', () => {
  let component: LblToastAccionesComponent;
  let fixture: ComponentFixture<LblToastAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LblToastAccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LblToastAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
