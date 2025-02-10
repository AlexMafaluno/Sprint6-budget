import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector:'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
resultado!: string;
reactiveForm : FormGroup;
data: string = "";


constructor(private fb : FormBuilder) {
this.reactiveForm = this.fb.group({
name : ['', [Validators.required, Validators.minLength(10)]],
phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
email: ['', [Validators.required, Validators.email]],
});
}

submit() {
  if(this.reactiveForm.valid)
  this.resultado = "Todos los datos son válidos";
else
  this.resultado = "Hay datos inválidos en el formulario";
}

}
