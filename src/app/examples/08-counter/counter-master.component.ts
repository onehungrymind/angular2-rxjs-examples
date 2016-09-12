import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

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

    const local$ = Observable.fromEvent(this.getNativeElement(this.btn), 'click')
      .map(event => {
        return {
          timestamp: new Date().toString()
        }
      })
      .subscribe(event => remote$.update(event));

    remote$
      .subscribe(result => {
        this.message = result.message;
        this.timestamp = result.timestamp;
      });
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
