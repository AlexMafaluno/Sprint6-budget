import { CommonModule } from '@angular/common';
import {Component,EventEmitter,inject,Input,OnInit,Output,signal,} from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { BudgetService } from '../Services/budget.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule, ModalComponent, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit {
  panelForm: FormGroup;
  required: any;

  private budgetService = inject(BudgetService);

  @Input() pages: number = 0;
  @Input() lang: number = 0;

  @Output() numPages = new EventEmitter<number>();
  @Output() numLanguages = new EventEmitter<number>();

  showModal: boolean = false;
  selectedModal: { title: string; description: string } | null = null;

  modals = [
    {
      title: 'Nº of pages',
      description:
        'Add the pages ​​that your project will have. The cost of each pages is 30€',
    },
    {
      title: 'Nº of languages',
      description:
        'Add the languages ​​that your project will have. The cost of each language is 30€',
    },
  ];

  openModal(id: number) {
    this.selectedModal = this.modals[id];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  constructor(private fb: FormBuilder) {
    this.panelForm = this.fb.group({
      numPages: [0, Validators.required],
      numLanguages: [0, Validators.required],
    });
  }

  ngOnChanges() {
    if (this.panelForm) {
      this.panelForm.patchValue(
        {
          numPages: this.pages,
          numLanguages: this.lang,
        },
        { emitEvent: false }
      );
    }
  }

  updateValue(field: 'numPages' | 'numLanguages', increment: boolean) {
    let currentValue = this.panelForm.get(field)?.value || 0;

    if (!increment && currentValue === 0) return;

    this.panelForm.patchValue({
      [field]: increment ? currentValue + 1 : currentValue - 1,
    });
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
    this.panelForm.patchValue(
      {
        numPages: this.pages,
        numLanguages: this.lang,
      },
      { emitEvent: false }
    );

    this.panelForm.valueChanges.subscribe((values) => {
      const numPages: number = Number(values.numPages ?? 0);
      const numLanguages: number = Number(values.numLanguages ?? 0);

      this.budgetService.updateWebCalculation(numPages, numLanguages);
      this.numPages.emit(numPages);
      this.numLanguages.emit(numLanguages);
    });
  }

  ngSubmit(): void {}
}
