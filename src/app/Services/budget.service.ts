import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';
import { Budget } from '../interfaces/budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private products: Product[] = [
    { id: 1, title: 'Seo', description: 'Programming Seo website', price: 300 },
    { id: 2, title: 'Ads', description: 'Programming Add website', price: 400 },
    { id: 3, title: 'Web', description: 'Programming Web website', price: 500 },
  ];

  private selectedProducts: { [key: number]: boolean } = {};

  public Budgets = signal<Budget[]>([]);

  private numPages: number = 0;
  private numLanguages: number = 0;

  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSubject.asObservable();

  private updateTotalPrice() {
    const productPrice = this.products.reduce(
      (sum, product) =>
        this.selectedProducts[product.id] ? sum + product.price : sum,
      0
    );
    const webPrice = this.calculateWeb();
    this.totalPriceSubject.next(productPrice + webPrice);
  }

  setProducts(products: Product[]) {
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

  calculateWeb(): number {
    const basePrice = 0;
    const webPrice = this.numPages * this.numLanguages * 30;
    return basePrice + webPrice;
  }

  getProduct(): Product[] {
    return this.products;
  }

  addBudget(budgetData: Budget): void {
    const selectedServices = this.products
      .filter((product) => this.selectedProducts[product.id])
      .map((product) => product.title);

    const total = this.products.reduce(
      (sum, product) =>
        this.selectedProducts[product.id] ? sum + product.price : sum,
      this.calculateWeb()
    );

    const newBudget: Budget = {
      ...budgetData,
      services: selectedServices,
      total: total,
      date: new Date(),
    };

    this.Budgets.update((budgets) => [...budgets, newBudget]);
  }

  sortedDateBudget(): void {
    this.Budgets.update((budgets) =>
      [...budgets].sort((a, b) => a.date.getTime() - b.date.getTime())
    );
  }

  sortedImportBudget(): void {
    this.Budgets.update((budgets) =>
      [...budgets].sort((a, b) => b.total - a.total)
    );
  }

  sortedNameBudget(): void {
    this.Budgets.update((budgets) =>
      [...budgets].sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  findBudgetByName(nameInput: string): Budget | undefined {
    const budgetsArray = this.Budgets();

    if (!budgetsArray || budgetsArray.length === 0) {
      return undefined;
    }
    const foundBudget = budgetsArray.find(
      (budget) => budget.name.toLowerCase() === nameInput.trim().toLowerCase()
    );
    return foundBudget;
  }

  constructor() {
    this.updateTotalPrice();
  }
}
