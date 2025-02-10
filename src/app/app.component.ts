import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PanelComponent } from "./panel/panel.component";
import { CommonModule } from '@angular/common';
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, CheckboxComponent, MatSlideToggleModule, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hello, budget';
}
