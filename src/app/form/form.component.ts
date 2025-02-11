import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../Services/budget.service';

@Component({
  selector:'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
resultado!: string;
reactiveForm : FormGroup;


@Output() data = new EventEmitter<any[]> ();

constructor(private fb : FormBuilder, private budgetService: BudgetService) {
this.reactiveForm = this.fb.group({
name : ['', [Validators.required, Validators.minLength(3)]],
phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
email: ['', [Validators.required, Validators.email]],
});
}

submit() {
  if(this.reactiveForm.valid){
  this.resultado = "Todos los datos son válidos";

  const budgetData = this.reactiveForm.value;
  console.log(typeof budgetData)
  console.log(budgetData)

   this.budgetService.addBudget(budgetData);

  this.data.emit(this.budgetService.getBudget());

  this.reactiveForm.reset();

} else{
  this.resultado = "Hay datos inválidos en el formulario";
}
}

}

