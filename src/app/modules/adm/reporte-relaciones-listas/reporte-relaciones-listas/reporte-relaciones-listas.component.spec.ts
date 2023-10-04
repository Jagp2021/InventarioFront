import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRelacionesListasComponent } from './reporte-relaciones-listas.component';

describe('ReporteRelacionesListasComponent', () => {
  let component: ReporteRelacionesListasComponent;
  let fixture: ComponentFixture<ReporteRelacionesListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteRelacionesListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteRelacionesListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
