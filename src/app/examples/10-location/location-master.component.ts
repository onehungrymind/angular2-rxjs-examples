import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { BIG_BALL_OFFSET, getOffsetTop, getOffsetLeft, getSourceElement } from '../../shared';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import {CURSOR_OFFSET} from "../../shared/constants";

@Component({
  selector: 'app-location-master',
  template: `
    <div #ball class="ball"
      [style.left]="position.x + 'px'"
      [style.top]="position.y + 'px'">
    </div>
  `
})
export class LocationMasterComponent implements OnInit {
  @ViewChild('ball') ball;
  position: any;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('location/');

    const move$ = Observable.fromEvent(getSourceElement(), 'mousemove')
      .map(event => {
        return {
          x: event.clientX - getOffsetLeft(event, 'ball') - BIG_BALL_OFFSET - CURSOR_OFFSET,
          y: event.clientY - getOffsetTop(event, 'ball') - BIG_BALL_OFFSET - CURSOR_OFFSET
        };
      });

    const down$ = Observable.fromEvent(this.ball.nativeElement, 'mousedown');
    const up$ = Observable.fromEvent(document, 'mouseup');

    down$
      .switchMap(event => move$.takeUntil(up$))
      .startWith({ x: 100, y: 100})
      .do(event => remote$.update(event))
      .subscribe(event => this.position = event);
  }
}
