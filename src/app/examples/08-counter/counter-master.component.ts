import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

interface Ticker {
  ticker: number
}

@Component({
  selector: 'app-counter-master',
  template: `
  <button #btn md-raised-button color="accent">Click me!</button>
  `
})
export class CounterMasterComponent implements OnInit {
  @ViewChild('btn') btn;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('clicker/');

    Observable.fromEvent(this.getNativeElement(this.btn), 'click')
      .startWith({ticker: 0})
      .scan((acc: Ticker, curr) => { return { ticker: acc.ticker + 1 }; })
      .subscribe(event => remote$.update(event));
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
