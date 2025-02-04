import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';



@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  products : Product[] = [
    {id: 1, title:'Seo', description: 'Hola', price: 300 },
    {id: 2, title:'Ads', description: 'Adios', price: 400 },
    {id: 3, title:'Web', description: 'Buenas', price: 500 }
    ]
  
getProduct(){
  return this.products;
}
  constructor() { 
    
  }
}
