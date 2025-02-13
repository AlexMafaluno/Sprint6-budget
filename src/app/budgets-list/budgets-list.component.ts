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

name :string = document.getElementById('write-name');

sortedDate(): void{
  this.budgetService.sortedDateBudget(); // Llama al servicio para ordenar
  console.log("llamando al metodo sortedDate del servicio")
}
sortedImport(): void{
  this.budgetService.sortedImportBudget();
  console.log("llamando al metodo sortedImport del servicio")
}

sortedName(): void{
  this.budgetService.sortedNameBudget();
    console.log("llamando al metodo SortedName del servicio")
  }

FindName(name): void{
this.budgetService.sortedNameBudget(name);

}


constructor() {
effect(() => {
  this.budgets = this.budgetService.Budgets();
});

}
}