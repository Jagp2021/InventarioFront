import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/modules/procesos/components/clasificador/clasificador.component.spec.ts
import { ClasificadorComponent } from './clasificador.component';

describe('ClasificadorComponent', () => {
  let component: ClasificadorComponent;
  let fixture: ComponentFixture<ClasificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasificadorComponent);
=======
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
>>>>>>> DEV:src/app/modules/perfil/perfil/perfil.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
