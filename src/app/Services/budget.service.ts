import { Injectable } from '@angular/core';
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

public Budgets: Budget[] = [{
  name: 'Alejandro',
  phone: 6756756756,
  email: 'mart.perez93@gmail.com',
  services:['Seo', 'Ads'],
  total: 654
}
  
];


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

addBudget(budgetData: Budget) {

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

  this.Budgets.push(newBudget);
  console.log("Presupuesto agregado:", newBudget);
}

getBudget(): Budget[]{
  return this.Budgets;
}


  constructor() {
    this.updateTotalPrice();
  } 
}
