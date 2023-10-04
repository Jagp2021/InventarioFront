import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAdministrativosComponent } from './datos-administrativos.component';

describe('DatosAdministrativosComponent', () => {
  let component: DatosAdministrativosComponent;
  let fixture: ComponentFixture<DatosAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosAdministrativosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
