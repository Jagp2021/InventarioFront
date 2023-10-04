import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LblTituloComponent } from './lbl-titulo.component';

describe('LblTituloComponent', () => {
  let component: LblTituloComponent;
  let fixture: ComponentFixture<LblTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LblTituloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LblTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
