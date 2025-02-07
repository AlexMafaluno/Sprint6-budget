import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('debe emitir un evento si el id es 3', () => {
    spyOn(component.panelToggle, 'emit'); // Espía la función emit

    // Simulamos el cambio de estado del checkbox con id 3
    const event = { target: { checked: true } };
    component.onCheckboxChange(3, event);

    // Verificamos que el evento fue emitido con el valor correcto
    expect(component.panelToggle.emit).toHaveBeenCalledWith(true);
  });

  it('no debe emitir un evento si el id no es 3', () => {
    spyOn(component.panelToggle, 'emit');

    // Simulamos un cambio de estado con otro id (ej: 2)
    const event = { target: { checked: true } };
    component.onCheckboxChange(2, event);

    // Verificamos que no se emitió ningún evento
    expect(component.panelToggle.emit).not.toHaveBeenCalled();
  });


});












