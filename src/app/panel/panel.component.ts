import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../Services/budget.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule, ModalComponent, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit{


panelForm : FormGroup;
required: any;

private budgetService = inject(BudgetService);

@Output() numPages = new EventEmitter<number>();
@Output() numLanguages = new EventEmitter<number>();


showModal: boolean = false;  // Controla el estado del modal
selectedModal: { title: string; description: string } | null = null;

modals = [
  {title: 'Number of pages', description : 'add add add'},
  {title: 'Number of languages',description: 'HI HI HI'}
];

  openModal(id: number) {
    this.selectedModal = this.modals[id];
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;  // Cambia el estado a false para cerrarlo
  }


constructor(private fb: FormBuilder ){
    this.panelForm = this.fb.group({
      numPages: ['', Validators.required],
      numLanguages: ['', Validators.required],
  })
}


updateValue(field: 'numPages' | 'numLanguages', increment: boolean) {
  let currentValue = this.panelForm.get(field)?.value || 0;

  if (!increment && currentValue === 0) return; // Evitar valores negativos

  this.panelForm.patchValue({ [field]: increment ? currentValue + 1 : currentValue - 1 });
}
increasePages() {
this.updateValue('numPages', true);
}

decreasePages() {
  this.updateValue('numPages', false);
}

increaseLanguages() {
  this.updateValue('numLanguages', true);
}

decreaseLanguages() {
  this.updateValue('numLanguages', false);
}
  



ngOnInit(): void {
    this.panelForm.valueChanges.subscribe(values => { //valueChanges.subscribe() detecta cambios en el formulario y los envía al servicio.
      const numPages : number = Number(values.numPages ?? 0); // Asegurar que sea un número
      const numLanguages : number  = Number(values.numLanguages ?? 0);

    

      this.budgetService.updateWebCalculation(numPages, numLanguages);
      this.numPages.emit(numPages);
      this.numLanguages.emit(numLanguages);
    });
  }

  

ngSubmit(): void{}
}