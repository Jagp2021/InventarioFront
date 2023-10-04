import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaHistoricoDocumentoComponent } from './com-tabla-historico-documento.component';

describe('ComTablaHistoricoDocumentoComponent', () => {
  let component: ComTablaHistoricoDocumentoComponent;
  let fixture: ComponentFixture<ComTablaHistoricoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaHistoricoDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaHistoricoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
