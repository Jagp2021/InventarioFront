import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegadoresComponent } from './navegadores.component';

describe('NavegadoresComponent', () => {
  let component: NavegadoresComponent;
  let fixture: ComponentFixture<NavegadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavegadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavegadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
