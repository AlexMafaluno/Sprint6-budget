import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { BudgetService } from '../Services/budget.service';
import { Budget } from '../interfaces/budget';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets-list',
  imports: [CommonModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {

public budgets: Budget[]= [];

private budgetService=inject(BudgetService);

loadBudgets(){
this.budgets = this.budgetService.Budgets();
console.log('budget in budget-list-Component:', this.budgets);
}

constructor() {
effect(() => {
  this.budgets = this.budgetService.Budgets();
});

}
}