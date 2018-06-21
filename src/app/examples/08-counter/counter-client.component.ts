import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remote$ = this.db.object('clicker/').valueChanges();

    remote$
      .subscribe((result: any) => this.count = result.ticker)
    ;
  }
}
