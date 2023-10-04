import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTablaRestriccionPerfilesComponent } from './com-tabla-restriccion-perfiles.component';

describe('ComTablaRestriccionPerfilesComponent', () => {
  let component: ComTablaRestriccionPerfilesComponent;
  let fixture: ComponentFixture<ComTablaRestriccionPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComTablaRestriccionPerfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComTablaRestriccionPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
