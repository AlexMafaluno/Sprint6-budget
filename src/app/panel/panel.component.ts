import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../Services/budget.service';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit{

panelForm : FormGroup;
required: any;
counter : number = 1;

private budgetService = inject(BudgetService);

@Output() numPages = new EventEmitter<number>();
@Output() numLanguages = new EventEmitter<number>();

constructor(private fb: FormBuilder ){
    this.panelForm = this.fb.group({
      numPages: ['', Validators.required],
      numLanguages: ['', Validators.required],
  })
}

increase(){
  this.counter++;
}

decrease(){
  this.counter--;
}


ngOnInit(): void {
    this.panelForm.valueChanges.subscribe(values => { //valueChanges.subscribe() detecta cambios en el formulario y los envía al servicio.
      const numPages = Number(values.numPages) || 0; // Asegurar que sea un número
      const numLanguages = Number(values.numLanguages) || 0;

      this.budgetService.updateWebCalculation(numPages, numLanguages);
      this.numPages.emit(numPages);
      this.numLanguages.emit(numLanguages);
    });
  }

ngSubmit(): void{}
}