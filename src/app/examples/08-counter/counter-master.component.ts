import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { scan, startWith } from 'rxjs/internal/operators';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remoteRef = this.db.object('clicker/');

    fromEvent(this.getNativeElement(this.btn), 'click')
      .pipe(
        startWith({ticker: 0}),
        scan((acc: Ticker, curr) => { return { ticker: acc.ticker + 1 }; })
      )
      .subscribe(event => remoteRef.update(event));
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
