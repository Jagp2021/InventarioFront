import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaMarcasComponent } from './com-tabla-marcas.component';

describe('ComTablaMarcasComponent', () => {
  let component: ComTablaMarcasComponent;
  let fixture: ComponentFixture<ComTablaMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaMarcasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
