import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmInformacionBasicaComponent } from './frm-informacion-basica.component';

describe('FrmInformacionBasicaComponent', () => {
  let component: FrmInformacionBasicaComponent;
  let fixture: ComponentFixture<FrmInformacionBasicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmInformacionBasicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmInformacionBasicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
