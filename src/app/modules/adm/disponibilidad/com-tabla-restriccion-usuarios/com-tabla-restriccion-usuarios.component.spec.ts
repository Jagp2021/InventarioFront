import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaRestriccionUsuariosComponent } from './com-tabla-restriccion-usuarios.component';

describe('ComTablaRestriccionUsuariosComponent', () => {
  let component: ComTablaRestriccionUsuariosComponent;
  let fixture: ComponentFixture<ComTablaRestriccionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaRestriccionUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaRestriccionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
