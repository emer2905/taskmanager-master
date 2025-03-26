import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasActualizarComponent } from './tareas-actualizar.component';

describe('TareasActualizarComponent', () => {
  let component: TareasActualizarComponent;
  let fixture: ComponentFixture<TareasActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasActualizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareasActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
