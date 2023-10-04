import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmInformacionUbicacionComponent } from './frm-informacion-ubicacion.component';

describe('FrmInformacionUbicacionComponent', () => {
  let component: FrmInformacionUbicacionComponent;
  let fixture: ComponentFixture<FrmInformacionUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmInformacionUbicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmInformacionUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
