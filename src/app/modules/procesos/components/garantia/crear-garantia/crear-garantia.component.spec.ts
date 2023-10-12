import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGarantiaComponent } from './crear-garantia.component';

describe('CrearGarantiaComponent', () => {
  let component: CrearGarantiaComponent;
  let fixture: ComponentFixture<CrearGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearGarantiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
