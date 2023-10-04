import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuentesExternasComponent } from './fuentes-externas.component';

describe('FuentesExternasComponent', () => {
  let component: FuentesExternasComponent;
  let fixture: ComponentFixture<FuentesExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuentesExternasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuentesExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
