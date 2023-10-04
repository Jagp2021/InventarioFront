import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaListaValoresComponent } from './com-tabla-lista-valores.component';

describe('ComTablaListaValoresComponent', () => {
  let component: ComTablaListaValoresComponent;
  let fixture: ComponentFixture<ComTablaListaValoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaListaValoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaListaValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
