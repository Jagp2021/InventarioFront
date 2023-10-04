import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmDatosAdministrativosComponent } from './frm-datos-administrativos.component';

describe('FrmDatosAdministrativosComponent', () => {
  let component: FrmDatosAdministrativosComponent;
  let fixture: ComponentFixture<FrmDatosAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmDatosAdministrativosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmDatosAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
