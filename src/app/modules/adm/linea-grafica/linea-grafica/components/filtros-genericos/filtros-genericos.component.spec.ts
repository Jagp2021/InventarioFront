import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosGenericosComponent } from './filtros-genericos.component';

describe('FiltrosGenericosComponent', () => {
  let component: FiltrosGenericosComponent;
  let fixture: ComponentFixture<FiltrosGenericosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosGenericosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosGenericosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
