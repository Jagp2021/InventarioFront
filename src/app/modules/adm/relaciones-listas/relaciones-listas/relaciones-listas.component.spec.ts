import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionesListasComponent } from './relaciones-listas.component';

describe('RelacionesListasComponent', () => {
  let component: RelacionesListasComponent;
  let fixture: ComponentFixture<RelacionesListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelacionesListasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacionesListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
