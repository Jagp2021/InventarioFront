import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciaAfectacionComponent } from './dependencia-afectacion.component';

describe('DependenciaAfectacionComponent', () => {
  let component: DependenciaAfectacionComponent;
  let fixture: ComponentFixture<DependenciaAfectacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependenciaAfectacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciaAfectacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
