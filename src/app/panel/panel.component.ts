import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
onSubmit() {
throw new Error('Method not implemented.');
}

  panelForm : FormGroup;
  
  constructor(private fb: FormBuilder ){
    this.panelForm = this.fb.group({
      numPages: ['', Validators.required],
      numLanguages: ['', Validators.required],
  })



}
}