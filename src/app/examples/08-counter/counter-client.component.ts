import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';

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
