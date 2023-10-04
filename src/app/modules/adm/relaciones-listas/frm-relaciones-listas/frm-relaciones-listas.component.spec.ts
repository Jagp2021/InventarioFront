import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmRelacionesListasComponent } from './frm-relaciones-listas.component';

describe('FrmRelacionesListasComponent', () => {
  let component: FrmRelacionesListasComponent;
  let fixture: ComponentFixture<FrmRelacionesListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmRelacionesListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmRelacionesListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
