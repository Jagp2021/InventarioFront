import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComDependenciaAfectacionComponent } from './com-dependencia-afectacion.component';

describe('ComDependenciaAfectacionComponent', () => {
  let component: ComDependenciaAfectacionComponent;
  let fixture: ComponentFixture<ComDependenciaAfectacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComDependenciaAfectacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComDependenciaAfectacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
