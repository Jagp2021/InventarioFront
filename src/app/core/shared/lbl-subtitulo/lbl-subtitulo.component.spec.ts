import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LblSubtituloComponent } from './lbl-subtitulo.component';

describe('LblSubtituloComponent', () => {
  let component: LblSubtituloComponent;
  let fixture: ComponentFixture<LblSubtituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LblSubtituloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LblSubtituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
