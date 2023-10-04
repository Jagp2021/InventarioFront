import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelClasificadorComponent } from './nivel-clasificador.component';

describe('NivelClasificadorComponent', () => {
  let component: NivelClasificadorComponent;
  let fixture: ComponentFixture<NivelClasificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelClasificadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivelClasificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
