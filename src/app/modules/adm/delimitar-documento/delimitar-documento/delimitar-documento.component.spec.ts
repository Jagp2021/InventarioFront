import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelimitarDocumentoComponent } from './delimitar-documento.component';

describe('DelimitarDocumentoComponent', () => {
  let component: DelimitarDocumentoComponent;
  let fixture: ComponentFixture<DelimitarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelimitarDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelimitarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
