import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPerfilesResultadoComponent } from './filtro-perfiles-resultado.component';

describe('FiltroPerfilesResultadoComponent', () => {
  let component: FiltroPerfilesResultadoComponent;
  let fixture: ComponentFixture<FiltroPerfilesResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroPerfilesResultadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroPerfilesResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
