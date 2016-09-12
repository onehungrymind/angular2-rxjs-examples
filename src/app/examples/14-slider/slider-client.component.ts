import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-slider-client',
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
export class SliderClientComponent implements OnInit {
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
    const remote$ = this.af.database.object('slider/');

    this.myForm = this.builder.group({
      min: this.startMin,
      max: this.startMax
    });

    this.minValue = remote$
      .map(vals => vals.min)
      .do(val => (<FormControl>this.myForm.controls['min']).setValue(val))
      .startWith(this.startMin);

    this.maxValue = remote$
      .map(vals => vals.max)
      .do(val => (<FormControl>this.myForm.controls['max']).setValue(val))
      .startWith(this.startMax);
  }
}