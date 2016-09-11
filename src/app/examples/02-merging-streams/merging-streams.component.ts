import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-merging-streams',
  templateUrl: './merging-streams.component.html',
  styleUrls: ['./merging-streams.component.css']
})
export class MergingStreamsComponent implements OnInit {
  @ViewChild('left') left;
  @ViewChild('right') right;
  position: any = {};

  constructor (private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('event/');

    const left$ = Observable.fromEvent(this.getNativeElement(this.left), 'click')
      .map(event => -10);

    const right$ = Observable.fromEvent(this.getNativeElement(this.right), 'click')
      .map(event => 10);

    const local$ = Observable.merge(left$, right$)
      //  The following works correctly but involves outside state
      .map(space => Object.assign({}, this.position, {x: this.position.x + space}))

      .startWith({x: 100, y: 100})

      //  If we use the below, it appears to "work", but it doesn't sync up quite right across tabs
      // .scan((acc, curr) => Object.assign({}, acc, {x: acc.x + curr}))

      .do(event => remote$.update(event))
      .subscribe();

    remote$
      .subscribe(result => {
        this.position = result;
      });
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
