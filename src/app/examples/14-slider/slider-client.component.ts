import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, startWith, tap } from 'rxjs/internal/operators';

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

  constructor (private builder: FormBuilder, private db: AngularFireDatabase) {}

  ngOnInit() {
    const remote$ = this.db.object('slider/').valueChanges();

    this.myForm = this.builder.group({
      min: this.startMin,
      max: this.startMax
    });

    this.minValue = remote$
      .pipe(
        map((vals: any) => vals.min),
        tap(val => (<FormControl>this.myForm.controls['min']).setValue(val)),
        startWith(this.startMin),
      );

    this.maxValue = remote$
      .pipe(
        map((vals: any) => vals.max),
        tap(val => (<FormControl>this.myForm.controls['max']).setValue(val)),
        startWith(this.startMax),
      );
  }
}
