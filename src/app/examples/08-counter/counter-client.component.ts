import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-counter-client',
  template: `
  <div>
    <h2>Beast Mode Activated</h2>
    <strong>{{count}} times!</strong>
  </div>
  `
})
export class CounterClientComponent implements OnInit {
  count: number;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('clicker/');

    remote$
      .subscribe(result => this.count = result.ticker)
    ;
  }
}
