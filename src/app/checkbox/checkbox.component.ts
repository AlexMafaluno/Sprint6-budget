import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from "../panel/panel.component";
import { CommonModule } from '@angular/common';
import { BudgetService } from '../Services/budget.service';
import { Product } from '../interfaces/product';


@Component({
  selector: 'app-checkbox',
  imports: [ReactiveFormsModule, PanelComponent, CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  
  products : Product[] = [];
  checkboxForm : FormGroup;
  totalPrice: number = 0;
  selectedCheckboxes: { [key: number]: boolean } = {}; // Objeto para almacenar checkboxes marcados

  @Output() panelToggle = new EventEmitter<boolean> ();

  private budgetService=inject(BudgetService);


constructor(private fb : FormBuilder) {
  this.products = this.budgetService.getProduct();
  this.budgetService.setProducts(this.products);
  this.budgetService.totalPrice$.subscribe(price => this.totalPrice = price);

  const productControls = this.products.reduce((acc, product) => {
    acc[product.id] = [false];
    return acc;
  }, {} as any);

  this.checkboxForm = this.fb.group({
    selectedProducts: this.fb.group(productControls)
  });

  // Escuchar cambios en los checkboxes
  this.checkboxForm.valueChanges.subscribe(() => {
    const selectedProducts = this.checkboxForm.value.selectedProducts;

  // 🔥 Ahora actualizamos `BudgetService` con los productos seleccionados
    this.products.forEach(product => {
      this.budgetService.toggleProductSelection(product.id, selectedProducts[product.id]);
    });
  });
}

onCheckboxChange(id: number, event: any) {
  this.selectedCheckboxes[id] = event.target.checked;

    // Si el checkbox con id === 2 cambia, emitimos el evento
    if (id === 3) {
      this.panelToggle.emit(this.selectedCheckboxes[id]);
    }
}


submit(){
 console.log("hola!!!!")
}
}