import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTercerosComponent } from './listar-terceros.component';

describe('ListarTercerosComponent', () => {
  let component: ListarTercerosComponent;
  let fixture: ComponentFixture<ListarTercerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTercerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
