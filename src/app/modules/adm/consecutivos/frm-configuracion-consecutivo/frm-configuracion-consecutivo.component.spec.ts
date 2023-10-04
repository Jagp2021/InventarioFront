import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmConfiguracionConsecutivoComponent } from './frm-configuracion-consecutivo.component';

describe('FrmConfiguracionConsecutivoComponent', () => {
  let component: FrmConfiguracionConsecutivoComponent;
  let fixture: ComponentFixture<FrmConfiguracionConsecutivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmConfiguracionConsecutivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmConfiguracionConsecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
