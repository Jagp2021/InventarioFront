import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmBuscarDependenciaComponent } from './frm-buscar-dependencia.component';

describe('FrmBuscarDependenciaComponent', () => {
  let component: FrmBuscarDependenciaComponent;
  let fixture: ComponentFixture<FrmBuscarDependenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmBuscarDependenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmBuscarDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
