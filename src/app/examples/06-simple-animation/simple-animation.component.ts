import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'gsap';

@Component({
  selector: 'app-simple-animation',
  template: `<div #ball class="ball"></div>`
})
export class SimpleAnimationComponent implements OnInit {

  @ViewChild('ball') ball;

  ngOnInit() {
    const BALL_OFFSET = 50;
    const CURSOR_OFFSET = 20;

    Observable.fromEvent(document, 'click')
      .map((event: any) => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left - BALL_OFFSET - CURSOR_OFFSET,
          y: event.pageY - offset.top - BALL_OFFSET - CURSOR_OFFSET
        };
      })
      .subscribe(props => TweenMax.to(this.ball.nativeElement, 1, props))
  }
}
