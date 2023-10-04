import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCrearDependenciaComponent } from './frm-crear-dependencia.component';

describe('FrmCrearDependenciaComponent', () => {
  let component: FrmCrearDependenciaComponent;
  let fixture: ComponentFixture<FrmCrearDependenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmCrearDependenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmCrearDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
