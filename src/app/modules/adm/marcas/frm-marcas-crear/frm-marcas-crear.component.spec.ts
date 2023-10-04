import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmMarcasCrearComponent } from './frm-marcas-crear.component';

describe('FrmMarcasCrearComponent', () => {
  let component: FrmMarcasCrearComponent;
  let fixture: ComponentFixture<FrmMarcasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmMarcasCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmMarcasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
