import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [CheckboxComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hello, budget';
}
