import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-location-master',
  template: `
  <div class="container">
    <div #ball class="ball"
      [style.left]="position.x + 'px'"
      [style.top]="position.y + 'px'">
    </div>
  </div>
  `
})
export class LocationMasterComponent implements OnInit {
  @ViewChild('ball') ball;
  position: any;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('location/');

    const OFFSET = 45;

    const move$ = Observable.fromEvent(document, 'mousemove')
      .map(event => {
        const PARENT_OFFSET = event.path
          .filter(path => {
            return path.tagName
              && !path.tagName.includes('APP-LOCATION')
              && path.className !== 'ball'
              && path.className !== 'app-content'
          })
          .reduce((acc, curr) => {
            const offsetLeft = curr.offsetLeft || 0,
              offsetTop = curr.offsetTop || 0;

            return {
              x: acc.x + offsetLeft,
              y: acc.y + offsetTop
            };
          }, {x: 0, y: 0});

        return {
          x: event.clientX - PARENT_OFFSET.x - OFFSET,
          y: event.clientY - PARENT_OFFSET.y - OFFSET
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
