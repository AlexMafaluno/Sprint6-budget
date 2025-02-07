import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('Function "calculateWeb"', ()=> {
  let component: any;

  function calculateWeb() {
    return component.numPages * component.numLanguages;
  }

  beforeEach(() => {
    component = {
      numPages: 0,
      numLanguages: 0,
      calculateWeb: calculateWeb
    };
  });

  it('should be declared', () => {
    expect(typeof calculateWeb).toBe('function');
  });

  it('should return a number', () => {
    component.numPages = 5;
    component.numLanguages = 2;
    const result = component.calculateWeb();
    expect(typeof result).toBe('number');

  });

  it('should be different from NaN', () => {
    expect(calculateWeb()).not.toBeNaN();
  });



});