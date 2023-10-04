import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaConfiguracionConsecutivoComponent } from './com-tabla-configuracion-consecutivo.component';

describe('ComTablaConfiguracionConsecutivoComponent', () => {
  let component: ComTablaConfiguracionConsecutivoComponent;
  let fixture: ComponentFixture<ComTablaConfiguracionConsecutivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaConfiguracionConsecutivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaConfiguracionConsecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
