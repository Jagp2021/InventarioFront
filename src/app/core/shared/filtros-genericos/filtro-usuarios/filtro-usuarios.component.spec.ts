import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroUsuariosComponent } from './filtro-usuarios.component';

describe('FiltroUsuariosComponent', () => {
  let component: FiltroUsuariosComponent;
  let fixture: ComponentFixture<FiltroUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
