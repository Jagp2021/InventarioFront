import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCrearCategoriaComponent } from './frm-crear-categoria.component';

describe('FrmCategoriaCrearComponent', () => {
  let component: FrmCrearCategoriaComponent;
  let fixture: ComponentFixture<FrmCrearCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrmCrearCategoriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrmCrearCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
