import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from "../panel/panel.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  imports: [ReactiveFormsModule, PanelComponent, CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  checkboxForm : FormGroup;
  totalPrice: number = 0;
  @Output() panelToggle = new EventEmitter<boolean> ();

  products = [
  {id: 1, title:'Seo', description: 'Hola', price: 300 },
  {id: 2, title:'Ads', description: 'Adios', price: 400 },
  {id: 3, title:'Web', description: 'Buenas', price: 500 }
  ]
  
selectedCheckboxes: { [key: number]: boolean } = {}; // Objeto para almacenar checkboxes marcados


constructor(private fb : FormBuilder) {

  const productControls = this.products.reduce((acc, product) => {
    acc[product.id] = [false];
    return acc;
  }, {} as any);

  this.checkboxForm = this.fb.group({
    selectedProducts: this.fb.group(productControls)
  });

  // Escuchar cambios en los checkboxes
  this.checkboxForm.valueChanges.subscribe(() => {
    this.calculateTotal();
  });
}

onCheckboxChange(id: number, event: any) {
  this.selectedCheckboxes[id] = event.target.checked;

    // Si el checkbox con id === 2 cambia, emitimos el evento
    if (id === 3) {
      this.panelToggle.emit(this.selectedCheckboxes[id]);
    }
}


calculateTotal(){

  const selectedProducts = this.checkboxForm.value.selectedProducts;
  this.totalPrice = this.products.filter(product => selectedProducts[product.id]).
  reduce((sum, product) => sum + product.price, 0);
}


submit(){
 console.log("hola!!!!")
}
}