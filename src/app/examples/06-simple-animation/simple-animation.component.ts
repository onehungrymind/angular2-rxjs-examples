import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BIG_BALL_OFFSET, CURSOR_OFFSET } from '../../shared';
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
    Observable.fromEvent(document, 'click')
      .map((event: any) => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left - BIG_BALL_OFFSET - CURSOR_OFFSET,
          y: event.pageY - offset.top - BIG_BALL_OFFSET - CURSOR_OFFSET
        };
      })
      .subscribe(props => {
        TweenMax.to(this.ball.nativeElement, 1, props);
      })
  }

}
