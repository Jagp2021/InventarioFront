import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaClasificadorComponent } from './tabla-clasificador.component';

describe('TablaClasificadorComponent', () => {
  let component: TablaClasificadorComponent;
  let fixture: ComponentFixture<TablaClasificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaClasificadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaClasificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
