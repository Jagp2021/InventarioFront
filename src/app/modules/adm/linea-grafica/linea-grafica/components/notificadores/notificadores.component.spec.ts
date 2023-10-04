import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificadoresComponent } from './notificadores.component';

describe('NotificadoresComponent', () => {
  let component: NotificadoresComponent;
  let fixture: ComponentFixture<NotificadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
