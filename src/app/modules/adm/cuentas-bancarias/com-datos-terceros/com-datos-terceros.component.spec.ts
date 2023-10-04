import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComDatosTercerosComponent } from './com-datos-terceros.component';

describe('ComDatosTercerosComponent', () => {
  let component: ComDatosTercerosComponent;
  let fixture: ComponentFixture<ComDatosTercerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComDatosTercerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComDatosTercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
