import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTercerosComponent } from './filtro-terceros.component';

describe('FiltroTercerosComponent', () => {
  let component: FiltroTercerosComponent;
  let fixture: ComponentFixture<FiltroTercerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTercerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
