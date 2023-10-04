import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPerfilesComponent } from './filtro-perfiles.component';

describe('FiltroPerfilesComponent', () => {
  let component: FiltroPerfilesComponent;
  let fixture: ComponentFixture<FiltroPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroPerfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
