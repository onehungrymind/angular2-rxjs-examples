import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-triggers',
  template: `
  <div #ball class="ball"
    [style.left]="position.x + 'px'"
    [style.top]="position.y + 'px'">
  </div>
  `
})
export class TriggersComponent implements OnInit {
  @ViewChild('ball') ball;
  position: any;

  ngOnInit() {
    const BALL_OFFSET = 50;

    const move$ = Observable.fromEvent(document, 'mousemove')
      .map(event => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left - BALL_OFFSET,
          y: event.pageY - BALL_OFFSET
        };
      });

    const down$ = Observable.fromEvent(this.ball.nativeElement, 'mousedown')
      .do(event => this.ball.nativeElement.style.pointerEvents = 'none');

    const up$ = Observable.fromEvent(document, 'mouseup')
      .do(event => this.ball.nativeElement.style.pointerEvents = 'all');

    down$
      .switchMap(event => move$.takeUntil(up$))
      .startWith({ x: 100, y: 100})
      .subscribe(position => this.position = position);
  }
}
