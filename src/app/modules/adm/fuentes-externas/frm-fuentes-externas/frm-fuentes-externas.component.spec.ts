import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmFuentesExternasComponent } from './frm-fuentes-externas.component';

describe('FrmFuentesExternasComponent', () => {
  let component: FrmFuentesExternasComponent;
  let fixture: ComponentFixture<FrmFuentesExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmFuentesExternasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmFuentesExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
