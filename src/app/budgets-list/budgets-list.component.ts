import { Component, effect, ElementRef, inject, OnInit, Signal, ViewChild } from '@angular/core';
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
foundBudget: Budget | null = null; // Variable para mostrar el resultado


private budgetService=inject(BudgetService);

@ViewChild('writeNameInput') writeNameInput!: ElementRef<HTMLInputElement>;

sortedDate(): void{
  this.budgetService.sortedDateBudget(); // Llama al servicio para ordenar
  console.log("llamando al metodo sortedDate del servicio")
  console.log('Presupuesto budgets:', this.budgets);
}
sortedImport(): void{
  this.budgetService.sortedImportBudget();
  console.log("llamando al metodo sortedImport del servicio")
  console.log('Presupuesto budgets:', this.budgets);
}

sortedName(): void{
  this.budgetService.sortedNameBudget();
    console.log("llamando al metodo SortedName del servicio")
    console.log('Presupuesto budgets:', this.budgets);
  }

searchName(): void {
  
  const name = this.writeNameInput.nativeElement.value.trim();
  console.log(name)
  if (name) {
    this.foundBudget = this.budgetService.findBudgetByName(name) || null;
   if(this.foundBudget){
    console.log('Presupuesto encontrado:', this.foundBudget);
    this.budgets = [this.foundBudget];
    console.log('Presupuesto budgets:', this.budgets);
    } else {
    console.log('El campo de nombre está vacío.');
    this.budgets = [];
  }
}
}



constructor() {
effect(() => {
  this.budgets = this.budgetService.Budgets();
});

}
}