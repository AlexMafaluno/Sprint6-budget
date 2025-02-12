import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';
import { Budget } from '../interfaces/budget';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

private products : Product[] = [
    {id: 1, title:'Seo', description: 'Hola', price: 300 },
    {id: 2, title:'Ads', description: 'Adios', price: 400 },
    {id: 3, title:'Web', description: 'Buenas', price: 500 }
    ]
  
private selectedProducts: { [key: number]: boolean } = {};

public Budgets= signal<Budget[]>([]);// Inicializa la señal con un array vacío


private numPages : number = 0;
private numLanguages : number = 0;

private totalPriceSubject = new BehaviorSubject<number>(0); 
totalPrice$ = this.totalPriceSubject.asObservable(); 

private updateTotalPrice(){
const productPrice = this.products.reduce((sum,product)=>
  this.selectedProducts[product.id] ? sum + product.price : sum, 0)
const webPrice = this.calculateWeb();
this.totalPriceSubject.next(productPrice + webPrice);
}


setProducts(products: Product[]){
  this.products = products;
  this.updateTotalPrice();
}

toggleProductSelection(productId: number, isSelected: boolean) {
  this.selectedProducts[productId] = isSelected;
  this.updateTotalPrice();

}


updateWebCalculation(numPages: number, numLanguages: number): void {
  this.numPages = numPages;
  this.numLanguages = numLanguages;
  this.updateTotalPrice();

}

calculateWeb() : number {

const basePrice = 0;
const webPrice = this.numPages * this.numLanguages * 30;
return basePrice + webPrice;

}

getProduct() : Product []{
  return this.products;
}

addBudget(budgetData: Budget):void {

// Obtener los servicios seleccionados
const selectedServices = this.products
.filter(product => this.selectedProducts[product.id])
.map(product => product.title);


// Calcular el total
const total = this.products.reduce(
  (sum, product) => (this.selectedProducts[product.id] ? sum + product.price : sum),
  this.calculateWeb()
);

// Crear el nuevo presupuesto
const newBudget: Budget = {
  ...budgetData, // Datos del formulario
  services: selectedServices, // Servicios seleccionados
  total: total // Total calculado
};

  this.Budgets.update(budgets => [...budgets, newBudget]);
  console.log("Presupuesto agregado:", newBudget);
}


/*
updateBudget(): Budget[]{
  this.Budgets.update(budgets => [...budgets, newBudget])
}
*/

  constructor() {
    this.updateTotalPrice();
  } 
}
