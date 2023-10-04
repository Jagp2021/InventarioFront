import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaRelacionesListasComponent } from './com-tabla-relaciones-listas.component';

describe('ComTablaRelacionesListasComponent', () => {
  let component: ComTablaRelacionesListasComponent;
  let fixture: ComponentFixture<ComTablaRelacionesListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaRelacionesListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaRelacionesListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
