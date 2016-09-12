import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-slider-master',
  styles: [
    'input { width: 50%; }'
  ],
  template: `
  <h1>Min/Max Selector</h1>
  <form [formGroup]="myForm">
    <input type="range" formControlName="min" [min]="min" [max]="max" [step]="step">
    <p>min - {{minValue | async}}</p>
    <input type="range" formControlName="max" [min]="min" [max]="max" [step]="step">
    <p>max - {{maxValue | async}}</p>
  </form>
  `
})
export class SliderMasterComponent implements OnInit {
  myForm: FormGroup;
  minValue: Observable<number>;
  maxValue: Observable<number>;
  min = 0;
  max = 100;
  startMin = 45;
  startMax = 55;
  step = 1;

  constructor (private builder: FormBuilder, private af: AngularFire) {}

  ngOnInit() {
    this.myForm = this.builder.group({
      min: this.startMin,
      max: this.startMax
    });

    const remote$ = this.af.database.object('slider/');

    let valueStream = this.myForm.valueChanges
      .map(val => {
        return {
          min: parseFloat(val.min),
          max: parseFloat(val.max)
        };
      })
      .pairwise()
      .filter(([oldVal, newVal]) => {
        let isValid = true;
        if (oldVal.min !== newVal.min && newVal.min > newVal.max) {
          isValid = false;
          (<FormControl>this.myForm.controls['max']).setValue(newVal.min);
        }
        else if (oldVal.max !== newVal.max && newVal.max < newVal.min) {
          isValid = false;
          (<FormControl>this.myForm.controls['min']).setValue(newVal.max);
        }
        return isValid;
      })
      .map(([oldVal, newVal]) => newVal)
      .do(vals => remote$.update(vals))

    this.minValue = valueStream
      .map(vals => vals.min)
      .startWith(this.startMin);

    this.maxValue = valueStream
      .map(vals => vals.max)
      .startWith(this.startMax);
  }
}