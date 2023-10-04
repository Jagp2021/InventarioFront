import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCatalogoComponent } from './filtro-catalogo.component';

describe('FiltroCatalogoComponent', () => {
  let component: FiltroCatalogoComponent;
  let fixture: ComponentFixture<FiltroCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroCatalogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
