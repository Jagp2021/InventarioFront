import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmInformacionTributariaComponent } from './frm-informacion-tributaria.component';

describe('FrmInformacionTributariaComponent', () => {
  let component: FrmInformacionTributariaComponent;
  let fixture: ComponentFixture<FrmInformacionTributariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmInformacionTributariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmInformacionTributariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
