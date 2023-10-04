import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBancosComponent } from './filtro-bancos.component';

describe('FiltroBancosComponent', () => {
  let component: FiltroBancosComponent;
  let fixture: ComponentFixture<FiltroBancosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroBancosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
