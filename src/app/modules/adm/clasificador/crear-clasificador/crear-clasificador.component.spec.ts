import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearClasificadorComponent } from './crear-clasificador.component';

describe('CrearClasificadorComponent', () => {
  let component: CrearClasificadorComponent;
  let fixture: ComponentFixture<CrearClasificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearClasificadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearClasificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
