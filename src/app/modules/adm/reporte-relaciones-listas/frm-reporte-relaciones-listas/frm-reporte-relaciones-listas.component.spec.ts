import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmReporteRelacionesListasComponent } from './frm-reporte-relaciones-listas.component';

describe('FrmReporteRelacionesListasComponent', () => {
  let component: FrmReporteRelacionesListasComponent;
  let fixture: ComponentFixture<FrmReporteRelacionesListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmReporteRelacionesListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmReporteRelacionesListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
