import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from "../panel/panel.component";
import { CommonModule } from '@angular/common';
import { BudgetService } from '../Services/budget.service';
import { Product } from '../interfaces/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-checkbox',
  imports: [ReactiveFormsModule, PanelComponent, CommonModule, RouterModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  
  products : Product[] = [];
  checkboxForm : FormGroup;
  totalPrice = signal(0);
  selectedCheckboxes: { [key: number]: boolean } = {}; // Objeto para almacenar checkboxes marcados

  @Output() panelToggle = new EventEmitter<boolean> ();
 // ✅ Ahora pages y lang NO son signals locales, sino valores normales para asegurar la correcta sincronización
 pages: number = 0;
 lang: number = 0;

  
  private budgetService=inject(BudgetService);
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Agregamos Router para actualizar la URL

  SeoPage = signal(false);
  AddPage = signal(false);
  WebPage = signal(false);


constructor(private fb : FormBuilder) {
  this.products = this.budgetService.getProduct();
  this.budgetService.setProducts(this.products);
  this.budgetService.totalPrice$.subscribe(price => this.totalPrice.set(price));

  const productControls = this.products.reduce((acc, product) => {
    acc[product.id] = [false];
    return acc;
  }, {} as any);


  // ✅ Agregamos los checkboxes de configuración
  this.checkboxForm = this.fb.group({
    selectedProducts: this.fb.group(productControls),
    SeoPage: [false],
    AddPage: [false],
    WebPage: [false]
  });

  // Escuchar cambios en los checkboxes
  this.checkboxForm.valueChanges.subscribe(() => {
    const selectedProducts = this.checkboxForm.value.selectedProducts;
    this.updateQueryParams();

  });


  // 🔥 Escuchar cambios en la URL y actualizar los signals
  this.route.queryParams.subscribe(params => {
    this.SeoPage.set(params['SeoPage'] === 'true');
    this.AddPage.set(params['AddPage'] === 'true');
    this.WebPage.set(params['WebPage'] === 'true');

     // ✅ Actualizamos pages y lang con los valores de la URL
     this.pages = Number(params['pages']) || 0;
     this.lang = Number(params['lang']) || 0;
 

    this.checkboxForm.patchValue({
      SeoPage: this.SeoPage(),
      AddPage: this.AddPage(),
      WebPage: this.WebPage()
    }, { emitEvent: false });

// ✅ Actualizar los checkboxes con la URL

this.products.forEach((product) => {
  const isChecked = params[product.id] === 'true';
  this.selectedCheckboxes[product.id] = isChecked;
  this.checkboxForm.get('selectedProducts.' + product.id)?.setValue(isChecked, { emitEvent: false });
  });


  this.updateBudgetService();
});



 // 🔥 Escuchar cambios en el formulario y actualizar la URL
 this.checkboxForm.valueChanges.subscribe(() => {
  this.updateQueryParams();
  this.updateBudgetService();
});

}


//✅ Método para actualizar BudgetService basado en checkboxes seleccionados
updateBudgetService() {
  this.products.forEach(product => {
    const isChecked = this.selectedCheckboxes[product.id] || false;
    this.budgetService.toggleProductSelection(product.id, isChecked);
  });
}

// ✅ Método para actualizar los parámetros en la URL
updateQueryParams() {
  const formValues = this.checkboxForm.value;

  const queryParams: any = {
      SeoPage: formValues.SeoPage ? 'true' : null,
      AddPage: formValues.AddPage ? 'true' : null,
      WebPage: formValues.WebPage ? 'true' : null,
      pages: this.pages > 0 ? this.pages : null,
      lang: this.lang > 0 ? this.lang : null
    };



 // ✅ Agregar checkboxes marcados a la URL
 this.products.forEach((product) => {
  queryParams[product.id] = this.selectedCheckboxes[product.id] ? 'true' : null;
});

this.router.navigate([], {
  queryParams: queryParams,
  queryParamsHandling: 'merge',
});
}


// ✅ Método para actualizar `pages` y `lang` desde PanelComponent
updatePages(value: number) {
  this.pages = value;
  this.updateQueryParams();
}

updateLang(value: number) {
  this.lang = value;
  this.updateQueryParams();
}


onCheckboxChange(id: number, event: any) {
  this.selectedCheckboxes[id] = event.target.checked;
  
  this.updateBudgetService();
    // Si el checkbox con id === 2 cambia, emitimos el evento
    if (id === 3) {
      this.panelToggle.emit(this.selectedCheckboxes[id]);
    }
    this.updateQueryParams();
}


submit(){
 console.log("hola!!!!")
}
}