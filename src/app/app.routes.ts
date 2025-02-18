import { Routes } from '@angular/router';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: '',component: AppComponent, title: 'budget'},
    {path: 'checkbox/:id',component: CheckboxComponent, title: 'Checkbox'}

];
