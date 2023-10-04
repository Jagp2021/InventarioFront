import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBancosResultadoComponent } from './filtro-bancos-resultado.component';

describe('FiltroBancosResultadoComponent', () => {
  let component: FiltroBancosResultadoComponent;
  let fixture: ComponentFixture<FiltroBancosResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroBancosResultadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroBancosResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
